import React, { useMemo, useState } from 'react';
import { Eye, EyeOff, Lock, Mail, User } from 'lucide-react';

function isEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function Input({ label, icon: Icon, type = 'text', value, onChange, placeholder, error, rightSlot }) {
  return (
    <label className="block w-full">
      <span className="text-sm text-slate-300">{label}</span>
      <div className={`mt-1 flex items-center gap-2 rounded-lg border bg-slate-900/60 px-3 py-2 ring-1 ${error ? 'ring-rose-500/60 border-rose-500/40' : 'ring-white/10 border-white/10'} focus-within:ring-cyan-400/60`}>
        {Icon && <Icon className="w-4 h-4 text-slate-400" />}
        <input
          type={type}
          className="flex-1 bg-transparent outline-none text-slate-100 placeholder:text-slate-500"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
        />
        {rightSlot}
      </div>
      {error && <span className="mt-1 block text-xs text-rose-400">{error}</span>}
    </label>
  );
}

function TagInput({ label, value, onChange, placeholder }) {
  const [input, setInput] = useState('');

  const addTag = (tag) => {
    const t = tag.trim();
    if (!t) return;
    if (value.includes(t)) return;
    onChange([...value, t]);
    setInput('');
  };

  return (
    <div>
      <span className="text-sm text-slate-300">{label}</span>
      <div className="mt-1 flex flex-wrap items-center gap-2 rounded-lg border bg-slate-900/60 px-3 py-2 ring-1 ring-white/10 border-white/10 focus-within:ring-cyan-400/60">
        {value.map((tag) => (
          <span key={tag} className="inline-flex items-center gap-1 px-2 py-1 text-xs rounded-md bg-cyan-500/10 text-cyan-300 ring-1 ring-cyan-500/30">
            {tag}
            <button type="button" className="text-cyan-300/80 hover:text-cyan-200" onClick={() => onChange(value.filter((t) => t !== tag))}>×</button>
          </span>
        ))}
        <input
          className="flex-1 min-w-[8rem] bg-transparent outline-none text-slate-100 placeholder:text-slate-500"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={placeholder}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ',') {
              e.preventDefault();
              addTag(input);
            }
          }}
        />
        <button type="button" onClick={() => addTag(input)} className="text-xs px-2 py-1 rounded-md bg-slate-800 text-slate-200 hover:bg-slate-700">Add</button>
      </div>
    </div>
  );
}

function PasswordInput({ label, value, onChange, placeholder, error }) {
  const [show, setShow] = useState(false);
  return (
    <Input
      label={label}
      icon={Lock}
      type={show ? 'text' : 'password'}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      error={error}
      rightSlot={
        <button type="button" onClick={() => setShow((s) => !s)} className="text-slate-400 hover:text-slate-200">
          {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
        </button>
      }
    />
  );
}

export function LoginPanel({ onSubmit }) {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');

  const errors = useMemo(() => {
    const e = {};
    if (!identifier) e.identifier = 'Email or username is required';
    else {
      const looksEmail = identifier.includes('@');
      if (looksEmail && !isEmail(identifier)) e.identifier = 'Invalid email format';
      if (!looksEmail && (identifier.length < 3 || identifier.length > 50)) e.identifier = 'Username must be 3-50 characters';
    }
    if (!password) e.password = 'Password is required';
    else if (password.length < 8 || password.length > 64) e.password = 'Password must be 8-64 characters';
    return e;
  }, [identifier, password]);

  const canSubmit = Object.keys(errors).length === 0;

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (!canSubmit) return;
        onSubmit?.({ identifier, password });
      }}
      className="space-y-3"
    >
      <Input label="Email or Username" icon={User} value={identifier} onChange={setIdentifier} placeholder="jane@doe.com or janedoe" error={errors.identifier} />
      <PasswordInput label="Password" value={password} onChange={setPassword} placeholder="••••••••" error={errors.password} />
      <button
        type="submit"
        disabled={!canSubmit}
        className={`w-full mt-1 inline-flex items-center justify-center rounded-lg px-4 py-2.5 text-sm font-medium transition ${canSubmit ? 'bg-cyan-500 text-slate-900 hover:bg-cyan-400' : 'bg-slate-800 text-slate-500 cursor-not-allowed'}`}
      >
        Sign in
      </button>
    </form>
  );
}

