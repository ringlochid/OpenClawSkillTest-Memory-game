import React from 'react'

interface HeaderProps {
  showMenu?: boolean
}

const Header = ({ showMenu = false }: HeaderProps) => {
  return (
    <header className="game-header">
      <h1 className="game-title">memory</h1>

      <div className="game-buttons" aria-label="Header actions">
        <button className="btn-restart" type="button">
          Restart
        </button>
        <button className="btn-new-game" type="button">
          New Game
        </button>
      </div>

      <button className={`menu-pill${showMenu ? ' show' : ''}`} type="button">
        Menu
      </button>
    </header>
  )
}

export default Header
