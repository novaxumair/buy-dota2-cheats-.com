/**
 * Point node_modules/.bin/wrangler at wrangler-shim so Pages CI `npx wrangler deploy` works.
 */
import { chmodSync, existsSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

const root = join(import.meta.dirname, '..')
const shim = join(root, 'scripts/wrangler-shim.mjs')
const wranglerPkg = join(root, 'node_modules/wrangler/bin/wrangler.js')

if (!existsSync(wranglerPkg)) {
  console.log('patch-wrangler-bin: skip (wrangler not installed yet)')
  process.exit(0)
}

const binDir = join(root, 'node_modules/.bin')
const binUnix = join(binDir, 'wrangler')
const binWin = join(binDir, 'wrangler.cmd')
const binPs1 = join(binDir, 'wrangler.ps1')

const shimPath = shim.replace(/\\/g, '/')

writeFileSync(binUnix, `#!/usr/bin/env node\nimport '${shimPath}'\n`, 'utf8')
try {
  chmodSync(binUnix, 0o755)
} catch {
  /* Windows */
}

writeFileSync(binWin, `@ECHO off\r\nnode "${shim}" %*\r\n`, 'utf8')
writeFileSync(
  binPs1,
  `#!/usr/bin/env pwsh
$basedir=Split-Path $MyInvocation.MyCommand.Definition -Parent
node "${shim.replace(/\\/g, '\\\\')}" $args
exit $LASTEXITCODE
`,
  'utf8',
)

console.log('patch-wrangler-bin: wrangler → pages deploy shim (bare `wrangler deploy` only)')
