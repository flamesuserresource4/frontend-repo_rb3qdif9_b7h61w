import React, { useState } from 'react';
import { LoginPanel, RegisterPanel, ForgotPasswordPanel } from './AuthPanels';

export default function AuthTabs() {
  const [tab, setTab] = useState('login');

  return (
    <section className="rounded-2xl bg-slate-950/60 ring-1 ring-white/10 backdrop-blur p-4 md:p-6">
      <div className="flex items-center gap-2 rounded-lg bg-slate-900/60 p-1 ring-1 ring-white/10">
        {[
          { k: 'login', label: 'Login' },
          { k: 'register', label: 'Register' },
          { k: 'forgot', label: 'Forgot Password' },
        ].map((t) => (
          <button
            key={t.k}
            onClick={() => setTab(t.k)}
            className={`flex-1 rounded-md px-3 py-2 text-sm font-medium transition ${tab === t.k ? 'bg-cyan-500 text-slate-900' : 'text-slate-300 hover:text-white'}`}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div className="mt-4">
        {tab === 'login' && (
          <LoginPanel onSubmit={(data) => {
            alert(`Login with ${JSON.stringify(data)}`);
          }} />
        )}
        {tab === 'register' && (
          <RegisterPanel onSubmit={(data) => {
            alert(`Register with ${JSON.stringify(data)}`);
          }} />
        )}
        {tab === 'forgot' && (
          <ForgotPasswordPanel onRequestToken={(data) => alert(`Request token for ${JSON.stringify(data)}`)} onReset={(data) => alert(`Reset password with ${JSON.stringify(data)}`)} />
        )}
      </div>
    </section>
  );
}
