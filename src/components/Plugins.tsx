import { Blocks, FileCode2, Plus, RefreshCw, Lock, Zap } from 'lucide-react';

const skills = [
  {
    id: 'db_check',
    name: 'db_check.py',
    routingLogic: 'USE WHEN: You need to monitor database integrity, check connection pools, or query active sessions. DO NOT use for destructive operations.',
    author: 'Agent (Auto-generated)',
    status: 'loaded',
    secrets: ['DB_READONLY_URL'],
    lastUpdated: '2 hours ago'
  },
  {
    id: 'log_analyzer',
    name: 'log_analyzer.py',
    routingLogic: 'USE WHEN: Investigating 5xx errors or searching for specific anomaly patterns in Nginx/Apache access logs.',
    author: 'Admin',
    status: 'available',
    secrets: ['LOG_ARCHIVE_TOKEN'],
    lastUpdated: '1 day ago'
  },
  {
    id: 'k8s_scaler',
    name: 'k8s_scaler.py',
    routingLogic: 'USE WHEN: CPU metrics exceed thresholds and replica counts need adjustment. Requires explicit determinism flag.',
    author: 'Agent (Auto-generated)',
    status: 'available',
    secrets: ['KUBE_CONFIG_B64'],
    lastUpdated: '3 days ago'
  }
];

export default function Plugins() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium text-zinc-100">Agent Skills & Procedures</h3>
          <p className="text-sm text-zinc-400">On-demand tools loaded into the agent's context window</p>
        </div>
        <div className="flex gap-3">
          <button className="px-3 py-2 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 text-sm font-medium rounded-lg transition-colors flex items-center gap-2">
            <RefreshCw className="w-4 h-4" />
            Reload Skills
          </button>
          <button className="px-3 py-2 bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-medium rounded-lg transition-colors flex items-center gap-2">
            <Plus className="w-4 h-4" />
            New Skill
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {skills.map(skill => (
          <div key={skill.id} className="bg-zinc-900/50 border border-zinc-800/50 rounded-xl p-5 hover:border-zinc-700/50 transition-colors flex flex-col">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg border ${
                  skill.status === 'loaded' 
                    ? 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20' 
                    : 'bg-zinc-800/50 text-zinc-400 border-zinc-700/50'
                }`}>
                  {skill.status === 'loaded' ? <Zap className="w-5 h-5" /> : <FileCode2 className="w-5 h-5" />}
                </div>
                <div>
                  <h4 className="font-medium text-zinc-200 font-mono text-sm">{skill.name}</h4>
                  <div className="text-xs text-zinc-500 mt-0.5">By {skill.author}</div>
                </div>
              </div>
              <div className={`px-2 py-1 rounded text-[10px] font-medium uppercase tracking-wider ${
                skill.status === 'loaded' 
                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                  : 'bg-zinc-800 text-zinc-400 border border-zinc-700'
              }`}>
                {skill.status}
              </div>
            </div>

            <div className="flex-1 mb-4 space-y-3">
              <div>
                <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-1">Routing Logic</div>
                <p className="text-xs text-zinc-300 leading-relaxed bg-zinc-950/50 p-2 rounded border border-zinc-800/50">
                  {skill.routingLogic}
                </p>
              </div>
              
              <div>
                <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-1 flex items-center gap-1">
                  <Lock className="w-3 h-3" /> Domain Secrets
                </div>
                <div className="flex gap-2 flex-wrap">
                  {skill.secrets.map(secret => (
                    <span key={secret} className="text-[10px] font-mono text-amber-400/80 bg-amber-400/10 px-1.5 py-0.5 rounded border border-amber-400/20">
                      {secret}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-zinc-800/50 flex items-center justify-between text-xs">
              <span className="text-zinc-500">Updated: {skill.lastUpdated}</span>
              <button className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors">
                {skill.status === 'loaded' ? 'Unload' : 'Load into Context'}
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
            Agents can use the write_new_tool function to create skills here.
          </p>
        </div>
      </div>
    </div>
  );
}
