import { ThemeKey } from './types'

export const numberValues = [
  '03',
  '08',
  '15',
  '22',
  '41',
  '36',
  '49',
  '57',
  '06',
  '18',
  '27',
  '31',
  '44',
  '53',
  '64',
  '72',
  '11',
  '24',
  '33',
]

export const iconValues = ['🦊', '🐶', '🐱', '🐼', '🦁', '🐸', '🦋', '🐢', '🧸', '🍀', '⚽', '🎸', '🚀', '🌙', '🍕', '🎯', '📘', '🔔']

export const valuePool = {
  numbers: numberValues,
  icons: iconValues,
} as const satisfies Record<ThemeKey, string[]>
