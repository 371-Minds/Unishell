import { Server, Cloud, HardDrive, Cpu } from 'lucide-react';

const servers = [
  {
    id: 'prod-web',
    provider: 'AWS EC2',
    region: 'us-east-1',
    status: 'healthy',
    cpu: '42%',
    ram: '6.2/16GB',
    uptime: '45d 12h'
  },
  {
    id: 'dev-db',
    provider: 'DigitalOcean',
    region: 'nyc3',
    status: 'healthy',
    cpu: '18%',
    ram: '12.4/32GB',
    uptime: '12d 4h'
  },
  {
    id: 'staging-worker',
    provider: 'GCP Compute',
    region: 'us-central1',
    status: 'warning',
    cpu: '94%',
    ram: '7.8/8GB',
    uptime: '2d 1h'
  }
];

export default function ServerList() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium text-zinc-100">Connected Infrastructure</h3>
          <p className="text-sm text-zinc-400">Unified via Apache Libcloud abstraction layer</p>
        </div>
        <button className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-medium rounded-lg transition-colors">
          Add Provider
        </button>
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
