import React from 'react'
import Board from './components/Board'
import Header from './components/Header'
import MenuModal from './components/MenuModal'
import Stats from './components/Stats'
import SetupScreen from './components/SetupScreen'
import { CardModel, GameConfig } from './types'
import { valuePool } from './gameData'

const toPairs = (value: string, needed: number): string[] => {
  const pool = valuePool[value as keyof typeof valuePool]
  return pool.slice(0, needed)
}

const buildDeck = ({ theme, grid, players }: GameConfig): CardModel[] => {
  const [rows, cols] = grid.split('x').map(Number)
  const pairCount = (rows * cols) / 2
  const pairValues = toPairs(theme, pairCount)

  const cards: CardModel[] = []

  pairValues.forEach((v) => {
    cards.push(
      { id: `${v}-${cards.length}-a-${players}`, value: v, isFlipped: false, isMatched: false },
      { id: `${v}-${cards.length}-b-${players}`, value: v, isFlipped: false, isMatched: false },
    )
  })

  for (let i = cards.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[cards[i], cards[j]] = [cards[j], cards[i]]
  }

  return cards
}

const parseGrid = (grid: GameConfig['grid']) => {
  const [rows, cols] = grid.split('x').map(Number)
  return { rows, cols }
}

const App = () => {
  const [screen, setScreen] = React.useState<'setup' | 'game'>('setup')
  const [config, setConfig] = React.useState<GameConfig>({ theme: 'numbers', grid: '4x4', players: 1 })
  const [cards, setCards] = React.useState<CardModel[]>([])
  const [moves, setMoves] = React.useState(0)
  const [elapsed, setElapsed] = React.useState(0)
  const [selectedIds, setSelectedIds] = React.useState<string[]>([])
  const [isBusy, setIsBusy] = React.useState(false)
  const [won, setWon] = React.useState(false)
  const [menuOpen, setMenuOpen] = React.useState(false)
  const [viewportWidth, setViewportWidth] = React.useState<number>(375)
  const flipRef = React.useRef<number | null>(null)

  const { rows, cols } = parseGrid(config.grid)

  const isMobile = viewportWidth < 768

  const isReady = cards.length > 0

  React.useEffect(() => {
    const update = () => setViewportWidth(window.innerWidth)
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  React.useEffect(() => {
    if (screen !== 'game' || won) return

    const timer = setInterval(() => {
      setElapsed((value) => value + 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [screen, won])

  React.useEffect(() => {
    if (won) return

    const allMatched = cards.length > 0 && cards.every((card) => card.isMatched)
    if (allMatched && isReady) {
      setWon(true)
      setIsBusy(false)
      setSelectedIds([])
      if (flipRef.current) {
        window.clearTimeout(flipRef.current)
        flipRef.current = null
      }
    }
  }, [cards, isReady, won])

  const initGame = React.useCallback((nextConfig: GameConfig) => {
    const newCards = buildDeck(nextConfig)
    setCards(newCards)
    setConfig(nextConfig)
    setMoves(0)
    setElapsed(0)
    setSelectedIds([])
    setWon(false)
    setIsBusy(false)
    setScreen('game')

    if (flipRef.current) {
      window.clearTimeout(flipRef.current)
      flipRef.current = null
    }
  }, [])

  const restartGame = React.useCallback(() => {
    initGame(config)
  }, [initGame, config])

  const handleStartGame = () => {
    initGame(config)
  }

  const handleNewGame = () => {
    setScreen('setup')
    setMenuOpen(false)
  }

  const handleFlip = (id: string) => {
    if (isBusy || won) return

    const clicked = cards.find((card) => card.id === id)
    if (!clicked || clicked.isMatched || clicked.isFlipped) return
    if (selectedIds.includes(id)) return

    const nextSelected = [...selectedIds, id]
    const revealed = cards.map((card) =>
      card.id === id ? { ...card, isFlipped: true } : card,
    )

    setCards(revealed)

    if (nextSelected.length === 1) {
      setSelectedIds(nextSelected)
      return
    }

    setSelectedIds(nextSelected)
    setMoves((value) => value + 1)
    setIsBusy(true)

    const [firstId, secondId] = nextSelected
    const first = cards.find((card) => card.id === firstId)
    const second = cards.find((card) => card.id === secondId)

    if (!first || !second) {
      setSelectedIds([])
      setIsBusy(false)
      return
    }

    if (first.value === second.value) {
      setCards((prev) =>
        prev.map((card) =>
          card.id === first.id || card.id === second.id
            ? { ...card, isMatched: true }
            : card,
        ),
      )
      setSelectedIds([])
      setIsBusy(false)
      return
    }

    flipRef.current = window.setTimeout(() => {
      setCards((prev) =>
        prev.map((card) =>
          card.id === first.id || card.id === second.id
            ? { ...card, isFlipped: false }
            : card,
        ),
      )
      setSelectedIds([])
      setIsBusy(false)
      flipRef.current = null
    }, 620)
  }

  const boardSizing = React.useMemo(() => {
    if (isMobile) {
      if (cols === 4) {
        return { tileSize: 72.5, gap: 12 }
      }

      return { tileSize: 52, gap: 8 }
    }

    if (cols === 4) {
      return { tileSize: 118, gap: 24 }
    }

    return {
      tileSize: Math.round(((544 - (cols - 1) * 24) / cols) * 10) / 10,
      gap: 24,
    }
  }, [cols, isMobile])

  return (
    <main className="app-root">
      <div className="game-canvas" role="application">
        <Header
          mode={screen}
          onRestart={screen === 'game' ? restartGame : undefined}
          onNewGame={screen === 'game' ? handleNewGame : undefined}
          onShowMenu={screen === 'game' ? () => setMenuOpen((value) => !value) : undefined}
        />

        {screen === 'setup' ? (
          <SetupScreen
            config={config}
            onConfigChange={(updater) => setConfig(updater)}
            onStart={handleStartGame}
          />
        ) : (
          <>
            <Board
              cards={cards}
              cols={cols}
              tileSize={boardSizing.tileSize}
              gap={boardSizing.gap}
              onFlip={handleFlip}
              disabled={isBusy}
            />
            <Stats
              elapsedSeconds={elapsed}
              moves={moves}
              playerLabel={config.players > 1 ? `Moves (P1)` : 'Moves'}
            />

            {won ? (
              <section className="win-overlay" aria-live="polite">
                <div className="win-card">
                  <p className="win-title">You did it!</p>
                  <p className="win-subtitle">{rows}x{cols} • {moves} moves</p>
                  <button
                    type="button"
                    className="menu-modal-btn primary"
                    onClick={handleStartGame}
                  >
                    Play Again
                  </button>
                </div>
              </section>
            ) : null}
          </>
        )}
      </div>

        <MenuModal
          open={menuOpen}
          onClose={() => setMenuOpen(false)}
          onRestart={restartGame}
          onNewGame={handleNewGame}
        />
      </main>
  )
}

export default App
