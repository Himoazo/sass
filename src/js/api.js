"use strict"

async function fetchData() {
    try {
        const response = await fetch('https://studenter.miun.se/~mallar/dt211g/');
        const data = await response.json();

        let course = [];
        let program = [];
        data.forEach((item)=> {
        if(item.type === "Kurs" ){
            course.push(item);      
        } else if(item.type === "Program"){
            program.push(item);      
        }
        });
        courseChart(course); 
        programChart(program);
        
    } catch (error) {
        console.error('Fetch error:', error);
        throw error;
    }
}

fetchData();

function courseChart(course){
    course.sort((a, b) => b.applicantsTotal - a.applicantsTotal);
    console.log(course.slice(0, 6));
}

function programChart(program){
    program.sort((a, b) => b.applicantsTotal - a.applicantsTotal);
    console.log(program.slice(0, 6));
}
