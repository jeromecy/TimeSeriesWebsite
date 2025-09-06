export interface TimeSeriesDataPoint {
  time: number;
  value: number;
}

export interface ARParams {
  phi1: number;
  phi2?: number;
  phi3?: number;
  sigma: number;
}

export interface MAParams {
  theta1: number;
  theta2?: number;
  theta3?: number;
  sigma: number;
}

export interface ARIMAParams {
  p: number;
  d: number;
  q: number;
  phi: number[];
  theta: number[];
  sigma: number;
}

export interface NavigationItem {
  id: string;
  title: string;
  description: string;
}