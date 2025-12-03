import React from 'react';
import { RISK_THRESHOLDS, RISK_DESCRIPTIONS } from '../constants';
import { RiskLevel } from '../types';
import { AlertTriangle, CheckCircle2 } from 'lucide-react';

interface RiskGaugeProps {
  totalGrams: number;
}

export const RiskGauge: React.FC<RiskGaugeProps> = ({ totalGrams }) => {
  const maxScale = 60; // The max value of the bar visual
  
  let currentRisk = RiskLevel.LOW;
  if (totalGrams > RISK_THRESHOLDS.DANGER) currentRisk = RiskLevel.HIGH; // > 40
  else if (totalGrams > RISK_THRESHOLDS.MEN_LIMIT) currentRisk = RiskLevel.MODERATE; // 20-40

  if (totalGrams > 60) currentRisk = RiskLevel.SEVERE;

  const riskInfo = RISK_DESCRIPTIONS[currentRisk];
  const percentFilled = Math.min((totalGrams / maxScale) * 100, 100);

  return (
    <div className="bg-green-50 rounded-xl p-6 border border-green-100 shadow-sm relative overflow-hidden">
        {/* Background decorative pattern */}
        <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
            <AlertTriangle size={100} />
        </div>

      <div className="flex justify-between items-start mb-6 relative z-10">
        <div>
          <h3 className="text-slate-600 font-medium mb-1">每日純酒精攝取量</h3>
          <div className="flex items-baseline gap-2">
            <span className={`text-4xl sm:text-5xl font-bold ${totalGrams > 0 ? 'text-slate-800' : 'text-slate-400'}`}>
              {totalGrams.toFixed(1)}
            </span>
            <span className="text-slate-500 font-medium">克 (g)</span>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm text-slate-500 font-medium mb-1">目前評估等級</p>
          <div className={`flex items-center justify-end gap-1.5 text-lg font-bold ${riskInfo.color}`}>
            {currentRisk === RiskLevel.LOW ? <CheckCircle2 size={20} /> : <AlertTriangle size={20} />}
            {riskInfo.label}
          </div>
        </div>
      </div>

      {/* Progress Bar Container */}
      <div className="relative h-4 bg-slate-200 rounded-full mb-2 z-10">
        {/* Markers */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
            {/* 20g Marker */}
            <div className="absolute top-0 bottom-0 border-r-2 border-white z-20" style={{ left: `${(20 / maxScale) * 100}%` }}></div>
            {/* 40g Marker */}
            <div className="absolute top-0 bottom-0 border-r-2 border-white z-20" style={{ left: `${(40 / maxScale) * 100}%` }}></div>
        </div>
        
        {/* Fill */}
        <div 
          className={`h-full rounded-full transition-all duration-700 ease-out ${riskInfo.barColor}`}
          style={{ width: `${percentFilled}%` }}
        ></div>
      </div>

      {/* Scale Labels */}
      <div className="flex justify-between text-xs text-slate-400 font-medium relative z-10">
        <span>0g</span>
        <span style={{ position: 'absolute', left: `${(20 / maxScale) * 100}%`, transform: 'translateX(-50%)' }}>20g (男/上限)</span>
        <span style={{ position: 'absolute', left: `${(40 / maxScale) * 100}%`, transform: 'translateX(-50%)' }}>40g (危險)</span>
        <span>{maxScale}g+</span>
      </div>

      <div className="mt-4 text-xs text-green-700 bg-white/60 p-2 rounded inline-block relative z-10">
        * 衛福部建議： 男性每日不超過 20g，女性不超過 10g。
      </div>
    </div>
  );
};
