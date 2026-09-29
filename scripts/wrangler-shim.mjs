/**
 * Routes bare `wrangler deploy` (Cloudflare Pages dashboard default) to Pages deploy.
 * `wrangler deploy -c wrangler.worker.toml` still uses the real Wrangler CLI.
 */
import { spawnSync } from 'node:child_process'
import { existsSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const args = process.argv.slice(2)

function hasAltConfig(argv) {
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i]
    if (a === '-c' || a === '--config') return true
    if (a.startsWith('-c=') || a.startsWith('--config=')) return true
  }
  return false
}

const isBareDeploy =
  args.length >= 1 &&
  args[0] === 'deploy' &&
  !hasAltConfig(args) &&
  !args.includes('pages')

if (isBareDeploy) {
  const deployScript = join(root, 'scripts/cf-pages-deploy.mjs')
  const run = spawnSync(process.execPath, [deployScript], {
    stdio: 'inherit',
    cwd: root,
    env: process.env,
  })
  process.exit(run.status ?? 1)
}

const realWrangler = join(root, 'node_modules/wrangler/bin/wrangler.js')
if (!existsSync(realWrangler)) {
  console.error('wrangler-shim: wrangler package not installed')
  process.exit(1)
}

const run = spawnSync(process.execPath, [realWrangler, ...args], {
  stdio: 'inherit',
  cwd: root,
  env: process.env,
})
process.exit(run.status ?? 1)
