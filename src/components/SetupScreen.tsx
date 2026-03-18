import React from 'react'

const SetupScreen = () => {
  return (
    <section className="setup-shell" aria-label="Setup screen mockup">
      <div className="setup-panel">
        <h2 className="setup-title">Start</h2>

        <div className="setup-group-label">Theme</div>
        <div className="setup-pills-row setup-theme-row">
          <span className="setup-pill">Numbers</span>
          <span className="setup-pill muted">Icons</span>
        </div>

        <div className="setup-group-label">Grid</div>
        <div className="setup-pills-row setup-theme-row">
          <span className="setup-pill">4x4</span>
          <span className="setup-pill muted">6x6</span>
        </div>

        <div className="setup-group-label">Players</div>
        <div className="setup-pills-row setup-player-row">
          <span className="setup-pill small">1P</span>
          <span className="setup-pill small muted">2P</span>
          <span className="setup-pill small muted">3P</span>
          <span className="setup-pill small muted">4P</span>
        </div>

        <button type="button" className="setup-start-btn">
          Start Game
        </button>
      </div>
    </section>
  )
}

export default SetupScreen
