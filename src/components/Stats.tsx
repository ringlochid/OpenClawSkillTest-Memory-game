import React from 'react'

interface StatsProps {
  elapsedSeconds: number
  moves: number
  players?: number
  playerScores?: number[]
  activePlayer?: number
}

const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60

  return `${mins}:${String(secs).padStart(2, '0')}`
}

const FooterCard = ({
  shortLabel,
  fullLabel,
  value,
  active,
  showTurnLabel,
}: {
  shortLabel: string
  fullLabel: string
  value: string | number
  active: boolean
  showTurnLabel: boolean
}) => {
  return (
    <article className={`player-card ${active ? 'active' : ''}`}>
      {active ? <span className="player-card-notch" aria-hidden="true" /> : null}
      <div className="player-card-copy">
        <p className="stat-label">
          <span className="label-mobile">{shortLabel}</span>
          <span className="label-desktop">{fullLabel}</span>
        </p>
        <p className="stat-value">{value}</p>
      </div>
      {active && showTurnLabel ? <p className="player-turn-label">Current Turn</p> : null}
    </article>
  )
}

const Stats = ({
  elapsedSeconds,
  moves,
  players = 1,
  playerScores = [0, 0, 0, 0],
  activePlayer = 0,
}: StatsProps) => {
  if (players > 1) {
    return (
      <section
        className={`stats-container players players-${players}`}
        aria-label="Player scores"
      >
        {playerScores.slice(0, players).map((score, index) => (
          <FooterCard
            key={`${index + 1}`}
            shortLabel={`P${index + 1}`}
            fullLabel={`Player ${index + 1}`}
            value={score}
            active={index === activePlayer}
            showTurnLabel={players > 1}
          />
        ))}
      </section>
    )
  }

  return (
    <section className="stats-container solo" aria-label="Game stats">
      <article className="stat-card">
        <p className="stat-label">Time</p>
        <p className="stat-value">{formatTime(elapsedSeconds)}</p>
      </article>
      <article className="stat-card">
        <p className="stat-label">Moves</p>
        <p className="stat-value">{moves}</p>
      </article>
    </section>
  )
}

export default Stats
