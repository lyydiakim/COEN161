const http = require('http')
const path = require('path')
const fs = require('fs')
const fsPromises = fs.promises

const publicDirectory  = path.join(__dirname,'..','public')



module.exports = {
    get: function(req, res) {
        
        const splitPath = req.url.split('/').slice(1);          
        let filePath = path.join(req.app.publicDirectory,...splitPath.slice(1));
        const fileType = req.url.split('.');
        const pathExt = fileType[fileType.length-1];


         switch(pathExt) {
            // supported extensions
            case 'html': 
                res.setHeader("Content-Type", "text/html")
                break;

            case 'css':
                res.setHeader("Content-Type", "text/css")
                break;  
            case 'js':
                res.setHeader("Content-Type", "text/javascript")
                break;  
            case 'svg':
                res.setHeader("Content-Type", "image/svg+xml")
                break;  
            case 'ico':
                res.setHeader("Content-Type", "image/ico")
                break;
        
        }

       fsPromises.readFile(filePath)
        .then(function(data) {
            res.write(data);
            res.statusCode = 200;
            res.end()
        })
        .catch(function(err) {
            if(err.errno === "ENOENT")
            {
                console.log("File was not found");
                res.statusCode = 404
            }
            else
            {
                console.log("Internal Server Error")
                res.statusCode = 500
            }
            return res.end();
        })

    }
} 





