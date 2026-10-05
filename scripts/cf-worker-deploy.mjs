/**
 * Cloudflare Worker deploy (static assets in dist/ + workers/site.js).
 * Dashboard: Build = npm run build  |  Deploy = npm run deploy:worker
 */
import { execSync } from 'node:child_process'
import { existsSync } from 'node:fs'
import { join } from 'node:path'

const root = join(import.meta.dirname, '..')
const dist = join(root, 'dist')
const config = join(root, 'wrangler.worker.toml')
const workerEntry = join(root, 'workers', 'site.js')

if (!existsSync(config)) {
  console.error('cf-worker-deploy: wrangler.worker.toml missing')
  process.exit(1)
}
if (!existsSync(workerEntry)) {
  console.error('cf-worker-deploy: workers/site.js missing')
  process.exit(1)
}
if (!existsSync(dist)) {
  console.error('cf-worker-deploy: dist/ missing — run npm run build first')
  process.exit(1)
}
if (!existsSync(join(dist, 'sitemap.xml'))) {
  console.error('cf-worker-deploy: dist/sitemap.xml missing — run npm run build first')
  process.exit(1)
}

const skipBuild =
  process.argv.includes('--no-build') ||
  process.env.CF_WORKER_SKIP_BUILD === '1' ||
  process.env.CI === 'true'

const args = ['wrangler', 'deploy', '-c', 'wrangler.worker.toml']
if (skipBuild) args.push('--no-build')

console.log(`Worker deploy → buydota2cheats-worker (${dist})${skipBuild ? ' [--no-build]' : ''}`)
execSync(args.join(' '), { stdio: 'inherit', cwd: root, env: process.env })
