import React from 'react';
import { Activity, Heart, AlertTriangle } from 'lucide-react';
import { RiskLevel } from '../types';

interface RiskCardsProps {
  totalGrams: number;
}

export const RiskCards: React.FC<RiskCardsProps> = ({ totalGrams }) => {
  
  // Logic helpers for risk calculation (Simplified based on medical literature trends)
  const getLiverCancerRisk = (g: number) => {
    if (g <= 10) return { label: '基準值', bg: 'bg-green-100', text: 'text-green-800' };
    if (g <= 40) return { label: '稍微增加', bg: 'bg-yellow-100', text: 'text-yellow-800' };
    if (g <= 80) return { label: '顯著增加', bg: 'bg-orange-100', text: 'text-orange-800' };
    return { label: '極高風險', bg: 'bg-red-100', text: 'text-red-800' };
  };

  const getCirrhosisRisk = (g: number) => {
    if (g <= 20) return { label: '基準值', bg: 'bg-green-100', text: 'text-green-800' };
    if (g <= 50) return { label: '增加 1-3 倍', bg: 'bg-yellow-100', text: 'text-yellow-800' };
    return { label: '增加 5-10 倍以上', bg: 'bg-red-100', text: 'text-red-800' };
  };

  const getMortalityRisk = (g: number) => {
    if (g <= 20) return { label: '基準值', bg: 'bg-green-100', text: 'text-green-800' };
    return { label: '風險隨劑量上升', bg: 'bg-slate-100', text: 'text-slate-800' };
  };

  const cancer = getLiverCancerRisk(totalGrams);
  const cirrhosis = getCirrhosisRisk(totalGrams);
  const mortality = getMortalityRisk(totalGrams);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
      
      {/* Liver Cancer Card */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="bg-red-500 px-4 py-3 flex items-center gap-2">
          <Activity className="text-white" size={20} />
          <h3 className="text-white font-bold">肝癌發生風險</h3>
        </div>
        <div className="p-5">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-slate-500 text-sm font-medium">相對風險</span>
            <span className={`px-2 py-1 rounded text-sm font-bold ${cancer.bg} ${cancer.text}`}>
              {cancer.label}
            </span>
          </div>
          <p className="text-slate-500 text-sm leading-relaxed">
            長期每日攝取量與肝細胞癌變有顯著正相關。酒精會破壞 DNA 修復機制。
          </p>
        </div>
      </div>

      {/* Cirrhosis Card */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="bg-amber-500 px-4 py-3 flex items-center gap-2">
          <AlertTriangle className="text-white" size={20} />
          <h3 className="text-white font-bold">肝硬化/肝炎</h3>
        </div>
        <div className="p-5">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-slate-500 text-sm font-medium">相對風險</span>
            <span className={`px-2 py-1 rounded text-sm font-bold ${cirrhosis.bg} ${cirrhosis.text}`}>
              {cirrhosis.label}
            </span>
          </div>
          <p className="text-slate-500 text-sm leading-relaxed">
            酒精代謝產物乙醛會直接破壞肝臟細胞，導致纖維化，最終形成不可逆的肝硬化。
          </p>
        </div>
      </div>

      {/* Mortality Card - Full width on desktop if desired, but grid fits nicely */}
      <div className="md:col-span-2 bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="bg-slate-600 px-4 py-3 flex items-center gap-2">
          <Heart className="text-white" size={20} />
          <h3 className="text-white font-bold">全因死亡率風險</h3>
        </div>
        <div className="p-5">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-slate-500 text-sm font-medium">相對風險</span>
            <span className={`px-2 py-1 rounded text-sm font-bold ${mortality.bg} ${mortality.text}`}>
              {mortality.label}
            </span>
          </div>
          <p className="text-slate-500 text-sm leading-relaxed">
            包含意外事故、心血管疾病及癌症的綜合死亡風險。超過適量飲酒後，死亡率曲線呈現 J 型上升。
          </p>
        </div>
      </div>

    </div>
  );
};
