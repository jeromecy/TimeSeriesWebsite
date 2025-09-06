import React, { useState, useEffect } from 'react';
import { InteractiveChart } from '../InteractiveChart';
import { ParameterControl } from '../ParameterControl';
import { generateMA } from '../../utils/timeSeriesGenerator';
import { TimeSeriesDataPoint, MAParams } from '../../types';

export function MAModels() {
  const [maData, setMaData] = useState<TimeSeriesDataPoint[]>([]);
  const [params, setParams] = useState<MAParams>({
    theta1: 0.5,
    theta2: 0,
    theta3: 0,
    sigma: 1
  });
  const [order, setOrder] = useState(1);

  useEffect(() => {
    setMaData(generateMA(200, params));
  }, [params]);

  const updateOrder = (newOrder: number) => {
    setOrder(newOrder);
    setParams(prev => ({
      ...prev,
      theta2: newOrder >= 2 ? prev.theta2 : 0,
      theta3: newOrder >= 3 ? prev.theta3 : 0
    }));
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Moving Average (MA) Models</h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          MA models express the current value as a linear combination of current and past error terms.
        </p>
      </div>

      <section className="bg-gray-50 rounded-xl p-6">
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <InteractiveChart 
              data={maData}
              title={`MA(${order}) Model Simulation`}
              subtitle={`θ₁=${params.theta1.toFixed(2)}${order >= 2 ? `, θ₂=${params.theta2?.toFixed(2)}` : ''}${order >= 3 ? `, θ₃=${params.theta3?.toFixed(2)}` : ''}`}
              color="#059669"
              height={350}
            />
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
                        ? 'bg-emerald-600 text-white' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    MA({n})
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg">
              <h4 className="font-semibold mb-3">Parameters</h4>
              <div className="space-y-4">
                <ParameterControl
                  label="θ₁ (theta1)"
                  value={params.theta1}
                  min={-0.99}
                  max={0.99}
                  step={0.01}
                  onChange={(theta1) => setParams(prev => ({ ...prev, theta1 }))}
                  description="First-order moving average coefficient"
                />
                
                {order >= 2 && (
                  <ParameterControl
                    label="θ₂ (theta2)"
                    value={params.theta2 || 0}
                    min={-0.99}
                    max={0.99}
                    step={0.01}
                    onChange={(theta2) => setParams(prev => ({ ...prev, theta2 }))}
                    description="Second-order moving average coefficient"
                  />
                )}
                
                {order >= 3 && (
                  <ParameterControl
                    label="θ₃ (theta3)"
                    value={params.theta3 || 0}
                    min={-0.99}
                    max={0.99}
                    step={0.01}
                    onChange={(theta3) => setParams(prev => ({ ...prev, theta3 }))}
                    description="Third-order moving average coefficient"
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

            <div className="bg-emerald-50 p-4 rounded-lg">
              <h4 className="font-semibold text-emerald-800 mb-2">MA Model Properties</h4>
              <ul className="text-sm text-emerald-700 space-y-2">
                <li><strong>Always Stationary:</strong> MA models are inherently stationary</li>
                <li><strong>Finite Memory:</strong> Only depends on recent errors</li>
                <li><strong>Invertibility:</strong> Can be written as infinite AR</li>
                <li><strong>Short-term Dependence:</strong> Limited autocorrelation</li>
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
            <h4 className="font-medium mb-2">MA(1) Model</h4>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="font-mono text-sm mb-2">X(t) = ε(t) + θ₁ε(t-1)</p>
              <p className="text-xs text-gray-600">Where ε(t) ~ N(0, σ²)</p>
            </div>
            <div className="mt-3 text-sm space-y-1">
              <p><strong>Mean:</strong> E[X(t)] = 0</p>
              <p><strong>Variance:</strong> Var[X(t)] = σ²(1 + θ₁²)</p>
              <p><strong>Autocovariance:</strong> γ(1) = θ₁σ², γ(k) = 0 for k {'>'} 1</p>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium mb-2">General MA(q) Model</h4>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="font-mono text-sm">X(t) = ε(t) + θ₁ε(t-1) + θ₂ε(t-2) + ... + θₑε(t-q)</p>
            </div>
            <div className="mt-3 text-sm space-y-1">
              <p><strong>Variance:</strong> σ²(1 + θ₁² + θ₂² + ... + θₑ²)</p>
              <p><strong>Invertibility:</strong> All roots of characteristic equation outside unit circle</p>
              <p><strong>ACF:</strong> Cuts off after lag q</p>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison with AR */}
      <section className="bg-gray-50 rounded-xl p-6">
        <h3 className="text-xl font-semibold mb-4">MA vs AR Models</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white p-4 rounded-lg">
            <h4 className="font-medium text-emerald-700 mb-3">Moving Average (MA)</h4>
            <ul className="text-sm space-y-2">
              <li>✓ Always stationary</li>
              <li>✓ Finite memory (q lags)</li>
              <li>✓ Good for modeling short-term dependencies</li>
              <li>✓ ACF cuts off after lag q</li>
              <li>• PACF decays exponentially</li>
            </ul>
          </div>
          
          <div className="bg-white p-4 rounded-lg">
            <h4 className="font-medium text-blue-700 mb-3">Autoregressive (AR)</h4>
            <ul className="text-sm space-y-2">
              <li>• Requires stationarity conditions</li>
              <li>• Infinite memory (exponential decay)</li>
              <li>• Good for modeling persistence</li>
              <li>• ACF decays exponentially</li>
              <li>✓ PACF cuts off after lag p</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Examples */}
      <section className="bg-gray-50 rounded-xl p-6">
        <h3 className="text-xl font-semibold mb-4">Common MA Model Behaviors</h3>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg">
            <h4 className="font-medium mb-2">Positive MA (θ₁ = 0.7)</h4>
            <p className="text-sm text-gray-600">Smooth series with positive correlation between consecutive errors.</p>
            <button 
              onClick={() => setParams({ theta1: 0.7, theta2: 0, theta3: 0, sigma: 1 })}
              className="mt-2 px-3 py-1 bg-emerald-100 text-emerald-700 rounded text-sm hover:bg-emerald-200"
            >
              Try this
            </button>
          </div>
          
          <div className="bg-white p-4 rounded-lg">
            <h4 className="font-medium mb-2">Negative MA (θ₁ = -0.7)</h4>
            <p className="text-sm text-gray-600">More volatile series with alternating patterns.</p>
            <button 
              onClick={() => setParams({ theta1: -0.7, theta2: 0, theta3: 0, sigma: 1 })}
              className="mt-2 px-3 py-1 bg-emerald-100 text-emerald-700 rounded text-sm hover:bg-emerald-200"
            >
              Try this
            </button>
          </div>
          
          <div className="bg-white p-4 rounded-lg">
            <h4 className="font-medium mb-2">MA(2) Model</h4>
            <p className="text-sm text-gray-600">More complex patterns with two-period memory.</p>
            <button 
              onClick={() => {
                updateOrder(2);
                setParams({ theta1: 0.5, theta2: 0.3, theta3: 0, sigma: 1 });
              }}
              className="mt-2 px-3 py-1 bg-emerald-100 text-emerald-700 rounded text-sm hover:bg-emerald-200"
            >
              Try this
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}