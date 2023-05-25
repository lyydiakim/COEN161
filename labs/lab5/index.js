//RUNNING AT PORT 3000, 8080 ALREADY TAKEN IN LAB 3
const path = require('path');
const http = require("http");

const PublicHandler = require('./routes/public.js');
const EventsHandler = require('./routes/events.js');
const utils = require('./utils')


const routes =
{
    '/public/': PublicHandler ,
    '/api/events/':EventsHandler
}



const requestRouter = function (req,res) 
{
    const url = new URL(req.url, `http://${req.headers.host}`)
    const pathName = url.pathname
    console.log(pathName)
  
    req.app = {
        publicDirectory: path.join(__dirname, "public")
    }

    console.log(Object.entries(routes));
   
    for(const[key, value] of Object.entries(routes)) 
    {
        if (pathName.includes(key)) // if path includes /public
        {
            if("get" === req.method.toLowerCase() && value.get) // check that the request method is same
            { //call get function
                return value.get(req,res);
            }
            else if ("post" === req.method.toLowerCase() && value.post)
            {
                utils.readBody(req)
                .then ((val) => 
                {
                    value.post(req,res,val);
                })
                return
            }
            else //no matching path
            {
                res.statusCode = 405; //not found
                return res.end();
            } 
        }
    }

         // cant handle delete so we return method not allowed
         res.writeHead(404); //method not allowed
         return res.end();
         
}





const server = http.createServer(requestRouter)
const port = 3000
server.listen(port);
console.log("Server running at : " + port)