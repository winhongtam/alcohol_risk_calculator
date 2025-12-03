import { DrinkOption, RiskLevel } from './types';

// Approximate calculation: Volume (ml) * ABV (%) * 0.789 (density)
export const DRINK_OPTIONS: DrinkOption[] = [
  { id: 'beer_can', name: '啤酒 (罐裝 330ml)', volumeMl: 330, abv: 5, alcoholGrams: 13, icon: '🍺' },
  { id: 'beer_bottle', name: '啤酒 (瓶裝 600ml)', volumeMl: 600, abv: 5, alcoholGrams: 23.7, icon: '🍾' },
  { id: 'wine_glass', name: '紅酒/白酒 (125ml)', volumeMl: 125, abv: 12, alcoholGrams: 11.8, icon: '🍷' },
  { id: 'whiskey_shot', name: '威士忌/烈酒 (40ml)', volumeMl: 40, abv: 40, alcoholGrams: 12.6, icon: '🥃' },
  { id: 'soju_cup', name: '燒酒 (50ml)', volumeMl: 50, abv: 20, alcoholGrams: 7.9, icon: '🍶' },
  { id: 'kaoliang_shot', name: '高粱酒 58% (30ml)', volumeMl: 30, abv: 58, alcoholGrams: 13.7, icon: '🍶' },
];

export const RISK_THRESHOLDS = {
  MEN_LIMIT: 20,
  DANGER: 40,
};

export const RISK_DESCRIPTIONS = {
  [RiskLevel.LOW]: {
    label: '低風險',
    color: 'text-green-600',
    bgColor: 'bg-green-100',
    barColor: 'bg-green-500',
    description: '攝取量在建議範圍內。'
  },
  [RiskLevel.MODERATE]: {
    label: '中度風險',
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-100',
    barColor: 'bg-yellow-500',
    description: '攝取量超過建議標準，需注意。'
  },
  [RiskLevel.HIGH]: {
    label: '高風險',
    color: 'text-orange-600',
    bgColor: 'bg-orange-100',
    barColor: 'bg-orange-500',
    description: '長期飲用將顯著增加肝病風險。'
  },
  [RiskLevel.SEVERE]: {
    label: '危險等級',
    color: 'text-red-600',
    bgColor: 'bg-red-100',
    barColor: 'bg-red-600',
    description: '極高機率導致肝硬化及其他併發症。'
  }
};
