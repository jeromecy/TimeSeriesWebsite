import React, { useState, useEffect } from 'react';
import { InteractiveChart } from '../InteractiveChart';
import { generateAR } from '../../utils/timeSeriesGenerator';
import { TimeSeriesDataPoint } from '../../types';

export function AdvancedTopics() {
  const [residualData, setResidualData] = useState<TimeSeriesDataPoint[]>([]);
  const [acfData, setAcfData] = useState<TimeSeriesDataPoint[]>([]);
  
  useEffect(() => {
    // Generate some residuals for diagnostic demonstration
    const residuals = Array(50).fill(0).map((_, i) => ({
      time: i,
      value: parseFloat((Math.random() - 0.5).toFixed(3))
    }));
    setResidualData(residuals);

    // Generate ACF data
    const acf = Array(20).fill(0).map((_, i) => ({
      time: i,
      value: parseFloat((Math.exp(-i * 0.3) * Math.cos(i * 0.5) + (Math.random() - 0.5) * 0.1).toFixed(3))
    }));
    setAcfData(acf);
  }, []);

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Advanced Topics & Diagnostics</h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Advanced techniques for model validation, diagnostics, and extensions beyond basic ARIMA models.
        </p>
      </div>

      {/* Model Diagnostics */}
      <section className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl p-6">
        <h3 className="text-2xl font-semibold mb-4">Model Diagnostics</h3>
        
        <div className="grid lg:grid-cols-2 gap-6">
          <div>
            <InteractiveChart 
              data={residualData}
              title="Residual Analysis"
              subtitle="Standardized residuals from fitted ARIMA model"
              color="#dc2626"
              height={250}
              showMean={true}
            />
          </div>
          
          <div>
            <InteractiveChart 
              data={acfData}
              title="ACF of Residuals"
              subtitle="Autocorrelation function of model residuals"
              color="#7c3aed"
              height={250}
            />
          </div>
        </div>

        <div className="mt-6 grid md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg">
            <h4 className="font-medium mb-2">Residual Tests</h4>
            <ul className="text-sm space-y-1">
              <li>• Ljung-Box test for autocorrelation</li>
              <li>• Jarque-Bera test for normality</li>
              <li>• ARCH test for heteroscedasticity</li>
              <li>• Runs test for randomness</li>
            </ul>
          </div>
          
          <div className="bg-white p-4 rounded-lg">
            <h4 className="font-medium mb-2">Goodness of Fit</h4>
            <ul className="text-sm space-y-1">
              <li>• Akaike Information Criterion (AIC)</li>
              <li>• Bayesian Information Criterion (BIC)</li>
              <li>• Hannan-Quinn Criterion (HQC)</li>
              <li>• Root Mean Square Error (RMSE)</li>
            </ul>
          </div>
          
          <div className="bg-white p-4 rounded-lg">
            <h4 className="font-medium mb-2">Model Validation</h4>
            <ul className="text-sm space-y-1">
              <li>• Cross-validation techniques</li>
              <li>• Out-of-sample forecasting</li>
              <li>• Rolling window validation</li>
              <li>• Diebold-Mariano test</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Advanced Models */}
      <section className="bg-gray-50 rounded-xl p-6">
        <h3 className="text-2xl font-semibold mb-4">Extensions Beyond ARIMA</h3>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-lg border-l-4 border-blue-500">
              <h4 className="font-semibold text-blue-800 mb-2">GARCH Models</h4>
              <p className="text-sm text-gray-600 mb-2">
                Generalized Autoregressive Conditional Heteroscedasticity for modeling volatility clustering.
              </p>
              <div className="bg-blue-50 p-3 rounded text-sm">
                <p className="font-mono">σₜ² = α₀ + α₁εₜ₋₁² + β₁σₜ₋₁²</p>
              </div>
              <p className="text-xs text-gray-500 mt-2">Common in financial time series analysis</p>
            </div>
            
            <div className="bg-white p-4 rounded-lg border-l-4 border-emerald-500">
              <h4 className="font-semibold text-emerald-800 mb-2">State Space Models</h4>
              <p className="text-sm text-gray-600 mb-2">
                Flexible framework allowing for time-varying parameters and unobserved components.
              </p>
              <div className="bg-emerald-50 p-3 rounded text-sm">
                <p>State equation: xₜ = Fₜxₜ₋₁ + vₜ</p>
                <p>Observation: yₜ = Hₓₜ + wₜ</p>
              </div>
              <p className="text-xs text-gray-500 mt-2">Kalman filter for estimation</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-lg border-l-4 border-purple-500">
              <h4 className="font-semibold text-purple-800 mb-2">Vector Autoregression (VAR)</h4>
              <p className="text-sm text-gray-600 mb-2">
                Multivariate extension capturing interactions between multiple time series.
              </p>
              <div className="bg-purple-50 p-3 rounded text-sm">
                <p className="font-mono">Yₜ = A₁Yₜ₋₁ + ... + AₚYₜ₋ₚ + εₜ</p>
              </div>
              <p className="text-xs text-gray-500 mt-2">Granger causality and impulse responses</p>
            </div>
            
            <div className="bg-white p-4 rounded-lg border-l-4 border-orange-500">
              <h4 className="font-semibold text-orange-800 mb-2">Threshold Models</h4>
              <p className="text-sm text-gray-600 mb-2">
                Non-linear models with regime-switching behavior based on threshold values.
              </p>
              <div className="bg-orange-50 p-3 rounded text-sm">
                <p>Different dynamics when series crosses threshold</p>
              </div>
              <p className="text-xs text-gray-500 mt-2">Useful for business cycle analysis</p>
            </div>
          </div>
        </div>
      </section>

      {/* Forecasting Techniques */}
      <section className="bg-white border border-gray-200 rounded-xl p-6">
        <h3 className="text-xl font-semibold mb-4">Advanced Forecasting Techniques</h3>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium mb-3">Traditional Methods</h4>
            <div className="space-y-3">
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="font-medium text-sm">Exponential Smoothing</p>
                <p className="text-xs text-gray-600">Holt-Winters for trend and seasonality</p>
              </div>
              
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="font-medium text-sm">Box-Jenkins Methodology</p>
                <p className="text-xs text-gray-600">Systematic ARIMA model building</p>
              </div>
              
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="font-medium text-sm">Structural Time Series</p>
                <p className="text-xs text-gray-600">Unobserved components modeling</p>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium mb-3">Modern Approaches</h4>
            <div className="space-y-3">
              <div className="p-3 bg-blue-50 rounded-lg">
                <p className="font-medium text-sm">Machine Learning</p>
                <p className="text-xs text-gray-600">Random forests, neural networks, LSTM</p>
              </div>
              
              <div className="p-3 bg-blue-50 rounded-lg">
                <p className="font-medium text-sm">Ensemble Methods</p>
                <p className="text-xs text-gray-600">Combining multiple forecasting models</p>
              </div>
              
              <div className="p-3 bg-blue-50 rounded-lg">
                <p className="font-medium text-sm">Bayesian Approaches</p>
                <p className="text-xs text-gray-600">Dynamic linear models, MCMC</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Practical Implementation */}
      <section className="bg-gradient-to-r from-teal-50 to-cyan-50 rounded-xl p-6">
        <h3 className="text-xl font-semibold mb-4">Practical Implementation Guide</h3>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white p-4 rounded-lg">
            <h4 className="font-medium mb-3">Software Tools</h4>
            <div className="space-y-2">
              <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                <span className="text-sm font-medium">R</span>
                <span className="text-xs text-gray-600">forecast, vars, rugarch packages</span>
              </div>
              
              <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                <span className="text-sm font-medium">Python</span>
                <span className="text-xs text-gray-600">statsmodels, arch, prophet</span>
              </div>
              
              <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                <span className="text-sm font-medium">SAS</span>
                <span className="text-xs text-gray-600">PROC ARIMA, PROC VARMAX</span>
              </div>
              
              <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                <span className="text-sm font-medium">MATLAB</span>
                <span className="text-xs text-gray-600">Econometrics Toolbox</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg">
            <h4 className="font-medium mb-3">Model Building Workflow</h4>
            <div className="space-y-2">
              <div className="flex items-center p-2 bg-teal-50 rounded">
                <span className="w-6 h-6 bg-teal-600 text-white text-xs rounded-full flex items-center justify-center mr-2">1</span>
                <span className="text-sm">Data exploration and visualization</span>
              </div>
              
              <div className="flex items-center p-2 bg-teal-50 rounded">
                <span className="w-6 h-6 bg-teal-600 text-white text-xs rounded-full flex items-center justify-center mr-2">2</span>
                <span className="text-sm">Stationarity testing and transformation</span>
              </div>
              
              <div className="flex items-center p-2 bg-teal-50 rounded">
                <span className="w-6 h-6 bg-teal-600 text-white text-xs rounded-full flex items-center justify-center mr-2">3</span>
                <span className="text-sm">Model identification and estimation</span>
              </div>
              
              <div className="flex items-center p-2 bg-teal-50 rounded">
                <span className="w-6 h-6 bg-teal-600 text-white text-xs rounded-full flex items-center justify-center mr-2">4</span>
                <span className="text-sm">Diagnostic checking and validation</span>
              </div>
              
              <div className="flex items-center p-2 bg-teal-50 rounded">
                <span className="w-6 h-6 bg-teal-600 text-white text-xs rounded-full flex items-center justify-center mr-2">5</span>
                <span className="text-sm">Forecasting and confidence intervals</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Research Frontiers */}
      <section className="bg-gray-50 rounded-xl p-6">
        <h3 className="text-xl font-semibold mb-4">Current Research Frontiers</h3>
        
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg">
            <h4 className="font-medium text-indigo-700 mb-2">High-Dimensional Time Series</h4>
            <p className="text-sm text-gray-600">
              Factor models, dynamic factor analysis, and sparse methods for large datasets.
            </p>
          </div>
          
          <div className="bg-white p-4 rounded-lg">
            <h4 className="font-medium text-emerald-700 mb-2">Real-Time Analytics</h4>
            <p className="text-sm text-gray-600">
              Nowcasting, mixed-frequency data, and streaming time series analysis.
            </p>
          </div>
          
          <div className="bg-white p-4 rounded-lg">
            <h4 className="font-medium text-purple-700 mb-2">Machine Learning Integration</h4>
            <p className="text-sm text-gray-600">
              Combining traditional time series with deep learning and AI methods.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}