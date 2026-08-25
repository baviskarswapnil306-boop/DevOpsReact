import { useState } from 'react'

const members = [
  { name: 'Gautam', role: 'Instructor', initials: 'G', color: 'gold', active: true },
  { name: 'Aarav Mehta', role: 'Git & CI', initials: 'AM', color: 'coral', active: true },
  { name: 'Diya Shah', role: 'Containers', initials: 'DS', color: 'blue', active: true },
  { name: 'Kabir Rao', role: 'Cloud basics', initials: 'KR', color: 'mint', active: true },
  { name: 'Mira Joshi', role: 'Automation', initials: 'MJ', color: 'lavender', active: false },
]

const commands = [
  { command: 'git init', description: 'Create a new local repository', level: 'STARTER' },
  { command: 'git add .', description: 'Stage all changed files', level: 'CORE' },
  { command: 'git commit -m "msg"', description: 'Save a snapshot with context', level: 'CORE' },
  { command: 'git push origin main', description: 'Ship local commits upstream', level: 'NEXT' },
]

const topics = [
  { name: 'Git & GitHub', value: 82, color: 'coral' },
  { name: 'CI / CD', value: 64, color: 'gold' },
  { name: 'Docker', value: 42, color: 'blue' },
  { name: 'Cloud', value: 28, color: 'mint' },
]

