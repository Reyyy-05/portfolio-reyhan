'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Terminal, CornerDownLeft, Sparkles } from 'lucide-react';

interface OutputLine {
  type: 'input' | 'output' | 'system';
  text: string;
}

export const RetroDevConsole: React.FC = () => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<OutputLine[]>([
    { type: 'system', text: 'ReyhanOS v2.4 (Interactive Dev Terminal)' },
    { type: 'system', text: 'Ketik "help" atau klik perintah cepat di bawah ini untuk menjelajah.' },
  ]);
  const terminalBodyRef = useRef<HTMLDivElement>(null);
  const isFirstRender = useRef(true);

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    const newHistory: OutputLine[] = [...history, { type: 'input', text: `$ ${cmd}` }];

    switch (trimmed) {
      case 'help':
        newHistory.push({
          type: 'output',
          text: 'Perintah tersedia: whoami, projects, skills, internship, contact, clear',
        });
        break;
      case 'whoami':
        newHistory.push({
          type: 'output',
          text: 'Reyhan Albar Fahryan: Mahasiswa S1 Informatika (Sem 6) & Web Development Intern di Creativemu Academy.',
        });
        break;
      case 'projects':
        newHistory.push({
          type: 'output',
          text: '10 Repositori Publik: IMGN Concept (Next.js/Supabase), StatProv (SHA-256), BioLearn (Expo), MasjidFlow (Zustand), Kairav Studio (Astro/GSAP)...',
        });
        break;
      case 'internship':
        newHistory.push({
          type: 'output',
          text: 'Creativemu Academy: Mengembangkan landing page modern berbasis Next.js dan Tailwind CSS, migrasi arsitektur UI.',
        });
        break;
      case 'skills':
        newHistory.push({
          type: 'output',
          text: 'Core: Next.js, React, TypeScript, Tailwind CSS, Zustand, Expo React Native, Supabase, PostgreSQL, Prisma.',
        });
        break;
      case 'contact':
        newHistory.push({
          type: 'output',
          text: 'Email: rayhanalbar75@gmail.com | WA: +62 877-0018-7692 | GitHub: @Reyyy-05',
        });
        break;
      case 'clear':
        setHistory([]);
        setInput('');
        return;
      case '':
        break;
      default:
        newHistory.push({
          type: 'output',
          text: `Perintah tidak dikenal: "${cmd}". Ketik "help" untuk melihat daftar perintah.`,
        });
        break;
    }

    setHistory(newHistory);
    setInput('');
  };

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
    }
  }, [history]);

  const quickButtons = ['whoami', 'internship', 'projects', 'skills', 'contact', 'clear'];

  return (
    <section className="py-16 relative bg-bg">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Terminal Window Frame */}
        <div className="bg-[#0A0E17] border-2 border-border/90 rounded-2xl overflow-hidden shadow-pixel">
          
          {/* Terminal Window Header */}
          <div className="bg-bg-surface/90 px-4 py-2.5 border-b border-border flex items-center justify-between select-none">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block"></span>
              <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block"></span>
              <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block"></span>
              <span className="font-mono text-xs text-text-muted ml-2">bash - reyhan@devbox:~</span>
            </div>
            <div className="font-mono text-[10px] text-accent flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              <span>RETRO TERMINAL</span>
            </div>
          </div>

          {/* Terminal Body */}
          <div
            ref={terminalBodyRef}
            className="p-4 sm:p-6 font-mono text-xs text-slate-300 min-h-[220px] max-h-[340px] overflow-y-auto space-y-2"
          >
            {history.map((line, idx) => (
              <div
                key={idx}
                className={`${
                  line.type === 'input'
                    ? 'text-accent font-semibold'
                    : line.type === 'system'
                    ? 'text-cyan-400'
                    : 'text-slate-300'
                }`}
              >
                {line.text}
              </div>
            ))}
          </div>

          {/* Command Input Row */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleCommand(input);
            }}
            className="border-t border-border/80 bg-bg-surface/40 p-3 flex items-center gap-2"
          >
            <span className="font-mono text-xs text-accent font-bold pl-2">$</span>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="ketik perintah di sini (misal: whoami, projects)..."
              className="flex-1 bg-transparent border-none outline-none font-mono text-xs text-text-primary placeholder:text-text-muted"
            />
            <button
              type="submit"
              className="p-1.5 text-accent hover:bg-accent/10 rounded-lg transition-colors"
              aria-label="Send Command"
            >
              <CornerDownLeft className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Command Chips */}
          <div className="bg-bg-card/90 px-4 py-2 border-t border-border/40 flex flex-wrap items-center gap-2">
            <span className="font-mono text-[10px] text-text-muted">Perintah Cepat:</span>
            {quickButtons.map((qb) => (
              <button
                key={qb}
                type="button"
                onClick={() => handleCommand(qb)}
                className="font-mono text-[10px] bg-bg-surface text-slate-300 hover:text-accent hover:border-accent/40 border border-border/60 rounded px-2 py-0.5 transition-colors"
              >
                {qb}
              </button>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};
