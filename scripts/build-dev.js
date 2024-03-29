const esbuild = require('esbuild')
const chunkNamePlugin = require('./plugins/chunkName.esbuild')

async function build(mode) {
    async function buildServer() {
        // Build server
        const server = await esbuild
            .context({
                entryPoints: ['src/server/index.tsx'],
                outfile: 'dist/server.js',
                bundle: true,
                platform: 'node',
                target: 'node14',
                loader: {
                    '.js': 'jsx',
                },
                plugins: [chunkNamePlugin(['./client.js', './hmr.js'])],
            })
            .catch(() => process.exit(1))

        server.watch()
    }

    async function buildClient() {
        // Build client
        const client = await esbuild
            .context({
                entryPoints: ['src/client/index.tsx'],
                outfile: 'dist/client.js',
                bundle: true,
                platform: 'browser',
                target: 'es2018',
            })
            .catch(() => process.exit(1))

        client.watch({})
    }

    async function buildHmr() {
        // Build Hmr
        await esbuild
            .build({
                entryPoints: ['./scripts/templates/hmr.js'],
                outfile: 'dist/hmr.js',
                bundle: true,
                platform: 'browser',
                target: 'es2018',
            })
            .catch(() => process.exit(1))
    }

    buildClient()
    buildServer()
    if (mode === 'development') buildHmr()

    return ['./client.js', './hmr.js']
}

build()

module.exports = {
    build,
}