function App() {
  const [activeView, setActiveView] = useState('Overview')
  const [completed, setCompleted] = useState(['git init'])
  const [copied, setCopied] = useState('')

  const copyCommand = async (command) => {
    try {
      await navigator.clipboard.writeText(command)
      setCopied(command)
      window.setTimeout(() => setCopied(''), 1500)
    } catch {
      setCopied(command)
    }
  }

  const toggleCommand = (command) => {
    setCompleted((current) => current.includes(command)
      ? current.filter((item) => item !== command)
      : [...current, command])
  }

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand-mark"><span>G</span><strong>DEV/OPS</strong></div>
        <div className="sidebar-rule" />
        <p className="eyebrow">Workspace</p>
        <nav className="nav-list" aria-label="Main navigation">
          {['Overview', 'Curriculum', 'Members'].map((item) => (
            <button className={`nav-item ${activeView === item ? 'selected' : ''}`} key={item} onClick={() => setActiveView(item)}>
              <span className={`nav-icon icon-${item.toLowerCase()}`} />{item}
              {item === 'Members' && <span className="nav-count">5</span>}
            </button>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <div className="signal-card">
            <div className="signal-top"><span className="live-dot" />Class signal</div>
            <strong>All systems learning</strong>
            <div className="signal-line"><span style={{ width: '76%' }} /></div>
            <small>76% weekly momentum</small>
          </div>
          <div className="profile-row"><div className="avatar avatar-gold">G</div><div><strong>Gautam</strong><small>Instructor</small></div><span className="more">...</span></div>
        </div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <div className="breadcrumb"><span>Classroom</span><b>/</b><strong>{activeView}</strong></div>
          <div className="top-actions"><span className="status-pill"><span className="live-dot" />Live workspace</span><button className="icon-button" aria-label="Notifications">!</button><button className="help-button">?</button></div>
        </header>

        <section className="welcome-row">
          <div><p className="eyebrow accent">Monday, 14 October 2024</p><h1>DevOps class<br /><em>with Gautam.</em></h1><p className="intro">A practical space to build, ship, and automate better software together.</p></div>
          <div className="class-time-card"><span className="sun-mark">*</span><div><span className="label">Every day</span><strong>7:30 <small>to</small> 8:30</strong><span className="timezone">IST / 60 min session</span></div><span className="arrow-mark">{'->'}</span></div>
        </section>

        <section className="metric-grid" aria-label="Class summary">
          <div className="metric-card primary"><div className="metric-label">Class members <span className="metric-arrow">{'->'}</span></div><strong>05</strong><span className="metric-foot">4 learners + Gautam</span><div className="mini-avatars">{members.slice(0, 4).map((member) => <span className={`avatar avatar-${member.color}`} key={member.initials}>{member.initials}</span>)}</div></div>
          <div className="metric-card"><div className="metric-label">Current streak <span className="trend up">+12%</span></div><strong>12 <small>days</small></strong><span className="metric-foot">Keep the rhythm going</span><div className="sparkline"><i /><i /><i /><i /><i /><i /><i /><i /></div></div>
          <div className="metric-card"><div className="metric-label">Topics explored <span className="metric-arrow">{'->'}</span></div><strong>08</strong><span className="metric-foot">2 modules this week</span><div className="topic-dots"><span /><span /><span /><span /><span /><span /><span /><span /></div></div>
        </section>

        <section className="content-grid">
          <div className="panel command-panel"><div className="panel-heading"><div><p className="eyebrow">Hands-on lab</p><h2>Git command path</h2></div><span className="progress-badge">{completed.length}/4 done</span></div><p className="panel-copy">The essential flow from an empty folder to a shared branch.</p><div className="command-list">{commands.map((item, index) => <div className={`command-row ${completed.includes(item.command) ? 'done' : ''}`} key={item.command}><button className="check-button" onClick={() => toggleCommand(item.command)} aria-label={`Mark ${item.command} complete`}>{completed.includes(item.command) ? 'x' : index + 1}</button><div className="command-text"><code>{item.command}</code><span>{item.description}</span></div><span className={`command-level level-${item.level.toLowerCase()}`}>{item.level}</span><button className="copy-button" onClick={() => copyCommand(item.command)} aria-label={`Copy ${item.command}`}>{copied === item.command ? 'OK' : 'copy'}</button></div>)}</div><button className="text-button">Open full curriculum <span>{'->'}</span></button></div>

          <div className="panel schedule-panel"><div className="panel-heading"><div><p className="eyebrow">Daily ritual</p><h2>Class schedule</h2></div><span className="calendar-icon">31</span></div><div className="schedule-day"><div className="day-number">14<span>MON</span></div><div className="schedule-track"><span className="track-dot" /><div><strong>DevOps foundations</strong><span>Git workflow & repositories</span></div><time>7:30</time></div></div><div className="week-strip">{['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, index) => <div className={index === 0 ? 'today' : ''} key={`${day}-${index}`}><span>{day}</span><b>{14 + index}</b></div>)}</div><div className="next-session"><span>Next up</span><strong>Git branching strategies</strong><time>Tomorrow, 7:30</time></div></div>
        </section>

        <section className="lower-grid"><div className="panel members-panel"><div className="panel-heading"><div><p className="eyebrow">The crew</p><h2>Class members</h2></div><button className="text-button">View all <span>{'->'}</span></button></div><div className="member-list">{members.map((member) => <div className="member-row" key={member.name}><div className={`avatar avatar-${member.color}`}>{member.initials}</div><div><strong>{member.name}</strong><span>{member.role}</span></div><span className={`presence ${member.active ? 'online' : ''}`} />{member.active && <small>Online</small>}</div>)}</div></div><div className="panel topics-panel"><div className="panel-heading"><div><p className="eyebrow">Learning map</p><h2>Topic coverage</h2></div><span className="metric-arrow">{'->'}</span></div><div className="topic-chart">{topics.map((topic) => <div className="topic-row" key={topic.name}><div className="topic-name"><span className={`topic-swatch ${topic.color}`} />{topic.name}<b>{topic.value}%</b></div><div className="bar"><span className={topic.color} style={{ width: `${topic.value}%` }} /></div></div>)}</div></div></section>
        <footer><span>DEV/OPS CLASSROOM <b>01</b></span><span>Built for consistency, powered by curiosity.</span><span>Last synced 2 min ago</span></footer>
      </main>
    </div>
  )
}

export default App
