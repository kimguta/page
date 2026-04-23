import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'

const repoRoot = process.cwd()
const distDir = path.join(repoRoot, 'dist')

async function main() {
  await mkdir(distDir, { recursive: true })
  await writeFile(path.join(distDir, '.nojekyll'), '')
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
