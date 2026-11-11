import React from 'react';
import { Card } from '../components/ui/Card';
import { Settings as SettingsIcon, Bell, Shield, Globe, Database, Moon } from 'lucide-react';

function SettingRow({ icon: Icon, title, description, children }) {
    return (
        <div className="flex items-center justify-between py-4 border-b border-slate-800 last:border-0">
            <div className="flex items-center gap-3">
                <div className="p-2 bg-slate-800 rounded-lg">
                    <Icon size={15} className="text-slate-400" />
                </div>
                <div>
                    <p className="text-slate-200 text-sm font-medium">{title}</p>
                    <p className="text-slate-500 text-xs">{description}</p>
                </div>
            </div>
            {children}
        </div>
    );
}

function Toggle({ defaultChecked = true }) {
    const [on, setOn] = React.useState(defaultChecked);
    return (
        <button
            onClick={() => setOn(v => !v)}
            className={`relative inline-flex h-5 w-9 rounded-full transition-colors duration-300 ${on ? 'bg-indigo-600' : 'bg-slate-700'}`}
        >
            <span className={`inline-block h-4 w-4 rounded-full bg-white shadow transition-transform duration-300 mt-0.5 ${on ? 'translate-x-4' : 'translate-x-0.5'}`} />
        </button>
    );
}

export default function Settings() {
    return (
        <div className="max-w-2xl space-y-5">
            <div>
                <h2 className="text-slate-200 font-semibold">Settings</h2>
                <p className="text-slate-500 text-sm">Configure system preferences and integrations</p>
            </div>

            <Card className="p-5">
                <h3 className="text-slate-300 font-semibold text-sm mb-1">Notifications</h3>
                <div>
                    <SettingRow icon={Bell} title="Email Alerts" description="Receive email for critical complaints">
                        <Toggle defaultChecked={true} />
                    </SettingRow>
                    <SettingRow icon={Bell} title="In-App Notifications" description="Show notification badges in sidebar">
                        <Toggle defaultChecked={true} />
                    </SettingRow>
                </div>
            </Card>

            <Card className="p-5">
                <h3 className="text-slate-300 font-semibold text-sm mb-1">AI & Automation</h3>
                <div>
                    <SettingRow icon={Shield} title="Auto-resolve High Confidence" description="Let AI resolve cases with >85% confidence">
                        <Toggle defaultChecked={false} />
                    </SettingRow>
                    <SettingRow icon={Globe} title="Multi-language Support" description="Enable regional language complaint processing">
                        <Toggle defaultChecked={true} />
                    </SettingRow>
                    <SettingRow icon={Database} title="Learning Feedback Loop" description="Send human overrides to retrain agents">
                        <Toggle defaultChecked={true} />
                    </SettingRow>
                </div>
            </Card>

            <Card className="p-5">
                <h3 className="text-slate-300 font-semibold text-sm mb-1">Appearance</h3>
                <div>
                    <SettingRow icon={Moon} title="Dark Mode" description="Always use dark interface">
                        <Toggle defaultChecked={true} />
                    </SettingRow>
                </div>
            </Card>

            <div className="flex gap-3">
                <button className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition-colors">
                    Save Changes
                </button>
                <button className="px-5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm font-medium rounded-lg transition-colors border border-slate-700">
                    Reset to Defaults
                </button>
            </div>
        </div>
    );
}
