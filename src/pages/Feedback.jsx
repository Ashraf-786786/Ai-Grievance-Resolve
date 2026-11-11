import React from 'react';
import {
    BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid,
    Tooltip, ResponsiveContainer, Legend
} from 'recharts';
import { Card } from '../components/ui/Card';
import { agentAccuracy, aiVsHumanData, overrideFrequency } from '../data/mockData';

const tt = {
    contentStyle: { backgroundColor: '#1a1d27', border: '1px solid #334155', borderRadius: '8px', color: '#e2e8f0' },
    labelStyle: { color: '#94a3b8' },
};

function TrustScore({ agent, accuracy }) {
    const color = accuracy >= 93 ? '#22c55e' : accuracy >= 88 ? '#f59e0b' : '#ef4444';
    return (
        <div className="flex items-center gap-3">
            <span className="text-slate-300 text-sm w-24">{agent}</span>
            <div className="flex-1 h-2 bg-slate-700 rounded-full overflow-hidden">
                <div className="h-full rounded-full transition-all" style={{ width: `${accuracy}%`, backgroundColor: color }} />
            </div>
            <span className="text-sm font-bold w-12 text-right" style={{ color }}>{accuracy}%</span>
        </div>
    );
}

export default function Feedback() {
    const totalOverrides = agentAccuracy.reduce((s, a) => s + a.overrides, 0);
    const avgAccuracy = (agentAccuracy.reduce((s, a) => s + a.accuracy, 0) / agentAccuracy.length).toFixed(1);

    return (
        <div className="space-y-5">
            {/* KPI Row */}
            <div className="grid grid-cols-3 gap-4">
                {[
                    { label: 'Total Overrides (this month)', value: totalOverrides, color: '#ef4444' },
                    { label: 'Average Agent Accuracy', value: `${avgAccuracy}%`, color: '#22c55e' },
                    { label: 'Overall Trust Score', value: '91.2', color: '#6366f1' },
                ].map(m => (
                    <Card key={m.label} className="p-5">
                        <p className="text-xs text-slate-500 uppercase tracking-wider mb-2">{m.label}</p>
                        <p className="text-3xl font-bold" style={{ color: m.color }}>{m.value}</p>
                    </Card>
                ))}
            </div>

            {/* Agent Accuracy */}
            <Card className="p-5">
                <h3 className="text-slate-300 font-semibold text-sm mb-4">Agent Accuracy & Trust Scores</h3>
                <div className="space-y-3">
                    {agentAccuracy.map(a => (
                        <div key={a.agent} className="flex items-center gap-4">
                            <div className="flex-1">
                                <TrustScore agent={a.agent} accuracy={a.accuracy} />
                            </div>
                            <span className="text-xs text-slate-500 w-28 text-right">{a.overrides} overrides</span>
                        </div>
                    ))}
                </div>
            </Card>

            {/* Charts */}
            <div className="grid grid-cols-2 gap-4">
                <Card className="p-5">
                    <h3 className="text-slate-300 font-semibold text-sm mb-4">AI vs Human Decisions</h3>
                    <ResponsiveContainer width="100%" height={200}>
                        <BarChart data={aiVsHumanData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                            <XAxis dataKey="month" tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
                            <YAxis tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
                            <Tooltip {...tt} />
                            <Legend wrapperStyle={{ fontSize: '11px', color: '#64748b' }} />
                            <Bar dataKey="ai" fill="#6366f1" radius={[4, 4, 0, 0]} name="AI Resolved" />
                            <Bar dataKey="human" fill="#f59e0b" radius={[4, 4, 0, 0]} name="Human Decisions" />
                        </BarChart>
                    </ResponsiveContainer>
                </Card>

                <Card className="p-5">
                    <h3 className="text-slate-300 font-semibold text-sm mb-4">Override Frequency (Weekly)</h3>
                    <ResponsiveContainer width="100%" height={200}>
                        <LineChart data={overrideFrequency}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                            <XAxis dataKey="week" tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
                            <YAxis tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
                            <Tooltip {...tt} />
                            <Line type="monotone" dataKey="overrides" stroke="#ef4444" strokeWidth={2} dot={{ fill: '#ef4444', r: 3 }} name="Overrides" />
                        </LineChart>
                    </ResponsiveContainer>
                </Card>
            </div>
        </div>
    );
}
