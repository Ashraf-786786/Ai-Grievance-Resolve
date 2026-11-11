import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

export function StatCard({ title, value, icon: Icon, color = '#6366f1', change, changeLabel }) {
    const isPositive = change >= 0;
    return (
        <div className="light-card bg-[#1a1d27] border border-slate-700/50 rounded-xl p-5 flex flex-col gap-3 shadow-lg">
            <div className="flex justify-between items-start">
                <div>
                    <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">{title}</p>
                    <p className="text-3xl font-bold text-white mt-1">{value}</p>
                </div>
                <div className="p-2.5 rounded-xl" style={{ backgroundColor: `${color}20` }}>
                    <Icon size={22} style={{ color }} />
                </div>
            </div>
            {change !== undefined && (
                <div className="flex items-center gap-1.5 text-xs">
                    {isPositive ? <TrendingUp size={13} className="text-emerald-400" /> : <TrendingDown size={13} className="text-red-400" />}
                    <span className={isPositive ? 'text-emerald-400' : 'text-red-400'}>
                        {isPositive ? '+' : ''}{change}%
                    </span>
                    <span className="text-slate-500">{changeLabel || 'vs last week'}</span>
                </div>
            )}
        </div>
    );
}
