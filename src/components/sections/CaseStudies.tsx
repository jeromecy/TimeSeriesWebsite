import React, { useState, useEffect } from 'react';
import { InteractiveChart } from '../InteractiveChart';
import { generateTrendingSeries, generateSeasonalSeries, generateAR } from '../../utils/timeSeriesGenerator';
import { TimeSeriesDataPoint } from '../../types';

export function CaseStudies() {
  const [stockData, setStockData] = useState<TimeSeriesDataPoint[]>([]);
  const [salesData, setSalesData] = useState<TimeSeriesDataPoint[]>([]);
  const [gdpData, setGdpData] = useState<TimeSeriesDataPoint[]>([]);

  useEffect(() => {
    // Simulate stock price (random walk with volatility clustering)
    const stock = generateAR(250, { phi1: 0.95, sigma: 2 });
    const cumulativeStock = stock.reduce((acc, curr, idx) => {
      if (idx === 0) {
        acc.push({ time: 0, value: 100 });
      } else {
        acc.push({
          time: idx,
          value: parseFloat((acc[idx - 1].value + curr.value).toFixed(2))
        });
      }
      return acc;
    }, [] as TimeSeriesDataPoint[]);
    setStockData(cumulativeStock);

    // Simulate retail sales (seasonal + trend)
    const seasonal = generateSeasonalSeries(48, 20, 12, 5);
    const trend = generateTrendingSeries(48, 0.5, 0);
    const sales = seasonal.map((point, idx) => ({
      time: idx,
      value: parseFloat((point.value + trend[idx].value + 100).toFixed(2))
    }));
    setSalesData(sales);

    // Simulate GDP (smooth trend with AR(1) fluctuations)
    const gdp = generateAR(40, { phi1: 0.8, sigma: 0.5 });
    const gdpWithTrend = gdp.map((point, idx) => ({
      time: idx,
      value: parseFloat((point.value + idx * 0.3 + 1000).toFixed(2))
    }));
    setGdpData(gdpWithTrend);
  }, []);

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Real-World Case Studies</h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Explore how time series models are applied to analyze real-world phenomena in finance, economics, and business.
        </p>
      </div>

      {/* Financial Markets */}
      <section className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6">
        <div className="flex items-center mb-4">
          <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
            <span className="text-white font-bold text-sm">₹</span>
          </div>
          <h3 className="text-2xl font-semibold text-gray-900">Stock Price Analysis</h3>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <InteractiveChart 
              data={stockData}
              title="Stock Price Simulation"
              subtitle="Daily closing prices showing random walk behavior"
              color="#1d4ed8"
              height={300}
            />
          </div>
          
          <div className="bg-white p-4 rounded-lg">
            <h4 className="font-semibold mb-3">Model Characteristics</h4>
            <div className="space-y-3 text-sm">
              <div className="p-3 bg-blue-50 rounded-lg">
                <p className="font-medium text-blue-800">Random Walk Model</p>
                <p className="text-blue-600">Price(t) = Price(t-1) + ε(t)</p>
              </div>
              
              <div>
                <p className="font-medium text-gray-800 mb-2">Key Features:</p>
                <ul className="space-y-1 text-gray-600">
                  <li>• Non-stationary prices</li>
                  <li>• Unpredictable returns</li>
                  <li>• Volatility clustering</li>
                  <li>• Unit root behavior</li>
                </ul>
              </div>
              
              <div>
                <p className="font-medium text-gray-800 mb-2">Applications:</p>
                <ul className="space-y-1 text-gray-600">
                  <li>• Risk management</li>
                  <li>• Portfolio optimization</li>
                  <li>• Options pricing</li>
                  <li>• Market efficiency tests</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Retail Sales */}
      <section className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl p-6">
        <div className="flex items-center mb-4">
          <div className="h-8 w-8 bg-emerald-600 rounded-lg flex items-center justify-center mr-3">
            <span className="text-white font-bold text-sm">🛍</span>
          </div>
          <h3 className="text-2xl font-semibold text-gray-900">Retail Sales Forecasting</h3>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <InteractiveChart 
              data={salesData}
              title="Monthly Retail Sales"
              subtitle="Sales data showing seasonal patterns and growth trend"
              color="#059669"
              height={300}
            />
          </div>
          
          <div className="bg-white p-4 rounded-lg">
            <h4 className="font-semibold mb-3">Model Approach</h4>
            <div className="space-y-3 text-sm">
              <div className="p-3 bg-emerald-50 rounded-lg">
                <p className="font-medium text-emerald-800">Seasonal ARIMA</p>
                <p className="text-emerald-600">SARIMA(p,d,q)(P,D,Q)ₛ</p>
              </div>
              
              <div>
                <p className="font-medium text-gray-800 mb-2">Components:</p>
                <ul className="space-y-1 text-gray-600">
                  <li>• Holiday seasonality</li>
                  <li>• Long-term growth trend</li>
                  <li>• Economic cycle effects</li>
                  <li>• Promotional impacts</li>
                </ul>
              </div>
              
              <div>
                <p className="font-medium text-gray-800 mb-2">Business Value:</p>
                <ul className="space-y-1 text-gray-600">
                  <li>• Inventory planning</li>
                  <li>• Staff scheduling</li>
                  <li>• Budget forecasting</li>
                  <li>• Marketing timing</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Economic Data */}
      <section className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6">
        <div className="flex items-center mb-4">
          <div className="h-8 w-8 bg-purple-600 rounded-lg flex items-center justify-center mr-3">
            <span className="text-white font-bold text-sm">📊</span>
          </div>
          <h3 className="text-2xl font-semibold text-gray-900">Economic Indicator Analysis</h3>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <InteractiveChart 
              data={gdpData}
              title="Quarterly GDP Growth"
              subtitle="Economic output showing business cycle fluctuations"
              color="#7c3aed"
              height={300}
            />
          </div>
          
          <div className="bg-white p-4 rounded-lg">
            <h4 className="font-semibold mb-3">Economic Modeling</h4>
            <div className="space-y-3 text-sm">
              <div className="p-3 bg-purple-50 rounded-lg">
                <p className="font-medium text-purple-800">Trend-Stationary</p>
                <p className="text-purple-600">GDP = α + βt + AR(1) error</p>
              </div>
              
              <div>
                <p className="font-medium text-gray-800 mb-2">Economic Features:</p>
                <ul className="space-y-1 text-gray-600">
                  <li>• Long-term growth trend</li>
                  <li>• Business cycle patterns</li>
                  <li>• Shock persistence</li>
                  <li>• Policy intervention effects</li>
                </ul>
              </div>
              
              <div>
                <p className="font-medium text-gray-800 mb-2">Policy Applications:</p>
                <ul className="space-y-1 text-gray-600">
                  <li>• Recession forecasting</li>
                  <li>• Monetary policy</li>
                  <li>• Fiscal planning</li>
                  <li>• International comparisons</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Model Selection Guidelines */}
      <section className="bg-white border border-gray-200 rounded-xl p-6">
        <h3 className="text-xl font-semibold mb-4">Industry-Specific Model Selection</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-4 border border-blue-200 rounded-lg">
            <h4 className="font-medium text-blue-800 mb-3">Financial Markets</h4>
            <ul className="text-sm space-y-2">
              <li><strong>Stock Prices:</strong> Random walk, GARCH for volatility</li>
              <li><strong>Exchange Rates:</strong> ARIMA with structural breaks</li>
              <li><strong>Interest Rates:</strong> Vector autoregression (VAR)</li>
              <li><strong>Returns:</strong> ARMA with fat-tailed distributions</li>
            </ul>
          </div>
          
          <div className="p-4 border border-emerald-200 rounded-lg">
            <h4 className="font-medium text-emerald-800 mb-3">Business & Sales</h4>
            <ul className="text-sm space-y-2">
              <li><strong>Retail Sales:</strong> Seasonal ARIMA, exponential smoothing</li>
              <li><strong>Demand Forecasting:</strong> SARIMA with external regressors</li>
              <li><strong>Inventory:</strong> Croston's method for intermittent demand</li>
              <li><strong>Marketing:</strong> Transfer function models</li>
            </ul>
          </div>
          
          <div className="p-4 border border-purple-200 rounded-lg">
            <h4 className="font-medium text-purple-800 mb-3">Economics & Social</h4>
            <ul className="text-sm space-y-2">
              <li><strong>GDP:</strong> Trend-stationary or difference-stationary</li>
              <li><strong>Inflation:</strong> ARIMA with regime switching</li>
              <li><strong>Employment:</strong> Structural time series models</li>
              <li><strong>Demographics:</strong> Long-term trend models</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Practical Challenges */}
      <section className="bg-gray-50 rounded-xl p-6">
        <h3 className="text-xl font-semibold mb-4">Practical Implementation Challenges</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-lg">
              <h4 className="font-medium text-red-700 mb-2">Common Pitfalls</h4>
              <ul className="text-sm space-y-1">
                <li>• Over-differencing leading to non-invertible MA</li>
                <li>• Ignoring structural breaks in long series</li>
                <li>• Assuming constant parameters over time</li>
                <li>• Not accounting for outliers or regime changes</li>
              </ul>
            </div>
            
            <div className="bg-white p-4 rounded-lg">
              <h4 className="font-medium text-orange-700 mb-2">Data Quality Issues</h4>
              <ul className="text-sm space-y-1">
                <li>• Missing values and irregular spacing</li>
                <li>• Calendar effects and trading days</li>
                <li>• Measurement errors and revisions</li>
                <li>• Short sample sizes for complex models</li>
              </ul>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-lg">
              <h4 className="font-medium text-green-700 mb-2">Best Practices</h4>
              <ul className="text-sm space-y-1">
                <li>• Always plot your data first</li>
                <li>• Use multiple model selection criteria</li>
                <li>• Validate with out-of-sample testing</li>
                <li>• Monitor model performance over time</li>
              </ul>
            </div>
            
            <div className="bg-white p-4 rounded-lg">
              <h4 className="font-medium text-blue-700 mb-2">Advanced Considerations</h4>
              <ul className="text-sm space-y-1">
                <li>• Multivariate models for related series</li>
                <li>• Machine learning for complex patterns</li>
                <li>• Bayesian methods for parameter uncertainty</li>
                <li>• Real-time updating and nowcasting</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}