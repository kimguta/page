export type NoticeItem = {
  id: string
  title: string
  date: string
  summary: string
  pinned?: boolean
}

export const notices: NoticeItem[] = [
  {
    id: 'nt-101',
    title: 'Spring service maintenance complete',
    date: '2026-04-20',
    summary: 'We completed the scheduled maintenance with no service interruption.',
    pinned: true,
  },
  {
    id: 'nt-102',
    title: 'New product bundle available',
    date: '2026-04-17',
    summary: 'A new bundle combines dashboard, landing, and CMS patterns into one package.',
  },
  {
    id: 'nt-103',
    title: 'Customer center hours update',
    date: '2026-04-12',
    summary: 'Support hours now include a Saturday morning window for urgent requests.',
  },
]

export function getNoticeById(id: string) {
  return notices.find((notice) => notice.id === id) ?? notices[0]
}
