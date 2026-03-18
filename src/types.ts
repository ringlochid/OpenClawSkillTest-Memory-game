export type ThemeKey = 'numbers' | 'icons'

export type GridPreset = '4x4' | '6x6'

export interface GameConfig {
  theme: ThemeKey
  grid: GridPreset
  players: number
}

export type CardFaceType = 'number' | 'icon'

export interface CardModel {
  id: string
  value: string
  isFlipped: boolean
  isMatched: boolean
  faceType: CardFaceType
}

export interface PlayerScore {
  player: number
  pairs: number
}
