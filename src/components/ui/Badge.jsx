import React from 'react';

const priorityColors = {
    Critical: 'bg-red-500/20 text-red-400 border border-red-500/30',
    High: 'bg-orange-500/20 text-orange-400 border border-orange-500/30',
    Medium: 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30',
    Low: 'bg-green-500/20 text-green-400 border border-green-500/30',
};

const statusColors = {
    'Human Review': 'bg-purple-500/20 text-purple-400 border border-purple-500/30',
    'Auto': 'bg-blue-500/20 text-blue-400 border border-blue-500/30',
    'Resolved': 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30',
};

const categoryColors = {
    default: 'bg-slate-700/50 text-slate-300 border border-slate-600/30',
};

export function PriorityBadge({ priority }) {
    return (
        <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${priorityColors[priority] || categoryColors.default}`}>
            {priority}
        </span>
    );
}

export function StatusBadge({ status }) {
    return (
        <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${statusColors[status] || categoryColors.default}`}>
            {status}
        </span>
    );
}

export function CategoryBadge({ category }) {
    return (
        <span className={`px-2 py-0.5 rounded-md text-xs font-medium ${categoryColors.default}`}>
            {category}
        </span>
    );
}
