import React from 'react'
import { CardModel } from '../types'

interface CardProps {
  card: CardModel
  isAlternatingFill: boolean
  onActivate: () => void
  disabled: boolean
}

const getMaskStyle = (iconUrl: string) => ({
  '--icon-url': `url('${iconUrl}')`,
} as React.CSSProperties)

const Card = ({ card, isAlternatingFill, onActivate, disabled }: CardProps) => {
  const visible = card.isFlipped || card.isMatched

  return (
    <button
      type="button"
      className={`game-card ${card.isMatched ? 'is-matched' : ''} ${!visible && isAlternatingFill ? 'is-alt' : ''}`}
      onClick={disabled ? undefined : onActivate}
      disabled={disabled}
      aria-pressed={visible}
      aria-label={`Card ${card.value}`}
    >
      <span className="card-content" aria-hidden={!visible}>
        {visible ? (
          card.value.includes('.svg') ? (
            <span className="card-icon" style={getMaskStyle(card.value)} />
          ) : (
            <span className="card-value">{card.value}</span>
          )
        ) : null}
      </span>
    </button>
  )
}

export default Card
