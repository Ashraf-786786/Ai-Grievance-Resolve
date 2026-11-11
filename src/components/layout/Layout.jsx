import React from 'react';
import { Bell, Search } from 'lucide-react';

export function Layout({ children, autonomyMode, setAutonomyMode, pageTitle }) {
    return (
        <div className="flex-1 flex flex-col min-h-screen min-w-0">
            {/* Top Header */}
            <header className="light-header h-14 border-b border-slate-800 bg-[#12141f]/80 backdrop-blur-sm flex items-center justify-between px-6 sticky top-0 z-20">
                <h1 className="text-slate-200 font-semibold text-lg">{pageTitle}</h1>
                <div className="flex items-center gap-2">
                    <div className="relative">
                        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                        <input
                            className="bg-slate-800/60 border border-slate-700 rounded-lg pl-8 pr-3 py-1.5 text-sm text-slate-300 placeholder-slate-500 focus:outline-none focus:border-indigo-500 w-48"
                            placeholder="Quick search..."
                        />
                    </div>
                    <button className="relative p-2 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-lg transition-colors">
                        <Bell size={18} />
                        <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                    </button>
                    {autonomyMode && (
                        <span className="text-xs bg-indigo-600/20 text-indigo-400 border border-indigo-600/30 px-2 py-1 rounded-full font-medium">
                            ⚡ AI Auto Mode
                        </span>
                    )}
                </div>
            </header>

            {/* Main Content */}
            <main className="light-main flex-1 p-6 bg-[#0f1117]">
                {children}
            </main>
        </div>
    );
}
