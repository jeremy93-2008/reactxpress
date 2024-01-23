const { build } = require('./build')
const { spawn } = require('node:child_process')
const fetch = require('node-fetch-commonjs')

async function dev() {
    build(process.env.NODE_ENV)
    if (process.env.NODE_ENV === 'development') {
        hmr()
    } else {
        setTimeout(() => {
            serve()
        }, 500)
    }
}

async function serve(fn) {
    const cli = spawn('npx', ['tsx', 'watch', './server.js'], {
        cwd: './dist',
    })

    cli.stdout.on('data', (data) => {
        console.log(`${data} ${new Date().toLocaleTimeString()}`)
        if (fn) fn()
    })
    cli.stderr.on('data', (data) => {
        console.error(`${data}`)
    })
    cli.on('close', (code) => {
        console.log(`${code}`)
    })
}

const express = require('express')

async function hmr() {
    const app = express()
    const expressWs = require('express-ws')(app)

    serve(() => {
        expressWs.getWss().clients.forEach((client) => {
            setTimeout(() => {
                client.send('reload')
            }, 500)
        })
    })

    app.ws('/hmr', (ws, req) => {
        ws.on('open', () => {
            console.log('Client connected')
        })
    })

    app.listen(8081, () => {
        console.log('Server listening on port 8081')
    })
}

dev()
