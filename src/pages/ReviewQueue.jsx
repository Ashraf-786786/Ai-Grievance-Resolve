import React, { useState } from 'react';
import { CheckCircle2, Edit3, MessageCircle, Zap } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { PriorityBadge, CategoryBadge } from '../components/ui/Badge';
import { ConfidenceMeter } from '../components/ui/ConfidenceMeter';
import { reviewQueue } from '../data/mockData';

export default function ReviewQueue({ onSelectComplaint }) {
    const [decisions, setDecisions] = useState({});

    const decide = (id, action) => setDecisions(prev => ({ ...prev, [id]: action }));

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-slate-200 font-semibold">Human Review Queue</h2>
                    <p className="text-slate-500 text-sm">{reviewQueue.length} complaints awaiting human decision</p>
                </div>
                <span className="bg-amber-500/20 text-amber-400 border border-amber-500/30 text-xs font-semibold px-3 py-1 rounded-full">
                    ⚠ {reviewQueue.length} Pending
                </span>
            </div>

            <div className="space-y-3">
                {reviewQueue.map(c => {
                    const decided = decisions[c.id];
                    return (
                        <Card key={c.id} className="p-5">
                            <div className="flex items-start justify-between gap-4">
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1.5">
                                        <span className="text-indigo-400 text-xs font-mono font-bold">{c.id}</span>
                                        <PriorityBadge priority={c.priority} />
                                        <CategoryBadge category={c.category} />
                                    </div>
                                    <h3 className="text-slate-200 text-sm font-medium mb-2">{c.title}</h3>
                                    <p className="text-slate-500 text-xs">{c.department} • {new Date(c.timestamp).toLocaleString()}</p>

                                    {/* AI Suggestion */}
                                    <div className="mt-3 bg-indigo-900/20 border border-indigo-700/30 rounded-lg px-3 py-2">
                                        <p className="text-xs font-semibold text-indigo-400 mb-0.5">🤖 AI Suggestion</p>
                                        <p className="text-xs text-slate-400">{c.agentOutputs.explainer.actionSuggested}</p>
                                        {!c.verified && (
                                            <p className="text-xs text-amber-400 mt-1">⚠ Verifier uncertain — review recommended</p>
                                        )}
                                    </div>

                                    {/* Confidence */}
                                    <div className="mt-3">
                                        <ConfidenceMeter value={c.confidence} />
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="flex flex-col gap-2 min-w-36">
                                    {decided ? (
                                        <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg px-3 py-2 text-center">
                                            <CheckCircle2 size={16} className="text-emerald-400 mx-auto mb-1" />
                                            <p className="text-emerald-400 text-xs font-medium">{decided}</p>
                                        </div>
                                    ) : (
                                        <>
                                            <button
                                                onClick={() => decide(c.id, 'AI Decision Accepted')}
                                                className="flex items-center justify-center gap-1.5 px-3 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-medium rounded-lg transition-colors"
                                            >
                                                <Zap size={13} /> Accept AI
                                            </button>
                                            <button
                                                onClick={() => onSelectComplaint(c)}
                                                className="flex items-center justify-center gap-1.5 px-3 py-2 bg-amber-500/20 hover:bg-amber-500/30 text-amber-400 border border-amber-500/30 text-xs font-medium rounded-lg transition-colors"
                                            >
                                                <Edit3 size={13} /> Override
                                            </button>
                                            <button
                                                onClick={() => decide(c.id, 'More Info Requested')}
                                                className="flex items-center justify-center gap-1.5 px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 text-xs font-medium rounded-lg transition-colors"
                                            >
                                                <MessageCircle size={13} /> More Info
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>
                        </Card>
                    );
                })}
            </div>
        </div>
    );
}
