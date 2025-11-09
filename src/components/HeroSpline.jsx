import React from 'react';
import Spline from '@splinetool/react-spline';

export default function HeroSpline() {
  return (
    <section className="relative w-full h-[70vh] rounded-2xl overflow-hidden bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950">
      <div className="absolute inset-0">
        <Spline
          scene="https://prod.spline.design/qQUip0dJPqrrPryE/scene.splinecode"
          style={{ width: '100%', height: '100%' }}
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent pointer-events-none" />
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
        <span className="inline-flex items-center gap-2 text-xs md:text-sm px-3 py-1 rounded-full bg-cyan-400/10 text-cyan-300 ring-1 ring-cyan-400/30">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          Secure Team OS for modern leads & makers
        </span>
        <h1 className="mt-4 text-3xl md:text-5xl font-semibold tracking-tight text-white">
          Orchestrate Teams with Confidence
        </h1>
        <p className="mt-3 md:mt-4 max-w-2xl text-sm md:text-base text-slate-300">
          Auth, roles, dashboards, Kanban, availability, analytics, and AI suggestions — all in one cohesive workspace.
        </p>
      </div>
    </section>
  );
}
