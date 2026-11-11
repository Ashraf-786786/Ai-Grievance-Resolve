import React from 'react';

export function ConfidenceMeter({ value }) {
    // value 0..1
    const pct = Math.round(value * 100);
    const color = pct >= 80 ? '#22c55e' : pct >= 55 ? '#eab308' : '#ef4444';
    const label = pct >= 80 ? 'High' : pct >= 55 ? 'Moderate' : 'Low';

    return (
        <div className="space-y-1.5">
            <div className="flex justify-between items-center text-xs">
                <span className="text-slate-400">AI Confidence</span>
                <span className="font-bold" style={{ color }}>{label} ({pct}%)</span>
            </div>
            <div className="h-2 rounded-full bg-slate-700 overflow-hidden">
                <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{ width: `${pct}%`, backgroundColor: color }}
                />
            </div>
            <div className="flex justify-between text-xs text-slate-600">
                <span>Low</span>
                <span>Moderate</span>
                <span>High</span>
            </div>
        </div>
    );
}
