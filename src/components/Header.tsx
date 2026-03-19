import React from 'react'

type HeaderMode = 'setup' | 'game'

interface HeaderProps {
  mode: HeaderMode
  onShowMenu?: () => void
  onRestart?: () => void
  onNewGame?: () => void
}

const Header = ({ mode, onShowMenu, onRestart, onNewGame }: HeaderProps) => {
  return (
    <header className="game-header" role="banner">
      <h1 className="game-title">memory</h1>

      {mode === 'game' ? (
        <div className="header-actions" role="group" aria-label="Game actions">
          <button type="button" className="desktop-btn primary" onClick={onRestart}>
            Restart
          </button>
          <button type="button" className="desktop-btn ghost" onClick={onNewGame}>
            New Game
          </button>
        </div>
      ) : null}

      {mode === 'game' ? (
        <button
          type="button"
          className="menu-pill"
          onClick={onShowMenu}
          aria-label="Open menu"
        >
          Menu
        </button>
      ) : null}
    </header>
  )
}

export default Header
