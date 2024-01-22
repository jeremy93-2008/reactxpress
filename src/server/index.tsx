import express from 'express'
import React from 'react'
import { renderToPipeableStream } from 'react-dom/server'
import App from '../client/App'
import { config } from '../../reactxpress.config'

const app = express()

app.use(express.static('dist/client'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(config.apiUrl, (request, response) => {
    response.json({ message: 'Hello from the server!' })
})

app.use(config.clientUrl, (request, response, next) => {
    const { pipe } = renderToPipeableStream(<App />, {
        bootstrapModules: ['./index.js'],
        onShellReady() {
            response.setHeader('content-type', 'text/html')
            pipe(response)
        },
    })
})

app.listen(3000, () => console.log('Server is running'))
