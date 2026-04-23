import fs from 'node:fs'
import path from 'node:path'

const rootDir = process.cwd()
const outputFile = path.join(rootDir, 'page-ui/src/data/siteArchive.ts')

const excludedDirs = new Set([
  '.github',
  '.vscode',
  'basic',
  'common',
  'component',
  'control',
  'design',
  'dist',
  'dq-src',
  'init',
  'intro',
  'meta',
  'node_modules',
  'page-ui',
  'renewal',
  'scripts',
])

const entryPriority = [
  'index.html',
  'main.html',
  'index_list.html',
  'indexNew.html',
  'index-city-art.html',
  'index-dream-art.html',
  'index_wood.html',
  'index_holic.html',
  'moabom.html',
  'index_blank.html',
  'index_202104.html',
]

const imagePriority = [
  /main[_-]?visual/i,
  /bg-mainvisual/i,
  /introduction/i,
  /visual\d*/i,
  /banner/i,
  /sub[_-]?visual/i,
  /thumbnail/i,
  /poster/i,
  /photogallery/i,
  /hero/i,
  /intro/i,
]

const imageExtensions = new Set(['.jpg', '.jpeg', '.png', '.gif', '.webp', '.avif', '.svg'])
const genericTitlePatterns = [/^타이틀$/i, /^프로젝트명$/i, /^title$/i, /^project$/i, /^site$/i, /^홈$/i, /^메인$/i]

function isSiteDirectory(dirent) {
  if (!dirent.isDirectory() || excludedDirs.has(dirent.name)) {
    return false
  }

  const dirPath = path.join(rootDir, dirent.name)
  return fs.readdirSync(dirPath, { withFileTypes: true }).some((entry) => entry.isFile() && entry.name.endsWith('.html'))
}

function isGenericTitle(title) {
  const normalized = title.trim()
  if (!normalized) {
    return true
  }

  return genericTitlePatterns.some((pattern) => pattern.test(normalized))
}

function pickEntryFile(folderPath) {
  const htmlFiles = fs
    .readdirSync(folderPath, { withFileTypes: true })
    .filter((entry) => entry.isFile() && entry.name.endsWith('.html'))
    .map((entry) => entry.name)

  const candidates = htmlFiles.map((fileName, index) => {
    const html = fs.readFileSync(path.join(folderPath, fileName), 'utf8')
    const title = extractTitle(html, '')
    const priorityIndex = entryPriority.indexOf(fileName)
    const fileScore = priorityIndex === -1 ? 100 + index : priorityIndex * 10
    const titlePenalty = isGenericTitle(title) ? 1000 : 0

    return {
      fileName,
      title,
      score: fileScore + titlePenalty,
    }
  })

  candidates.sort((a, b) => {
    const diff = a.score - b.score
    if (diff !== 0) {
      return diff
    }

    return a.fileName.localeCompare(b.fileName, 'ko')
  })

  return candidates[0] ?? null
}

function extractTitle(html, fallback) {
  const match = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)
  const title = match?.[1]?.replace(/\s+/g, ' ').trim()
  return title || fallback
}

function prettifyFolderName(name) {
  return name
    .replace(/[-_]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function walkImages(folderPath, current = '') {
  const currentPath = current ? path.join(folderPath, current) : folderPath
  const entries = fs.readdirSync(currentPath, { withFileTypes: true })
  const files = []

  for (const entry of entries) {
    const nextRel = current ? path.join(current, entry.name) : entry.name
    const nextAbs = path.join(folderPath, nextRel)

    if (entry.isDirectory()) {
      files.push(...walkImages(folderPath, nextRel))
      continue
    }

    if (imageExtensions.has(path.extname(entry.name).toLowerCase())) {
      files.push(nextAbs)
    }
  }

  return files
}

function scoreImage(relativePath) {
  const normalized = relativePath.toLowerCase().replace(/\\/g, '/')
  let score = 1000

  imagePriority.forEach((pattern, index) => {
    if (pattern.test(normalized)) {
      score = Math.min(score, index * 100)
    }
  })

  if (normalized.includes('/main/')) {
    score -= 20
  }

  if (normalized.includes('/sub/')) {
    score -= 5
  }

  if (normalized.endsWith('.svg')) {
    score += 10
  }

  return score
}

function pickThumb(folderPath) {
  const images = walkImages(folderPath).map((absolutePath) => path.relative(rootDir, absolutePath).replace(/\\/g, '/'))

  if (images.length === 0) {
    return 'common/images/archive-placeholder.svg'
  }

  images.sort((a, b) => {
    const scoreDiff = scoreImage(a) - scoreImage(b)
    if (scoreDiff !== 0) {
      return scoreDiff
    }

    return a.localeCompare(b, 'ko')
  })

  return images[0]
}

const folders = fs
  .readdirSync(rootDir, { withFileTypes: true })
  .filter(isSiteDirectory)
  .map((dirent) => dirent.name)
  .sort((a, b) => a.localeCompare(b, 'ko'))

const cards = folders.map((folder) => {
  const folderPath = path.join(rootDir, folder)
  const entry = pickEntryFile(folderPath)
  const entryFile = entry?.fileName ?? null
  const entryPath = entryFile ? path.join(folderPath, entryFile) : path.join(folderPath, 'index.html')
  const html = fs.readFileSync(entryPath, 'utf8')
  const title = isGenericTitle(extractTitle(html, '')) ? prettifyFolderName(folder) : extractTitle(html, prettifyFolderName(folder))
  const href = entryFile === 'index.html' || !entryFile ? `${folder}/` : `${folder}/${entryFile}`

  return {
    title,
    href,
    thumb: pickThumb(folderPath),
  }
})

const fileContents = `export type SiteArchiveCard = {
  title: string
  href: string
  thumb: string
}

export const siteArchiveCards: SiteArchiveCard[] = ${JSON.stringify(cards, null, 2)}
`

fs.mkdirSync(path.dirname(outputFile), { recursive: true })
fs.writeFileSync(outputFile, `${fileContents}\n`, 'utf8')

console.log(`Generated ${cards.length} site archive cards.`)
