
const http = require('http')
const path = require('path')
const fs = require('fs')
const fsPromises = fs.promises
const utils = require('../utils')

const events = {
    september : {},
    october : {},
    november :{},
    december :{},
}

// When someone makes a get request
// i. use the split function to extract the month request (the URL should look like /api/events/<month>)
// ii. If no month is provided, then send back the JSON string of all the events
// iii. If a month is provided but doesn't exist, make sure to send back an error
module.exports = {
    get: function(req, res)
    {
        const url = new URL(req.url, `http://${req.headers.host}`)
        console.log(url)
        const pathName = url.pathname
        const splitPath = pathName.split('/').slice(1); //turns path into string array
        const monthSelector = (splitPath[splitPath.length-1]) //extract month
        const evaluateMonth = events[monthSelector];

    
        console.log("extracted month:",monthSelector);
        console.log("full path:",pathName);

        if (!monthSelector)
        {   //if no month is provided
            //send back the json string of all the events
               res.write(JSON.stringify(events))
        }

        else if (evaluateMonth === undefined)
        {//if month is provided but does not exist in events object
            res.statusCode = 404;
            return res.end();
        }

        else
        { //if month is provided and does exist
            //send back JSON string of that months events
            console.log('hello')
            console.log(JSON.stringify(evaluateMonth))
            res.setHeader("Content-Type", "application/json")
            res.write(JSON.stringify(evaluateMonth));
        }
        return res.end();

    },

    post : function (req,res,body)
    {
        try
        {

            const bodyParsed = JSON.parse(body); 

            if (!bodyParsed.type || !bodyParsed.date || !bodyParsed.month)
            { //if body does not exist
                res.statusCode = 400; //bad request
                return res.end();
            }

            else if (!utils.VALID_MONTHS.includes(bodyParsed.month.toLowerCase().trim()))
            {//if month is not sept, oct, nov, or dec
                res.statusCode = 400; //bad request
                return res.end();
         

            }
            else if (!utils.VALID_TYPES.includes(bodyParsed.type.toLowerCase().trim()) )
            {
            //if type is lab, office hrs, quiz or hw 
                res.statusCode = 400; //bad request
                return res.end();

            }

            else
            {
                events[bodyParsed.month.toLowerCase().trim()][bodyParsed.date] = {type: bodyParsed.type};  
                res.statusCode = 201; //created   

                return res.end();
          
            }
            return res.end();
        }

        catch(err)
        {
            if (err instanceof SyntaxError)
            {//handle JSOn error by saying its a bad request
                console.log("error parsing JSON", err);
                res.statusCode = 400; //BAD REQUEST
                return res.end();

            }
            else
            {
                res.statusCode = 500; //unexpected error
                console.log("unknown error",err)
                return res.end();

            }
        }
       
    }
}
