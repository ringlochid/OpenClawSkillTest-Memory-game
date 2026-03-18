import React from 'react'
import Header from './components/Header'
import Board from './components/Board'
import Stats from './components/Stats'
import SetupScreen from './components/SetupScreen'

const App = () => {
  const view: 'game' | 'setup' = 'game'

  return (
    <main className="app-root">
      <div className="game-canvas" role="application">
        {view === 'game' ? (
          <>
            <Header showMenu />
            <Board />
            <Stats />
          </>
        ) : (
          <SetupScreen />
        )}
      </div>
    </main>
  )
}

export default App
