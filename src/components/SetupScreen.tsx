import React from 'react'
import { GameConfig, ThemeKey, GridPreset } from '../types'

const themes: { label: string; value: ThemeKey }[] = [
  { label: 'Numbers', value: 'numbers' },
  { label: 'Icons', value: 'icons' },
]

const grids: { label: string; value: GridPreset }[] = [
  { label: '4x4', value: '4x4' },
  { label: '6x6', value: '6x6' },
]

const players = [
  { label: '1P', value: 1 },
  { label: '2P', value: 2 },
  { label: '3P', value: 3 },
  { label: '4P', value: 4 },
]

interface SetupScreenProps {
  config: GameConfig
  onConfigChange: (updater: (prev: GameConfig) => GameConfig) => void
  onStart: () => void
}

const SetupScreen = ({ config, onConfigChange, onStart }: SetupScreenProps) => {
  const setTheme = (theme: ThemeKey) => {
    onConfigChange((prev) => ({ ...prev, theme }))
  }

  const setGrid = (grid: GridPreset) => {
    onConfigChange((prev) => ({ ...prev, grid }))
  }

  const setPlayers = (playersCount: number) => {
    onConfigChange((prev) => ({ ...prev, players: playersCount }))
  }

  return (
    <section className="setup-shell" aria-label="Setup screen">
      <div className="setup-content">
        <p className="setup-title">memory</p>

        <form
          className="setup-panel"
          onSubmit={(event) => {
            event.preventDefault()
            onStart()
          }}
        >
          <fieldset className="setup-group" aria-label="Theme selector">
            <legend className="setup-group-label">Select Theme</legend>
            <div className="setup-pills-row" role="radiogroup" aria-label="Theme">
              {themes.map((item) => (
                <button
                  key={item.value}
                  type="button"
                  role="radio"
                  aria-checked={config.theme === item.value}
                  className={`setup-pill ${config.theme === item.value ? 'active' : 'muted'}`}
                  onClick={() => setTheme(item.value)}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </fieldset>

          <fieldset className="setup-group" aria-label="Grid selector">
            <legend className="setup-group-label">Grid</legend>
            <div className="setup-pills-row" role="radiogroup" aria-label="Grid">
              {grids.map((item) => (
                <button
                  key={item.value}
                  type="button"
                  role="radio"
                  aria-checked={config.grid === item.value}
                  className={`setup-pill ${config.grid === item.value ? 'active' : 'muted'} ${item.value === '6x6' ? 'grow-pill' : ''}`}
                  onClick={() => setGrid(item.value)}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </fieldset>

          <fieldset className="setup-group" aria-label="Player selector">
            <legend className="setup-group-label">Players</legend>
            <div className="setup-pills-row" role="radiogroup" aria-label="Players">
              {players.map((item) => (
                <button
                  key={item.value}
                  type="button"
                  role="radio"
                  aria-checked={config.players === item.value}
                  className={`setup-pill ${config.players === item.value ? 'active' : 'muted'}`}
                  onClick={() => setPlayers(item.value)}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </fieldset>

          <button type="submit" className="setup-start-btn">
            Start Game
          </button>
        </form>
      </div>
    </section>
  )
}

export default SetupScreen
