"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { KeyboardEvent, ReactNode } from "react";

export type TerminalCommandResult = ReactNode | "CLEAR" | null;
export type TerminalCommandHandler = (args: string[], raw: string) => TerminalCommandResult;

export type BashTerminalProps = {
  /** Prompt segments, e.g. "guest@dipras:~$" */
  user?: string;
  host?: string;
  cwd?: string;
  /** Text in the window's title bar. Defaults to "user@host: cwd". */
  windowTitle?: string;
  /** Command name -> handler. Looked up by the first whitespace-separated token. */
  commands: Record<string, TerminalCommandHandler>;
  /** Called when the typed command has no matching handler. */
  unknownCommand?: (cmd: string, args: string[], raw: string) => TerminalCommandResult;
  /** Command strings auto-typed and run on mount, in order, before the prompt opens. */
  bootSequence?: string[];
  typingSpeedMs?: number;
  className?: string;
};

type HistoryEntry = {
  id: number;
  command: string;
  output: ReactNode;
};

let idCounter = 0;

function defaultUnknownCommand(cmd: string): ReactNode {
  return `bash: ${cmd}: command not found. Type 'help' to see available commands.`;
}

function Prompt({ user, host, cwd }: { user: string; host: string; cwd: string }) {
  return (
    <span className="shrink-0 select-none">
      <span className="text-emerald-400">{user}</span>
      <span className="text-slate-500">@</span>
      <span className="text-sky-400">{host}</span>
      <span className="text-slate-500">:</span>
      <span className="text-blue-400">{cwd}</span>
      <span className="text-slate-500">$</span>
    </span>
  );
}

export default function BashTerminal({
  user = "guest",
  host = "localhost",
  cwd = "~",
  windowTitle,
  commands,
  unknownCommand = defaultUnknownCommand,
  bootSequence = [],
  typingSpeedMs = 35,
  className = "",
}: BashTerminalProps) {
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [typingCommand, setTypingCommand] = useState<string | null>(null);
  const [booted, setBooted] = useState(bootSequence.length === 0);
  const [input, setInput] = useState("");
  const cmdHistoryRef = useRef<string[]>([]);
  const historyIndexRef = useRef<number | null>(null);
  const cancelledRef = useRef(false);
  const bodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const commandsRef = useRef(commands);
  commandsRef.current = commands;
  const unknownRef = useRef(unknownCommand);
  unknownRef.current = unknownCommand;

  const pushHistory = useCallback((command: string, output: ReactNode) => {
    idCounter += 1;
    setHistory((prev) => [...prev, { id: idCounter, command, output }]);
  }, []);

  const resolveCommand = useCallback((raw: string): TerminalCommandResult => {
    const trimmed = raw.trim();
    if (!trimmed) return null;
    const [cmd, ...args] = trimmed.split(/\s+/);
    const handler = commandsRef.current[cmd];
    if (handler) return handler(args, raw);
    return unknownRef.current(cmd, args, raw);
  }, []);

  useEffect(() => {
    if (bootSequence.length === 0) return;
    const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
    const typeCommand = (cmd: string) =>
      new Promise<void>((resolve) => {
        let i = 0;
        setTypingCommand("");
        const tick = () => {
          if (cancelledRef.current) return resolve();
          i += 1;
          setTypingCommand(cmd.slice(0, i));
          if (i < cmd.length) {
            setTimeout(tick, typingSpeedMs);
          } else {
            setTimeout(resolve, 250);
          }
        };
        tick();
      });

    async function boot() {
      for (const cmd of bootSequence) {
        if (cancelledRef.current) return;
        await typeCommand(cmd);
        if (cancelledRef.current) return;
        pushHistory(cmd, resolveCommand(cmd));
        setTypingCommand(null);
        await sleep(200);
      }
      if (!cancelledRef.current) setBooted(true);
    }

    boot();
    return () => {
      cancelledRef.current = true;
    };
    // Runs once on mount to play the boot sequence; not re-run on prop changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [history, typingCommand]);

  useEffect(() => {
    if (booted) inputRef.current?.focus();
  }, [booted]);

  const focusInput = () => inputRef.current?.focus();

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      const raw = input;
      setInput("");
      if (raw.trim()) cmdHistoryRef.current.push(raw);
      historyIndexRef.current = null;
      const result = resolveCommand(raw);
      if (result === "CLEAR") {
        setHistory([]);
      } else {
        pushHistory(raw, result);
      }
      return;
    }
    if (event.key === "ArrowUp") {
      event.preventDefault();
      const cmds = cmdHistoryRef.current;
      if (cmds.length === 0) return;
      const nextIndex = historyIndexRef.current === null ? cmds.length - 1 : Math.max(0, historyIndexRef.current - 1);
      historyIndexRef.current = nextIndex;
      setInput(cmds[nextIndex]);
      return;
    }
    if (event.key === "ArrowDown") {
      event.preventDefault();
      const cmds = cmdHistoryRef.current;
      if (historyIndexRef.current === null) return;
      const nextIndex = historyIndexRef.current + 1;
      if (nextIndex >= cmds.length) {
        historyIndexRef.current = null;
        setInput("");
      } else {
        historyIndexRef.current = nextIndex;
        setInput(cmds[nextIndex]);
      }
    }
  };

  const title = windowTitle ?? `${user}@${host}: ${cwd}`;

  return (
    <div className={`relative flex flex-col bg-slate-900 ${className}`}>
      <div className="h-10 shrink-0 flex items-center gap-2 px-4 bg-slate-800/80 border-b border-slate-700/60">
        <div className="flex gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
        </div>
        <p className="flex-1 text-center text-xs font-mono text-slate-400">{title}</p>
      </div>
      <div
        ref={bodyRef}
        onClick={focusInput}
        className="flex-1 overflow-y-auto px-4 py-3 font-mono text-[13px] leading-relaxed text-slate-300 cursor-text"
      >
        {history.map((entry) => (
          <div key={entry.id} className="mb-2">
            <div className="flex flex-wrap items-baseline gap-1.5">
              <Prompt user={user} host={host} cwd={cwd} />
              <span className="text-slate-100 break-all">{entry.command}</span>
            </div>
            {entry.output !== null && <div className="mt-0.5">{entry.output}</div>}
          </div>
        ))}
        {typingCommand !== null ? (
          <div className="flex flex-wrap items-baseline gap-1.5">
            <Prompt user={user} host={host} cwd={cwd} />
            <span className="text-slate-100">
              {typingCommand}
              <span className="inline-block w-[7px] h-[14px] ml-0.5 bg-sky-400 align-middle animate-pulse" />
            </span>
          </div>
        ) : (
          booted && (
            <div className="flex items-baseline gap-1.5">
              <Prompt user={user} host={host} cwd={cwd} />
              <input
                ref={inputRef}
                value={input}
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 min-w-[2ch] bg-transparent outline-none text-slate-100 caret-sky-400"
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck={false}
                aria-label="Terminal input"
              />
            </div>
          )
        )}
      </div>
    </div>
  );
}
