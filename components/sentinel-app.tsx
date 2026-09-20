'use client'

import { useState } from 'react'
import { Activity, ArrowUpRight, Bell, Check, ChevronRight, CircleHelp, Crosshair, Eye, GitBranch, Layers3, Menu, Radio, ShieldCheck, Sparkles, TriangleAlert, X, AlertTriangle, MapPin, Clock } from 'lucide-react'

type SourceType = 'civilian' | 'health' | 'field' | 'organization'
type SignalStatus = 'REPORTED' | 'CORROBORATED' | 'VERIFIED' | 'UNCERTAIN' | 'CONTRADICTED'
type SituationStatus = 'REPORTED' | 'UNDER_REVIEW' | 'VERIFIED' | 'RESOLVED'

interface Signal {
  id: string
  x: number
  y: number
  tone: 'amber' | 'blue' | 'green'
  label?: string
  observation: string
  location: string
  timestamp: string
  sourceType: SourceType
  isIndependent: boolean
  relatedSignals: string[]
  status: SignalStatus
}

interface SubmittedReport extends Signal {
  receivedAt: string
}

interface Situation {
  id: string
  name: string
  location: string
  firstReported: string
  lastUpdated: string
  status: SituationStatus
  signalIds: string[]
  independentSourceCount: number
  verificationsNeeded: string[]
  evidence: { supporting: string[]; conflicting: string[] }
  aiSummary: {
    reported: string
    corroborated: string
    uncertain: string
    conflicting: string
    verificationNeeds: string[]
  }
  timelineEvents: TimelineEvent[]
}

interface TimelineEvent {
  time: string
  type: 'SIGNAL' | 'CONNECTION' | 'SITUATION' | 'BRIEF' | 'VERIFICATION' | 'RESPONSE' | 'OUTCOME'
  title: string
  details?: string
}

const signals: Signal[] = [
  {
    id: 'SIG-07',
    x: 43,
    y: 43,
    tone: 'amber',
    label: 'water access',
    observation: 'Reports of contaminated water in central zone',
    location: '34°12\' N 18°04\' E',
    timestamp: '08:12 UTC',
    sourceType: 'civilian',
    isIndependent: true,
    relatedSignals: ['SIG-12', 'SIG-21'],
    status: 'REPORTED',
  },
  {
    id: 'SIG-12',
    x: 51,
    y: 36,
    tone: 'blue',
    label: 'road closure',
    observation: 'Primary access road blocked by debris',
    location: '34°15\' N 18°08\' E',
    timestamp: '08:26 UTC',
    sourceType: 'field',
    isIndependent: true,
    relatedSignals: ['SIG-07'],
    status: 'CORROBORATED',
  },
  {
    id: 'SIG-21',
    x: 58,
    y: 47,
    tone: 'green',
    label: 'verified',
    observation: 'Health worker confirmed affected population',
    location: '34°14\' N 18°06\' E',
    timestamp: '08:41 UTC',
    sourceType: 'health',
    isIndependent: true,
    relatedSignals: ['SIG-07'],
    status: 'VERIFIED',
  },
  {
    id: 'SIG-03',
    x: 64,
    y: 39,
    tone: 'blue',
    observation: 'Second health sector report on access',
    location: '34°16\' N 18°09\' E',
    timestamp: '08:47 UTC',
    sourceType: 'health',
    isIndependent: false,
    relatedSignals: ['SIG-12'],
    status: 'CORROBORATED',
  },
  {
    id: 'SIG-19',
    x: 69,
    y: 54,
    tone: 'amber',
    observation: 'Field team reports supply chain disruption',
    location: '34°11\' N 18°11\' E',
    timestamp: '09:02 UTC',
    sourceType: 'field',
    isIndependent: true,
    relatedSignals: [],
    status: 'REPORTED',
  },
  {
    id: 'SIG-31',
    x: 36,
    y: 58,
    tone: 'amber',
    observation: 'Civilian reports displacement concerns',
    location: '34°09\' N 18°02\' E',
    timestamp: '09:15 UTC',
    sourceType: 'civilian',
    isIndependent: true,
    relatedSignals: [],
    status: 'UNCERTAIN',
  },
  {
    id: 'SIG-04',
    x: 76,
    y: 65,
    tone: 'green',
    observation: 'Field verification completed - situation confirmed',
    location: '34°10\' N 18°12\' E',
    timestamp: '09:27 UTC',
    sourceType: 'field',
    isIndependent: true,
    relatedSignals: ['SIG-07', 'SIG-12', 'SIG-21'],
    status: 'VERIFIED',
  },
  {
    id: 'SIG-28',
    x: 26,
    y: 35,
    tone: 'blue',
    observation: 'Organization field assessment begun',
    location: '34°13\' N 17°59\' E',
    timestamp: '09:34 UTC',
    sourceType: 'organization',
    isIndependent: false,
    relatedSignals: ['SIG-07'],
    status: 'REPORTED',
  },
  {
    id: 'SIG-42',
    x: 83,
    y: 28,
    tone: 'amber',
    observation: 'Medical supply shortage reported',
    location: '34°18\' N 18°15\' E',
    timestamp: '09:41 UTC',
    sourceType: 'health',
    isIndependent: true,
    relatedSignals: [],
    status: 'UNCERTAIN',
  },
  {
    id: 'SIG-16',
    x: 19,
    y: 70,
    tone: 'green',
    observation: 'Humanitarian response team deployed',
    location: '34°08\' N 17°57\' E',
    timestamp: '09:52 UTC',
    sourceType: 'organization',
    isIndependent: false,
    relatedSignals: ['SIG-07', 'SIG-12'],
    status: 'VERIFIED',
  },
]

