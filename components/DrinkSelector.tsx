import React, { useState } from 'react';
import { Plus, Trash2, Wine } from 'lucide-react';
import { DRINK_OPTIONS } from '../constants';
import { ConsumedDrink } from '../types';

interface DrinkSelectorProps {
  onAddDrink: (drinkId: string, quantity: number) => void;
  consumedDrinks: ConsumedDrink[];
  onRemoveDrink: (id: string) => void;
}

export const DrinkSelector: React.FC<DrinkSelectorProps> = ({ onAddDrink, consumedDrinks, onRemoveDrink }) => {
  const [selectedDrinkId, setSelectedDrinkId] = useState(DRINK_OPTIONS[0].id);
  const [quantity, setQuantity] = useState<number>(1);

  const handleAdd = () => {
    if (quantity > 0) {
      onAddDrink(selectedDrinkId, quantity);
      setQuantity(1);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex flex-col h-fit">
      <div className="flex items-center gap-2 mb-6">
        <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
          <Wine size={20} />
        </div>
        <h2 className="text-lg font-bold text-slate-800">新增飲酒紀錄</h2>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-600 mb-2">
            選擇飲品種類
          </label>
          <select
            value={selectedDrinkId}
            onChange={(e) => setSelectedDrinkId(e.target.value)}
            className="w-full bg-white border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-3 shadow-sm"
          >
            {DRINK_OPTIONS.map((option) => (
              <option key={option.id} value={option.id}>
                {option.icon} {option.name} ({option.alcoholGrams}g 酒精)
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-600 mb-2">
            數量 (瓶/罐/杯)
          </label>
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 0))}
            className="w-full bg-white border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-3 shadow-sm"
          />
        </div>

        <button
          onClick={handleAdd}
          className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-3 text-center flex items-center justify-center gap-2 transition-colors"
        >
          <Plus size={18} />
          加入清單
        </button>
      </div>

      {/* Mini List of added items */}
      {consumedDrinks.length > 0 && (
        <div className="mt-8 pt-6 border-t border-slate-100">
          <h3 className="text-sm font-semibold text-slate-500 mb-3">今日已新增項目</h3>
          <ul className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
            {consumedDrinks.map((drink) => (
              <li key={drink.id} className="flex justify-between items-center bg-slate-50 p-3 rounded-lg border border-slate-100 group">
                <div>
                  <div className="text-sm font-medium text-slate-800">
                    {drink.name} <span className="text-blue-600 font-bold">x {drink.quantity}</span>
                  </div>
                  <div className="text-xs text-slate-500">總酒精: {drink.totalGrams.toFixed(1)}g</div>
                </div>
                <button 
                  onClick={() => onRemoveDrink(drink.id)}
                  className="text-slate-400 hover:text-red-500 transition-colors p-1"
                  title="移除"
                >
                  <Trash2 size={16} />
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};