;(function hmr() {
    const ws = new WebSocket('ws://localhost:8081/hmr')
    ws.onmessage = function (event) {
        window.location.reload()
    }
})()
