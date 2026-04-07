import { Blocks, FileCode2, Plus, RefreshCw } from 'lucide-react';

const plugins = [
  {
    id: 'db_check',
    name: 'db_check.py',
    description: 'Monitors database integrity using sqlalchemy.',
    author: 'Agent (Auto-generated)',
    status: 'active',
    lastUpdated: '2 hours ago'
  },
  {
    id: 'log_analyzer',
    name: 'log_analyzer.py',
    description: 'Parses Nginx logs for anomaly detection.',
    author: 'Admin',
    status: 'active',
    lastUpdated: '1 day ago'
  },
  {
    id: 'k8s_scaler',
    name: 'k8s_scaler.py',
    description: 'Adjusts replica counts based on CPU metrics.',
    author: 'Agent (Auto-generated)',
    status: 'inactive',
    lastUpdated: '3 days ago'
  }
];

export default function Plugins() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium text-zinc-100">Agent Plugins</h3>
          <p className="text-sm text-zinc-400">Dynamically loaded MCP tools written by agents</p>
        </div>
        <div className="flex gap-3">
          <button className="px-3 py-2 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 text-sm font-medium rounded-lg transition-colors flex items-center gap-2">
            <RefreshCw className="w-4 h-4" />
            Hot Reload
          </button>
          <button className="px-3 py-2 bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-medium rounded-lg transition-colors flex items-center gap-2">
            <Plus className="w-4 h-4" />
            New Plugin
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {plugins.map(plugin => (
          <div key={plugin.id} className="bg-zinc-900/50 border border-zinc-800/50 rounded-xl p-5 hover:border-zinc-700/50 transition-colors flex flex-col">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                  <FileCode2 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-medium text-zinc-200 font-mono text-sm">{plugin.name}</h4>
                  <div className="text-xs text-zinc-500 mt-0.5">By {plugin.author}</div>
                </div>
              </div>
              <div className={`px-2 py-1 rounded text-[10px] font-medium uppercase tracking-wider ${
                plugin.status === 'active' 
                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                  : 'bg-zinc-800 text-zinc-400 border border-zinc-700'
              }`}>
                {plugin.status}
              </div>
            </div>

            <p className="text-sm text-zinc-400 flex-1 mb-4">
              {plugin.description}
            </p>

            <div className="pt-3 border-t border-zinc-800/50 flex items-center justify-between text-xs">
              <span className="text-zinc-500">Updated: {plugin.lastUpdated}</span>
              <button className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors">
                View Code
              </button>
            </div>
          </div>
        ))}

        {/* Empty State / Add New */}
        <div className="bg-zinc-900/20 border border-zinc-800/50 border-dashed rounded-xl p-5 flex flex-col items-center justify-center text-center hover:bg-zinc-900/40 hover:border-zinc-700/50 transition-colors cursor-pointer min-h-[180px]">
          <div className="w-10 h-10 rounded-full bg-zinc-800/50 flex items-center justify-center mb-3 text-zinc-400">
            <Blocks className="w-5 h-5" />
          </div>
          <h4 className="font-medium text-zinc-300 mb-1">Agent Auto-Generation</h4>
          <p className="text-xs text-zinc-500 max-w-[200px]">
            Agents can use the write_new_tool function to create plugins here.
          </p>
        </div>
      </div>
    </div>
  );
}
