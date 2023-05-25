let stack = [''];
function push(val)
{
    stack.push(val); //adds elt to top
}
function pop ()// dont need parameter 
{
    stack.pop(); //removes top elt
}

function random ()
{
    let val,bin = null;
    let l = stack.length;
    
    console.time("time"); 

    while (l != 10000)
    {
        bin = Math.ceil(Math.round(Math.random()));   
        if(bin == 0)
        {
            val = Math.floor(Math.random() * 10); 
            push(val);
            l++;
        }
    }
    
    while (l != 0)
    {
        bin = Math.ceil(Math.round(Math.random()));   
        if(bin == 0)
        {
            pop();
            l--;
        }
    }

    console.timeEnd("time");

}

random ();