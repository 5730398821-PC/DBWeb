var ctx = document.getElementById("overallChart").getContext('2d');
var data = {
    //labels: ['1st Year', '2nd Year', '3rd Year', '4th Year', '5th Year', '6th Year', '7th Year', '8th Year'],
    labels: ['Year 1/First', 'Year 1/Second', 'Year 2/First', 'Year 2/Second', 'Year 3/First', 'Year 3/Second', 'Year 4/First', 'Year 4/Second'],
    datasets: [
        {
            fill: false,
            lineTension: 0.1,
            backgroundColor: "rgba(75,192,192,0.4)",
            borderColor: "rgba(75,192,192,1)",
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: "rgba(75,192,192,1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(75,192,192,1)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [3.02, 2.75, 3.32, 3.75, 3.02, 3.21],
            spanGaps: false,
        }
    ]
};

var overallChart = new Chart(ctx, {
    type: 'line',
    data: data
});
