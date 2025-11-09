import React from 'react';
import { BarChart3, Calendar, KanbanSquare, Users } from 'lucide-react';

export default function DashboardPreview() {
  const stat = (label, value) => (
    <div className="rounded-xl bg-slate-900/60 ring-1 ring-white/10 p-4">
      <div className="text-xs text-slate-400">{label}</div>
      <div className="mt-1 text-2xl font-semibold text-white">{value}</div>
    </div>
  );

  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="md:col-span-2 rounded-2xl bg-slate-900/60 ring-1 ring-white/10 p-4">
        <div className="flex items-center gap-2 text-slate-200">
          <KanbanSquare className="w-4 h-4" />
          <span className="text-sm font-medium">Sprint Progress</span>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-3">
          {stat('Backlog', 18)}
          {stat('In Progress', 9)}
          {stat('Done', 24)}
        </div>
        <div className="mt-6 h-28 rounded-lg bg-gradient-to-r from-cyan-500/20 via-transparent to-violet-500/20 ring-1 ring-white/10" />
      </div>
      <div className="space-y-4">
        <div className="rounded-2xl bg-slate-900/60 ring-1 ring-white/10 p-4">
          <div className="flex items-center gap-2 text-slate-200">
            <BarChart3 className="w-4 h-4" />
            <span className="text-sm font-medium">Velocity</span>
          </div>
          <div className="mt-4 h-24 rounded-lg bg-gradient-to-tr from-emerald-400/20 to-cyan-400/20 ring-1 ring-white/10" />
        </div>
        <div className="rounded-2xl bg-slate-900/60 ring-1 ring-white/10 p-4">
          <div className="flex items-center gap-2 text-slate-200">
            <Calendar className="w-4 h-4" />
            <span className="text-sm font-medium">Upcoming Deadlines</span>
          </div>
          <ul className="mt-3 space-y-2 text-sm text-slate-300">
            <li className="flex justify-between"><span>Beta Release</span><span className="text-slate-400">Fri</span></li>
            <li className="flex justify-between"><span>Docs Pass</span><span className="text-slate-400">Mon</span></li>
            <li className="flex justify-between"><span>Design Handoff</span><span className="text-slate-400">Nov 28</span></li>
          </ul>
        </div>
        <div className="rounded-2xl bg-slate-900/60 ring-1 ring-white/10 p-4">
          <div className="flex items-center gap-2 text-slate-200">
            <Users className="w-4 h-4" />
            <span className="text-sm font-medium">Team Snapshot</span>
          </div>
          <div className="mt-3 grid grid-cols-3 gap-2 text-xs text-slate-300">
            <div className="rounded-lg bg-slate-800/60 p-2">Leads: 3</div>
            <div className="rounded-lg bg-slate-800/60 p-2">Members: 14</div>
            <div className="rounded-lg bg-slate-800/60 p-2">Capacity: 82%</div>
          </div>
        </div>
      </div>
    </section>
  );
}
