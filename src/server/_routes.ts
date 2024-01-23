import api from './api'
import hello from './api/hello'

export default {
    GET: {
        '/hello': hello,
    },
    POST: {
        '/': api,
    },
    ALL: {
        '/hello': hello,
    },
}
