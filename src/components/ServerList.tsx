import { Server, Cloud, HardDrive, Cpu, RefreshCw, Key } from 'lucide-react';
import { useState } from 'react';
import { ServerConfig } from '../App';

interface ServerListProps {
  servers: ServerConfig[];
  setServers: React.Dispatch<React.SetStateAction<ServerConfig[]>>;
}

export default function ServerList({ servers, setServers }: ServerListProps) {
  const [isSyncing, setIsSyncing] = useState(false);

  const handleSync = () => {
    setIsSyncing(true);
    // Simulate fetching from AWS Secrets Manager / HashiCorp Vault / .env / Decentralized Registry
    setTimeout(() => {
      setServers(prev => {
        const newNodes = [
          {
            id: 'flux-compute-1',
            provider: 'Flux (Decentralized)',
            region: 'global-mesh',
            status: 'healthy',
            cpu: '5%',
            ram: '1.2/4GB',
            uptime: '12h 45m'
          },
          {
            id: 'edge-gateway',
            provider: 'Local (Raspberry Pi)',
            region: 'edge-site-a',
            status: 'healthy',
            cpu: '15%',
            ram: '0.8/4GB',
            uptime: '30d 2h'
          }
        ];
        
        const filteredNewNodes = newNodes.filter(newNode => !prev.some(s => s.id === newNode.id));
        return [...prev, ...filteredNewNodes];
      });
      setIsSyncing(false);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium text-zinc-100">Connected Infrastructure</h3>
          <p className="text-sm text-zinc-400">Dynamically loaded via environment & secrets manager</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={handleSync}
            disabled={isSyncing}
            className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 text-sm font-medium rounded-lg transition-colors flex items-center gap-2 disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${isSyncing ? 'animate-spin' : ''}`} />
            Sync Config
          </button>
          <button className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-medium rounded-lg transition-colors flex items-center gap-2">
            <Key className="w-4 h-4" />
            Manage Secrets
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
        {servers.map(server => (
          <div key={server.id} className="bg-zinc-900/50 border border-zinc-800/50 rounded-xl p-5 hover:border-zinc-700/50 transition-colors">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${
                  server.status === 'healthy' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-yellow-500/10 text-yellow-400'
                }`}>
                  <Server className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-medium text-zinc-200">{server.id}</h4>
                  <div className="flex items-center gap-1.5 text-xs text-zinc-500 mt-0.5">
                    <Cloud className="w-3 h-3" />
                    {server.provider} &bull; {server.region}
                  </div>
                </div>
              </div>
              <div className={`w-2 h-2 rounded-full ${
                server.status === 'healthy' ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'bg-yellow-500 shadow-[0_0_8px_rgba(234,179,8,0.5)]'
              }`} />
            </div>

            <div className="grid grid-cols-2 gap-4 py-3 border-t border-zinc-800/50">
              <div>
                <div className="flex items-center gap-1.5 text-xs text-zinc-500 mb-1">
                  <Cpu className="w-3 h-3" /> CPU Usage
                </div>
                <div className="text-sm font-medium text-zinc-300">{server.cpu}</div>
              </div>
              <div>
                <div className="flex items-center gap-1.5 text-xs text-zinc-500 mb-1">
                  <HardDrive className="w-3 h-3" /> Memory
                </div>
                <div className="text-sm font-medium text-zinc-300">{server.ram}</div>
              </div>
            </div>

            <div className="pt-3 border-t border-zinc-800/50 flex items-center justify-between text-xs">
              <span className="text-zinc-500">Uptime: {server.uptime}</span>
              <button className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors">
                Manage &rarr;
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
