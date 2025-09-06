import { TimeSeriesDataPoint, ARParams, MAParams, ARIMAParams } from '../types';

// Generate white noise
export function generateWhiteNoise(n: number, sigma: number = 1): number[] {
  const noise = [];
  for (let i = 0; i < n; i++) {
    // Box-Muller transformation for normal distribution
    const u1 = Math.random();
    const u2 = Math.random();
    const z = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
    noise.push(z * sigma);
  }
  return noise;
}

// Generate AR(p) model
export function generateAR(n: number, params: ARParams): TimeSeriesDataPoint[] {
  const { phi1, phi2 = 0, phi3 = 0, sigma } = params;
  const noise = generateWhiteNoise(n, sigma);
  const values = [0, 0, 0]; // Initial values
  
  for (let t = 3; t < n; t++) {
    const arValue = phi1 * values[t - 1] + phi2 * values[t - 2] + phi3 * values[t - 3] + noise[t];
    values.push(arValue);
  }
  
  return values.map((value, index) => ({
    time: index,
    value: parseFloat(value.toFixed(3))
  }));
}

// Generate MA(q) model
export function generateMA(n: number, params: MAParams): TimeSeriesDataPoint[] {
  const { theta1, theta2 = 0, theta3 = 0, sigma } = params;
  const noise = generateWhiteNoise(n + 3, sigma);
  const values = [];
  
  for (let t = 3; t < n + 3; t++) {
    const maValue = noise[t] + theta1 * noise[t - 1] + theta2 * noise[t - 2] + theta3 * noise[t - 3];
    values.push(maValue);
  }
  
  return values.map((value, index) => ({
    time: index,
    value: parseFloat(value.toFixed(3))
  }));
}

// Generate ARIMA(p,d,q) model
export function generateARIMA(n: number, params: ARIMAParams): TimeSeriesDataPoint[] {
  const { p, d, q, phi, theta, sigma } = params;
  
  // Start with AR or MA depending on parameters
  if (p > 0 && q === 0) {
    // Pure AR model
    const arParams: ARParams = {
      phi1: phi[0] || 0,
      phi2: phi[1] || 0,
      phi3: phi[2] || 0,
      sigma
    };
    let series = generateAR(n + d, arParams);
    
    // Apply differencing d times
    for (let i = 0; i < d; i++) {
      const diffSeries = [];
      for (let j = 1; j < series.length; j++) {
        diffSeries.push({
          time: j - 1,
          value: series[j].value - series[j - 1].value
        });
      }
      series = diffSeries;
    }
    return series.slice(0, n);
  } else if (p === 0 && q > 0) {
    // Pure MA model
    const maParams: MAParams = {
      theta1: theta[0] || 0,
      theta2: theta[1] || 0,
      theta3: theta[2] || 0,
      sigma
    };
    return generateMA(n, maParams);
  }
  
  // Default to AR(1) if no specific model
  return generateAR(n, { phi1: 0.7, sigma });
}

// Generate trending time series
export function generateTrendingSeries(n: number, trend: number = 0.1, noise: number = 1): TimeSeriesDataPoint[] {
  const data = [];
  for (let i = 0; i < n; i++) {
    const trendComponent = trend * i;
    const noiseComponent = (Math.random() - 0.5) * 2 * noise;
    data.push({
      time: i,
      value: parseFloat((trendComponent + noiseComponent).toFixed(3))
    });
  }
  return data;
}

// Generate seasonal time series
export function generateSeasonalSeries(n: number, amplitude: number = 2, period: number = 12, noise: number = 0.5): TimeSeriesDataPoint[] {
  const data = [];
  for (let i = 0; i < n; i++) {
    const seasonal = amplitude * Math.sin(2 * Math.PI * i / period);
    const noiseComponent = (Math.random() - 0.5) * 2 * noise;
    data.push({
      time: i,
      value: parseFloat((seasonal + noiseComponent).toFixed(3))
    });
  }
  return data;
}