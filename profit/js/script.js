document.getElementById('contact-button').addEventListener('click', function () {
  document.getElementById('contact-form-container').style.display = 'block';
});

document.addEventListener('click', function (event) {
  if (event.target.id !== 'contact-button' && event.target.id !== 'contact-form-container' && event.target.tagName !== 'INPUT' && event.target.tagName !== 'TEXTAREA') {
    document.getElementById('contact-form-container').style.display = 'none';
  }
});

// line chart
var lineJsonData = [
  { Year: '2011', Profit: '0.38506667618838269' },
  { Year: '2012', Profit: '0.36882167943792565' },
  { Year: '2013', Profit: '0.45525682625677755' },
];

var lineLabels = lineJsonData.map(function (item) {
  return item.Year;
});
var lineData = lineJsonData.map(function (item) {
  return parseFloat(item.Profit);
});

var lineCtx = document.getElementById('lineChart').getContext('2d');
var lineChart = new Chart(lineCtx, {
  type: 'line',
  data: {
    labels: lineLabels,
    datasets: [
      {
        label: 'Profit',
        data: lineData,
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
      },
    ],
  },
  options: {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        enabled: true,
      },
    },
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: 'Year',
        },
      },
      y: {
        display: true,
        title: {
          display: true,
          text: 'Value',
        },
      },
    },
  },
});
    // doughnut chart
        var jsonData = [
            {"string_field_0": "Country", "string_field_1": "Profit"},
            {"string_field_0": "United States", "string_field_1": "3.496.348"},
            {"string_field_0": "Australia", "string_field_1": "3.305.814"},
            {"string_field_0": "United Kingdom", "string_field_1": "1.211.959"},
            {"string_field_0": "France", "string_field_1": "1.058.121"},
            {"string_field_0": "Germany", "string_field_1": "1.051.909"},
            {"string_field_0": "Canada", "string_field_1": "1.026.320"}
        ];

        var labels = [];
        var data = [];
        for (var i = 1; i < jsonData.length; i++) {
            labels.push(jsonData[i].string_field_0);
            data.push(parseFloat(jsonData[i].string_field_1.replace(/\./g, '')));
        }

        var doughnutCtx = document.getElementById('doughnutChart').getContext('2d');
        var doughnutChart = new Chart(doughnutCtx, {
            type: 'doughnut',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Profit',
                    data: data,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)',
                        'rgba(100, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)',
                        'rgba(100, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    tooltip: {
                        enabled: true
                    }
                }
            }
        });

    // bar chart
        var jsonData = [
            {"Year": "2011", "Product_Category": "Bikes", "Profit": "1.725.478"},
            {"Year": "2012", "Product_Category": "Bikes", "Profit": "1.769.900"},
            {"Year": "2013", "Product_Category": "Bikes", "Profit": "4.464.349"},
            {"Year": "2013", "Product_Category": "Clothing", "Profit": "875.034"},
            {"Year": "2013", "Product_Category": "Accessories", "Profit": "2.315.710"}
        ];

        var groupedData = {};
        jsonData.forEach(function(item) {
            if (!groupedData[item.Year]) {
                groupedData[item.Year] = {};
            }
            if (!groupedData[item.Year][item.Product_Category]) {
                groupedData[item.Year][item.Product_Category] = 0;
            }
            groupedData[item.Year][item.Product_Category] += parseFloat(item.Profit.replace(/\./g, ''));
        });

        var years = Object.keys(groupedData).sort();
        var datasets = [];
        Object.keys(groupedData[years[0]]).forEach(function(category) {
            var data = [];
            years.forEach(function(year) {
                data.push(groupedData[year][category]);
            });
            datasets.push({
                label: category,
                data: data,
                backgroundColor: 'rgba(' + Math.floor(Math.random() * 256) + ',' + Math.floor(Math.random() * 256) + ',' + Math.floor(Math.random() * 256) + ', 0.2)',
                borderColor: 'rgba(' + Math.floor(Math.random() * 256) + ',' + Math.floor(Math.random() * 256) + ',' + Math.floor(Math.random() * 256) + ', 1)',
                borderWidth: 1
            });
        });

        var barCtx = document.getElementById('barChart').getContext('2d');
        var barChart = new Chart(barCtx, {
            type: 'bar',
            data: {
                labels: years,
                datasets: datasets
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top'
                    },
                    tooltip: {
                        enabled: true
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        stacked: true
                    },
                    x: {
                        stacked: true
                    }
                }
            }
        });