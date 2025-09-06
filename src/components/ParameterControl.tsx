import React from 'react';

interface ParameterControlProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (value: number) => void;
  description?: string;
}

export function ParameterControl({ 
  label, 
  value, 
  min, 
  max, 
  step, 
  onChange, 
  description 
}: ParameterControlProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-gray-700">{label}</label>
        <span className="text-sm font-mono bg-gray-100 px-2 py-1 rounded text-gray-800">
          {value.toFixed(step < 1 ? 2 : 0)}
        </span>
      </div>
      
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
      />
      
      {description && (
        <p className="text-xs text-gray-500">{description}</p>
      )}
    </div>
  );
}