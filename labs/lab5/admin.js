const fetch = require('node-fetch');
const utils = require ('./utils.js')


const createEvents = function (month,date,type)
{//createEvents should send a fetch request (using node-fetch) 
// to send a post request that creates a new event 
    const url = `http://localhost:3000/api/events/${month}`;
    
    fetch(url, 
    {
            method: "POST",
            headers: 
            {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({month , date, type})
            
    })

    .then((response) => response.ok)
    .then((data) => 
    {
        console.log('Success:', data);
    })

    .catch((error) => 
    {
        console.error('Error:', error);
    })
};

const getEvents = function (month)
{//getEvents should send a fetch request (using node-fetch) to send a
// get request that reads the events for a month if one is provided.
// If no month is provided, then it should send a get request for all the events in the month
    const url = `http://localhost:3000/api/events/${month}`;
    const nomonth = `http://localhost:3000/api/events`;
    
//if month is empty than get all the events
 if (!month)
 {

    fetch (url).then(function(response) {
        if (response.ok) {
            return response.json()
        }
    }).then(function(data){
        console.log(data)
    })
 }

 else 
 {
    fetch (url).then(function(response) {
        if (response.ok) {
            return response.json()
        }
    }).then(function(data){
        console.log(data)
    })
 }
 };



const sanitize = function (str) 
{
    return str.trim().toLowerCase();
};

const main = function () 
{
    const actualArguments = process.argv.slice(2);
    const options = {
        operation: "",
        month: "",
        create: 
        {
            date: "",
            type: "", },
        };
    // yes, we want to use ++i because the if statements match the flag
    // the value for that flag will be the next item in the list.
    for (let i = 0; i < actualArguments.length; i++) 
    {
        if (actualArguments[i] === "-o" || actualArguments[i] === "--operation") 
        {
            const operation = sanitize(actualArguments[++i]);
        
            if (operation !== "create" && operation !== "read") 
            {
                console.log(
                chalk.red (
                `Invalid operation ${operation} provided, must be create or read`
                )
                );
                process.exit(1);
            }
            options.operation = operation;    
        }
        else if (actualArguments[i] === "-m" || actualArguments[i] === "--month" )
        {
            const month = sanitize(actualArguments[++i]);
            if (!utils.VALID_MONTHS.includes(month)) 
            {
                console.log(
                chalk.red(
                `Invalid month ${month} provided, must be one of
                    ${utils.VALID_MONTHS.join("")}`
                ) );
                process.exit(1);
            }

        options.month = month;
        } 

        else if (actualArguments[i] === "-d" || actualArguments[i] === "--date") 
        {
            const date = parseInt(sanitize(actualArguments[++i])); 
            if(date<1||date>31)
            {
                console.log(
                chalk.red(`Invalid date ${date} provided, must be between 1 and 31`)
                );
                process.exit(1);
            }
            options.create.date = date;
        } 
        
        else if (actualArguments[i] === "-t" || actualArguments[i] === "--type") 
        {
            const type = sanitize(actualArguments[++i]);
            if (!utils.VALID_TYPES.includes(type)) 
            {
                console.log(
                chalk.red(
                `Invalid type ${type} provided, must be one of
                ${utils.VALID_TYPES.join(
                "" )}`
                ));

                process.exit(1);
            }
            options.create.type = type;
      }
   
  } //end of for loop

if(options.operation === "create" && (!options.month || !options.create.date || !options.create.type))  
{
    console.log(chalk.red( `Must provide --date, --month, and --type options for the create operation` ));
    process.exit(1);
}

if (options.operation === "create") 
{
    return createEvents(options.month, options.create.date, options.create.type);
}

else
{
      return getEvents(options.month);
}
}; //end of const main function

main(); //call main

