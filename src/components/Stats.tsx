import React from 'react'

interface StatItem {
  label: string
  value: string
}

const statItems: StatItem[] = [
  { label: 'Time', value: '4:20' },
  { label: 'Moves', value: '19' },
]

const Stats = () => {
  return (
    <section className="stats-container" aria-label="Game stats">
      {statItems.map((item) => (
        <article className="stat-card" key={item.label}>
          <p className="stat-label">{item.label}</p>
          <p className="stat-value">{item.value}</p>
        </article>
      ))}
    </section>
  )
}

export default Stats
