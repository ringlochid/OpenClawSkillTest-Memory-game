import { getIconAssets } from './utils/icons'
import type { ThemeKey } from './types'

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

const iconAssetValues = getIconAssets(18)

export const iconValues = [...iconAssetValues]

export const valuePool = {
  numbers: numberValues,
  icons: iconValues,
} as const satisfies Record<ThemeKey, string[]>
