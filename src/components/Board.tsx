import React from 'react'
import Card from './Card'

const values = ['03', '08', '15', '22', '41', '36', '49', '57', '06', '18', '27', '31', '44', '53', '64', '72']

const Board = () => {
  return (
    <section className="board-container" aria-label="Game board">
      <div className="game-board-grid" role="grid">
        {values.map((value, idx) => (
          <Card key={`${value}-${idx}`} value={value} alt={idx % 2 === 1} />
        ))}
      </div>
    </section>
  )
}

export default Board
