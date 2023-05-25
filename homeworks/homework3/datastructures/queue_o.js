const queue = function (){
    let list= [""];

    const enqueue = function (val){
        list.unshift(val); //puts first element at 0
    }
 
    const dequeue = function (){
        list.shift();
    }

    const random = function (){
        let val,bin = null;
        let l = list.length;

        while (l != 10000 )
        {
            bin = Math.ceil(Math.round(Math.random())) //either 1 or 0
            if (bin == 0) 
            {
                val = Math.floor(Math.random() * 10000); 
                enqueue(val);
                l++;
            }
        }   


        while(l != 0) //random function to dequeue
        { 
            bin = Math.ceil(Math.round(Math.random())); //either 1 or 0
            if(bin == 0)
            {
                dequeue();  
                l--; 
            } 
        }
    } 

    dequeue(); //remove last index
    console.log("Dequeued Array:");
    console.log(list);
    

    random();

    const x = {
        random:random,
        enqueue:enqueue,
        dequeue:dequeue

    }
    return x;
}
queue();