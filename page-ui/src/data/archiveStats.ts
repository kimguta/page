export type ArchiveSeriesItem = {
  label: string
  count: number
  color: string
}

export const archiveFolderTotal = 64

export const archiveRegionStats: ArchiveSeriesItem[] = [
  { label: '강원도권', count: 35, color: '#93c5fd' },
  { label: '속초권', count: 10, color: '#7dd3fc' },
  { label: '화천권', count: 4, color: '#fdba74' },
  { label: '평창권', count: 4, color: '#86efac' },
  { label: '춘천권', count: 4, color: '#c4b5fd' },
  { label: '양양권', count: 4, color: '#fda4af' },
  { label: '기타', count: 3, color: '#64748b' },
]

export const archiveTypeStats: ArchiveSeriesItem[] = [
  { label: '문화·관광', count: 22, color: '#fbbf24' },
  { label: '교육·복지', count: 15, color: '#34d399' },
  { label: '공공·행정', count: 15, color: '#93c5fd' },
  { label: '브랜드·체험', count: 5, color: '#f472b6' },
  { label: '기타', count: 7, color: '#64748b' },
]
