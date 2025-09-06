import React, { useState, useEffect } from 'react';
import { InteractiveChart } from '../InteractiveChart';
import { ParameterControl } from '../ParameterControl';
import { generateARIMA } from '../../utils/timeSeriesGenerator';
import { TimeSeriesDataPoint, ARIMAParams } from '../../types';

export function ARIMAModels() {
  const [arimaData, setArimaData] = useState<TimeSeriesDataPoint[]>([]);
  const [params, setParams] = useState<ARIMAParams>({
    p: 1,
    d: 1,
    q: 1,
    phi: [0.5],
    theta: [0.3],
    sigma: 1
  });

  useEffect(() => {
    setArimaData(generateARIMA(200, params));
  }, [params]);

  const updateOrder = (type: 'p' | 'd' | 'q', value: number) => {
    setParams(prev => {
      const newParams = { ...prev, [type]: value };
      
      // Adjust phi and theta arrays based on p and q
      if (type === 'p') {
        newParams.phi = Array(value).fill(0).map((_, i) => prev.phi[i] || 0.1);
      }
      if (type === 'q') {
        newParams.theta = Array(value).fill(0).map((_, i) => prev.theta[i] || 0.1);
      }
      
      return newParams;
    });
  };

  const updateCoefficient = (type: 'phi' | 'theta', index: number, value: number) => {
    setParams(prev => ({
      ...prev,
      [type]: prev[type].map((coef, i) => i === index ? value : coef)
    }));
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">ARIMA Models</h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          ARIMA(p,d,q) models combine autoregressive and moving average components with differencing to handle non-stationary data.
        </p>
      </div>

      <section className="bg-gray-50 rounded-xl p-6">
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <InteractiveChart 
              data={arimaData}
              title={`ARIMA(${params.p},${params.d},${params.q}) Model Simulation`}
              subtitle="Combined autoregressive, integrated, and moving average components"
              color="#7c3aed"
              height={350}
            />
          </div>
          
          <div className="space-y-6">
            <div className="bg-white p-4 rounded-lg">
              <h4 className="font-semibold mb-3">ARIMA Order</h4>
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-gray-700">p (AR order)</label>
                  <select 
                    value={params.p}
                    onChange={(e) => updateOrder('p', parseInt(e.target.value))}
                    className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg text-sm"
                  >
                    {[0, 1, 2, 3].map(n => <option key={n} value={n}>{n}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">d (Differencing)</label>
                  <select 
                    value={params.d}
                    onChange={(e) => updateOrder('d', parseInt(e.target.value))}
                    className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg text-sm"
                  >
                    {[0, 1, 2].map(n => <option key={n} value={n}>{n}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">q (MA order)</label>
                  <select 
                    value={params.q}
                    onChange={(e) => updateOrder('q', parseInt(e.target.value))}
                    className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg text-sm"
                  >
                    {[0, 1, 2, 3].map(n => <option key={n} value={n}>{n}</option>)}
                  </select>
                </div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg">
              <h4 className="font-semibold mb-3">Parameters</h4>
              <div className="space-y-4">
                {params.p > 0 && (
                  <div>
                    <h5 className="text-sm font-medium text-gray-600 mb-2">AR Coefficients</h5>
                    {params.phi.map((phi, index) => (
                      <div key={index} className="mb-2">
                        <ParameterControl
                          label={`φ${index + 1}`}
                          value={phi}
                          min={-0.99}
                          max={0.99}
                          step={0.01}
                          onChange={(value) => updateCoefficient('phi', index, value)}
                          description={`AR coefficient ${index + 1}`}
                        />
                      </div>
                    ))}
                  </div>
                )}
                
                {params.q > 0 && (
                  <div>
                    <h5 className="text-sm font-medium text-gray-600 mb-2">MA Coefficients</h5>
                    {params.theta.map((theta, index) => (
                      <div key={index} className="mb-2">
                        <ParameterControl
                          label={`θ${index + 1}`}
                          value={theta}
                          min={-0.99}
                          max={0.99}
                          step={0.01}
                          onChange={(value) => updateCoefficient('theta', index, value)}
                          description={`MA coefficient ${index + 1}`}
                        />
                      </div>
                    ))}
                  </div>
                )}
                
                <ParameterControl
                  label="σ (sigma)"
                  value={params.sigma}
                  min={0.1}
                  max={3}
                  step={0.1}
                  onChange={(sigma) => setParams(prev => ({ ...prev, sigma }))}
                  description="Standard deviation of white noise"
                />
              </div>
            </div>

            <div className="bg-purple-50 p-4 rounded-lg">
              <h4 className="font-semibold text-purple-800 mb-2">ARIMA Components</h4>
              <ul className="text-sm text-purple-700 space-y-2">
                <li><strong>AR(p):</strong> Autoregressive terms</li>
                <li><strong>I(d):</strong> Integrated (differenced) d times</li>
                <li><strong>MA(q):</strong> Moving average terms</li>
                <li><strong>Purpose:</strong> Handle non-stationary data</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Mathematical Formulation */}
      <section className="bg-white border border-gray-200 rounded-xl p-6">
        <h3 className="text-xl font-semibold mb-4">Mathematical Formulation</h3>
        <div className="space-y-4">
          <div>
            <h4 className="font-medium mb-2">General ARIMA(p,d,q) Model</h4>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="font-mono text-sm mb-2">φ(B)(1-B)ᵈXₜ = θ(B)εₜ</p>
              <p className="text-xs text-gray-600">Where B is the backshift operator: BXₜ = Xₜ₋₁</p>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-2">AR Polynomial</h4>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="font-mono text-sm">φ(B) = 1 - φ₁B - φ₂B² - ... - φₚBᵖ</p>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium mb-2">MA Polynomial</h4>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="font-mono text-sm">θ(B) = 1 + θ₁B + θ₂B² + ... + θₑBᵍ</p>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium mb-2">Differencing Operator</h4>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="font-mono text-sm">(1-B)ᵈ = ∇ᵈ</p>
              <p className="text-xs text-gray-600 mt-2">
                ∇Xₜ = Xₜ - Xₜ₋₁ (first difference), ∇²Xₜ = ∇Xₜ - ∇Xₜ₋₁ (second difference)
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Model Selection Guide */}
      <section className="bg-gray-50 rounded-xl p-6">
        <h3 className="text-xl font-semibold mb-4">ARIMA Model Selection Guide</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-lg">
              <h4 className="font-medium mb-2">Step 1: Check Stationarity</h4>
              <ul className="text-sm space-y-1">
                <li>• Plot the series</li>
                <li>• Check for trends and seasonality</li>
                <li>• Apply differencing if needed</li>
                <li>• Use unit root tests (ADF, KPSS)</li>
              </ul>
            </div>
            
            <div className="bg-white p-4 rounded-lg">
              <h4 className="font-medium mb-2">Step 2: Identify AR and MA Orders</h4>
              <ul className="text-sm space-y-1">
                <li>• Plot ACF and PACF</li>
                <li>• ACF cuts off at lag q → MA(q)</li>
                <li>• PACF cuts off at lag p → AR(p)</li>
                <li>• Both decay gradually → ARMA(p,q)</li>
              </ul>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-lg">
              <h4 className="font-medium mb-2">Step 3: Estimate Parameters</h4>
              <ul className="text-sm space-y-1">
                <li>• Maximum likelihood estimation</li>
                <li>• Check significance of coefficients</li>
                <li>• Ensure stationarity and invertibility</li>
              </ul>
            </div>
            
            <div className="bg-white p-4 rounded-lg">
              <h4 className="font-medium mb-2">Step 4: Model Diagnostics</h4>
              <ul className="text-sm space-y-1">
                <li>• Residual analysis</li>
                <li>• Ljung-Box test for autocorrelation</li>
                <li>• Information criteria (AIC, BIC)</li>
                <li>• Out-of-sample forecasting</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Common ARIMA Models */}
      <section className="bg-gray-50 rounded-xl p-6">
        <h3 className="text-xl font-semibold mb-4">Common ARIMA Models</h3>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg">
            <h4 className="font-medium mb-2">Random Walk with Drift</h4>
            <p className="text-sm text-gray-600 mb-2">ARIMA(0,1,0) - Trending non-stationary series</p>
            <button 
              onClick={() => setParams({ p: 0, d: 1, q: 0, phi: [], theta: [], sigma: 1 })}
              className="px-3 py-1 bg-purple-100 text-purple-700 rounded text-sm hover:bg-purple-200"
            >
              Try this
            </button>
          </div>
          
          <div className="bg-white p-4 rounded-lg">
            <h4 className="font-medium mb-2">AR with Trend</h4>
            <p className="text-sm text-gray-600 mb-2">ARIMA(1,1,0) - Persistent trending series</p>
            <button 
              onClick={() => setParams({ p: 1, d: 1, q: 0, phi: [0.7], theta: [], sigma: 1 })}
              className="px-3 py-1 bg-purple-100 text-purple-700 rounded text-sm hover:bg-purple-200"
            >
              Try this
            </button>
          </div>
          
          <div className="bg-white p-4 rounded-lg">
            <h4 className="font-medium mb-2">ARMA after Differencing</h4>
            <p className="text-sm text-gray-600 mb-2">ARIMA(1,1,1) - Complex dependencies</p>
            <button 
              onClick={() => setParams({ p: 1, d: 1, q: 1, phi: [0.5], theta: [0.3], sigma: 1 })}
              className="px-3 py-1 bg-purple-100 text-purple-700 rounded text-sm hover:bg-purple-200"
            >
              Try this
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}