import { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, Play, Loader2, ShieldCheck, Minimize2, HardDriveDownload } from 'lucide-react';
import { ServerConfig } from '../App';

interface LogEntry {
  id: string;
  type: 'command' | 'output' | 'system' | 'audit' | 'compaction';
  content: string;
  timestamp: Date;
}

export default function Terminal({ servers }: { servers: ServerConfig[] }) {
  const [input, setInput] = useState('');
  const [tokenUsage, setTokenUsage] = useState(2450);
  const maxTokens = 8192;
  
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
    },
    {
      id: '3',
      type: 'system',
      content: 'Secure SSH Key Vault is active. Try connecting to a new server: manage_server(target="dev-db", cmd="uptime")',
      timestamp: new Date()
    },
    {
      id: '4',
      type: 'system',
      content: 'Artifact handoff boundary mounted at /mnt/data.',
      timestamp: new Date()
    }
  ]);
  const [isExecuting, setIsExecuting] = useState(false);
  const [sshKeys, setSshKeys] = useState<Record<string, boolean>>({ 'prod-web': true });
  const [pendingCommand, setPendingCommand] = useState<{target: string, cmd: string} | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  const executeCommand = (target: string, cmd: string) => {
    setIsExecuting(true);
    setTimeout(() => {
      let output = '';
      let txHash = '0x' + Array.from({length: 64}, () => Math.floor(Math.random()*16).toString(16)).join('');
      let tokensUsed = Math.floor(Math.random() * 150) + 50;
      
      if (cmd.includes('df -h')) {
        output = 'Filesystem      Size  Used Avail Use% Mounted on\n/dev/root        20G   12G  8.0G  60% /\ntmpfs           3.9G     0  3.9G   0% /dev/shm\n/mnt/data      100G   1G   99G   1% /mnt/data';
      } else if (cmd === 'list_servers') {
        output = servers.map(s => `${s.id} (${s.provider}, ${s.region})`).join('\n');
      } else if (cmd.startsWith('load_skill')) {
        output = `Skill loaded into context successfully. Procedures are now available to the agent.`;
        tokensUsed += 300;
      } else if (cmd.includes('> /mnt/data/')) {
        output = `Artifact successfully written to handoff boundary: /mnt/data/`;
      } else {
        output = `Command '${cmd}' executed successfully on ${target} via Libcloud abstraction.`;
      }

      setTokenUsage(prev => Math.min(prev + tokensUsed, maxTokens));

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

  const handleExecute = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isExecuting) return;

    const cmd = input.trim();
    setInput('');
    
    setLogs(prev => [...prev, {
      id: Date.now().toString(),
      type: 'command',
      content: pendingCommand ? '********' : cmd,
      timestamp: new Date()
    }]);

    if (pendingCommand) {
      setSshKeys(prev => ({ ...prev, [pendingCommand.target]: true }));
      setLogs(prev => [...prev, {
        id: Date.now().toString() + '-sys',
        type: 'system',
        content: `SSH key securely stored for '${pendingCommand.target}' in MCP vault. Resuming execution...`,
        timestamp: new Date()
      }]);
      executeCommand(pendingCommand.target, pendingCommand.cmd);
      setPendingCommand(null);
      return;
    }

    const manageServerMatch = cmd.match(/manage_server\(\s*target=['"]([^'"]+)['"]\s*,\s*cmd=['"]([^'"]+)['"]\s*\)/);
    
    if (manageServerMatch) {
      const target = manageServerMatch[1];
      const command = manageServerMatch[2];
      
      if (!sshKeys[target]) {
        setLogs(prev => [...prev, {
          id: Date.now().toString() + '-sys',
          type: 'system',
          content: `[AUTH REQUIRED] No SSH key found for target '${target}'. Please provide the PEM key or password to continue:`,
          timestamp: new Date()
        }]);
        setPendingCommand({ target, cmd: command });
      } else {
        executeCommand(target, command);
      }
    } else {
      executeCommand('local', cmd);
    }
  };

  const handleCompact = () => {
    if (logs.length <= 4) return;
    
    setIsExecuting(true);
    setTimeout(() => {
      const compactedLogs = logs.slice(-2); // Keep only the last 2 logs
      const savedTokens = Math.floor(tokenUsage * 0.6);
      
      setLogs([
        {
          id: Date.now().toString() + '-compact',
          type: 'compaction',
          content: `[COMPACTION TRIGGERED] Summarized ${logs.length - 2} previous interactions. Context window optimized for long-running agent.`,
          timestamp: new Date()
        },
        ...compactedLogs
      ]);
      
      setTokenUsage(prev => Math.max(prev - savedTokens, 500));
      setIsExecuting(false);
    }, 1000);
  };

  return (
    <div className="h-full flex flex-col bg-zinc-950 border border-zinc-800/50 rounded-xl overflow-hidden shadow-2xl">
      <div className="h-10 bg-zinc-900 border-b border-zinc-800/50 flex items-center justify-between px-4">
        <div className="flex items-center gap-2">
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
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">Context</div>
            <div className="w-24 h-1.5 bg-zinc-800 rounded-full overflow-hidden">
              <div 
                className={`h-full rounded-full transition-all duration-500 ${tokenUsage / maxTokens > 0.8 ? 'bg-red-500' : tokenUsage / maxTokens > 0.5 ? 'bg-yellow-500' : 'bg-indigo-500'}`}
                style={{ width: `${(tokenUsage / maxTokens) * 100}%` }}
              />
            </div>
            <div className="text-[10px] font-mono text-zinc-400 w-16 text-right">
              {tokenUsage} / {maxTokens}
            </div>
          </div>
          <button 
            onClick={handleCompact}
            disabled={isExecuting || logs.length <= 4}
            className="flex items-center gap-1.5 px-2 py-1 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-[10px] uppercase tracking-wider font-medium rounded transition-colors disabled:opacity-50"
            title="Compact Context Window"
          >
            <Minimize2 className="w-3 h-3" />
            Compact
          </button>
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
            {log.type === 'compaction' && (
              <div className="text-indigo-400/80 text-xs pl-4 flex items-center gap-2 mt-2 mb-2 py-2 border-y border-indigo-500/20 bg-indigo-500/5">
                <Minimize2 className="w-3 h-3" />
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
            type={pendingCommand ? "password" : "text"}
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder={pendingCommand ? `Enter SSH Key / Password for ${pendingCommand.target}...` : "e.g., manage_server(target='aws-prod', cmd='df -h')"}
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
