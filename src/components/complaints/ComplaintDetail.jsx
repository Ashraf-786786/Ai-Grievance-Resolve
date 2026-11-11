import React, { useState } from 'react';
import { X, Tag, Zap, ShieldCheck, MessageSquare, AlertTriangle, CheckCircle2, UserCheck, ChevronDown } from 'lucide-react';
import { PriorityBadge, StatusBadge, CategoryBadge } from '../ui/Badge';
import { ConfidenceMeter } from '../ui/ConfidenceMeter';
import { Card } from '../ui/Card';

const AgentCard = ({ icon: Icon, color, title, children }) => (
    <div className="bg-[#12141f] border border-slate-800 rounded-lg p-4 space-y-2">
        <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-md" style={{ backgroundColor: `${color}20` }}>
                <Icon size={14} style={{ color }} />
            </div>
            <span className="text-xs font-semibold text-slate-300">{title}</span>
        </div>
        {children}
    </div>
);

const priorities = ['Low', 'Medium', 'High', 'Critical'];

export function ComplaintDetail({ complaint, onClose }) {
    const [decision, setDecision] = useState(null);
    const [overridePriority, setOverridePriority] = useState(complaint.priority);
    const { agentOutputs, debate } = complaint;

    const handleDecision = (d) => setDecision(d);

    return (
        <div className="fixed inset-0 z-50 flex">
            {/* Backdrop */}
            <div className="flex-1 bg-black/60 backdrop-blur-sm" onClick={onClose} />

            {/* Panel */}
            <div className="w-[720px] bg-[#12141f] border-l border-slate-700 flex flex-col h-full overflow-y-auto">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 sticky top-0 bg-[#12141f] z-10">
                    <div className="flex items-center gap-3">
                        <span className="text-indigo-400 font-mono text-sm font-bold">{complaint.id}</span>
                        <PriorityBadge priority={complaint.priority} />
                        <StatusBadge status={complaint.status} />
                    </div>
                    <button onClick={onClose} className="p-1.5 text-slate-500 hover:text-slate-200 hover:bg-slate-800 rounded-lg transition-colors">
                        <X size={18} />
                    </button>
                </div>

                <div className="px-6 py-5 space-y-5">
                    {/* A. Original Complaint */}
                    <section>
                        <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">A. Original Complaint</h3>
                        <Card className="p-4">
                            <h4 className="text-slate-200 font-semibold text-sm mb-2">{complaint.title}</h4>
                            <p className="text-slate-400 text-sm leading-relaxed">{complaint.fullText}</p>
                            <div className="flex items-center gap-3 mt-3">
                                <CategoryBadge category={complaint.category} />
                                <span className="text-xs text-slate-500">{complaint.department}</span>
                                <span className="text-xs text-slate-500 ml-auto">{new Date(complaint.timestamp).toLocaleString()}</span>
                            </div>
                        </Card>
                    </section>

                    {/* B. AI Agent Outputs */}
                    <section>
                        <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">B. AI Agent Outputs</h3>
                        <div className="grid grid-cols-2 gap-3">
                            <AgentCard icon={Tag} color="#6366f1" title="Classifier Agent">
                                <p className="text-slate-200 text-sm font-medium">{agentOutputs.classifier.category}</p>
                                <p className="text-slate-500 text-xs">{agentOutputs.classifier.subCategory}</p>
                                <div className="mt-1">
                                    <div className="h-1 rounded-full bg-slate-700 overflow-hidden">
                                        <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${agentOutputs.classifier.confidence * 100}%` }} />
                                    </div>
                                    <p className="text-xs text-slate-500 mt-1">{Math.round(agentOutputs.classifier.confidence * 100)}% confident</p>
                                </div>
                            </AgentCard>

                            <AgentCard icon={Zap} color="#f59e0b" title="Priority Agent">
                                <p className="text-slate-200 text-sm font-medium">{agentOutputs.priority.level} — Score: {agentOutputs.priority.urgencyScore}</p>
                                <p className="text-slate-400 text-xs leading-relaxed">{agentOutputs.priority.reasoning}</p>
                            </AgentCard>

                            <AgentCard icon={ShieldCheck} color={agentOutputs.verifier.authentic ? '#22c55e' : '#ef4444'} title="Verifier Agent">
                                <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${agentOutputs.verifier.authentic ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'}`}>
                                    {agentOutputs.verifier.flag}
                                </span>
                                <p className="text-slate-500 text-xs mt-1">Duplicate: {agentOutputs.verifier.duplicateCheck}</p>
                            </AgentCard>

                            <AgentCard icon={MessageSquare} color="#8b5cf6" title="Explainer Agent">
                                <p className="text-slate-300 text-xs leading-relaxed">{agentOutputs.explainer.summary}</p>
                                <p className="text-slate-500 text-xs mt-1">⏱ Est. resolution: {agentOutputs.explainer.estimatedResolutionTime}</p>
                            </AgentCard>
                        </div>
                    </section>

                    {/* C. AI Debate */}
                    <section>
                        <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">C. AI Agent Debate</h3>
                        {debate.map((d, i) => (
                            <div
                                key={i}
                                className={`p-4 rounded-xl border text-sm ${d.severity === 'high' ? 'bg-red-500/10 border-red-500/30 text-red-300'
                                    : d.severity === 'medium' ? 'bg-amber-500/10 border-amber-500/30 text-amber-300'
                                        : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                                    }`}
                            >
                                <div className="flex items-center gap-2 mb-1.5">
                                    <AlertTriangle size={14} />
                                    <span className="font-semibold text-xs">{d.agents.join(' vs ')}</span>
                                    {d.conflict && <span className="text-xs font-bold ml-auto">⚠ CONFLICT</span>}
                                </div>
                                <p className="text-xs leading-relaxed opacity-90">{d.message}</p>
                            </div>
                        ))}
                    </section>

                    {/* E. Confidence Meter */}
                    <section>
                        <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">E. Confidence Meter</h3>
                        <Card className="p-4">
                            <ConfidenceMeter value={complaint.confidence} />
                        </Card>
                    </section>

                    {/* D. Decision Panel */}
                    <section className="pb-4">
                        <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">D. Decision Panel</h3>
                        <Card className="p-4 space-y-3">
                            {decision && (
                                <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 rounded-lg px-3 py-2 text-emerald-400 text-sm">
                                    <CheckCircle2 size={15} />
                                    Decision recorded: <strong>{decision}</strong>
                                </div>
                            )}
                            <div className="grid grid-cols-2 gap-2">
                                <button onClick={() => handleDecision('Auto-process (AI Decision Approved)')}
                                    className="flex items-center justify-center gap-2 px-3 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition-colors">
                                    <Zap size={14} /> Auto-Process
                                </button>
                                <button onClick={() => handleDecision('Sent to Human Review')}
                                    className="flex items-center justify-center gap-2 px-3 py-2.5 bg-amber-600/20 hover:bg-amber-600/30 text-amber-400 border border-amber-600/30 text-sm font-medium rounded-lg transition-colors">
                                    <UserCheck size={14} /> Human Review
                                </button>
                                <button onClick={() => handleDecision('Marked as Fraud')}
                                    className="flex items-center justify-center gap-2 px-3 py-2.5 bg-red-600/20 hover:bg-red-600/30 text-red-400 border border-red-600/30 text-sm font-medium rounded-lg transition-colors">
                                    <X size={14} /> Mark Fraud / Duplicate
                                </button>
                                <div className="flex items-center gap-2 bg-slate-800 border border-slate-700 rounded-lg px-3 py-2">
                                    <ChevronDown size={14} className="text-slate-500" />
                                    <select
                                        value={overridePriority}
                                        onChange={e => { setOverridePriority(e.target.value); handleDecision(`Priority overridden to ${e.target.value}`); }}
                                        className="bg-transparent text-slate-300 text-sm flex-1 focus:outline-none cursor-pointer"
                                    >
                                        {priorities.map(p => <option key={p} value={p}>Override: {p}</option>)}
                                    </select>
                                </div>
                            </div>
                            <p className="text-xs text-slate-500">AI Suggestion: <span className="text-slate-400">{agentOutputs.explainer.actionSuggested}</span></p>
                        </Card>
                    </section>
                </div>
            </div>
        </div>
    );
}
