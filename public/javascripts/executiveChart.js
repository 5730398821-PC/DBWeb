var ctx = document.getElementById("gradeChart").getContext('2d');
var gradeChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ["1.00-2.00", "2.01-3.00", "3.01-4.00"],
    datasets: [{
      label: '1st Year',
      data: [17, 22, 11],
      backgroundColor: "rgba(153,255,51,0.6)"
    }, {
      label: '2nd Year',
      data: [7, 20, 22],
      backgroundColor: "rgba(255,179,71,0.6)"
    },{
      label: '3rd Year',
      data: [12, 19, 14],
      backgroundColor: "rgba(255,209,220,0.6)"
    },{
      label: '4th Year',
      data: [5, 20, 16],
      backgroundColor: "rgba(100,20,100,0.6)"
    },{
      label: 'other',
      data: [4, 14, 3],
      backgroundColor: "rgba(174,198,207,0.6)"
    }]
  }
});


var ctx1 = document.getElementById("pieChart1").getContext('2d');
var pieChart1 = new Chart(ctx1, {
  type: 'doughnut',
  data: {
    labels: ["1st", "2nd", "3rd", "4th", "other"],
    datasets: [{
      backgroundColor: [
        "#2ecc71",
        "#3498db",
        "#95a5a6",
        "#9b59b6",
        "#f1c40f",
        "#e74c3c",
        "#34495e"
      ],
      data: [40, 35, 32, 39, 42]
    }]
  }
});

var ctx2 = document.getElementById("pieChart2").getContext('2d');
var pieChart2 = new Chart(ctx2, {
  type: 'pie',
  data: {
    labels: ["1st", "2nd", "3rd", "4th", "other"],
    datasets: [{
      backgroundColor: [
        "#2ecc71",
        "#3498db",
        "#95a5a6",
        "#9b59b6",
        "#f1c40f",
        "#e74c3c",
        "#34495e"
      ],
      data: [5, 9, 15, 13, 1]
    }]
  }
});