const situation: Situation = {
  id: 'SIT-2026-041',
  name: 'Coastal Corridor Humanitarian Access',
  location: '34°12\' N 18°04\' E / ZONE 04',
  firstReported: '08:12 UTC',
  lastUpdated: '09:52 UTC',
  status: 'VERIFIED',
  signalIds: ['SIG-07', 'SIG-12', 'SIG-21', 'SIG-03', 'SIG-19', 'SIG-31', 'SIG-04', 'SIG-28', 'SIG-42', 'SIG-16'],
  independentSourceCount: 5,
  verificationsNeeded: ['Medical capacity assessment', 'Access route clearance timeline', 'Affected population count'],
  evidence: {
    supporting: [
      'Multiple independent civilian and field reports of access restriction',
      'Health sector confirmation of affected population',
      'Field team verified blocked primary route',
      'Supply chain disruption documented',
    ],
    conflicting: ['Initial reports suggested temporary blockage; later reports indicate structural damage'],
  },
  aiSummary: {
    reported: 'Fragmented reports indicate restricted movement and resource access challenges in the coastal corridor region.',
    corroborated: 'Multiple independent sources (civilians, health workers, field teams) confirm access restrictions and humanitarian needs.',
    uncertain: 'Exact number of affected civilians remains unclear. Medical supply chain disruption scope not fully determined.',
    conflicting: 'Nature of blockage remains partially unclear - initial temporary assessment conflicted with later structural damage reports.',
    verificationNeeds: [
      'Confirm exact nature and extent of primary route blockage',
      'Assess current medical supply availability',
      'Determine affected civilian population',
      'Evaluate secondary access routes',
    ],
  },
  timelineEvents: [
    {
      time: '08:12',
      type: 'SIGNAL',
      title: 'FIRST CIVILIAN SIGNAL',
      details: 'Water access concerns reported',
    },
    {
      time: '08:26',
      type: 'SIGNAL',
      title: 'INDEPENDENT FIELD SIGNAL',
      details: 'Road closure confirmed by separate source',
    },
    {
      time: '08:41',
      type: 'SIGNAL',
      title: 'HEALTH SECTOR VERIFICATION',
      details: 'Medical professional confirms affected population',
    },
    {
      time: '09:02',
      type: 'CONNECTION',
      title: 'SIGNALS CONNECTED',
      details: '4 independent sources identified',
    },
    {
      time: '09:10',
      type: 'SITUATION',
      title: 'EMERGING SITUATION CREATED',
      details: 'Pattern recognized - humanitarian access crisis',
    },
    {
      time: '09:18',
      type: 'BRIEF',
      title: 'AI SITUATION BRIEF GENERATED',
      details: 'Grounded in recorded data analysis',
    },
    {
      time: '09:27',
      type: 'VERIFICATION',
      title: 'FIELD VERIFICATION COMPLETED',
      details: 'Human field team confirmed situation',
    },
    {
      time: '09:34',
      type: 'RESPONSE',
      title: 'HUMANITARIAN ACTION ASSIGNED',
      details: 'Response team deployed to area',
    },
    {
      time: '09:52',
      type: 'OUTCOME',
      title: 'OUTCOME RECORDED',
      details: 'Initial assessment: 12 hours to restore primary access',
    },
  ],
}

