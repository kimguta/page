import fs from 'node:fs'
import path from 'node:path'

const candidates = [
  path.join(process.env.USERPROFILE ?? '', 'Downloads', 'README.md'),
  path.join(process.cwd(), 'README.md'),
]
const outputFile = path.join(process.cwd(), 'page-ui/src/data/archiveReadmeList.ts')

const readmePath = candidates.find((candidate) => fs.existsSync(candidate))

if (!readmePath) {
  console.log('README source not found, keeping existing archiveReadmeList.ts')
  process.exit(0)
}

const content = fs.readFileSync(readmePath, 'utf8')
const matches = [...content.matchAll(/<li><a href="([^"]+)" target="_blank">([^<]+)<\/a><\/li>/g)]

function normalizeHref(href) {
  if (href.endsWith('/')) {
    return href
  }

  if (/\.[a-z0-9]+$/i.test(href)) {
    return href
  }

  return `${href}/`
}

const sections = [
  {
    key: '2026',
    items: matches.slice(0, 9).map((match) => ({ href: normalizeHref(match[1]), title: match[2] })),
  },
  {
    key: '2025',
    items: matches.slice(9).map((match) => ({ href: normalizeHref(match[1]), title: match[2] })),
  },
]

const fileContents = `export type ArchiveReadmeItem = {
  href: string
  title: string
}

export type ArchiveReadmeSection = {
  key: string
  items: ArchiveReadmeItem[]
}

export const archiveReadmeSections: ArchiveReadmeSection[] = ${JSON.stringify(sections, null, 2)}
`

fs.mkdirSync(path.dirname(outputFile), { recursive: true })
fs.writeFileSync(outputFile, `${fileContents}\n`, 'utf8')

console.log(`Generated README archive with ${matches.length} items.`)
