import { Key, Plus, RefreshCw, Shield, Trash2, Eye, EyeOff, Search } from 'lucide-react';
import { useState } from 'react';
import { Secret } from '../App';

interface EnvmindsSecretsProps {
  secrets: Secret[];
  setSecrets: React.Dispatch<React.SetStateAction<Secret[]>>;
}

export default function EnvmindsSecrets({ secrets, setSecrets }: EnvmindsSecretsProps) {
  const [isSyncing, setIsSyncing] = useState(false);
  const [showValues, setShowValues] = useState<Record<string, boolean>>({});
  const [searchTerm, setSearchTerm] = useState('');

  const toggleValue = (id: string) => {
    setShowValues(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSync = () => {
    setIsSyncing(true);
    // Simulate envminds sync
    setTimeout(() => {
      setIsSyncing(false);
    }, 1500);
  };

  const filteredSecrets = secrets.filter(s => 
    s.key.toLowerCase().includes(searchTerm.toLowerCase()) || 
    s.provider.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 h-full flex flex-col">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium text-zinc-100">envminds Secrets Manager</h3>
          <p className="text-sm text-zinc-400">Securely manage environment variables across your hybrid fleet</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={handleSync}
            disabled={isSyncing}
            className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 text-sm font-medium rounded-lg transition-colors flex items-center gap-2 disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${isSyncing ? 'animate-spin' : ''}`} />
            Sync envminds
          </button>
          <button className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-medium rounded-lg transition-colors flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Add Secret
          </button>
        </div>
      </div>

      <div className="flex-1 bg-zinc-900/30 border border-zinc-800/50 rounded-xl overflow-hidden flex flex-col">
        <div className="p-4 border-b border-zinc-800/50 bg-zinc-900/50 flex items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
            <input 
              type="text" 
              placeholder="Search secrets..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-lg pl-9 pr-4 py-2 text-sm text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:border-indigo-500/50"
            />
          </div>
          <div className="flex items-center gap-2 text-xs text-zinc-500">
            <Shield className="w-3 h-3 text-emerald-500" />
            End-to-end encrypted via envminds protocol
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-zinc-900/50 text-zinc-400 border-b border-zinc-800/50">
              <tr>
                <th className="px-6 py-3 font-medium">Key</th>
                <th className="px-6 py-3 font-medium">Value</th>
                <th className="px-6 py-3 font-medium">Provider</th>
                <th className="px-6 py-3 font-medium">Last Rotated</th>
                <th className="px-6 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/50">
              {filteredSecrets.map(secret => (
                <tr key={secret.id} className="hover:bg-zinc-800/20 transition-colors">
                  <td className="px-6 py-4 font-mono text-zinc-200">{secret.key}</td>
                  <td className="px-6 py-4 font-mono text-zinc-400">
                    <div className="flex items-center gap-2">
                      {showValues[secret.id] ? secret.value : '••••••••••••••••'}
                      <button 
                        onClick={() => toggleValue(secret.id)}
                        className="p-1 hover:text-zinc-200 transition-colors"
                      >
                        {showValues[secret.id] ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-zinc-800 rounded text-xs text-zinc-400 border border-zinc-700">
                      {secret.provider}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-zinc-500">{secret.lastRotated}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-1.5 text-zinc-500 hover:text-indigo-400 transition-colors">
                        <RefreshCw className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 text-zinc-500 hover:text-red-400 transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-indigo-500/5 border border-indigo-500/20 rounded-xl p-4 flex items-start gap-4">
        <div className="p-2 bg-indigo-500/10 rounded-lg text-indigo-400">
          <Shield className="w-5 h-5" />
        </div>
        <div>
          <h4 className="text-sm font-medium text-indigo-300">envminds Integration Active</h4>
          <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
            Your secrets are being synchronized with the envminds protocol. This ensures that your local, decentralized, and cloud nodes always have the latest credentials without exposing them in your source code or logs.
          </p>
        </div>
      </div>
    </div>
  );
}
