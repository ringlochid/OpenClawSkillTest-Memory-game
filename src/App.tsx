import React from 'react'
import Board from './components/Board'
import Header from './components/Header'
import MenuModal from './components/MenuModal'
import Stats from './components/Stats'
import SetupScreen from './components/SetupScreen'
import { CardModel, GameConfig } from './types'
import { valuePool } from './gameData'

type ScreenMode = 'setup' | 'game'

const toPairs = (value: string, needed: number): string[] => {
  const pool = valuePool[value as keyof typeof valuePool]
  return pool.slice(0, needed)
}

const buildDeck = ({ theme, grid, players }: GameConfig): CardModel[] => {
  const [rows, cols] = grid.split('x').map(Number)
  const pairCount = (rows * cols) / 2
  const pairValues = toPairs(theme, pairCount)

  const cards: CardModel[] = []
  const faceType = theme === 'icons' ? 'icon' : 'number'

  pairValues.forEach((v) => {
    cards.push(
      { id: `${v}-${cards.length}-a-${players}`, value: v, isFlipped: false, isMatched: false, faceType },
      { id: `${v}-${cards.length}-b-${players}`, value: v, isFlipped: false, isMatched: false, faceType },
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
  const [screen, setScreen] = React.useState<ScreenMode>('setup')
  const [config, setConfig] = React.useState<GameConfig>({ theme: 'numbers', grid: '4x4', players: 1 })
  const [cards, setCards] = React.useState<CardModel[]>([])
  const [moves, setMoves] = React.useState(0)
  const [elapsed, setElapsed] = React.useState(0)
  const [selectedIds, setSelectedIds] = React.useState<string[]>([])
  const [isBusy, setIsBusy] = React.useState(false)
  const [won, setWon] = React.useState(false)
  const [menuOpen, setMenuOpen] = React.useState(false)
  const [viewportWidth, setViewportWidth] = React.useState<number>(375)
  const [currentPlayer, setCurrentPlayer] = React.useState(0)
  const [scores, setScores] = React.useState<number[]>([0, 0, 0, 0])
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
    const players = nextConfig.players

    const newCards = buildDeck(nextConfig)
    setCards(newCards)
    setConfig(nextConfig)
    setMoves(0)
    setElapsed(0)
    setSelectedIds([])
    setWon(false)
    setIsBusy(false)
    setCurrentPlayer(0)
    setScores(Array.from({ length: players }, () => 0))
    setMenuOpen(false)
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
    setWon(false)
    setCards([])
  }

  const handleResumeGame = () => {
    setMenuOpen(false)
  }

  const registerScore = (isMatch: boolean) => {
    if (!isMatch || config.players <= 1) return

    setScores((prev) => {
      const next = [...prev]
      next[currentPlayer] += 1
      return next
    })
  }

  const rotateTurn = () => {
    if (config.players <= 1) return
    setCurrentPlayer((value) => (value + 1) % config.players)
  }

  const handleFlip = (id: string) => {
    if (isBusy || won || menuOpen) return

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
      registerScore(true)
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
      registerScore(false)
      rotateTurn()
      setSelectedIds([])
      setIsBusy(false)
      flipRef.current = null
    }, 620)
  }

  const boardSizing = React.useMemo(() => {
    if (cols === 4) {
      return {
        tileSize: isMobile ? 78 : 124,
        gap: isMobile ? 14 : 24,
        cardFontSize: isMobile ? 44 : 64,
        iconSize: isMobile ? 40 : 58,
      }
    }

    return {
      tileSize: isMobile ? 47 : 73,
      gap: isMobile ? 8 : 14,
      cardFontSize: isMobile ? 22 : 36,
      iconSize: isMobile ? 20 : 33,
    }
  }, [cols, isMobile])

  const rankedPlayers = React.useMemo(() => {
    return scores
      .map((score, index) => ({ player: index + 1, score }))
      .filter((entry) => entry.player <= config.players)
      .sort((a, b) => b.score - a.score)
  }, [scores, config.players])

  const resultState = React.useMemo(() => {
    if (config.players <= 1) {
      return {
        title: 'You did it!',
        subtitle: "Game over! Here's how you got on…",
        isTie: false,
        topWinners: [] as { player: number; score: number }[],
      }
    }

    const first = rankedPlayers[0]
    if (!first) {
      return {
        title: 'Game over',
        subtitle: 'Game over! Here are the results...',
        isTie: false,
        topWinners: [] as { player: number; score: number }[],
      }
    }

    const topScore = first.score
    const winners = rankedPlayers.filter((entry) => entry.score === topScore)

    return {
      title: winners.length > 1 ? 'It’s a tie!' : `Player ${first.player} Wins!`,
      subtitle: 'Game over! Here are the results...',
      isTie: winners.length > 1,
      topWinners: winners,
    }
  }, [config.players, rankedPlayers])

  const boardWidthPx = `${boardSizing.tileSize * cols + boardSizing.gap * (cols - 1)}px`

  return (
    <main className={`app-root ${screen === 'setup' ? 'setup-mode' : 'game-mode'}`}>
      <div className="game-canvas" role="application">
        {screen === 'setup' ? (
          <SetupScreen
            config={config}
            onConfigChange={(updater) => setConfig(updater)}
            onStart={handleStartGame}
          />
        ) : (
          <section
            className="game-mode-shell"
            style={{
              '--playfield-width': boardWidthPx,
            } as React.CSSProperties}
          >
            <Header
              mode={screen}
              onRestart={restartGame}
              onNewGame={handleNewGame}
              onShowMenu={() => setMenuOpen((value) => !value)}
              isMobile={isMobile}
            />

            <section className={`game-layout layout-${cols}`} aria-label="Gameplay">
              <Board
                cards={cards}
                cols={cols}
                tileSize={boardSizing.tileSize}
                gap={boardSizing.gap}
                cardFontSize={boardSizing.cardFontSize}
                iconSize={boardSizing.iconSize}
                onFlip={handleFlip}
                disabled={isBusy || won || menuOpen}
              />

              <Stats
                elapsedSeconds={elapsed}
                moves={moves}
                players={config.players}
                playerScores={scores}
                activePlayer={currentPlayer}
                isMobile={isMobile}
              />
            </section>

            {won ? (
              <section className="win-overlay" aria-live="polite">
                <div className="win-card">
                  <h2 className="win-title">{resultState.title}</h2>
                  <p className="win-subtitle">{resultState.subtitle}</p>

                  {config.players > 1 ? (
                    <div className="result-list" role="list">
                      {rankedPlayers.map((entry) => {
                        const isWinner = resultState.isTie
                          ? resultState.topWinners.some((winner) => winner.player === entry.player)
                          : entry.player === rankedPlayers[0]?.player

                        return (
                          <div
                            key={entry.player}
                            className={`result-row ${isWinner ? 'winner' : ''}`}
                            role="listitem"
                          >
                            <p>{`Player ${entry.player}${isWinner ? ' (Winner)' : ''}`}</p>
                            <p>{entry.score} Pairs</p>
                          </div>
                        )
                      })}
                    </div>
                  ) : (
                    <div className="result-list" role="list">
                      <div className="result-row">
                        <p>Time Elapsed</p>
                        <p>
                          {String(Math.floor(elapsed / 60)).padStart(2, '0')}:{String(elapsed % 60).padStart(2, '0')}
                        </p>
                      </div>
                      <div className="result-row">
                        <p>Moves Taken</p>
                        <p>{moves} Moves</p>
                      </div>
                    </div>
                  )}

                  <div className="result-actions">
                    <button type="button" className="menu-modal-btn primary" onClick={handleStartGame}>
                      Restart
                    </button>
                    <button type="button" className="menu-modal-btn" onClick={handleNewGame}>
                      Setup New Game
                    </button>
                  </div>
                </div>
              </section>
            ) : null}
          </section>
        )}

        <MenuModal
          open={menuOpen && screen === 'game'}
          onClose={handleResumeGame}
          onRestart={restartGame}
          onNewGame={handleNewGame}
        />
      </div>
    </main>
  )
}

export default App
