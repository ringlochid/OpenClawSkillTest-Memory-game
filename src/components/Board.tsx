import React from 'react'
import { CardModel } from '../types'
import Card from './Card'

interface BoardProps {
  cards: CardModel[]
  cols: number
  onFlip: (id: string) => void
  disabled: boolean
}

const Board = ({ cards, cols, onFlip, disabled }: BoardProps) => {
  const boardStyle: React.CSSProperties = {
    ['--grid-cols' as any]: String(cols),
  }

  return (
    <section className="board-container" aria-label="Game board">
      <div className="game-board-grid" role="grid" style={boardStyle}>
        {cards.map((card) => (
          <Card key={card.id} card={card} onActivate={() => onFlip(card.id)} disabled={disabled || card.isMatched || card.isFlipped} />
        ))}
      </div>
    </section>
  )
}

export default Board
