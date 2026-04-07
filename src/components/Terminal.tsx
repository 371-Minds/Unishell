import { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, Play, Loader2, ShieldCheck } from 'lucide-react';

interface LogEntry {
  id: string;
  type: 'command' | 'output' | 'system' | 'audit';
  content: string;
  timestamp: Date;
}

export default function Terminal() {
  const [input, setInput] = useState('');
  const [logs, setLogs] = useState<LogEntry[]>([
    {
      id: '1',
      type: 'system',
      content: 'InfrastructureOS Universal Shell initialized.',
      timestamp: new Date()
    },
    {
      id: '2',
      type: 'system',
      content: 'Connected to MCP Server. Blockchain audit logging active (Polygon Sepolia).',
      timestamp: new Date()
    }
  ]);
  const [isExecuting, setIsExecuting] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  const handleExecute = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isExecuting) return;

    const cmd = input.trim();
    setInput('');
    
    setLogs(prev => [...prev, {
      id: Date.now().toString(),
      type: 'command',
      content: cmd,
      timestamp: new Date()
    }]);

    setIsExecuting(true);

    // Simulate MCP Server execution
    setTimeout(() => {
      let output = '';
      let txHash = '0x' + Array.from({length: 64}, () => Math.floor(Math.random()*16).toString(16)).join('');
      
      if (cmd.includes('df -h')) {
        output = 'Filesystem      Size  Used Avail Use% Mounted on\n/dev/root        20G   12G  8.0G  60% /\ntmpfs           3.9G     0  3.9G   0% /dev/shm';
      } else if (cmd === 'list_servers') {
        output = 'prod-web (AWS EC2, us-east-1)\ndev-db (DigitalOcean, nyc3)';
      } else {
        output = `Command executed successfully via Libcloud abstraction.`;
      }

      setLogs(prev => [
        ...prev,
        {
          id: Date.now().toString() + '-out',
          type: 'output',
          content: output,
          timestamp: new Date()
        },
        {
          id: Date.now().toString() + '-audit',
          type: 'audit',
          content: `Audit TX: ${txHash}`,
          timestamp: new Date()
        }
      ]);
      setIsExecuting(false);
    }, 1500);
  };

  return (
    <div className="h-full flex flex-col bg-zinc-950 border border-zinc-800/50 rounded-xl overflow-hidden shadow-2xl">
      <div className="h-10 bg-zinc-900 border-b border-zinc-800/50 flex items-center px-4 gap-2">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
          <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50" />
        </div>
        <div className="ml-4 flex items-center gap-2 text-xs text-zinc-500 font-mono">
          <TerminalIcon className="w-3 h-3" />
          agent@infrastructure-os:~
        </div>
      </div>
      
      <div className="flex-1 overflow-auto p-4 font-mono text-sm space-y-4">
        {logs.map(log => (
          <div key={log.id} className="flex flex-col gap-1">
            {log.type === 'command' && (
              <div className="flex items-start gap-2 text-zinc-300">
                <span className="text-indigo-400 mt-0.5">❯</span>
                <span className="break-all">{log.content}</span>
              </div>
            )}
            {log.type === 'output' && (
              <div className="text-zinc-400 whitespace-pre-wrap pl-4">
                {log.content}
              </div>
            )}
            {log.type === 'system' && (
              <div className="text-zinc-500 italic pl-4">
                // {log.content}
              </div>
            )}
            {log.type === 'audit' && (
              <div className="text-emerald-500/70 text-xs pl-4 flex items-center gap-2 mt-1">
                <ShieldCheck className="w-3 h-3" />
                {log.content}
              </div>
            )}
          </div>
        ))}
        {isExecuting && (
          <div className="flex items-center gap-2 text-zinc-500 pl-4">
            <Loader2 className="w-3 h-3 animate-spin" />
            <span className="text-xs">Executing via MCP Server...</span>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <form onSubmit={handleExecute} className="p-4 bg-zinc-900/50 border-t border-zinc-800/50">
        <div className="relative flex items-center">
          <span className="absolute left-3 text-indigo-400 font-mono text-sm">❯</span>
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="e.g., manage_server(target='aws-prod', cmd='df -h')"
            className="w-full bg-zinc-950 border border-zinc-800 rounded-lg py-2.5 pl-8 pr-12 text-sm font-mono text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all"
            disabled={isExecuting}
          />
          <button 
            type="submit"
            disabled={!input.trim() || isExecuting}
            className="absolute right-2 p-1.5 text-zinc-400 hover:text-indigo-400 disabled:opacity-50 disabled:hover:text-zinc-400 transition-colors"
          >
            <Play className="w-4 h-4" />
          </button>
        </div>
      </form>
    </div>
  );
}
