import React, { useState } from 'react';
import { Header } from './components/Header';
import { DrinkSelector } from './components/DrinkSelector';
import { RiskGauge } from './components/RiskGauge';
import { RiskCards } from './components/RiskCards';
import { DoctorAdvice } from './components/DoctorAdvice';
import { ConsumedDrink, DrinkOption } from './types';
import { DRINK_OPTIONS } from './constants';

const App: React.FC = () => {
  const [consumedDrinks, setConsumedDrinks] = useState<ConsumedDrink[]>([]);

  const handleAddDrink = (drinkId: string, quantity: number) => {
    const drinkDef = DRINK_OPTIONS.find(d => d.id === drinkId);
    if (!drinkDef) return;

    const newDrink: ConsumedDrink = {
      id: crypto.randomUUID(),
      drinkId: drinkDef.id,
      name: drinkDef.name,
      quantity: quantity,
      totalGrams: drinkDef.alcoholGrams * quantity,
      timestamp: Date.now(),
    };

    setConsumedDrinks(prev => [newDrink, ...prev]);
  };

  const handleRemoveDrink = (id: string) => {
    setConsumedDrinks(prev => prev.filter(d => d.id !== id));
  };

  const totalAlcoholGrams = consumedDrinks.reduce((acc, curr) => acc + curr.totalGrams, 0);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />

      <main className="flex-grow max-w-7xl mx-auto w-full px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          
          {/* Left Column: Input Form (approx 1/3 width on desktop) */}
          <div className="lg:col-span-4 space-y-6">
            <DrinkSelector 
              onAddDrink={handleAddDrink} 
              consumedDrinks={consumedDrinks}
              onRemoveDrink={handleRemoveDrink}
            />
          </div>

          {/* Right Column: Dashboard (approx 2/3 width on desktop) */}
          <div className="lg:col-span-8">
            <RiskGauge totalGrams={totalAlcoholGrams} />
            
            <RiskCards totalGrams={totalAlcoholGrams} />

            <DoctorAdvice totalGrams={totalAlcoholGrams} />
          </div>

        </div>
      </main>
      
      <footer className="bg-white border-t border-slate-200 py-6 mt-8">
        <div className="max-w-7xl mx-auto px-4 text-center text-slate-400 text-sm">
          <p>© 2024 Alcohol Health Risk Assessment. 本工具僅供參考，不能取代專業醫療診斷。</p>
        </div>
      </footer>
    </div>
  );
};

export default App;