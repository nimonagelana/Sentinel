'use client'

import { useState } from 'react'
import { Activity, ArrowUpRight, Bell, Check, ChevronRight, CircleHelp, Crosshair, Eye, GitBranch, Layers3, Menu, Radio, ShieldCheck, Sparkles, TriangleAlert, X } from 'lucide-react'

type Signal = { id: string; x: number; y: number; tone: 'amber' | 'blue' | 'green'; label?: string }

const signals: Signal[] = [
  { id: 'SIG-07', x: 43, y: 43, tone: 'amber', label: 'water access' },
  { id: 'SIG-12', x: 51, y: 36, tone: 'blue', label: 'road closure' },
  { id: 'SIG-21', x: 58, y: 47, tone: 'green', label: 'verified' },
  { id: 'SIG-03', x: 64, y: 39, tone: 'blue' },
  { id: 'SIG-19', x: 69, y: 54, tone: 'amber' },
  { id: 'SIG-31', x: 36, y: 58, tone: 'amber' },
  { id: 'SIG-04', x: 76, y: 65, tone: 'green' },
  { id: 'SIG-28', x: 26, y: 35, tone: 'blue' },
  { id: 'SIG-42', x: 83, y: 28, tone: 'amber' },
  { id: 'SIG-16', x: 19, y: 70, tone: 'green' },
]

const stages = [
  ['01', 'FRAGMENTED', 'Raw observations enter the field.'],
  ['02', 'CONNECTED', 'Independent signals form a situation.'],
  ['03', 'VERIFIED', 'People add context to the pattern.'],
  ['04', 'ACTION', 'Response routes to those who need it.'],
  ['05', 'OUTCOME', 'Every decision leaves a trace.'],
]

