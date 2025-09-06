import React, { useState, useEffect } from 'react';
import { InteractiveChart } from '../InteractiveChart';
import { ParameterControl } from '../ParameterControl';
import { generateAR } from '../../utils/timeSeriesGenerator';
import { TimeSeriesDataPoint, ARParams } from '../../types';

export function ARModels() {
  const [arData, setArData] = useState<TimeSeriesDataPoint[]>([]);
  const [params, setParams] = useState<ARParams>({
    phi1: 0.7,
    phi2: 0,
    phi3: 0,
    sigma: 1
  });
  const [order, setOrder] = useState(1);

  useEffect(() => {
    setArData(generateAR(200, params));
  }, [params]);

  const updateOrder = (newOrder: number) => {
    setOrder(newOrder);
    setParams(prev => ({
      ...prev,
      phi2: newOrder >= 2 ? prev.phi2 : 0,
      phi3: newOrder >= 3 ? prev.phi3 : 0
    }));
  };

  const isStationary = () => {
    if (order === 1) return Math.abs(params.phi1) < 1;
    if (order === 2) {
      const { phi1, phi2 } = params;
      return phi1 + phi2 < 1 && phi2 - phi1 < 1 && Math.abs(phi2) < 1;
    }
    return true; // Simplified for AR(3)
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Autoregressive (AR) Models</h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          AR models predict future values based on past values. Explore how different parameters affect the time series behavior.
        </p>
      </div>

      <section className="bg-gray-50 rounded-xl p-6">
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <InteractiveChart 
              data={arData}
              title={`AR(${order}) Model Simulation`}
              subtitle={`φ₁=${params.phi1.toFixed(2)}${order >= 2 ? `, φ₂=${params.phi2.toFixed(2)}` : ''}${order >= 3 ? `, φ₃=${params.phi3.toFixed(2)}` : ''}`}
              color={isStationary() ? '#2563eb' : '#dc2626'}
              height={350}
            />
            <div className={`mt-4 p-3 rounded-lg ${isStationary() ? 'bg-green-50' : 'bg-red-50'}`}>
              <p className={`text-sm font-medium ${isStationary() ? 'text-green-800' : 'text-red-800'}`}>
                {isStationary() ? '✓ Stationary Process' : '⚠ Non-Stationary Process'}
              </p>
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="bg-white p-4 rounded-lg">
              <h4 className="font-semibold mb-3">Model Order</h4>
              <div className="flex space-x-2">
                {[1, 2, 3].map(n => (
                  <button
                    key={n}
                    onClick={() => updateOrder(n)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium ${
                      order === n 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    AR({n})
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg">
              <h4 className="font-semibold mb-3">Parameters</h4>
              <div className="space-y-4">
                <ParameterControl
                  label="φ₁ (phi1)"
                  value={params.phi1}
                  min={-0.99}
                  max={0.99}
                  step={0.01}
                  onChange={(phi1) => setParams(prev => ({ ...prev, phi1 }))}
                  description="First-order autoregressive coefficient"
                />
                
                {order >= 2 && (
                  <ParameterControl
                    label="φ₂ (phi2)"
                    value={params.phi2 || 0}
                    min={-0.99}
                    max={0.99}
                    step={0.01}
                    onChange={(phi2) => setParams(prev => ({ ...prev, phi2 }))}
                    description="Second-order autoregressive coefficient"
                  />
                )}
                
                {order >= 3 && (
                  <ParameterControl
                    label="φ₃ (phi3)"
                    value={params.phi3 || 0}
                    min={-0.99}
                    max={0.99}
                    step={0.01}
                    onChange={(phi3) => setParams(prev => ({ ...prev, phi3 }))}
                    description="Third-order autoregressive coefficient"
                  />
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

            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-800 mb-2">AR Model Properties</h4>
              <ul className="text-sm text-blue-700 space-y-2">
                <li><strong>Memory:</strong> Values depend on past observations</li>
                <li><strong>Stationarity:</strong> Requires |φ| &lt; 1 for AR(1)</li>
                <li><strong>Autocorrelation:</strong> Exponential decay</li>
                <li><strong>Predictability:</strong> Short-term forecasting</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Mathematical Formulation */}
      <section className="bg-white border border-gray-200 rounded-xl p-6">
        <h3 className="text-xl font-semibold mb-4">Mathematical Formulation</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium mb-2">AR(1) Model</h4>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="font-mono text-sm mb-2">X(t) = φ₁X(t-1) + ε(t)</p>
              <p className="text-xs text-gray-600">Where ε(t) ~ N(0, σ²)</p>
            </div>
            <div className="mt-3 text-sm space-y-1">
              <p><strong>Mean:</strong> E[X(t)] = 0 (if stationary)</p>
              <p><strong>Variance:</strong> Var[X(t)] = σ²/(1-φ₁²)</p>
              <p><strong>Stationarity:</strong> |φ₁| &lt; 1</p>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium mb-2">General AR(p) Model</h4>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="font-mono text-sm">X(t) = φ₁X(t-1) + φ₂X(t-2) + ... + φₚX(t-p) + ε(t)</p>
            </div>
            <div className="mt-3 text-sm space-y-1">
              <p><strong>Characteristic Equation:</strong></p>
              <p className="font-mono text-xs">1 - φ₁z - φ₂z² - ... - φₚzᵖ = 0</p>
              <p><strong>Stationarity:</strong> All roots outside unit circle</p>
            </div>
          </div>
        </div>
      </section>

      {/* Examples */}
      <section className="bg-gray-50 rounded-xl p-6">
        <h3 className="text-xl font-semibold mb-4">Common AR Model Behaviors</h3>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg">
            <h4 className="font-medium mb-2">Persistent (φ₁ = 0.8)</h4>
            <p className="text-sm text-gray-600">High positive correlation with past values. Smooth, trending behavior.</p>
            <button 
              onClick={() => setParams({ phi1: 0.8, phi2: 0, phi3: 0, sigma: 1 })}
              className="mt-2 px-3 py-1 bg-blue-100 text-blue-700 rounded text-sm hover:bg-blue-200"
            >
              Try this
            </button>
          </div>
          
          <div className="bg-white p-4 rounded-lg">
            <h4 className="font-medium mb-2">Oscillating (φ₁ = -0.6)</h4>
            <p className="text-sm text-gray-600">Negative correlation creates alternating up-down pattern.</p>
            <button 
              onClick={() => setParams({ phi1: -0.6, phi2: 0, phi3: 0, sigma: 1 })}
              className="mt-2 px-3 py-1 bg-blue-100 text-blue-700 rounded text-sm hover:bg-blue-200"
            >
              Try this
            </button>
          </div>
          
          <div className="bg-white p-4 rounded-lg">
            <h4 className="font-medium mb-2">Near Random Walk (φ₁ = 0.99)</h4>
            <p className="text-sm text-gray-600">Almost non-stationary. Very persistent trends.</p>
            <button 
              onClick={() => setParams({ phi1: 0.99, phi2: 0, phi3: 0, sigma: 1 })}
              className="mt-2 px-3 py-1 bg-red-100 text-red-700 rounded text-sm hover:bg-red-200"
            >
              Try this
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}