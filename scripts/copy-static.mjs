import { cp, mkdir, writeFile } from 'node:fs/promises'
import { readdir } from 'node:fs/promises'
import path from 'node:path'

const repoRoot = process.cwd()
const distDir = path.join(repoRoot, 'dist')
const ignoredRoots = new Set([
  '.github',
  '.vscode',
  'dist',
  'node_modules',
  'page-ui',
  'scripts',
])

async function copyTopLevelDirectory(name) {
  const source = path.join(repoRoot, name)
  const destination = path.join(distDir, name)
  await cp(source, destination, { recursive: true, force: true })
}

async function main() {
  await mkdir(distDir, { recursive: true })
  await writeFile(path.join(distDir, '.nojekyll'), '')

  const entries = await readdir(repoRoot, { withFileTypes: true })
  const directories = entries
    .filter((entry) => entry.isDirectory() && !ignoredRoots.has(entry.name))
    .map((entry) => entry.name)

  await Promise.all(directories.map((directory) => copyTopLevelDirectory(directory)))
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
