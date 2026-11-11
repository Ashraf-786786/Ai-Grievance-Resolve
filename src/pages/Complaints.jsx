import React, { useState, useMemo } from 'react';
import { Search, Filter, ChevronDown } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { PriorityBadge, StatusBadge, CategoryBadge } from '../components/ui/Badge';
import { complaints, departments } from '../data/mockData';

const priorities = ['All', 'Critical', 'High', 'Medium', 'Low'];
const statuses = ['All', 'Human Review', 'Auto', 'Resolved'];

function FilterSelect({ value, onChange, options, label }) {
    return (
        <div className="relative">
            <select
                value={value}
                onChange={e => onChange(e.target.value)}
                className="appearance-none bg-slate-800 border border-slate-700 text-slate-300 text-sm rounded-lg px-3 py-2 pr-8 focus:outline-none focus:border-indigo-500 cursor-pointer"
            >
                {options.map(o => <option key={o} value={o}>{o === 'All' ? `${label}: All` : o}</option>)}
            </select>
            <ChevronDown size={13} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
        </div>
    );
}

export default function Complaints({ onSelectComplaint }) {
    const [search, setSearch] = useState('');
    const [priority, setPriority] = useState('All');
    const [status, setStatus] = useState('All');
    const [department, setDepartment] = useState('All');

    const filtered = useMemo(() => {
        return complaints.filter(c => {
            const matchSearch = !search || c.title.toLowerCase().includes(search.toLowerCase()) || c.id.includes(search);
            const matchPriority = priority === 'All' || c.priority === priority;
            const matchStatus = status === 'All' || c.status === status;
            const matchDept = department === 'All' || c.department === department;
            return matchSearch && matchPriority && matchStatus && matchDept;
        });
    }, [search, priority, status, department]);

    return (
        <div className="space-y-4">
            {/* Filters */}
            <Card className="p-4">
                <div className="flex flex-wrap items-center gap-3">
                    <div className="relative flex-1 min-w-48">
                        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                        <input
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            className="w-full bg-slate-800 border border-slate-700 rounded-lg pl-9 pr-3 py-2 text-sm text-slate-300 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                            placeholder="Search complaints by ID or title..."
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <Filter size={15} className="text-slate-500" />
                        <FilterSelect value={priority} onChange={setPriority} options={priorities} label="Priority" />
                        <FilterSelect value={status} onChange={setStatus} options={statuses} label="Status" />
                        <FilterSelect value={department} onChange={setDepartment} options={['All', ...departments]} label="Dept" />
                    </div>
                    <span className="ml-auto text-xs text-slate-500">{filtered.length} complaints</span>
                </div>
            </Card>

            {/* Table */}
            <Card>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-slate-800 text-slate-500 text-xs uppercase tracking-wider">
                                <th className="px-5 py-3 text-left">ID</th>
                                <th className="px-5 py-3 text-left">Title</th>
                                <th className="px-5 py-3 text-left">Category</th>
                                <th className="px-5 py-3 text-left">Priority</th>
                                <th className="px-5 py-3 text-left">Status</th>
                                <th className="px-5 py-3 text-left">Department</th>
                                <th className="px-5 py-3 text-left">Timestamp</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800/60">
                            {filtered.map(c => (
                                <tr
                                    key={c.id}
                                    onClick={() => onSelectComplaint(c)}
                                    className="hover:bg-slate-800/30 cursor-pointer transition-colors group"
                                >
                                    <td className="px-5 py-3.5 text-indigo-400 font-mono text-xs">{c.id}</td>
                                    <td className="px-5 py-3.5 text-slate-300 max-w-xs">
                                        <span className="truncate block group-hover:text-white transition-colors">{c.title}</span>
                                    </td>
                                    <td className="px-5 py-3.5"><CategoryBadge category={c.category} /></td>
                                    <td className="px-5 py-3.5"><PriorityBadge priority={c.priority} /></td>
                                    <td className="px-5 py-3.5"><StatusBadge status={c.status} /></td>
                                    <td className="px-5 py-3.5 text-slate-400 text-xs">{c.department}</td>
                                    <td className="px-5 py-3.5 text-slate-500 text-xs">{new Date(c.timestamp).toLocaleString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {filtered.length === 0 && (
                        <div className="text-center py-12 text-slate-500">No complaints match your filters.</div>
                    )}
                </div>
            </Card>
        </div>
    );
}
