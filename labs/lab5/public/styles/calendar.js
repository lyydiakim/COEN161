



const resetCalendar = ()=> {
    const numbers = document.querySelectorAll("td")
    numbers.forEach ((day)=>{
        day.className = " ";
        day.innerHTML = " ";
    });
};

const initializeCalendar = (dirtydate)=> {
    const dateArg = DateFns.toDate(dirtydate ? dirtydate : Date.now());
    const startOfMonth = DateFns.startOfMonth(dateArg);
    const startDay = startOfMonth.getDay();
    const endOfMonth = DateFns.endOfMonth(dateArg);
    const endDate = endOfMonth.getDate();
    

    const days = document.querySelectorAll("td");

    for (let i = startDay, j = 1; j<=endDate; i++, j++){
        const day = document.createElement("span");
        day.textContent = j;
        days[i].appendChild(day);
    } 
    return [dateArg , days];
};

const populateEvents = (date, days) => {
    let month = ''
    let numMonth = date.getMonth()+1;
    console.log(numMonth)

    if (numMonth === 12)
        month = 'december'
    else if (numMonth === 11)
        month = 'november'
    else if (numMonth === 10)
        month = 'october'
    else if (numMonth === 9)
        month = 'september'


    let url = `http://localhost:3000/api/events/${month}`;

    fetch (url).then(function(response) {
        if (response.ok) {
            return response.json()
        }
    }).then(function(events){
        if(!events){
            return;
        }
    
        const startOfMonth = DateFns.startOfMonth(date);
        const startDay = startOfMonth.getDay();
    
        for(let [index, event] of Object.entries(events)){
            const day = days[parseInt(index, 10) + startDay - 1 ];
            day.classList.add(event.type);
        }
        console.log(events)
    })

};

const showMonths = (dirtyMonth) =>{
    resetCalendar();

    const month = Math.max(dirtyMonth , 9);
    const selectMonth= document.querySelector(`.month-selector [value="${month}"]`); 

    selectMonth.checked = true;

    selectMonth.parentElement.classList.add("selected");

    const [date,days] = initializeCalendar(Date.parse(`2022-${month}-02`));
    console.log("date" , date)

    populateEvents(date, days);
};

const main = () => {
    console.log("in main"); 
    const radio = document.querySelectorAll(".month-selector input");
    console.log(radio);
    let selectedMonth;

    for (elem of radio){
        if (elem.checked) {
            console.log(elem);
            selectedMonth = elem;
            showMonths(current.value);
            break;
        }
    }
    radio.forEach ((input) => {
        input.addEventListener("change" , (event)=>{
            for (const input of radio){
                input.parentElement.classList.remove("selected");
            }

            const current= event.currentTarget;
            if(current.checked){
                // current.parentElement.classList.add("selected");
                
                showMonths(current.value);
                console.log('selectedMonth' ,selectedMonth);
                selectedMonth = current.value;
            }
        });
    });
    switch( selectedMonth) {
        case '9' : stringMonth = 'september'; break;
        case '10' : stringMonth = 'october'; break;
        case '11' : stringMonth = 'november'; break;
        case '12' : stringMonth = 'december'; break;
        default: stringMonth = 'november'; break;
    }
    
    showMonths(new Date().getMonth()+1);

};

main();

