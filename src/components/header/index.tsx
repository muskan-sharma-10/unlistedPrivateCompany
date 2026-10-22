import React from 'react';
import TopTicker from './top-ticker';
import Navbar from './navbar';
import { StockItem } from '@/data/unlisted-data';

interface HeaderProps {
  onSelectStock?: (stock: StockItem) => void;
  onOpenEnquiry?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onSelectStock, onOpenEnquiry }) => {
  return (
    <>
      <TopTicker />
      <Navbar onSelectStock={onSelectStock} onOpenEnquiry={onOpenEnquiry} />
    </>
  );
};

export default Header;
export { TopTicker, Navbar };