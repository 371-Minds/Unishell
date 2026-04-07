import { ShieldCheck, ExternalLink, Search } from 'lucide-react';

const logs = [
  {
    id: '1',
    hash: '0x7f8c...3b9a',
    agent: 'Auto-Scaler',
    action: 'manage_server(target="staging-worker", cmd="systemctl restart nginx")',
    timestamp: '2 mins ago',
    status: 'verified'
  },
  {
    id: '2',
    hash: '0x1a2b...9c8d',
    agent: 'DB-Monitor',
    action: 'manage_server(target="dev-db", cmd="pg_dump -U admin db > backup.sql")',
    timestamp: '15 mins ago',
    status: 'verified'
  },
  {
    id: '3',
    hash: '0x9e8d...7c6b',
    agent: 'User (Admin)',
    action: 'manage_server(target="prod-web", cmd="df -h")',
    timestamp: '1 hour ago',
    status: 'verified'
  },
  {
    id: '4',
    hash: '0x4f5e...6d7c',
    agent: 'Security-Scanner',
    action: 'manage_server(target="prod-web", cmd="cat /var/log/auth.log | grep Failed")',
    timestamp: '3 hours ago',
    status: 'verified'
  }
];

export default function AuditLog() {
  return (
    <div className="space-y-6 h-full flex flex-col">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium text-zinc-100">Blockchain Audit Trail</h3>
          <p className="text-sm text-zinc-400">Immutable execution logs via Polygon Sepolia</p>
        </div>
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
          <input 
            type="text" 
            placeholder="Search hashes or commands..." 
            className="bg-zinc-900/50 border border-zinc-800 rounded-lg pl-9 pr-4 py-2 text-sm text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:border-indigo-500/50 w-64"
          />
        </div>
      </div>

      <div className="flex-1 bg-zinc-900/30 border border-zinc-800/50 rounded-xl overflow-hidden flex flex-col">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-zinc-900/50 text-zinc-400 border-b border-zinc-800/50">
              <tr>
                <th className="px-6 py-3 font-medium">Transaction Hash</th>
                <th className="px-6 py-3 font-medium">Actor</th>
                <th className="px-6 py-3 font-medium">Command Executed</th>
                <th className="px-6 py-3 font-medium">Time</th>
                <th className="px-6 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/50">
              {logs.map(log => (
                <tr key={log.id} className="hover:bg-zinc-800/20 transition-colors">
                  <td className="px-6 py-4 font-mono text-indigo-400 flex items-center gap-2">
                    {log.hash}
                    <ExternalLink className="w-3 h-3 text-zinc-500 hover:text-indigo-400 cursor-pointer" />
                  </td>
                  <td className="px-6 py-4 text-zinc-300">{log.agent}</td>
                  <td className="px-6 py-4">
                    <div className="font-mono text-xs text-zinc-400 bg-zinc-950/50 rounded px-2 py-1 inline-block border border-zinc-800/50">
                      {log.action}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-zinc-500">{log.timestamp}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5 text-emerald-400 bg-emerald-400/10 px-2.5 py-1 rounded-full w-fit text-xs font-medium border border-emerald-400/20">
                      <ShieldCheck className="w-3 h-3" />
                      {log.status}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
