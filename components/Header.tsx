import React from 'react';
import { Activity } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="bg-blue-600 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex items-center gap-3">
        <Activity className="h-8 w-8 text-white" />
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight">酒精健康風險評估</h1>
          <p className="text-blue-100 text-xs sm:text-sm">計算每日飲酒量對肝臟與死亡率的潛在影響</p>
        </div>
      </div>
    </header>
  );
};
