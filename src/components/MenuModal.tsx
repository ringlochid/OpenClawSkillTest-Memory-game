import React from 'react'

interface MenuModalProps {
  open: boolean
  onClose: () => void
  onRestart: () => void
  onNewGame: () => void
}

const MenuModal = ({ open, onClose, onRestart, onNewGame }: MenuModalProps) => {
  if (!open) return null

  return (
    <div className="menu-overlay" role="dialog" aria-modal="true" aria-label="Game menu">
      <div className="menu-modal">
        <button
          type="button"
          className="menu-modal-btn primary"
          onClick={() => {
            onRestart()
            onClose()
          }}
        >
          Restart
        </button>
        <button
          type="button"
          className="menu-modal-btn"
          onClick={() => {
            onNewGame()
            onClose()
          }}
        >
          New Game
        </button>
        <button type="button" className="menu-modal-btn ghost" onClick={onClose}>
          Continue
        </button>
      </div>
    </div>
  )
}

export default MenuModal
