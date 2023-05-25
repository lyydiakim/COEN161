//Question 1 - What attribute did you use to not block the browser while parsing JavaScript?
// Answer: asynch makes it so that the broswer will start downloading the file and move on to next file without fully
                // going through the download -> parse -> execute process
        //defer makes it so that the file does not execute until the DOM content is loaded (dom is a tree in js to interact w html on a page)

//Question 2 - What do you think is happening when you see the error message?
// Answer: run time error because it takes 400 milliseconds for the file to be ready, but the parameter states to repeat
// the function every 100 milliseconds. Because 400 is greater than 100, it is a run time error and it is not ready by
// the time the function is called.

//Question 3 - What does the setInterval function do?
// Answer: the setInterval function repeatedly calls the function stated in the first parameter
// with a pause in between each call. The pause is in milliseconds and stated in the second parameter

//Question 4 - What would happen if the clearInterval call didn't exist?
// Answer: The setInterval function would loop forever and call the function indefinitely.

//Question 5 - What does the 100 in the above code snippet signify?
// Answer: The pause in between each function call in milliseconds


let interval;
function  main () {
        if(interval && window.Chart) {
        createPointsByCategoryChart();
        createPointsInClassChart();
        createGradeByWeekChart()
        }
}

interval = setInterval(main, 100);



function createGradeByWeekChart(){
        const context =  document.querySelector("#trend-graph").getContext("2d");
        const trendchart = new Chart(context, {
                type: 'line',
                data: {
                        
                  labels: [1,2,3,4,5,6,7,8,9,10],
                  datasets: [
                        { 
                        data: [80,60,80,70,60,50,80,90,100],
                        borderColor: "#3e95cd",
                        fill: false
                    }, 
                    { 
                      data: [100,80,50,40,30,70,80,70,65,85],
                      borderColor: "#8e5ea2",
                      fill: false
                    }, 
                  ]
                },
                options: {
                        aspectRatio: 1,
                        plugins: {
                          title: {
                            display: true,
                            text: "Your Grade by Week",
                          },
                          legend: {
                            display: false,
                          },
                        },
                      },
              });
} 

function createPointsInClassChart() {
        const context =  document.querySelector("#pie-chart").getContext("2d");
        const piechart = new Chart(context, {
                type: 'pie',
                data: {
                        labels: ["Points Available", "Points Accumulated"],
                        datasets: [{
                            data: [40, 60],
                            backgroundColor: [
                              "rgba(155, 89, 182, 1.0)",
                              "rgba(155, 89, 182, 0.5)",
                            ],
                            borderWidth: 1,
                        },], 
                        
                        options: {      
                                
                                aspectRatio: 1,
                                plugins: {
                                  title: {
                                    display: true,
                                    text: "Points in Class",
                                  },
                                  legend: {
                                    display: false,
                                  },
                                },
                              },
                }      
        });
}

function createPointsByCategoryChart() {

        const context =  document.querySelector("#vertical-graph").getContext("2d");
        const verticalchart = new Chart(context, 
                { 
                        // the type of chart we want to use
                        type: "bar",
                        data: {
                                // which axis shows these labels?
                                labels: ["Quizzes", "Labs", "Theory", "Practice"],
                                datasets: [
                                // is this the top or bottom data set?
                                // what happens if there's only 1 dataset?
                                {
                                label: "Earned",
                                data: [65, 59, 80, 81, 56, 55, 40],
                                backgroundColor: "rgba(155, 89, 182, 1.0)",
                                },
                                {
                                label: "Missed",
                                data: [65, 59, 80, 81, 56, 55, 40],
                                backgroundColor: "rgba(155, 89, 182, 0.5)",
                                },
                                {
                                label: "Ungraded",
                                data: [65, 59, 80, 81, 56, 55, 40],
                                backgroundColor: "#eee",
                                },
                                ],
                        },
                        options: {
                        scales: {
                        y: {
                        stacked: true,
                        grid: {
                        display: false,
                        },
                        },
                        },
                        x: {
                        stacked: true,
                        grid: {
                        display: false,
                        },
                        },
                        aspectRatio: 1,
                        plugins: {
                        title: {
                        display: true,
                        text: "Points by Category",
                        },
                        }
                        }
                }

        );
}
