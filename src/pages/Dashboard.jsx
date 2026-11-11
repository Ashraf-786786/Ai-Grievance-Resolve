import React from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { FileText, AlertTriangle, Clock, CheckCircle2 } from 'lucide-react';
import { StatCard } from '../components/ui/StatCard';
import { Card } from '../components/ui/Card';
import { stats, dailyComplaintsData, resolutionRateData, complaints } from '../data/mockData';
import { PriorityBadge, StatusBadge } from '../components/ui/Badge';

const TooltipStyle = {
    contentStyle: { backgroundColor: '#1a1d27', border: '1px solid #334155', borderRadius: '8px', color: '#e2e8f0' },
    labelStyle: { color: '#94a3b8' },
};

export default function Dashboard({ onSelectComplaint }) {
    const recent = complaints.slice(0, 5);

    return (
        <div className="space-y-6">
            {/* Stat Cards */}
            <div className="grid grid-cols-4 gap-4">
                <StatCard title="Total Complaints" value={stats.total} icon={FileText} color="#6366f1" change={12} changeLabel="vs last week" />
                <StatCard title="High Priority" value={stats.highPriority} icon={AlertTriangle} color="#ef4444" change={-3} changeLabel="vs last week" />
                <StatCard title="Pending Review" value={stats.pendingReview} icon={Clock} color="#f59e0b" change={8} changeLabel="vs last week" />
                <StatCard title="Auto-Resolved" value={stats.autoResolved} icon={CheckCircle2} color="#22c55e" change={21} changeLabel="vs last week" />
            </div>

            {/* Charts */}
            <div className="grid grid-cols-2 gap-4">
                <Card className="p-5">
                    <h3 className="text-slate-300 font-semibold mb-4 text-sm">Daily Complaints (Last 7 Days)</h3>
                    <ResponsiveContainer width="100%" height={200}>
                        <BarChart data={dailyComplaintsData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                            <XAxis dataKey="day" tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
                            <YAxis tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
                            <Tooltip {...TooltipStyle} />
                            <Bar dataKey="count" fill="#6366f1" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </Card>

                <Card className="p-5">
                    <h3 className="text-slate-300 font-semibold mb-4 text-sm">Resolution Rate (%) — Last 7 Days</h3>
                    <ResponsiveContainer width="100%" height={200}>
                        <LineChart data={resolutionRateData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                            <XAxis dataKey="day" tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
                            <YAxis domain={[50, 100]} tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
                            <Tooltip {...TooltipStyle} />
                            <Line type="monotone" dataKey="rate" stroke="#22c55e" strokeWidth={2} dot={{ fill: '#22c55e', r: 3 }} />
                        </LineChart>
                    </ResponsiveContainer>
                </Card>
            </div>

            {/* Recent Complaints */}
            <Card>
                <div className="px-5 py-4 border-b border-slate-800">
                    <h3 className="text-slate-300 font-semibold text-sm">Recent Complaints</h3>
                </div>
                <div className="divide-y divide-slate-800">
                    {recent.map(c => (
                        <div
                            key={c.id}
                            onClick={() => onSelectComplaint(c)}
                            className="flex items-center gap-4 px-5 py-3 hover:bg-slate-800/30 cursor-pointer transition-colors"
                        >
                            <span className="text-xs text-slate-500 font-mono w-20">{c.id}</span>
                            <span className="flex-1 text-sm text-slate-300 truncate">{c.title}</span>
                            <PriorityBadge priority={c.priority} />
                            <StatusBadge status={c.status} />
                        </div>
                    ))}
                </div>
            </Card>
        </div>
    );
}
