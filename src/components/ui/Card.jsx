import React from 'react';

export function Card({ children, className = '', onClick }) {
    return (
        <div
            onClick={onClick}
            className={`light-card bg-[#1a1d27] border border-slate-700/50 rounded-xl shadow-lg ${onClick ? 'cursor-pointer hover:border-indigo-500/50 hover:bg-[#1e2133] transition-all duration-200' : ''} ${className}`}
        >
            {children}
        </div>
    );
}