const stages = [
  ['01', 'FRAGMENTED', 'Raw observations enter the field.'],
  ['02', 'CONNECTED', 'Independent signals form a situation.'],
  ['03', 'VERIFIED', 'People add context to the pattern.'],
  ['04', 'ACTION', 'Response routes to those who need it.'],
  ['05', 'OUTCOME', 'Every decision leaves a trace.'],
]

export function SentinelApp() {
  const [selectedSignal, setSelectedSignal] = useState('SIG-07')
  const [view, setView] = useState<'field' | 'signals' | 'situations' | 'verification' | 'response' | 'timeline'>('field')
  const [previousView, setPreviousView] = useState<typeof view>('field')
  const [stage, setStage] = useState(4)
  const [showReport, setShowReport] = useState(false)
  const [navOpen, setNavOpen] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [reportObservation, setReportObservation] = useState('')
  const [reportLocation, setReportLocation] = useState('')
  const [reportWhen, setReportWhen] = useState('')
  const [submittedReports, setSubmittedReports] = useState<SubmittedReport[]>(() => {
    if (typeof window === 'undefined') return []
    try {
      return JSON.parse(window.localStorage.getItem('sentinel-reports') ?? '[]')
    } catch {
      return []
    }
  })

  const allSignals = [...signals, ...submittedReports]
  const selectedSignalData = allSignals.find((s) => s.id === selectedSignal)
  const independentCount = allSignals.filter((s) => s.isIndependent).length
  const verifiedSignals = allSignals.filter((s) => s.status === 'VERIFIED')

  function navigateTo(nextView: typeof view) {
    setPreviousView(view)
    setView(nextView)
    setNavOpen(false)
  }

  function resetReportForm() {
    setSubmitted(false)
    setReportObservation('')
    setReportLocation('')
    setReportWhen('')
  }

  function submitReport() {
    const id = `SIG-${String(Date.now()).slice(-6)}`
    const report: SubmittedReport = {
      id,
      x: 50,
      y: 50,
      tone: 'amber',
      label: 'submitted report',
      observation: reportObservation.trim() || 'Civilian observation submitted',
      location: reportLocation.trim() || 'Location not provided',
      timestamp: reportWhen.trim() || 'Just now',
      sourceType: 'civilian',
      isIndependent: true,
      relatedSignals: [],
      status: 'REPORTED',
      receivedAt: new Date().toISOString(),
    }
    const nextReports = [...submittedReports, report]
    setSubmittedReports(nextReports)
    window.localStorage.setItem('sentinel-reports', JSON.stringify(nextReports))
    setSelectedSignal(id)
    setSubmitted(true)
  }

  return (
    <main className="sentinel-shell">
      <div className="noise" aria-hidden="true" />
      <header className="topbar">
        <div className="brand">
          <span className="brand-mark">
            <span />
          </span>
          <span>SENTINEL</span>
          <small>SPATIAL INTELLIGENCE</small>
        </div>
        <div className="top-meta">
          <span className="live-dot" />
          LIVE SYSTEM <span className="meta-divider" /> UTC 14:32:08
        </div>
        <button className="icon-button mobile-menu" aria-label="Open navigation" aria-expanded={navOpen} onClick={() => setNavOpen((open) => !open)}>
          <Menu size={18} />
        </button>
        <nav className={navOpen ? 'mobile-nav-open' : ''} aria-label="Main navigation">
          <button className={view === 'field' ? 'nav-active' : ''} onClick={() => navigateTo('field')}>DASHBOARD</button>
          <button className={view === 'signals' ? 'nav-active' : ''} onClick={() => navigateTo('signals')}>SIGNALS</button>
          <button className={view === 'situations' ? 'nav-active' : ''} onClick={() => navigateTo('situations')}>SITUATIONS</button>
          <button className={view === 'verification' ? 'nav-active' : ''} onClick={() => navigateTo('verification')}>VERIFIED</button>
          <button className={view === 'timeline' ? 'nav-active' : ''} onClick={() => navigateTo('timeline')}>TRAIL</button>
          <button onClick={() => { setShowReport(true); setNavOpen(false) }}>REPORT A SIGNAL</button>
        </nav>
        <button className="report-button" onClick={() => setShowReport(true)}>
          <Radio size={14} /> REPORT A SIGNAL
        </button>
      </header>

      {view === 'field' && (
        <>
          <section className="hero-copy">
            <div className="eyebrow">
              <span /> LIVE SPATIAL OVERVIEW / 09.19.26
            </div>
            <h1>
              See the signal.
              <br />
              <em>Understand</em> the situation.
            </h1>
            <p>
              Fragments become patterns. Patterns become decisions.
              <br />A civilian early-warning system with a trail you can trust.
            </p>
          </section>

          <section className="field-stage" aria-label="Live spatial signal field">
            <div className="field-label label-top">
              <span className="crosshair">
                <Crosshair size={13} />
              </span>
              SIGNAL FIELD <b>ZONE 04 / COASTAL CORRIDOR</b>
            </div>
            <svg
              className="spatial-field"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              role="img"
              aria-label="Abstract spatial field showing an emerging cluster of signals"
            >
              <defs>
                <radialGradient id="haze">
                  <stop stopColor="#3b82f6" stopOpacity=".2" />
                  <stop offset="1" stopColor="#3b82f6" stopOpacity="0" />
                </radialGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="1.2" />
                </filter>
              </defs>
              <ellipse cx="57" cy="45" rx="33" ry="26" fill="url(#haze)" />
              <g className="terrain-lines">
                {[15, 24, 33, 42, 51, 60, 69, 78, 87].map((y) => (
                  <path key={y} d={`M 4 ${y} Q 28 ${y - 7} 53 ${y} T 96 ${y - 3}`} />
                ))}
              </g>
              <g className="connection-lines">
                <path d="M43 43 Q47 37 51 36" />
                <path d="M51 36 Q55 42 58 47" />
                <path d="M58 47 Q62 42 64 39" />
                <path d="M58 47 Q64 51 69 54" />
                <path d="M43 43 Q39 52 36 58" />
              </g>
              <path className="hull" d="M38 41 Q48 29 62 34 Q74 39 72 54 Q64 65 49 63 Q36 58 38 41Z" />
              <g className="flow-pulses">
                <circle cx="48" cy="38" r=".8" />
                <circle cx="60" cy="43" r=".8" />
                <circle cx="64" cy="52" r=".8" />
              </g>
              {allSignals.map((signal) => (
                <g
                  key={signal.id}
                  className={`signal signal-${signal.tone} ${selectedSignal === signal.id ? 'is-selected' : ''}`}
                  onClick={() => setSelectedSignal(signal.id)}
                  tabIndex={0}
                  role="button"
                  aria-label={`${signal.id} ${signal.label ?? 'signal'}`}
                >
                  <circle className="signal-halo" cx={signal.x} cy={signal.y} r="3.4" />
                  <circle cx={signal.x} cy={signal.y} r=".85" />
                  <circle className="signal-ring" cx={signal.x} cy={signal.y} r="2.3" />
                </g>
              ))}
            </svg>
            <div className="field-scale">
              <span>100 KM</span>
              <i />
              <span>50 KM</span>
              <i />
              <span>0</span>
            </div>
            <div className="field-coords">
              34°12' N
              <br />
              18°04' E
            </div>
            <div className="field-label label-bottom">
              <span className="pulse-icon">
                <Activity size={13} />
              </span>
              10 SIGNALS ACTIVE <b>UPDATED 12 SEC AGO</b>
            </div>
          </section>

          <aside className="situation-panel glass-panel">
            <div className="panel-kicker">
              <span className="amber-dot" /> EMERGING SITUATION{' '}
              <span className="panel-id">
                {situation.id} <ArrowUpRight size={12} />
              </span>
            </div>
            <div className="panel-heading">
              <div>
                <h2>{situation.name}</h2>
                <p>
                  {situation.status === 'VERIFIED' ? (
                    <>
                      <span className="status-verified">VERIFIED</span> • 1 HR 40 MIN
                    </>
                  ) : (
                    <>
                      UNDER REVIEW <span>•</span> 18 MINUTES
                    </>
                  )}
                </p>
              </div>
              <div className="evidence-state">
                <div className="state-label">EVIDENCE STATE</div>
                <div className="state-value">
                  {independentCount} SOURCES
                </div>
              </div>
            </div>
            <div className="telemetry-grid">
              {[
                [situation.signalIds.length.toString(), 'SIGNALS'],
                [independentCount.toString(), 'INDEPENDENT'],
                [situation.timelineEvents.filter((e) => e.type === 'VERIFICATION').length.toString(), 'VERIFIED'],
              ].map(([value, label]) => (
                <div key={label}>
                  <strong>{value}</strong>
                  <span>{label}</span>
                </div>
              ))}
            </div>
            <div className="section-rule" />
            <div className="breakdown-title">
              SIGNAL EVIDENCE <span>BY STATUS</span>
            </div>
            <div className="breakdown-bars">
              {[
                ['REPORTED', signals.filter((s) => s.status === 'REPORTED').length.toString(), 'amber'],
                ['CORROBORATED', signals.filter((s) => s.status === 'CORROBORATED').length.toString(), 'blue'],
                ['VERIFIED', signals.filter((s) => s.status === 'VERIFIED').length.toString(), 'green'],
                ['UNCERTAIN', signals.filter((s) => s.status === 'UNCERTAIN').length.toString(), 'muted'],
              ].map(([label, value, tone]) => (
                <div className="bar-row" key={label}>
                  <span>{label}</span>
                  <i className={`bar-${tone}`} style={{ '--bar': `${Number(value) * 15 + 8}%` } as React.CSSProperties} />
                  <b>{value}</b>
                </div>
              ))}
            </div>
            <div className="section-rule" />
            <div className="ai-label">
              <Sparkles size={12} /> SENTINEL AI <span>/ GROUNDED IN RECORDED DATA</span>
            </div>
            <p className="brief">
              <strong>What is reported:</strong> {situation.aiSummary.reported}
            </p>
            <p className="brief">
              <strong>What is corroborated:</strong> {situation.aiSummary.corroborated}
            </p>
            <p className="brief" style={{ color: '#f59e0b' }}>
              <strong>What is uncertain:</strong> {situation.aiSummary.uncertain}
            </p>
            <p className="brief-disclaimer">Generated from recorded situation data. AI does not independently verify incidents.</p>
            <button className="verify-button" onClick={() => setView('verification')}>
              <ShieldCheck size={15} /> OPEN VERIFICATION TRAIL <ChevronRight size={15} />
            </button>
          </aside>
        </>
      )}

      {view === 'signals' && (
        <section className="verification-workspace glass-panel">
          <div className="workspace-header"><button className="back-button" onClick={() => setView(previousView)} aria-label="Return to previous page">← BACK</button><h2>REPORTS / SIGNALS</h2><p>Individual observations recorded in the signal field</p></div>
          <div className="evidence-list">
            {allSignals.map((signal) => (
              <button key={signal.id} className="evidence-item" onClick={() => { setSelectedSignal(signal.id); setView('field') }}>
                <Radio size={14} className="check-icon" /><span><strong>{signal.id}</strong> — {signal.observation}<br /><small>{signal.location} · {signal.timestamp} · {signal.status}</small></span>
              </button>
            ))}
          </div>
        </section>
      )}

      {view === 'situations' && (
        <section className="verification-workspace glass-panel">
          <div className="workspace-header"><button className="back-button" onClick={() => setView(previousView)} aria-label="Return to previous page">← BACK</button><h2>SITUATIONS</h2><p>Connected signals forming an emerging situation</p></div>
          <div className="summary-box"><div className="summary-item"><span className="label">{situation.id}</span><span className="value">{situation.name}</span></div><div className="summary-item"><span className="label">Status:</span><span className="value status-verified">{situation.status}</span></div><div className="summary-item"><span className="label">Signals:</span><span className="value">{allSignals.length}</span></div></div>
          <button className="verify-button" onClick={() => setView('verification')}><ShieldCheck size={15} /> VIEW VERIFIED INFORMATION <ChevronRight size={15} /></button>
        </section>
      )}

      {view === 'verification' && (
        <section className="verification-workspace glass-panel">
          <div className="workspace-header">
            <button className="back-button" onClick={() => setView(previousView)} aria-label="Return to previous page">← BACK</button>
            <h2>VERIFICATION WORKSPACE</h2>
            <p>Review evidence and human verification decision</p>
          </div>
          <div className="verification-content">
            <div className="verification-section">
              <h3>SITUATION SUMMARY</h3>
              <div className="summary-box">
                <div className="summary-item">
                  <span className="label">Location:</span>
                  <span className="value">{situation.location}</span>
                </div>
                <div className="summary-item">
                  <span className="label">First Reported:</span>
                  <span className="value">{situation.firstReported}</span>
                </div>
                <div className="summary-item">
                  <span className="label">Status:</span>
                  <span className="value status-verified">{situation.status}</span>
                </div>
              </div>
            </div>

            <div className="verification-section">
              <h3>SUPPORTING EVIDENCE</h3>
              <div className="evidence-list">
                {situation.evidence.supporting.map((item, idx) => (
                  <div key={idx} className="evidence-item">
                    <Check size={14} className="check-icon" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {situation.evidence.conflicting.length > 0 && (
              <div className="verification-section">
                <h3>CONFLICTING INFORMATION</h3>
                <div className="evidence-list">
                  {situation.evidence.conflicting.map((item, idx) => (
                    <div key={idx} className="evidence-item conflicting">
                      <AlertTriangle size={14} />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="verification-section">
              <h3>VERIFICATION REQUIREMENTS</h3>
              <div className="requirements-list">
                {situation.aiSummary.verificationNeeds.map((item, idx) => (
                  <div key={idx} className="requirement-item">
                    <span className="requirement-number">{idx + 1}</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="verification-actions">
              <button className="verify-button" onClick={() => setStage(4)}>
                <Check size={15} /> CONFIRM VERIFIED
              </button>
              <button className="verify-button secondary">
                REQUEST MORE EVIDENCE
              </button>
              <button className="verify-button secondary">
                MARK UNCERTAIN
              </button>
            </div>
          </div>
        </section>
      )}

      {view === 'response' && (
        <section className="response-workspace glass-panel">
          <div className="workspace-header">
            <h2>HUMANITARIAN RESPONSE</h2>
            <p>Coordinate and track response actions</p>
          </div>
          <div className="response-content">
            <div className="response-section">
              <h3>ACTIVE RESPONSE ACTIONS</h3>
              <div className="actions-list">
                <div className="action-item">
                  <div className="action-header">
                    <span className="action-type">FIELD ASSESSMENT</span>
                    <span className="action-status">IN PROGRESS</span>
                  </div>
                  <div className="action-details">
                    <div>
                      <span>Team:</span> Regional Humanitarian Organization
                    </div>
                    <div>
                      <span>Created:</span> 09:34 UTC
                    </div>
                    <div>
                      <span>Priority:</span> Access restoration
                    </div>
                  </div>
                </div>

                <div className="action-item">
                  <div className="action-header">
                    <span className="action-type">MEDICAL SUPPORT</span>
                    <span className="action-status">PENDING</span>
                  </div>
                  <div className="action-details">
                    <div>
                      <span>Team:</span> Health Sector Partner
                    </div>
                    <div>
                      <span>Created:</span> 09:45 UTC
                    </div>
                    <div>
                      <span>Priority:</span> Supply chain assessment
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="response-section">
              <h3>RESPONSE OUTCOMES</h3>
              <div className="outcomes-list">
                <div className="outcome-item">
                  <div className="outcome-time">09:52 UTC</div>
                  <div className="outcome-content">
                    <div className="outcome-type">✓ INITIAL ASSESSMENT</div>
                    <div>
                      Primary route blockage: structural debris. Estimated clearance time: 12 hours. Secondary route available for emergency supplies.
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="response-actions">
              <button className="verify-button">
                ADD RESPONSE ACTION
              </button>
              <button className="verify-button secondary">
                RECORD OUTCOME
              </button>
            </div>
          </div>
        </section>
      )}

      {view === 'timeline' && (
        <section className="timeline-workspace glass-panel">
          <div className="workspace-header">
            <button className="back-button" onClick={() => setView(previousView)} aria-label="Return to previous page">← BACK</button>
            <h2>DECISION TRAIL</h2>
            <p>Complete traceable record from signal to outcome</p>
          </div>
          <div className="timeline-content">
            <div className="timeline">
              {situation.timelineEvents.map((event, idx) => (
                <div key={idx} className={`timeline-event timeline-${event.type.toLowerCase()}`}>
                  <div className="timeline-marker" />
                  <div className="timeline-body">
                    <div className="timeline-time">{event.time}</div>
                    <div className="timeline-title">{event.type}</div>
                    <div className="timeline-event-title">{event.title}</div>
                    {event.details && <div className="timeline-details">{event.details}</div>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="progression">
        <div className="progress-title">
          SITUATION PROGRESSION <span>HUMAN-VERIFIED TRAIL</span>
        </div>
        <div className="stage-line">
          {stages.map(([number, label, detail], index) => (
            <button
              key={label}
              className={`stage ${index <= stage ? 'stage-done' : ''} ${index === stage ? 'stage-current' : ''}`}
              onClick={() => setStage(index)}
            >
              <span className="stage-number">
                {index < stage ? <Check size={12} /> : number}
              </span>
              <span className="stage-label">{label}</span>
              <small>{detail}</small>
            </button>
          ))}
        </div>
        <button className="verify-button" onClick={() => { setSelectedSignal(verifiedSignals[0]?.id ?? 'SIG-21'); setView('field') }}>
          <Eye size={15} /> OBSERVE YOUR VERIFIED REPORT SIGNAL <ChevronRight size={15} />
        </button>
      </section>

      <footer className="footer">
        <div>
          <span className="footer-mark">S</span>
          <span>
            INFORMATION MOVES FAST.
            <br />
            <em>TRUST NEEDS A TRAIL.</em>
          </span>
        </div>
        <span className="footer-note">
          SENTINEL / CIVILIAN EARLY WARNING
          <br />
          FOR A WORLD THAT NEEDS TO KNOW
        </span>
        <button className="help-button">
          <CircleHelp size={15} /> HOW IT WORKS
        </button>
      </footer>

      {showReport && (
        <div className="modal-backdrop" role="presentation">
          <div
            className="report-modal glass-panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby="report-title"
          >
            <button
              className="close-button"
              onClick={() => {
                setShowReport(false)
                resetReportForm()
              }}
              aria-label="Close report"
            >
              <X size={16} />
            </button>
            {submitted ? (
              <div className="success-state">
                <div className="success-icon">
                  <Check size={25} />
                </div>
                <div className="panel-kicker">
                  <span className="green-dot" /> SIGNAL RECORDED
                </div>
                <h2 id="report-title">Your observation is now part of the trail.</h2>
                <p>
                  Signal ID <strong>{submittedReports[submittedReports.length - 1]?.id}</strong>
                  <br />
                  Received 19 Sep 2026, 14:32 UTC
                </p>
                <p style={{ fontSize: '12px', color: '#8392a6', marginTop: '16px' }}>
                  Synthetic demo data — not a real incident
                </p>
                <button
                  className="verify-button"
                  onClick={() => {
                    setShowReport(false)
                    setSubmitted(false)
                  }}
                >
                  RETURN TO FIELD
                </button>
              </div>
            ) : (
              <>
                <div className="panel-kicker">
                  <span className="amber-dot" /> CIVILIAN REPORTING
                </div>
                <h2 id="report-title">Report a signal.</h2>
                <p className="modal-intro">
                  You don&apos;t need to know whether it is true. Tell us what you observed.
                </p>
                <label>
                  OBSERVATION
                  <textarea value={reportObservation} onChange={(event) => setReportObservation(event.target.value)} placeholder="Describe what you saw, heard, or experienced..." />
                </label>
                <div className="form-row">
                  <label>
                    APPROXIMATE LOCATION
                          <input value={reportLocation} onChange={(event) => setReportLocation(event.target.value)} placeholder="Place or coordinates" />
                  </label>
                  <label>
                    WHEN
                          <input value={reportWhen} onChange={(event) => setReportWhen(event.target.value)} placeholder="Date / time" />
                  </label>
                </div>
                <button className="verify-button" onClick={submitReport}>
                  <Radio size={15} /> SUBMIT OBSERVATION <ArrowUpRight size={15} />
                </button>
                <p className="privacy-note">
                  Your report is encrypted and assigned a traceable signal ID.
                </p>
                <p style={{ fontSize: '11px', color: '#8392a6', marginTop: '12px' }}>
                  Synthetic demo data — not a real incident
                </p>
              </>
            )}
          </div>
        </div>
      )}
    </main>
  )
}

export default SentinelApp

const _unused = [Bell, Eye, GitBranch, Layers3, TriangleAlert, MapPin, Clock]
void _unused
