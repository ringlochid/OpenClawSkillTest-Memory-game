import React from 'react'
import { CardModel } from '../types'

interface CardProps {
  card: CardModel
  onActivate: () => void
  disabled: boolean
}

type CardState = 'concealed' | 'flipped' | 'matched'

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
  const state: CardState = card.isMatched ? 'matched' : card.isFlipped ? 'flipped' : 'concealed'
  const faceType = getFaceType(card)

  return (
    <button
      type="button"
      className={`game-card is-${state}`}
      onClick={disabled ? undefined : onActivate}
      disabled={disabled}
      aria-pressed={state === 'flipped' || state === 'matched'}
      aria-label={`Card ${card.value} ${state}`}
    >
      <span className="card-content" aria-hidden={state === 'concealed'}>
        {state === 'concealed' ? <span className="card-back" /> : null}

        {state === 'flipped' || state === 'matched' ? (
          faceType === 'icon' ? <span className="card-icon" style={getMaskStyle(card.value)} /> : <span className="card-value">{card.value}</span>
        ) : null}
      </span>
    </button>
  )
}

export default Card