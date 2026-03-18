import React from 'react'
import { CardModel } from '../types'
import Card from './Card'

interface BoardProps {
  cards: CardModel[]
  cols: number
  tileSize: number
  gap: number
  onFlip: (id: string) => void
  disabled: boolean
}

const Board = ({ cards, cols, tileSize, gap, onFlip, disabled }: BoardProps) => {
  const boardSize = tileSize * cols + gap * (cols - 1)
  const boardStyle: React.CSSProperties = {
    ['--grid-cols' as any]: String(cols),
    ['--tile-size' as any]: `${tileSize}px`,
    ['--board-gap' as any]: `${gap}px`,
    width: `${boardSize}px`,
    height: `${boardSize}px`,
  }

  return (
    <section className="board-container" aria-label="Game board">
      <div className="game-board-grid" role="grid" style={boardStyle}>
        {cards.map((card, index) => {
          const row = Math.floor(index / cols)
          const col = index % cols
          const isAlternatingFill = (row + col) % 2 === 0

          return (
            <Card
              key={card.id}
              card={card}
              isAlternatingFill={isAlternatingFill}
              onActivate={() => onFlip(card.id)}
              disabled={disabled || card.isMatched || card.isFlipped}
            />
          )
        })}
      </div>
    </section>
  )
}

export default Board