export function RegisterPanel({ onSubmit }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [skills, setSkills] = useState([]);
  const [years, setYears] = useState('');
  const [desc, setDesc] = useState('');
  const [role, setRole] = useState('Member');

  const errors = useMemo(() => {
    const e = {};
    if (!name.trim()) e.name = 'Name is required';
    if (!email) e.email = 'Email is required';
    else if (!isEmail(email)) e.email = 'Invalid email';
    if (!password) e.password = 'Password is required';
    else if (password.length < 8 || password.length > 64) e.password = 'Password must be 8-64 characters';
    if (!years || Number.isNaN(Number(years)) || Number(years) < 0) e.years = 'Enter valid years';
    if (!desc.trim()) e.desc = 'Add a short experience description';
    return e;
  }, [name, email, password, years, desc]);

  const canSubmit = Object.keys(errors).length === 0;

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (!canSubmit) return;
        onSubmit?.({ name, email, password, skills, experience_years: Number(years), experience_desc: desc, role });
      }}
      className="space-y-3"
    >
      <Input label="Full Name" icon={User} value={name} onChange={setName} placeholder="Jane Doe" error={errors.name} />
      <Input label="Email" icon={Mail} value={email} onChange={setEmail} placeholder="jane@company.com" error={errors.email} />
      <PasswordInput label="Password" value={password} onChange={setPassword} placeholder="••••••••" error={errors.password} />
      <TagInput label="Skills" value={skills} onChange={setSkills} placeholder="Type a skill and press Enter" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <Input label="Experience (years)" value={years} onChange={setYears} placeholder="3" type="number" error={errors.years} />
        <Input label="Role" value={role} onChange={setRole} placeholder="Member or Lead" />
      </div>
      <label className="block">
        <span className="text-sm text-slate-300">Experience Description</span>
        <textarea
          className={`mt-1 w-full rounded-lg bg-slate-900/60 px-3 py-2 text-slate-100 ring-1 ${errors.desc ? 'ring-rose-500/60' : 'ring-white/10'} outline-none`}
          rows={3}
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          placeholder="Key projects and responsibilities"
        />
        {errors.desc && <span className="mt-1 block text-xs text-rose-400">{errors.desc}</span>}
      </label>
      <button
        type="submit"
        disabled={!canSubmit}
        className={`w-full mt-1 inline-flex items-center justify-center rounded-lg px-4 py-2.5 text-sm font-medium transition ${canSubmit ? 'bg-cyan-500 text-slate-900 hover:bg-cyan-400' : 'bg-slate-800 text-slate-500 cursor-not-allowed'}`}
      >
        Create account
      </button>
    </form>
  );
}

export function ForgotPasswordPanel({ onRequestToken, onReset }) {
  const [email, setEmail] = useState('');
  const [token, setToken] = useState('');
  const [password, setPassword] = useState('');
  const [stage, setStage] = useState('request');

  const errors = useMemo(() => {
    const e = {};
    if (stage === 'request') {
      if (!email) e.email = 'Email required';
      else if (!isEmail(email)) e.email = 'Invalid email';
    } else {
      if (!token.trim()) e.token = 'Token required';
      if (!password) e.password = 'Password required';
      else if (password.length < 8 || password.length > 64) e.password = 'Password must be 8-64 characters';
    }
    return e;
  }, [email, token, password, stage]);

  const canSubmit = Object.keys(errors).length === 0;

  return (
    <div className="space-y-3">
      {stage === 'request' ? (
        <form
          className="space-y-3"
          onSubmit={(e) => {
            e.preventDefault();
            if (!canSubmit) return;
            onRequestToken?.({ email });
            setStage('reset');
          }}
        >
          <Input label="Email" icon={Mail} value={email} onChange={setEmail} placeholder="jane@doe.com" error={errors.email} />
          <button type="submit" disabled={!canSubmit} className={`w-full inline-flex items-center justify-center rounded-lg px-4 py-2.5 text-sm font-medium transition ${canSubmit ? 'bg-cyan-500 text-slate-900 hover:bg-cyan-400' : 'bg-slate-800 text-slate-500 cursor-not-allowed'}`}>Send reset link</button>
        </form>
      ) : (
        <form
          className="space-y-3"
          onSubmit={(e) => {
            e.preventDefault();
            if (!canSubmit) return;
            onReset?.({ token, password });
          }}
        >
          <Input label="Token" icon={Lock} value={token} onChange={setToken} placeholder="Paste token here" error={errors.token} />
          <PasswordInput label="New Password" value={password} onChange={setPassword} placeholder="••••••••" error={errors.password} />
          <button type="submit" disabled={!canSubmit} className={`w-full inline-flex items-center justify-center rounded-lg px-4 py-2.5 text-sm font-medium transition ${canSubmit ? 'bg-cyan-500 text-slate-900 hover:bg-cyan-400' : 'bg-slate-800 text-slate-500 cursor-not-allowed'}`}>Reset password</button>
        </form>
      )}
    </div>
  );
}
