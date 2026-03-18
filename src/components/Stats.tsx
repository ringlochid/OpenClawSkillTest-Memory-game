import React from 'react'

interface StatsProps {
  elapsedSeconds: number
  moves: number
  players?: number
  playerScores?: number[]
  activePlayer?: number
  isMobile?: boolean
}

const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60

  return `${mins}:${String(secs).padStart(2, '0')}`
}

const FooterCard = ({
  label,
  value,
  active,
  showTurnLabel,
}: {
  label: string
  value: string | number
  active: boolean
  showTurnLabel: boolean
}) => {
  return (
    <article className={`player-card ${active ? 'active' : ''}`}>
      {active ? <span className="player-card-notch" aria-hidden="true" /> : null}
      {active && showTurnLabel ? <p className="player-turn-label">CURRENT TURN</p> : null}
      <p className="stat-label">{label}</p>
      <p className="stat-value">{value}</p>
    </article>
  )
}

const Stats = ({
  elapsedSeconds,
  moves,
  players = 1,
  playerScores = [0, 0, 0, 0],
  activePlayer = 0,
  isMobile = true,
}: StatsProps) => {
  if (players > 1) {
    const columns = `repeat(${Math.max(1, players)}, minmax(0, 1fr))`
    const gap = isMobile ? (players === 4 ? 6 : players === 3 ? 8 : 10) : players === 2 ? 32 : players === 3 ? 12 : 8

    const containerStyle: React.CSSProperties = {
      gridTemplateColumns: columns,
      gap: `${gap}px`,
    }

    return (
      <section
        className={`stats-container players ${isMobile ? 'mobile' : 'desktop'} players-${players}`}
        style={containerStyle}
        aria-label="Player scores"
      >
        {playerScores.slice(0, players).map((score, index) => (
          <FooterCard
            key={`${index + 1}`}
            label={`P${index + 1}`}
            value={score}
            active={index === activePlayer}
            showTurnLabel={players > 1}
          />
        ))}
      </section>
    )
  }

  return (
    <section className={`stats-container solo ${isMobile ? 'mobile' : 'desktop'}`} aria-label="Game stats">
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
