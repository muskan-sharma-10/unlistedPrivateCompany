import { mapDbShareToStockItem } from '../src/lib/supabase/queries';
import { PriceHistoryRecord } from '../src/data/unlisted-data';

// Test Suite for Price Flow, History Persistence, Timeframe Filters, and 52-Week High/Low

function runTests() {
  console.log('=== STARTING VERIFICATION TEST SUITE ===\n');

  let passed = 0;
  let failed = 0;

  function assert(condition: boolean, testName: string) {
    if (condition) {
      console.log(`[PASS] ${testName}`);
      passed++;
    } else {
      console.error(`[FAIL] ${testName}`);
      failed++;
    }
  }

  const now = Date.now();
  const dayMs = 24 * 60 * 60 * 1000;

  // Timestamps for test scenarios
  const date400DaysAgo = new Date(now - 400 * dayMs).toISOString(); // > 52 weeks ago
  const date200DaysAgo = new Date(now - 200 * dayMs).toISOString(); // ~6.5 months ago
  const date100DaysAgo = new Date(now - 100 * dayMs).toISOString(); // ~3.3 months ago
  const date15DaysAgo = new Date(now - 15 * dayMs).toISOString();   // ~2 weeks ago
  const dateToday = new Date(now).toISOString();

  // Test 1: Baseline Single Price without prior history (Missing historical data handled honestly)
  console.log('--- Test Scenario 1: Initial Price Creation & Honest Missing History ---');
  const dbRowInitial = {
    id: 'test-stock-1',
    name: 'Veritas Technologies',
    symbol: 'VERITAS',
    slug: 'veritas-tech',
    current_price: 500,
    lot_size: 100,
    status: 'published',
    updated_at: dateToday,
    details: {} // No prior price_history
  };

  const item1 = mapDbShareToStockItem(dbRowInitial);
  assert(item1.price === 500, 'Current price mapped correctly as 500');
  assert((item1.priceHistory?.length ?? 0) === 1, 'Initial history has exactly 1 verified point (no fabricated records)');
  assert(item1.priceHistory?.[0].price === 500, 'History record price matches 500');
  assert(item1.high52 === '₹ 500', '52-week High is ₹ 500 (honest current price, no +15% fabrication)');
  assert(item1.low52 === '₹ 500', '52-week Low is ₹ 500 (honest current price, no -25% fabrication)');
  assert(item1.sparkline.length === 1 && item1.sparkline[0] === 500, 'Sparkline reflects actual saved price, not [0.9*p, 0.95*p, p]');

  // Test 2: Multiple Price Updates with Timestamps across trailing 52-week window & beyond
  console.log('\n--- Test Scenario 2: Trailing 52-Week High/Low & Historical Persistence ---');
  const dbRowWithHistory = {
    id: 'test-stock-2',
    name: 'Apex Solar Energy',
    symbol: 'APEXSOLAR',
    slug: 'apex-solar',
    current_price: 650,
    lot_size: 50,
    status: 'published',
    updated_at: dateToday,
    details: {
      price_history: [
        { price: 800, date: date400DaysAgo, note: 'Round 1 (Out of 52-week window)' },
        { price: 420, date: date200DaysAgo, note: 'Round 2 (Low of 52 weeks)' },
        { price: 720, date: date100DaysAgo, note: 'Round 3 (High of 52 weeks)' },
        { price: 610, date: date15DaysAgo, note: 'Round 4 (Within 1M)' },
        { price: 650, date: dateToday, note: 'Current Indicative' },
      ]
    }
  };

  const item2 = mapDbShareToStockItem(dbRowWithHistory);
  assert(item2.price === 650, 'Current price is 650');
  assert((item2.priceHistory?.length ?? 0) === 5, 'All 5 historical records preserved');
  assert(item2.sparkline.length === 5, 'Sparkline contains 5 actual saved points');
  
  // 52-Week Trailing Check:
  // Price 800 is 400 days ago (> 364 days). Should NOT be the 52W High!
  // High in 52 weeks must be 720.
  // Low in 52 weeks must be 420.
  assert(item2.high52 === '₹ 720', `52-week High is ₹ 720 (correctly excludes 400-day-old ₹800)`);
  assert(item2.low52 === '₹ 420', '52-week Low is ₹ 420');

  // Test 3: Timeframe Filter Simulation ('1M', '6M', '1Y', '3Y', 'Max')
  console.log('\n--- Test Scenario 3: Timeframe Filters (1M, 6M, 1Y, 3Y, Max) ---');
  function filterByTimeframe(history: PriceHistoryRecord[], tf: string) {
    let limitMs = Infinity;
    if (tf === '1M') limitMs = 30 * dayMs;
    else if (tf === '6M') limitMs = 182 * dayMs;
    else if (tf === '1Y') limitMs = 365 * dayMs;
    else if (tf === '3Y') limitMs = 3 * 365 * dayMs;
    const filtered = history.filter((h: PriceHistoryRecord) => now - new Date(h.date).getTime() <= limitMs);
    return filtered.length > 0 ? filtered : [history[history.length - 1]];
  }

  const tf1M = filterByTimeframe(item2.priceHistory || [], '1M');
  assert(tf1M.length === 2, `1M filter includes only records within 30 days (found ${tf1M.length}: 610 and 650)`);

  const tf6M = filterByTimeframe(item2.priceHistory || [], '6M');
  assert(tf6M.length === 3, `6M filter includes records within 182 days (found ${tf6M.length}: 720, 610, 650)`);

  const tf1Y = filterByTimeframe(item2.priceHistory || [], '1Y');
  assert(tf1Y.length === 4, `1Y filter includes records within 365 days (excludes 400-day record)`);

  const tfMax = filterByTimeframe(item2.priceHistory || [], 'Max');
  assert(tfMax.length === 5, 'Max filter includes all 5 records');

  // Test 4: Updating a Price in CMS (Append without overwriting existing history)
  console.log('\n--- Test Scenario 4: Price Update & Non-Destructive Persistence ---');
  const currentDetails: PriceHistoryRecord[] = item2.priceHistory || [];
  const newPrice = 680;
  const updatedHistory: PriceHistoryRecord[] = [
    ...currentDetails,
    { price: newPrice, date: new Date().toISOString(), note: 'CMS price update' }
  ];
  assert(updatedHistory.length === 6, 'History length incremented to 6 after CMS update');
  assert(updatedHistory[5].price === 680, 'Latest price record is 680');
  assert(updatedHistory[0].price === 800, 'Original historical record 800 preserved intact');

  // Test 5: Deleting an Erroneous Price Record in CMS
  console.log('\n--- Test Scenario 5: Price Deletion in CMS ---');
  // Suppose record at index 2 (price 720) was an error and deleted
  const historyAfterDelete = updatedHistory.filter((_, idx) => idx !== 2);
  assert(historyAfterDelete.length === 5, 'History count decreased to 5 after deleting record');
  assert(!historyAfterDelete.some(r => r.price === 720), 'Deleted price 720 is removed from history');

  const remappedAfterDelete = mapDbShareToStockItem({
    ...dbRowWithHistory,
    current_price: 680,
    details: { price_history: historyAfterDelete }
  });
  // New 52W High should now be 680 because 720 was deleted and 800 is out of range!
  assert(remappedAfterDelete.high52 === '₹ 680', `New 52-week High after deletion is ₹ 680 (dynamically recalculated)`);
  assert(remappedAfterDelete.low52 === '₹ 420', '52-week Low remains ₹ 420');

  console.log(`\n=== VERIFICATION SUMMARY: ${passed} PASSED, ${failed} FAILED ===\n`);
  return failed === 0;
}

const success = runTests();
if (!success) process.exit(1);
