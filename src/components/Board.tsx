import React from 'react'
import { CardModel } from '../types'
import Card from './Card'

interface BoardProps {
  cards: CardModel[]
  cols: number
  tileSize: number
  gap: number
  cardFontSize: number
  iconSize: number
  onFlip: (id: string) => void
  disabled: boolean
}

const Board = ({ cards, cols, tileSize, gap, cardFontSize, iconSize, onFlip, disabled }: BoardProps) => {
  const boardWidth = tileSize * cols + gap * (cols - 1)
  const boardStyle: React.CSSProperties = {
    ['--grid-cols' as any]: String(cols),
    ['--tile-size' as any]: `${tileSize}px`,
    ['--board-gap' as any]: `${gap}px`,
    ['--card-font-size' as any]: `${cardFontSize}px`,
    ['--card-icon-size' as any]: `${iconSize}px`,
    ['--playfield-width' as any]: `${boardWidth}px`,
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
