async function runLiveTests() {
  console.log('=== STARTING LIVE ENDPOINT & ROUTE PROTECTION TESTS ===\n');

  // 1. Test /api/inquiry/dealing validation
  console.log('[Test 1.1] Testing /api/inquiry/dealing with missing inquiryType:');
  const res1 = await fetch('http://localhost:3000/api/inquiry/dealing', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'Test Investor',
      phone: '9876543210',
      stockName: 'NSE India',
    }),
  });
  const data1 = await res1.json();
  console.log(`Status: ${res1.status}, Response:`, data1);
  if (res1.status === 400 && data1.error.includes('valid Inquiry Type')) {
    console.log('✅ PASS: Rejected submission without required inquiryType');
  } else {
    console.error('❌ FAIL: Expected 400 rejection');
  }

  // 1.2 Test /api/inquiry/dealing valid submission
  console.log('\n[Test 1.2] Testing /api/inquiry/dealing with valid submission to info.biswal01@gmail.com:');
  const res2 = await fetch('http://localhost:3000/api/inquiry/dealing', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      inquiryType: 'Buy Shares',
      name: 'Aarav Sharma',
      phone: '+91 9876543210',
      email: 'aarav.sharma@example.com',
      stockName: 'National Stock Exchange (NSE)',
      quantity: '50 shares',
      message: 'Looking to purchase 50 shares of NSE at indicative market price.',
      sourcePage: '/contact-us',
    }),
  });
  const data2 = await res2.json();
  console.log(`Status: ${res2.status}, Response:`, data2);
  if (res2.status === 200 && data2.success && data2.recipient === 'info.biswal01@gmail.com') {
    console.log('✅ PASS: Successfully processed dealing inquiry with recipient info.biswal01@gmail.com');
  } else {
    console.error('❌ FAIL: Expected 200 with recipient confirmation');
  }

  // 2. Test /api/inquiry/desk
  console.log('\n[Test 2.1] Testing /api/inquiry/desk with missing inquiryType:');
  const res3 = await fetch('http://localhost:3000/api/inquiry/desk', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'Pooja Verma',
      phone: '9988776655',
      stockName: 'Zepto',
    }),
  });
  const data3 = await res3.json();
  console.log(`Status: ${res3.status}, Response:`, data3);
  if (res3.status === 400 && data3.error.includes('valid Inquiry Type')) {
    console.log('✅ PASS: Rejected desk inquiry without required inquiryType');
  } else {
    console.error('❌ FAIL: Expected 400 rejection');
  }

  console.log('\n[Test 2.2] Testing /api/inquiry/desk with valid submission:');
  const res4 = await fetch('http://localhost:3000/api/inquiry/desk', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      inquiryType: 'Liquidate ESOPs',
      name: 'Pooja Verma',
      phone: '+91 9988776655',
      email: 'pooja.v@startup.io',
      stockName: 'Zepto',
      sourcePage: '/shares/zepto',
    }),
  });
  const data4 = await res4.json();
  console.log(`Status: ${res4.status}, Response:`, data4);
  if (res4.status === 200 && data4.success) {
    console.log('✅ PASS: Successfully processed Private Market Desk inquiry');
  } else {
    console.error('❌ FAIL: Expected 200 success');
  }

  // 3. Test Route Protection Middleware
  console.log('\n[Test 3.1] Testing Protected Route /portfolio without auth cookies:');
  const res5 = await fetch('http://localhost:3000/portfolio', {
    redirect: 'manual',
  });
  const locationHeader = res5.headers.get('location');
  console.log(`Status: ${res5.status}, Redirect Location: ${locationHeader}`);
  if ((res5.status === 307 || res5.status === 302 || res5.status === 308) && locationHeader?.includes('/login?redirect=%2Fportfolio')) {
    console.log('✅ PASS: Unauthenticated request to /portfolio was intercepted by middleware and redirected to /login?redirect=%2Fportfolio');
  } else {
    console.error('❌ FAIL: Route protection middleware did not redirect unauthenticated user');
  }

  // 3.2 Test Public Routes remain accessible
  console.log('\n[Test 3.2] Testing Public Routes:');
  const publicRoutes = ['/', '/contact-us', '/shares', '/drhp-filed', '/login', '/about-us'];
  for (const r of publicRoutes) {
    const res = await fetch(`http://localhost:3000${r}`, { redirect: 'manual' });
    console.log(`Route [${r}]: Status ${res.status}`);
    if (res.status === 200) {
      console.log(`  ✅ Public access preserved for ${r}`);
    } else {
      console.warn(`  ⚠️ Route ${r} returned status ${res.status}`);
    }
  }

  console.log('\n=== ALL LIVE ENDPOINT & ROUTE TESTS COMPLETED ===');
}

runLiveTests().catch(console.error);
