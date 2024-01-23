import express from 'express'
import React from 'react'
import { renderToPipeableStream } from 'react-dom/server'
import { config } from '../../../reactxpress.config'

import App from '../../client/main'

import middleware from '../middlewares'
import routes from '../routes'

const app = express()

async function server() {
    app.use(express.static('.'))
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))

    // middleware
    app.use(new RegExp(config.apiUrl), (request, response, next) => {
        middleware ? middleware(request, response, next) : () => { }
    })

    // routes
    if (routes) {
        if (routes.GET) {
            Object.entries(routes.GET).forEach(([route, handler]) => {
                app.get(new RegExp(config.apiUrl + route), handler)
            })
        }
        if (routes.POST) {
            Object.entries(routes.POST).forEach(([route, handler]) => {
                app.post(new RegExp(config.apiUrl + route), handler)
            })
        }
        if (routes.ALL) {
            Object.entries(routes.ALL).forEach(([route, handler]) => {
                app.use(new RegExp(config.apiUrl + route), handler)
            })
        }
    }

    // client
    app.use(config.clientUrl, (request, response, next) => {
        const { pipe } = renderToPipeableStream(<App />, {
            bootstrapModules: process.env.NODE_ENV === 'development' ? ['./client.js', './hmr.js'] : ['./client.js'],
            onShellReady() {
                response.setHeader('content-type', 'text/html')
                pipe(response)
            },
            onShellError(error) {
                response.statusCode = 500;
                response.setHeader('content-type', 'text/html');
                response.send('<h1>Something went wrong</h1>');
            },
            onError(error) {
                console.error(error);
            }
        })
    })

    app.listen(3000, () => console.log('Server is running'))
}

server()