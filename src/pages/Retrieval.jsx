import React, { useState } from 'react';
import { Database, Search, Filter, ChevronDown, BookOpen, Zap, Clock } from 'lucide-react';
import { Card } from '../components/ui/Card';

const retrievalDocs = [
  { id: 'DOC-001', title: 'Infrastructure Complaint Handling SOP', source: 'PWD Knowledge Base', relevance: 0.97, category: 'Infrastructure', tokens: 1240 },
  { id: 'DOC-002', title: 'CPGRAMS Resolution Guidelines 2024', source: 'Ministry Portal', relevance: 0.94, category: 'Policy', tokens: 3400 },
  { id: 'DOC-003', title: 'Water Supply Outage Response Protocol', source: 'NWSC Manual', relevance: 0.89, category: 'Water Supply', tokens: 890 },
  { id: 'DOC-004', title: 'Fraud Detection Rules — Field Verification', source: 'Verifier Agent KB', relevance: 0.82, category: 'Fraud', tokens: 620 },
  { id: 'DOC-005', title: 'Priority Scoring Model v3 Documentation', source: 'AI Model Registry', relevance: 0.79, category: 'AI', tokens: 2100 },
  { id: 'DOC-006', title: 'Electricity Complaint Escalation Matrix', source: 'DISCOM Ops Guide', relevance: 0.75, category: 'Electricity', tokens: 760 },
  { id: 'DOC-007', title: 'Public Health Emergency Response SLA', source: 'Health Dept Circular', relevance: 0.72, category: 'Healthcare', tokens: 980 },
  { id: 'DOC-008', title: 'Historical Complaint Patterns 2022–2025', source: 'Analytics DB', relevance: 0.68, category: 'Analytics', tokens: 5600 },
];

const recentQueries = [
  { query: 'How to handle duplicate water supply complaints?', time: '5 min ago', docs: 3 },
  { query: 'Priority threshold for critical infrastructure', time: '22 min ago', docs: 5 },
  { query: 'Fraud verification steps for land records', time: '1 hr ago', docs: 2 },
];

function RelevancePill({ score }) {
  const pct = Math.round(score * 100);
  const color = pct >= 90 ? '#22c55e' : pct >= 75 ? '#f59e0b' : '#94a3b8';
  return (
    <div className="flex items-center gap-1.5">
      <div className="h-1.5 w-16 rounded-full bg-slate-700 overflow-hidden">
        <div className="h-full rounded-full" style={{ width: `${pct}%`, backgroundColor: color }} />
      </div>
      <span className="text-xs font-semibold" style={{ color }}>{pct}%</span>
    </div>
  );
}

export default function Retrieval() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const cats = ['All', 'Infrastructure', 'Policy', 'Water Supply', 'Fraud', 'AI', 'Electricity', 'Healthcare', 'Analytics'];

  const filtered = retrievalDocs.filter(d =>
    (category === 'All' || d.category === category) &&
    (!query || d.title.toLowerCase().includes(query.toLowerCase()) || d.source.toLowerCase().includes(query.toLowerCase()))
  );

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3">
        <div className="p-2.5 bg-indigo-600/20 border border-indigo-600/30 rounded-xl">
          <Database size={20} className="text-indigo-400" />
        </div>
        <div>
          <h2 className="text-slate-200 font-semibold">RAG Retrieval Panel</h2>
          <p className="text-slate-500 text-sm">Knowledge base documents retrieved by AI agents for decision support</p>
        </div>
        <div className="ml-auto bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold px-3 py-1 rounded-full">
          ✓ Vector DB Online
        </div>
      </div>

      {/* Search bar */}
      <Card className="p-4">
        <div className="flex gap-3">
          <div className="relative flex-1">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              value={query}
              onChange={e => setQuery(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg pl-9 pr-3 py-2.5 text-sm text-slate-300 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              placeholder="Search knowledge base documents..."
            />
          </div>
          <div className="relative">
            <select
              value={category}
              onChange={e => setCategory(e.target.value)}
              className="appearance-none bg-slate-800 border border-slate-700 text-slate-300 text-sm rounded-lg px-3 py-2.5 pr-8 focus:outline-none focus:border-indigo-500"
            >
              {cats.map(c => <option key={c}>{c}</option>)}
            </select>
            <ChevronDown size={13} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
          </div>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition-colors">
            <Zap size={14} /> Retrieve
          </button>
        </div>
      </Card>

      <div className="grid grid-cols-3 gap-5">
        {/* Document results */}
        <div className="col-span-2 space-y-3">
          <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">{filtered.length} Documents Retrieved</p>
          {filtered.map((doc, i) => (
            <Card key={doc.id} className="p-4 hover:border-indigo-500/40 transition-all duration-200 cursor-pointer">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-indigo-600/20 border border-indigo-600/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <BookOpen size={14} className="text-indigo-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-slate-200 text-sm font-medium leading-snug">{doc.title}</p>
                      <p className="text-slate-500 text-xs mt-0.5">{doc.source}</p>
                    </div>
                    <div className="flex flex-col items-end gap-1 flex-shrink-0">
                      <RelevancePill score={doc.relevance} />
                      <span className="text-slate-600 text-xs">{doc.tokens.toLocaleString()} tokens</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-xs bg-slate-700/60 text-slate-400 border border-slate-600/30 px-2 py-0.5 rounded-md">{doc.category}</span>
                    <span className="text-xs text-indigo-400 font-mono">{doc.id}</span>
                    <span className="ml-auto text-xs text-indigo-500 hover:text-indigo-400 cursor-pointer">View chunk →</span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Recent queries sidebar */}
        <div className="space-y-3">
          <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Recent Agent Queries</p>
          {recentQueries.map((q, i) => (
            <Card key={i} className="p-3.5">
              <p className="text-slate-300 text-xs leading-relaxed mb-2">"{q.query}"</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-slate-500">
                  <Clock size={11} />
                  <span className="text-xs">{q.time}</span>
                </div>
                <span className="text-xs text-indigo-400">{q.docs} docs</span>
              </div>
            </Card>
          ))}

          {/* Stats */}
          <Card className="p-4 mt-2">
            <p className="text-xs font-semibold text-slate-400 mb-3 uppercase tracking-wider">KB Statistics</p>
            {[
              { label: 'Total Documents', value: '1,248' },
              { label: 'Avg Retrieval Time', value: '38ms' },
              { label: 'Cache Hit Rate', value: '72%' },
              { label: 'Last Indexed', value: '2h ago' },
            ].map(s => (
              <div key={s.label} className="flex justify-between items-center py-1.5 border-b border-slate-800 last:border-0">
                <span className="text-slate-500 text-xs">{s.label}</span>
                <span className="text-slate-300 text-xs font-semibold">{s.value}</span>
              </div>
            ))}
          </Card>
        </div>
      </div>
    </div>
  );
}
