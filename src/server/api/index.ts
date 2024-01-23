import { Request, Response } from 'express'

export default function (request: Request, response: Response) {
    console.log(request.url)
    response.send('Hello from Express 2!')
}
