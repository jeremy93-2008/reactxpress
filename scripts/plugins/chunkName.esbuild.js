const fs = require('fs')

const chunkNamePlugin = (filenames) => ({
    name: 'chunkname',
    setup(build) {
        build.onEnd((result) => {
            const text = fs.readFileSync('./dist/server.js')
            const newText = text
                .toString()
                .replace(
                    '"<client>"',
                    `${filenames.map((file) => `"${file}"`).join(',')}`
                )
            fs.writeFileSync('./dist/server.js', newText)
        })
    },
})

module.exports = chunkNamePlugin
