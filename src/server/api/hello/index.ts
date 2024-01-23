import { Request, Response } from 'express'

export default function (request: Request, response: Response) {
    console.log(request.body, request.method)
    response.send('Hello')
}
