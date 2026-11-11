import React from 'react';
import { Circle, Bot, User, CheckCircle2, Inbox } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { activityLog } from '../data/mockData';

const typeConfig = {
    system: { color: '#64748b', icon: Inbox, label: 'System' },
    ai: { color: '#6366f1', icon: Bot, label: 'AI Agent' },
    human: { color: '#f59e0b', icon: User, label: 'Human' },
    resolved: { color: '#22c55e', icon: CheckCircle2, label: 'Resolved' },
};

export default function ActivityLog() {
    // Group by complaint ID
    const grouped = activityLog.reduce((acc, entry) => {
        if (!acc[entry.complaintId]) acc[entry.complaintId] = [];
        acc[entry.complaintId].push(entry);
        return acc;
    }, {});

    return (
        <div className="space-y-4">
            <div>
                <h2 className="text-slate-200 font-semibold">Activity Log</h2>
                <p className="text-slate-500 text-sm">Full timeline of complaint lifecycle events</p>
            </div>

            {Object.entries(grouped).map(([complaintId, entries]) => (
                <Card key={complaintId} className="p-5">
                    <div className="flex items-center gap-2 mb-4">
                        <span className="text-indigo-400 font-mono text-sm font-bold">{complaintId}</span>
                        <span className="text-slate-500 text-xs">— {entries.length} events</span>
                    </div>

                    <div className="relative">
                        {/* Timeline line */}
                        <div className="absolute left-4 top-0 bottom-0 w-px bg-slate-800" />

                        <div className="space-y-4">
                            {entries.map((entry, i) => {
                                const cfg = typeConfig[entry.type] || typeConfig.system;
                                const Icon = cfg.icon;
                                const isLast = i === entries.length - 1;

                                return (
                                    <div key={entry.id} className="flex gap-4 relative">
                                        {/* Icon */}
                                        <div
                                            className="w-8 h-8 rounded-full flex items-center justify-center z-10 flex-shrink-0"
                                            style={{ backgroundColor: `${cfg.color}20`, border: `1.5px solid ${cfg.color}50` }}
                                        >
                                            <Icon size={14} style={{ color: cfg.color }} />
                                        </div>

                                        {/* Content */}
                                        <div className={`flex-1 pb-4 ${isLast ? '' : ''}`}>
                                            <div className="flex items-center justify-between">
                                                <p className="text-slate-200 text-sm font-medium">{entry.event}</p>
                                                <span className="text-slate-500 text-xs">{new Date(entry.timestamp).toLocaleTimeString()}</span>
                                            </div>
                                            <div className="flex items-center gap-2 mt-0.5">
                                                <span
                                                    className="text-xs font-medium px-1.5 py-0.5 rounded"
                                                    style={{ color: cfg.color, backgroundColor: `${cfg.color}15` }}
                                                >
                                                    {cfg.label}
                                                </span>
                                                <span className="text-slate-500 text-xs">{entry.agent}</span>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </Card>
            ))}
        </div>
    );
}
