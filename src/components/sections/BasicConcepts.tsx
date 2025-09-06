import React, { useState, useEffect } from 'react';
import { InteractiveChart } from '../InteractiveChart';
import { ParameterControl } from '../ParameterControl';
import { generateWhiteNoise, generateTrendingSeries, generateSeasonalSeries } from '../../utils/timeSeriesGenerator';
import { TimeSeriesDataPoint } from '../../types';

export function BasicConcepts() {
  const [whiteNoiseData, setWhiteNoiseData] = useState<TimeSeriesDataPoint[]>([]);
  const [trendData, setTrendData] = useState<TimeSeriesDataPoint[]>([]);
  const [seasonalData, setSeasonalData] = useState<TimeSeriesDataPoint[]>([]);
  
  const [noiseParams, setNoiseParams] = useState({ sigma: 1 });
  const [trendParams, setTrendParams] = useState({ trend: 0.1, noise: 1 });
  const [seasonalParams, setSeasonalParams] = useState({ amplitude: 2, period: 12, noise: 0.5 });

  useEffect(() => {
    const noise = generateWhiteNoise(100, noiseParams.sigma);
    setWhiteNoiseData(noise.map((value, index) => ({ time: index, value: parseFloat(value.toFixed(3)) })));
  }, [noiseParams]);

  useEffect(() => {
    setTrendData(generateTrendingSeries(100, trendParams.trend, trendParams.noise));
  }, [trendParams]);

  useEffect(() => {
    setSeasonalData(generateSeasonalSeries(100, seasonalParams.amplitude, seasonalParams.period, seasonalParams.noise));
  }, [seasonalParams]);

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Basic Time Series Concepts</h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Understanding the fundamental components of time series data: trend, seasonality, and random variation.
        </p>
      </div>

      {/* White Noise */}
      <section className="bg-gray-50 rounded-xl p-6">
        <h3 className="text-2xl font-semibold mb-4">White Noise</h3>
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <InteractiveChart 
              data={whiteNoiseData}
              title="White Noise Process"
              subtitle="Independent, identically distributed random variables"
              color="#dc2626"
              showMean={true}
            />
          </div>
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-lg">
              <h4 className="font-semibold mb-3">Parameters</h4>
              <ParameterControl
                label="Standard Deviation (σ)"
                value={noiseParams.sigma}
                min={0.1}
                max={3}
                step={0.1}
                onChange={(sigma) => setNoiseParams({ sigma })}
                description="Controls the variability of the noise"
              />
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-800 mb-2">Key Properties</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Mean = 0</li>
                <li>• Constant variance = σ²</li>
                <li>• No autocorrelation</li>
                <li>• Unpredictable</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Trend */}
      <section className="bg-gray-50 rounded-xl p-6">
        <h3 className="text-2xl font-semibold mb-4">Trend Component</h3>
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <InteractiveChart 
              data={trendData}
              title="Linear Trend with Noise"
              subtitle="Systematic increase or decrease over time"
              color="#059669"
            />
          </div>
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-lg">
              <h4 className="font-semibold mb-3">Parameters</h4>
              <div className="space-y-4">
                <ParameterControl
                  label="Trend Slope"
                  value={trendParams.trend}
                  min={-0.5}
                  max={0.5}
                  step={0.01}
                  onChange={(trend) => setTrendParams(prev => ({ ...prev, trend }))}
                  description="Rate of change per time unit"
                />
                <ParameterControl
                  label="Noise Level"
                  value={trendParams.noise}
                  min={0}
                  max={3}
                  step={0.1}
                  onChange={(noise) => setTrendParams(prev => ({ ...prev, noise }))}
                  description="Random variation around trend"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Seasonality */}
      <section className="bg-gray-50 rounded-xl p-6">
        <h3 className="text-2xl font-semibold mb-4">Seasonal Component</h3>
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <InteractiveChart 
              data={seasonalData}
              title="Seasonal Pattern"
              subtitle="Repeating pattern over fixed periods"
              color="#7c3aed"
            />
          </div>
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-lg">
              <h4 className="font-semibold mb-3">Parameters</h4>
              <div className="space-y-4">
                <ParameterControl
                  label="Amplitude"
                  value={seasonalParams.amplitude}
                  min={0.5}
                  max={5}
                  step={0.1}
                  onChange={(amplitude) => setSeasonalParams(prev => ({ ...prev, amplitude }))}
                  description="Height of seasonal peaks"
                />
                <ParameterControl
                  label="Period"
                  value={seasonalParams.period}
                  min={4}
                  max={24}
                  step={1}
                  onChange={(period) => setSeasonalParams(prev => ({ ...prev, period }))}
                  description="Length of one seasonal cycle"
                />
                <ParameterControl
                  label="Noise"
                  value={seasonalParams.noise}
                  min={0}
                  max={2}
                  step={0.1}
                  onChange={(noise) => setSeasonalParams(prev => ({ ...prev, noise }))}
                  description="Random variation in pattern"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mathematical Foundation */}
      <section className="bg-white border border-gray-200 rounded-xl p-6">
        <h3 className="text-xl font-semibold mb-4">Mathematical Foundation</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium mb-2">Decomposition Model</h4>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="font-mono text-sm">Y(t) = Trend(t) + Seasonal(t) + Noise(t)</p>
            </div>
            <p className="text-sm text-gray-600 mt-2">
              Additive decomposition where components are independent
            </p>
          </div>
          <div>
            <h4 className="font-medium mb-2">Stationarity</h4>
            <div className="bg-gray-50 p-4 rounded-lg text-sm">
              <p>A time series is stationary if:</p>
              <ul className="mt-2 space-y-1">
                <li>• Constant mean over time</li>
                <li>• Constant variance over time</li>
                <li>• Autocovariance depends only on lag</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}