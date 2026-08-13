"use client";

import Image from "next/image";
import { BashTerminal } from "@/components/terminal";
import type { TerminalCommandHandler } from "@/components/terminal";

const FILES: Record<string, string> = {
  "about.md": `# Aldy Prastyo (Dipras)

Cheerful yet introverted developer who loves exploring how things
work, from the lowest bits in C to high-level JavaScript.

Currently studying at Telkom University Surabaya and working as a
full-stack developer.`,
  "skills.sh": `#!/bin/bash
languages=(JavaScript PHP C)
frameworks=(React Native)
systems=(Linux Bash Git)

echo "Full-stack dev with a soft spot for the metal."`,
  "contact.txt": `Email       dipras75@gmail.com
GitHub      github.com/dipras
LinkedIn    linkedin.com/in/aldy-prastyo
Availability Remote / Worldwide`,
};

const SWATCHES = ["bg-sky-400", "bg-emerald-400", "bg-amber-400", "bg-rose-400", "bg-violet-400", "bg-slate-400"];

function FastfetchOutput() {
  return (
    <div className="flex gap-4 pt-1">
      <div className="relative w-20 h-20 shrink-0 rounded-lg overflow-hidden border border-slate-700">
        <Image src="/about.webp" alt="Aldy Prastyo" fill sizes="80px" className="object-cover" />
      </div>
      <div className="min-w-0 text-[12.5px] leading-relaxed">
        <p className="text-sky-400 font-bold">guest@dipras</p>
        <p className="text-slate-500">------------</p>
        <p><span className="text-sky-400">OS</span>: Aldy Prastyo (Human v21)</p>
        <p><span className="text-sky-400">Host</span>: Telkom University Surabaya</p>
        <p><span className="text-sky-400">Role</span>: Full-Stack Developer</p>
        <p><span className="text-sky-400">Shell</span>: zsh</p>
        <p><span className="text-sky-400">Langs</span>: JavaScript, PHP, C</p>
        <p><span className="text-sky-400">Status</span>: 🟢 Open to opportunities</p>
        <div className="flex gap-1 pt-2">
          {SWATCHES.map((c) => (
            <span key={c} className={`w-3.5 h-3.5 rounded-sm ${c}`} />
          ))}
        </div>
      </div>
    </div>
  );
}

const HELP_ITEMS: [string, string][] = [
  ["fastfetch", "show system info (alias: neofetch)"],
  ["ls", "list files in this directory"],
  ["cat <file>", "print a file's contents"],
  ["whoami", "print the current user"],
  ["echo <text>", "print text back"],
  ["clear", "clear the terminal"],
  ["help", "show this list"],
];

function HelpOutput() {
  return (
    <div className="pt-1">
      {HELP_ITEMS.map(([cmd, desc]) => (
        <p key={cmd}>
          <span className="text-sky-400 inline-block w-28">{cmd}</span>
          <span className="text-slate-400">{desc}</span>
        </p>
      ))}
    </div>
  );
}

function LsOutput() {
  return (
    <div className="flex flex-wrap gap-x-5 gap-y-1 pt-1">
      {Object.keys(FILES).map((name) => (
        <span key={name} className="text-sky-300">
          {name}
        </span>
      ))}
      <span className="text-amber-300">resume.pdf</span>
    </div>
  );
}

function BootOutput() {
  return (
    <div className="pt-1 text-blue-300">
      <p>Booting dipras-portfolio v2.0...</p>
      <p>[OK] Loading modules</p>
      <p>[OK] React Native</p>
      <p>[OK] Linux Kernel v6.5</p>
      <p className="text-slate-400 pt-1">Welcome! Type &apos;help&apos; to see available commands.</p>
    </div>
  );
}

const catCommand: TerminalCommandHandler = ([name]) => {
  if (!name) return <p className="text-slate-400">usage: cat &lt;file&gt;</p>;
  if (name === "resume.pdf") {
    return (
      <p className="text-slate-400">
        cat: resume.pdf: binary file. Grab it from the{" "}
        <a href="/aldy_prastyo.pdf" className="text-sky-400 underline underline-offset-2" target="_blank" rel="noreferrer">
          Resume link
        </a>{" "}
        in the navbar instead.
      </p>
    );
  }
  const content = FILES[name];
  if (!content) {
    return <p className="text-slate-400">cat: {name}: No such file or directory</p>;
  }
  return <pre className="whitespace-pre-wrap text-slate-300 pt-1">{content}</pre>;
};

const commands: Record<string, TerminalCommandHandler> = {
  "help": () => <HelpOutput />,
  "fastfetch": () => <FastfetchOutput />,
  "neofetch": () => <FastfetchOutput />,
  "ls": () => <LsOutput />,
  "cat": catCommand,
  "whoami": () => "guest",
  "pwd": () => "/home/guest/dipras-portfolio",
  "echo": (args) => args.join(" "),
  "date": () => new Date().toString(),
  "clear": () => "CLEAR",
  "cd": () => "bash: cd: nice try, this isn't a real filesystem",
  "sudo": () => "guest is not in the sudoers file. This incident will be reported. (jk, it's a static site 😄)",
  "exit": () => "There's no escape from a static site. Try closing the tab instead 👋",
  "logout": () => "There's no escape from a static site. Try closing the tab instead 👋",
  "./init_portfolio.sh": () => <BootOutput />,
};

export default function PortfolioTerminal() {
  return (
    <BashTerminal
      user="guest"
      host="dipras"
      commands={commands}
      bootSequence={["./init_portfolio.sh", "fastfetch"]}
      className="w-full max-w-md h-[28rem] rounded-3xl overflow-hidden shadow-2xl shadow-sky-900/20 border border-slate-800"
    />
  );
}
