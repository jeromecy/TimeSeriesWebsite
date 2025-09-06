import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { TimeSeriesDataPoint } from '../types';

interface InteractiveChartProps {
  data: TimeSeriesDataPoint[];
  title: string;
  subtitle?: string;
  color?: string;
  showMean?: boolean;
  height?: number;
}

export function InteractiveChart({ 
  data, 
  title, 
  subtitle, 
  color = '#2563eb', 
  showMean = false,
  height = 300 
}: InteractiveChartProps) {
  const mean = showMean ? data.reduce((sum, point) => sum + point.value, 0) / data.length : 0;

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        {subtitle && <p className="text-sm text-gray-600 mt-1">{subtitle}</p>}
      </div>
      
      <ResponsiveContainer width="100%" height={height}>
        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis 
            dataKey="time" 
            stroke="#6b7280"
            fontSize={12}
            tickFormatter={(value) => `t${value}`}
          />
          <YAxis 
            stroke="#6b7280"
            fontSize={12}
            tickFormatter={(value) => value.toFixed(2)}
          />
          <Tooltip 
            formatter={(value: number) => [value.toFixed(3), 'Value']}
            labelFormatter={(label) => `Time: ${label}`}
            contentStyle={{
              backgroundColor: '#f9fafb',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              fontSize: '12px'
            }}
          />
          {showMean && (
            <ReferenceLine 
              y={mean} 
              stroke="#dc2626" 
              strokeDasharray="5 5"
              label={{ value: `Mean: ${mean.toFixed(3)}`, position: 'topRight' }}
            />
          )}
          <Line 
            type="monotone" 
            dataKey="value" 
            stroke={color}
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4, fill: color }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}