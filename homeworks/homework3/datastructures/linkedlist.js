function node(val, next)
{
    if(next==null)
    {
        next=null;
    };

    return 
    {
        val: val;
        next: next;
    };

}

function linkedList()
{
    let head = null;

    const prepend = function(v)
    { // inserts an element at the front of the list
        if(head == null){
            head = node(v);
        }else{
            let x = node(v, head);
            head = x;
        }

    }

    const deleteMatching = function(v)
    { // removes all elements whose value is the value included
        let current = head;
        while( current.next!== null){
            if(current.next.value == v){
                current.next = current.next.next; 
            }else{
                current=current.next;
                
            }
        }

    }

    const traverse = function (fn)
    { // calls the function fn for every element in the list
        let current = head;
        while(current!= null)
        {
            fn(current);
        }
    }

    const x =
    {
        prepend:prepend,
        
        deleteMatching:deleteMatching,
        traverse:traverse

    }
    
    return x;
    
}



/*
[5] Use each of the LinkedList functions in a main program. 
Prepend the following elements: 1, 324, 'a', false, 'b', false, true, 42.1
Use the traverse function and console.log to print every element in the list
Delete any node with the value 1
Use the traverse function and console.log to print every element in the list
Delete any node with the value false
Use the traverse function and console.log to print every element in the list 
*/