import React, { useState } from 'react';
import { Info, Sparkles, Loader2 } from 'lucide-react';
import { getDrAnalysis } from '../services/geminiService';

interface DoctorAdviceProps {
  totalGrams: number;
}

export const DoctorAdvice: React.FC<DoctorAdviceProps> = ({ totalGrams }) => {
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGetAnalysis = async () => {
    if (totalGrams === 0) {
        setAnalysis("請先輸入飲酒量，醫師才能進行評估。");
        return;
    }
    setLoading(true);
    const result = await getDrAnalysis(totalGrams);
    setAnalysis(result);
    setLoading(false);
  };

  return (
    <div className="mt-6 bg-blue-50 rounded-xl border border-blue-100 p-5">
      <div className="flex items-start gap-3">
        <Info className="text-blue-600 flex-shrink-0 mt-0.5" size={20} />
        <div className="w-full">
          <h4 className="font-bold text-blue-900 mb-2">醫師小叮嚀</h4>
          <ul className="list-disc pl-5 space-y-2 text-sm text-blue-800 mb-4">
            <li>酒精代謝能力因人而異，台灣人約 45% 缺乏 ALDH2 酵素（喝酒臉紅），致癌風險更高。</li>
            <li>「適量」的定義：男性每日不超過 2 單位（20g），女性不超過 1 單位（10g）。</li>
            <li>一罐 330ml 啤酒 (5%) 約含 13g 酒精，喝兩罐即超標。</li>
          </ul>
          
          <hr className="border-blue-200 my-4"/>

          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <p className="text-sm text-blue-700 font-medium">
                想了解更詳細的個人化風險分析嗎？
            </p>
            <button 
                onClick={handleGetAnalysis}
                disabled={loading}
                className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-md transition-all disabled:opacity-70 disabled:cursor-not-allowed"
            >
                {loading ? <Loader2 className="animate-spin" size={16}/> : <Sparkles size={16} />}
                {loading ? "分析中..." : "AI 醫師詳細解說"}
            </button>
          </div>

          {analysis && (
            <div className="mt-4 p-4 bg-white rounded-lg border border-blue-100 shadow-sm animate-fade-in">
                <h5 className="font-bold text-slate-800 mb-2 flex items-center gap-2">
                    <Sparkles className="text-indigo-500" size={16}/>
                    AI 醫師評估報告
                </h5>
                <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-line">
                    {analysis}
                </p>
                <div className="mt-2 text-xs text-slate-400 text-right">
                    * AI 分析僅供參考，如有身體不適請務必就醫。
                </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
