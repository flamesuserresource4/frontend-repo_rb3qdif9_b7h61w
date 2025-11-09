import React from 'react';
import HeroSpline from './components/HeroSpline';
import AuthTabs from './components/AuthTabs';
import DashboardPreview from './components/DashboardPreview';
import { Moon, Sun } from 'lucide-react';

export default function App() {
  const [dark, setDark] = React.useState(true);

  React.useEffect(() => {
    const root = document.documentElement;
    if (dark) root.classList.add('dark');
    else root.classList.remove('dark');
  }, [dark]);

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-white">
      <header className="sticky top-0 z-20 backdrop-blur bg-slate-950/60 ring-1 ring-white/10">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-500 to-violet-500" />
            <span className="font-semibold">Flames.blue TeamOS</span>
          </div>
          <button onClick={() => setDark((d) => !d)} className="inline-flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm ring-1 ring-white/10 bg-slate-900/60">
            {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            <span className="hidden md:inline">{dark ? 'Light' : 'Dark'} mode</span>
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8 space-y-8">
        <HeroSpline />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AuthTabs />
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Snapshot</h2>
            <DashboardPreview />
          </div>
        </div>

        <section className="rounded-2xl bg-gradient-to-br from-cyan-500/10 to-violet-500/10 ring-1 ring-white/10 p-6">
          <h3 className="text-base font-medium text-slate-200">What’s included</h3>
          <ul className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-slate-300">
            <li>• Authentication with client-side validation</li>
            <li>• Role-aware views for Leads and Members</li>
            <li>• Project creation, Kanban, and analytics</li>
            <li>• Availability grid and skills tagging</li>
          </ul>
        </section>
      </main>

      <footer className="py-8 text-center text-sm text-slate-400">
        Built with ❤️ by Flames.blue
      </footer>
    </div>
  );
}
