"use strict"
import Chart from 'chart.js/auto'
// Hämtar data från API
async function fetchData() {
    try {
        const response = await fetch('https://studenter.miun.se/~mallar/dt211g/');
        const data = await response.json();
        let course = [];
        let program = [];
        // Loop through och skicka in kurse och program till var sin array
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
    let data = course.slice(0, 6);
    
    new Chart(
        document.getElementById('kurs'),
        {
          type: 'bar',
          options: {
            indexAxis: 'y',
              scales: {
                y: {
                  ticks: {
                    font: {
                      size: 10,
                      weight: 'bold',
                  },
                    
                  },
                },
               
              },
          },
          data: {
            labels: data.map(row => row.name),
            datasets: [
              {
                label: 'Kurser',
                data: data.map(row => row.applicantsTotal)
              }
            ]
          }
        }
      );    
}

function programChart(program){
    program.sort((a, b) => b.applicantsTotal - a.applicantsTotal);
    let data = program.slice(0, 6);
    new Chart(
        document.getElementById('program'),
        {
          type: 'pie',
          data: {
            labels: data.map(row => row.name),
            datasets: [
              {
                label: 'Program',
                data: data.map(row => row.applicantsTotal)
              }
            ]
          }
        }
      );    
}




