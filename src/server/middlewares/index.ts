import { Request, Response, NextFunction } from 'express'

export default function (
    request: Request,
    response: Response,
    next: NextFunction
) {
    console.log('middleware', request.method, request.url)
    next()
}
