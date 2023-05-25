const http = require('http')

module.exports = {
    lookup: function(pathExt) {
        let mimeExt;

        switch(pathExt) {
            case '.html':
                mimeExt = 'text/html'
                break
                
            case '.css':
                mimeExt = 'text/css'
                break

            case '.js':
                mimeExt = 'text/javascript'
                break

            case '.svg':
                mimeExt = 'image/svg+xml'
                break

            case '.jpeg':
                mimeExt = 'image/jpeg'
                break

            case '.png':
                mimeExt = 'image/png'
                break

            case '.gif':
                mimeExt = 'image/gif'
                break

            default:
                mimeExt = 'text/html'    
        }
        return mimeExt
    }
}