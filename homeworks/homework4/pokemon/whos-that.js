const id = Math.floor(150 * (Math.random())+1) // generating roandom number betweene 1 and 150

let correctName;

function onKeyUp(event) 
{
    const input = event.currentTarget;
    const value = input.value.trim().toLowerCase();
    if (event.key === "Enter")
    {
        const img = document.querySelector("img");
        console.log("pressed enter ");
        console.log("value:" + value);
        console.log("correct name:" + correctName);
        if(value === correctName)
        {
            img.classList.add("correct");
        }
        else 
        {
            img.classList.add("wrong");
            setTimeout(function () 
            {
                img.classList.remove("wrong");
            } , 3000);
        }
        
    //define this outside of anything else 
    }
}

fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
    .then(function(response) {
        if(response.ok) {
            return response.json()  
        }
        return null
    })

    .catch(function(err) 
    {
        const p = document.createElement('p'); // create elt to attach to parant
        p.textContent = "Pokemon API returned non JSON"; //use .textContent to add text to an element
        //stay away from inner html 
        const parent = document.querySelector("section");
        //section is the parent elt, appending p to section
        parent.prepend(p); //prepend new paragraph to section, prepend is to the front
    }) 

    .then (function (pokemon) {
    if(!pokemon) //when pokemon == undefined, null, false, "", 0
    {
        return;
    }
    console.log("Pokemon",pokemon);
    console.log("Pokemon's Name", pokemon.name);
    correctName = pokemon.name; //all lowercase version
    const img = document.querySelector('img');
    const name = pokemon.name[0].toUpperCase() + pokemon.name.substring(1); // this is the uppercase
    img.src = `https://aelahi.dev/coen-161/pokemon/${name}.png`;
    //anytime you need to interact with the HTML form JavsCrtipy
    // first get a reference to the e
    const input = document.querySelector('input');
    input.addEventListener("keyup", onKeyUp);

    if (id == 122)
    {
            name = "Mr.Mime"; //special case bc two uppercase
    }


    })

    .catch (function (err) {
        const p = document.createElement('p') // create elt to attach to parant
        p.textContent = "Pokemon API returned non JSON"; //use .textContent to add text to an element
        //stay away from inner html 
        const parent = document.querySelector("section")
        //section is the parent elt, appending p to section
        parent.prepend(p) //prepend new paragraph to section, prepend is to the front
    })
