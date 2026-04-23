import { cp, mkdir, readdir } from 'node:fs/promises'
import path from 'node:path'

const repoRoot = process.cwd()
const distDir = path.join(repoRoot, 'dist')
const excluded = new Set(['dist', 'node_modules', '.git', '.github', '.vscode', 'page-ui', 'scripts'])

async function copyTopLevelDirectory(name) {
  const source = path.join(repoRoot, name)
  const target = path.join(distDir, name)
  await cp(source, target, { recursive: true })
}

async function main() {
  await mkdir(distDir, { recursive: true })

  const entries = await readdir(repoRoot, { withFileTypes: true })
  const directories = entries
    .filter((entry) => entry.isDirectory() && !excluded.has(entry.name))
    .map((entry) => entry.name)

  await Promise.all(directories.map((name) => copyTopLevelDirectory(name)))
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
