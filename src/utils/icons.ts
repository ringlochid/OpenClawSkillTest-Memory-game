import type { ThemeKey } from '../types'

type ImportMetaWithGlob = ImportMeta & {
  glob: (pattern: string, options?: { eager?: boolean; query?: string; import?: string }) => Record<string, string>
}

type IconRecord = Record<string, string>

const iconsRecord: IconRecord = (import.meta as ImportMetaWithGlob).glob('../assets/icons/*.svg', {
  eager: true,
  query: '?url',
  import: 'default',
})

export const ICON_ASSET_URLS: string[] = Object.keys(iconsRecord)
  .sort()
  .map((key) => iconsRecord[key])

export const getIconAssets = (count: number): string[] => {
  const safeCount = Math.min(count, ICON_ASSET_URLS.length)
  return ICON_ASSET_URLS.slice(0, safeCount)
}
