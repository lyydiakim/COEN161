console.log("column encoding");
console.log(column("Hello my name is Lydia")); 

function column(str)
{
    let newstring = null;
    let og = str;
    let l = str.length;
    for (let i = 0 ; i < l ; i++) 
    {
        if (str[i] == ' ')
        {
            str = str.replace(' ', '');
        }
    }

    let row = Math.ceil(Math.sqrt(l));
    let col = Math.floor(Math.sqrt(l));
    let count = 0;

    for (i = 0; i < col ; i++) 
    {
        let array = "";
        for (let j = 0 ; j < row ; j++)
        {
                    if (str[count] == undefined)
                        array += '';
                    else
                        array += str[count++];
        }
        console.log(array);
    }
    return("Original String:" + og);
}
