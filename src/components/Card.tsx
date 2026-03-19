import React from 'react'
import { CardModel } from '../types'

interface CardProps {
  card: CardModel
  onActivate: () => void
  disabled: boolean
}

type CardState = 'concealed' | 'revealed' | 'matched'

const getMaskStyle = (iconUrl: string) => ({
  '--icon-url': `url('${iconUrl}')`,
} as React.CSSProperties)

const getFaceType = (card: CardModel): 'icon' | 'number' => {
  if (card.faceType) return card.faceType

  const trimmed = card.value.trim().toLowerCase()
  return trimmed.includes('.svg') || trimmed.includes('.png') || trimmed.startsWith('data:') || trimmed.startsWith('blob:')
    ? 'icon'
    : 'number'
}

const Card = ({ card, onActivate, disabled }: CardProps) => {
  const state: CardState = card.isMatched ? 'matched' : card.isFlipped ? 'revealed' : 'concealed'
  const faceType = getFaceType(card)
  const showFace = state !== 'concealed'

  return (
    <button
      type="button"
      className={`game-card is-${state}`}
      onClick={disabled ? undefined : onActivate}
      disabled={disabled}
      aria-pressed={showFace}
      aria-label={`Card ${card.value} ${showFace ? 'revealed' : 'concealed'}`}
    >
      <span className="card-content" aria-hidden={!showFace}>
        {showFace ? (
          faceType === 'icon' ? <span className="card-icon" style={getMaskStyle(card.value)} /> : <span className="card-value">{card.value}</span>
        ) : null}
      </span>
    </button>
  )
}

export default Card
