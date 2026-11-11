import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard, FileText, ClipboardList, BarChart3,
  Settings, Shield, Zap, ZapOff, Database, Sun, Moon
} from 'lucide-react';

const navItems = [
  { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/complaints', icon: FileText, label: 'Complaints' },
  { to: '/review', icon: ClipboardList, label: 'Review Queue' },
  { to: '/retrieval', icon: Database, label: 'Retrieval' },
  { to: '/feedback', icon: BarChart3, label: 'Analytics' },
  { to: '/activity', icon: Shield, label: 'Activity Log' },
  { to: '/settings', icon: Settings, label: 'Settings' },
];

export function Sidebar({ autonomyMode, setAutonomyMode, theme, setTheme }) {
  const isLight = theme === 'light';

  return (
    <aside className="w-64 flex-shrink-0 h-screen sticky top-0 bg-[#12141f] border-r border-slate-800 flex flex-col z-30 overflow-y-auto">
      {/* Logo */}
      <div className="px-6 py-5 border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
            <span className="text-white font-bold text-sm">G</span>
          </div>
          <div>
            <p className="text-white font-semibold text-sm leading-tight">GrievanceAI</p>
            <p className="text-slate-500 text-xs">Admin Portal</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 ${
                isActive
                  ? 'bg-indigo-600/20 text-indigo-400 border border-indigo-600/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`
            }
          >
            <Icon size={18} />
            {label}
          </NavLink>
        ))}
      </nav>

      {/* AI Autonomy Toggle */}
      <div className="px-4 pt-2 pb-3 border-t border-slate-800 space-y-2">
        <div className="bg-[#1a1d27] rounded-xl p-3 border border-slate-700/50">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              {autonomyMode ? <Zap size={15} className="text-indigo-400" /> : <ZapOff size={15} className="text-slate-500" />}
              <span className="text-xs font-semibold text-slate-300">AI Autonomy</span>
            </div>
            <button
              onClick={() => setAutonomyMode(v => !v)}
              className={`relative inline-flex h-5 w-9 rounded-full transition-colors duration-300 focus:outline-none ${
                autonomyMode ? 'bg-indigo-600' : 'bg-slate-700'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 rounded-full bg-white shadow transition-transform duration-300 mt-0.5 ${
                  autonomyMode ? 'translate-x-4' : 'translate-x-0.5'
                }`}
              />
            </button>
          </div>
          <p className="text-xs text-slate-500">
            {autonomyMode
              ? 'AI resolving high-confidence cases automatically'
              : 'All cases require human approval'}
          </p>
        </div>

        {/* Theme Toggle */}
        <div className="bg-[#1a1d27] rounded-xl px-3 py-2.5 border border-slate-700/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {isLight ? <Sun size={15} className="text-amber-400" /> : <Moon size={15} className="text-slate-400" />}
              <span className="text-xs font-semibold text-slate-300">{isLight ? 'Light Mode' : 'Dark Mode'}</span>
            </div>
            <button
              onClick={() => setTheme(t => t === 'dark' ? 'light' : 'dark')}
              className={`relative inline-flex h-5 w-9 rounded-full transition-colors duration-300 focus:outline-none ${
                isLight ? 'bg-amber-500' : 'bg-slate-700'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 rounded-full bg-white shadow transition-transform duration-300 mt-0.5 ${
                  isLight ? 'translate-x-4' : 'translate-x-0.5'
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* User */}
      <div className="px-4 pb-4">
        <div className="flex items-center gap-3 px-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold">
            MK
          </div>
          <div>
            <p className="text-sm font-medium text-slate-300">Officer Mehul K.</p>
            <p className="text-xs text-slate-500">Senior Reviewer</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
