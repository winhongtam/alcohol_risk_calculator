export interface DrinkOption {
  id: string;
  name: string;
  volumeMl: number;
  abv: number; // Percentage like 5 for 5%
  alcoholGrams: number;
  icon: string;
}

export interface ConsumedDrink {
  id: string;
  drinkId: string;
  name: string;
  quantity: number;
  totalGrams: number;
  timestamp: number;
}

export enum RiskLevel {
  LOW = 'LOW',
  MODERATE = 'MODERATE',
  HIGH = 'HIGH',
  SEVERE = 'SEVERE'
}

export interface RiskAnalysis {
  riskLevel: RiskLevel;
  liverCancerRisk: string;
  cirrhosisRisk: string;
  mortalityRisk: string;
  color: string;
}
