import React from 'react'

interface CardProps {
  value: string | number
  alt: boolean
}

const Card = ({ value, alt }: CardProps) => {
  return (
    <div className={`game-card ${alt ? 'alt' : ''}`}>{value}</div>
  )
}

export default Card