export function SentinelApp() {
  const [selectedSignal, setSelectedSignal] = useState('SIG-07')
  const [stage, setStage] = useState(2)
  const [showReport, setShowReport] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  return (
    <main className="sentinel-shell">
      <div className="noise" aria-hidden="true" />
      <header className="topbar">
        <div className="brand"><span className="brand-mark"><span /></span><span>SENTINEL</span><small>SPATIAL INTELLIGENCE</small></div>
        <div className="top-meta"><span className="live-dot" />LIVE SYSTEM <span className="meta-divider" /> UTC 14:32:08</div>
        <button className="icon-button mobile-menu" aria-label="Open navigation"><Menu size={18} /></button>
        <nav><button className="nav-active">FIELD</button><button>ARCHIVE</button><button>PROTOCOL</button></nav>
        <button className="report-button" onClick={() => setShowReport(true)}><Radio size={14} /> REPORT A SIGNAL</button>
      </header>

      <section className="hero-copy">
        <div className="eyebrow"><span /> LIVE SPATIAL OVERVIEW / 09.19.26</div>
        <h1>See the signal.<br /><em>Understand</em> the situation.</h1>
        <p>Fragments become patterns. Patterns become decisions.<br />A civilian early-warning system with a trail you can trust.</p>
      </section>

      <section className="field-stage" aria-label="Live spatial signal field">
        <div className="field-label label-top"><span className="crosshair"><Crosshair size={13} /></span> SIGNAL FIELD <b>ZONE 04 / COASTAL CORRIDOR</b></div>
        <svg className="spatial-field" viewBox="0 0 100 100" preserveAspectRatio="none" role="img" aria-label="Abstract spatial field showing an emerging cluster of signals">
          <defs>
            <radialGradient id="haze"><stop stopColor="#3b82f6" stopOpacity=".2" /><stop offset="1" stopColor="#3b82f6" stopOpacity="0" /></radialGradient>
            <filter id="glow"><feGaussianBlur stdDeviation="1.2" /></filter>
          </defs>
          <ellipse cx="57" cy="45" rx="33" ry="26" fill="url(#haze)" />
          <g className="terrain-lines">{[15, 24, 33, 42, 51, 60, 69, 78, 87].map((y) => <path key={y} d={`M 4 ${y} Q 28 ${y - 7} 53 ${y} T 96 ${y - 3}`} />)}</g>
          <g className="connection-lines"><path d="M43 43 Q47 37 51 36" /><path d="M51 36 Q55 42 58 47" /><path d="M58 47 Q62 42 64 39" /><path d="M58 47 Q64 51 69 54" /><path d="M43 43 Q39 52 36 58" /></g>
          <path className="hull" d="M38 41 Q48 29 62 34 Q74 39 72 54 Q64 65 49 63 Q36 58 38 41Z" />
          <g className="flow-pulses"><circle cx="48" cy="38" r=".8" /><circle cx="60" cy="43" r=".8" /><circle cx="64" cy="52" r=".8" /></g>
          {signals.map((signal) => <g key={signal.id} className={`signal signal-${signal.tone} ${selectedSignal === signal.id ? 'is-selected' : ''}`} onClick={() => setSelectedSignal(signal.id)} tabIndex={0} role="button" aria-label={`${signal.id} ${signal.label ?? 'signal'}`}><circle className="signal-halo" cx={signal.x} cy={signal.y} r="3.4" /><circle cx={signal.x} cy={signal.y} r=".85" /><circle className="signal-ring" cx={signal.x} cy={signal.y} r="2.3" /></g>)}
        </svg>
        <div className="field-scale"><span>100 KM</span><i /><span>50 KM</span><i /><span>0</span></div>
        <div className="field-coords">34°12' N<br />18°04' E</div>
        <div className="field-label label-bottom"><span className="pulse-icon"><Activity size={13} /></span> 10 SIGNALS ACTIVE <b>UPDATED 12 SEC AGO</b></div>
      </section>

      <aside className="situation-panel glass-panel">
        <div className="panel-kicker"><span className="amber-dot" /> EMERGING SITUATION <span className="panel-id">{selectedSignal} <ArrowUpRight size={12} /></span></div>
        <div className="panel-heading"><div><h2>Coastal Corridor</h2><p>UNDER REVIEW <span>•</span> 18 MINUTES</p></div><div className="confidence">0.68<small>CONFIDENCE</small></div></div>
        <div className="telemetry-grid">{[['10','SIGNALS'],['4','SOURCES'],['01','VERIFIED']].map(([value, label]) => <div key={label}><strong>{value}</strong><span>{label}</span></div>)}</div>
        <div className="section-rule" />
        <div className="breakdown-title">SIGNAL BREAKDOWN <span>RAW TALLY</span></div>
        <div className="breakdown-bars">{[['REPORTED', '05', 'amber'], ['CORROBORATED', '03', 'blue'], ['VERIFIED', '01', 'green'], ['UNCERTAIN', '02', 'muted']].map(([label, value, tone]) => <div className="bar-row" key={label}><span>{label}</span><i className={`bar-${tone}`} style={{'--bar': `${Number(value) * 15 + 8}%`} as React.CSSProperties} /><b>{value}</b></div>)}</div>
        <div className="section-rule" />
        <div className="ai-label"><Sparkles size={12} /> SENTINEL AI <span>/ GROUNDED IN RECORDED DATA</span></div>
        <p className="brief">Multiple independent reports indicate <mark>restricted movement</mark> along the coastal corridor. Access to water remains the primary concern.</p>
        <div className="brief-tags"><span>REPORTED</span><span>UNCERTAIN</span><span>VERIFY NEXT</span></div>
        <button className="verify-button" onClick={() => setStage(3)}><ShieldCheck size={15} /> OPEN VERIFICATION TRAIL <ChevronRight size={15} /></button>
      </aside>

      <section className="progression"><div className="progress-title">SITUATION PROGRESSION <span>HUMAN-VERIFIED TRAIL</span></div><div className="stage-line">{stages.map(([number, label, detail], index) => <button key={label} className={`stage ${index <= stage ? 'stage-done' : ''} ${index === stage ? 'stage-current' : ''}`} onClick={() => setStage(index)}><span className="stage-number">{index < stage ? <Check size={12} /> : number}</span><span className="stage-label">{label}</span><small>{detail}</small></button>)}</div></section>

      <footer className="footer"><div><span className="footer-mark">S</span><span>INFORMATION MOVES FAST.<br /><em>TRUST NEEDS A TRAIL.</em></span></div><span className="footer-note">SENTINEL / CIVILIAN EARLY WARNING<br />FOR A WORLD THAT NEEDS TO KNOW</span><button className="help-button"><CircleHelp size={15} /> HOW IT WORKS</button></footer>

      {showReport && <div className="modal-backdrop" role="presentation"><div className="report-modal glass-panel" role="dialog" aria-modal="true" aria-labelledby="report-title"><button className="close-button" onClick={() => setShowReport(false)} aria-label="Close report"><X size={16} /></button>{submitted ? <div className="success-state"><div className="success-icon"><Check size={25} /></div><div className="panel-kicker"><span className="green-dot" /> SIGNAL RECORDED</div><h2 id="report-title">Your observation is now part of the trail.</h2><p>Signal ID <strong>SIG-8841-A</strong><br />Received 19 Sep 2026, 14:32 UTC</p><button className="verify-button" onClick={() => setShowReport(false)}>RETURN TO FIELD</button></div> : <><div className="panel-kicker"><span className="amber-dot" /> CIVILIAN REPORTING</div><h2 id="report-title">Report a signal.</h2><p className="modal-intro">You don&apos;t need to know whether it is true. Tell us what you observed.</p><label>OBSERVATION<textarea placeholder="Describe what you saw, heard, or experienced..." /></label><div className="form-row"><label>APPROXIMATE LOCATION<input placeholder="Place or coordinates" /></label><label>WHEN<input placeholder="Date / time" /></label></div><button className="verify-button" onClick={() => setSubmitted(true)}><Radio size={15} /> SUBMIT OBSERVATION <ArrowUpRight size={15} /></button><p className="privacy-note">Your report is encrypted and assigned a traceable signal ID.</p></>}</div></div>}
    </main>
  )
}

export default SentinelApp

const _unused = [Bell, Eye, GitBranch, Layers3, TriangleAlert]
void _unused
