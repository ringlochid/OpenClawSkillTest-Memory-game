import React from 'react'

interface StatsProps {
  elapsedSeconds: number
  moves: number
  playerLabel?: string
}

const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60

  return `${mins}:${String(secs).padStart(2, '0')}`
}

const Stats = ({ elapsedSeconds, moves, playerLabel }: StatsProps) => (
  <section className="stats-container" aria-label="Game stats">
    <article className="stat-card">
      <p className="stat-label">Time</p>
      <p className="stat-value">{formatTime(elapsedSeconds)}</p>
    </article>
    <article className="stat-card">
      <p className="stat-label">{playerLabel || 'Moves'}</p>
      <p className="stat-value">{moves}</p>
    </article>
  </section>
)

export default Stats
