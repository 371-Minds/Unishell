/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Terminal as TerminalIcon, Server, ShieldCheck, Blocks, Settings, Activity } from 'lucide-react';
import Terminal from './components/Terminal';
import ServerList from './components/ServerList';
import AuditLog from './components/AuditLog';
import Plugins from './components/Plugins';

export default function App() {
  const [activeTab, setActiveTab] = useState('terminal');

  const tabs = [
    { id: 'terminal', label: 'Universal Shell', icon: TerminalIcon },
    { id: 'servers', label: 'Infrastructure', icon: Server },
    { id: 'audit', label: 'Blockchain Audit', icon: ShieldCheck },
    { id: 'plugins', label: 'Agent Plugins', icon: Blocks },
  ];

  return (
    <div className="flex h-screen bg-zinc-950 text-zinc-300 overflow-hidden font-sans selection:bg-indigo-500/30">
      {/* Sidebar */}
      <div className="w-64 border-r border-zinc-800/50 bg-zinc-950/50 flex flex-col">
        <div className="p-4 border-b border-zinc-800/50 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center border border-indigo-500/30">
            <Activity className="w-4 h-4 text-indigo-400" />
          </div>
          <div>
            <h1 className="font-medium text-zinc-100 text-sm">InfrastructureOS</h1>
            <p className="text-xs text-zinc-500">Universal MCP Shell</p>
          </div>
        </div>
        
        <nav className="flex-1 p-3 space-y-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors ${
                  isActive 
                    ? 'bg-indigo-500/10 text-indigo-400 font-medium' 
                    : 'text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200'
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-zinc-800/50">
          <button className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200 transition-colors">
            <Settings className="w-4 h-4" />
            Settings
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-full overflow-hidden bg-zinc-950">
        <header className="h-14 border-b border-zinc-800/50 flex items-center px-6 bg-zinc-950/50">
          <h2 className="text-sm font-medium text-zinc-100">
            {tabs.find(t => t.id === activeTab)?.label}
          </h2>
        </header>
        <main className="flex-1 overflow-auto p-6">
          {activeTab === 'terminal' && <Terminal />}
          {activeTab === 'servers' && <ServerList />}
          {activeTab === 'audit' && <AuditLog />}
          {activeTab === 'plugins' && <Plugins />}
        </main>
      </div>
    </div>
  );
}
