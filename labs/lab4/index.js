//Question Answers
// status code 200 means request was successful. GET : The resource has been fetched and is transmitted in the message body.
// if you remove the res.end the response process does not end 

const path = require('path');
const http = require("http");

const PublicHandler = require('./routes/public.js');

const requestRouter = function (req,res) 
{
    const url = new URL(req.url, `http://${req.headers.host}`)
    const pathName = url.pathname
//res.statusCode = 200;
//res.end();
    req.app = {
    publicDirectory: path.join(__dirname, "public")
    }

    for(const[key, value] of Object.entries(routes)) 
    {
        console.log(Object.entries(routes));
        if (pathName.includes(key)) // if path includes /public
        {
        if("get" === req.method.toLowerCase() && value.get) // check that the request method is same
        { //call get function
            return value.get(req,res);
        }
        else //no matching path
        {
        res.statusCode = 405; //not found
        return res.end();
        } 
    }

    else //no matching property
    { // cant handle delete so we return method not allowed
        res.writeHead(404); //method not allowed
        return res.end();
    }

    }
}


const routes =
{
    '/public/': PublicHandler
}


const server = http.createServer(requestRouter)
const port = 8080
server.listen(port);
console.log("Server running at : " + port)