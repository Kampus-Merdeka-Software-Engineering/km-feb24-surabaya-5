document.getElementById('contact-button').addEventListener('click', function () {
  document.getElementById('contact-form-container').style.display = 'block';
});

document.addEventListener('click', function (event) {
  if (event.target.id !== 'contact-button' && event.target.id !== 'contact-form-container' && event.target.tagName !== 'INPUT' && event.target.tagName !== 'TEXTAREA') {
    document.getElementById('contact-form-container').style.display = 'none';
  }
});

// Add event listener for the "Send" button
document.querySelector('#contact-form button[type="submit"]').addEventListener('click', function (event) {
  event.preventDefault();
  alert('Pesan telah terkirim!');
});

  document.addEventListener('DOMContentLoaded', function () {
    var menuToggle = document.getElementById('menu-toggle');
    var isDragging = false;
    var offset = { x: 0, y: 0 };

    menuToggle.addEventListener('mousedown', function (e) {
      isDragging = true;
      offset.x = e.clientX - menuToggle.getBoundingClientRect().left;
      offset.y = e.clientY - menuToggle.getBoundingClientRect().top;
      menuToggle.style.cursor = 'grabbing';
    });

    document.addEventListener('mousemove', function (e) {
      if (isDragging) {
        var left = e.clientX - offset.x;
        var top = e.clientY - offset.y;
        menuToggle.style.left = left + 'px';
        menuToggle.style.top = top + 'px';
      }
    });

    document.addEventListener('mouseup', function () {
      if (isDragging) {
        isDragging = false;
        menuToggle.style.cursor = 'move';
      }
    });

    // Menu toggle functionality
    menuToggle.addEventListener('click', function () {
      var aside = document.getElementById('aside');
      aside.classList.toggle('open');
      menuToggle.classList.toggle('hamburger');
    });
  });
// Function to animate a number incrementally
function animateNumber(element, endValue, duration) {
  const startValue = parseInt(element.textContent.replace(/,/g, ''));
  let currentValue = startValue;
  const increment = Math.ceil((endValue - startValue) / (duration / 16));

  const timer = setInterval(() => {
    currentValue += increment;
    element.textContent = currentValue.toLocaleString();

    if (currentValue >= endValue) {
      clearInterval(timer);
      element.textContent = endValue.toLocaleString();
    }
  }, 16);
}

// Apply animation to elements with the class 'number'
const numberElements = document.querySelectorAll('.number');
numberElements.forEach((element) => {
  const endValue = parseInt(element.dataset.target);
  const duration = 2000;
  animateNumber(element, endValue, duration);
});

// Toggle dropdown and link styles on click
const dropdownProduct = document.getElementById('dropdown-product');
const linkProducts = document.getElementById('link-products');
dropdownProduct.addEventListener('click', function () {
  linkProducts.classList.toggle('link-products-active');
  dropdownProduct.classList.toggle('dropdown-product-active');
});

// Add 'active' class to clicked aside link and remove from others
const asideLinks = document.querySelectorAll('#aside .aside-link');
asideLinks.forEach((link) => {
  link.addEventListener('click', function () {
    asideLinks.forEach((link) => link.classList.remove('active'));
    this.classList.add('active');
  });
});

// Fetch and process profit data for line chart
fetch('json/profit.json')
  .then((response) => response.json())
  .then((lineJsonData) => {
    const filteredData = lineJsonData.filter((item) => item.Year >= 2011 && item.Year <= 2013);
    const productCategories = [...new Set(filteredData.map((item) => item.Product_Category))];
    const categoryFilterSelect = document.getElementById('categoryFilter');
    const yearFilterSelect = document.getElementById('yearFilter');

    categoryFilterSelect.addEventListener('change', () => updateChart(filteredData));
    yearFilterSelect.addEventListener('change', () => updateChart(filteredData));

    // Function to update the line chart
    const updateChart = (data) => {
      const selectedCategory = categoryFilterSelect.value.toLowerCase();
      const selectedYear = yearFilterSelect.value;

      let filteredChartData = data.filter((item) => selectedCategory === 'all' || item.Product_Category.toLowerCase() === selectedCategory);
      if (selectedYear !== 'all') {
        filteredChartData = filteredChartData.filter((item) => item.Year == selectedYear);
      }

      const lineLabels = ['2011', '2012', '2013'];
      const lineDatasets = [
        {
          label: 'Profit',
          data: lineLabels.map((year) => {
            const yearlyData = filteredChartData.filter((item) => item.Year == year);
            return yearlyData.reduce((sum, item) => sum + parseFloat(item.Profit), 0);
          }),
          fill: false,
          borderColor: `rgba(${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)}, 1)`,
        },
      ];

      lineChart.data.labels = lineLabels;
      lineChart.data.datasets = lineDatasets;
      lineChart.update();
    };

    const lineCtx = document.getElementById('lineChart').getContext('2d');
    const lineChart = new Chart(lineCtx, {
      type: 'line', // Change chart type to 'line'
      data: {
        labels: [],
        datasets: [],
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
              text: 'Profit',
            },
          },
        },
      },
    });

    updateChart(filteredData);
  })
  .catch((error) => console.error('Error fetching the data:', error));

// Fetch and process data for doughnut chart
fetch('json/doughnut_chart.json')
  .then((response) => response.json())
  .then((jsonData) => {
    const filterSelect = document.getElementById('categoryFilter');
    filterSelect.addEventListener('change', () => updateChart(jsonData));

    // Function to update the doughnut chart
    const updateChart = (data) => {
      const selectedCategory = filterSelect.value.toLowerCase();

      // Filter data based on selected category
      const filteredData = selectedCategory === 'all' ? data : data.filter((item) => item.Product_Category.toLowerCase() === selectedCategory);

      // Group data based on Country
      const groupedData = filteredData.reduce((acc, curr) => {
        const { Country, Profit } = curr;
        if (!acc[Country]) {
          acc[Country] = 0;
        }
        acc[Country] += parseFloat(Profit);
        return acc;
      }, {});

      // Fill labels and data arrays
      const labels = [];
      const chartData = [];
      for (const country in groupedData) {
        labels.push(country);
        chartData.push(groupedData[country]);
      }

      // Update chart
      doughnutChart.data.labels = labels;
      doughnutChart.data.datasets[0].data = chartData;
      doughnutChart.update();
    };

    const doughnutCtx = document.getElementById('doughnutChart').getContext('2d');
    const doughnutChart = new Chart(doughnutCtx, {
      type: 'doughnut',
      data: {
        labels: [],
        datasets: [
          {
            label: 'Profit',
            data: [],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
              'rgba(100, 159, 64, 0.2)',
              'rgba(75, 75, 75, 0.2)',
              'rgba(192, 75, 75, 0.2)',
              'rgba(192, 192, 75, 0.2)',
              'rgba(75, 192, 75, 0.2)',
              'rgba(75, 75, 192, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
              'rgba(100, 159, 64, 1)',
              'rgba(75, 75, 75, 1)',
              'rgba(192, 75, 75, 1)',
              'rgba(192, 192, 75, 1)',
              'rgba(75, 192, 75, 1)',
              'rgba(75, 75, 192, 1)',
            ],
            borderWidth: 1,
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
      },
    });
    updateChart(jsonData);
  })
  .catch((error) => console.error('Error fetching data:', error));

// Bar chart
fetch('json/product_category.json')
  .then((response) => response.json())
  .then((jsonData) => {
    const groupedData = {};
    jsonData.forEach(function (item) {
      if (!groupedData[item.Year]) {
        groupedData[item.Year] = {};
      }
      if (!groupedData[item.Year][item.Product_Category]) {
        groupedData[item.Year][item.Product_Category] = 0;
      }
      groupedData[item.Year][item.Product_Category] += parseFloat(item.Profit.replace(/\./g, ''));
    });

    const years = ['2011', '2012', '2013'];
    const allCategories = [...new Set(jsonData.map((item) => item.Product_Category))];

    const datasets = allCategories.map((category) => {
      const data = years.map((year) => groupedData[year]?.[category] || 0);
      return {
        label: category,
        data: data,
        backgroundColor: 'rgba(' + Math.floor(Math.random() * 256) + ',' + Math.floor(Math.random() * 256) + ',' + Math.floor(Math.random() * 256) + ', 0.2)',
        borderColor: 'rgba(' + Math.floor(Math.random() * 256) + ',' + Math.floor(Math.random() * 256) + ',' + Math.floor(Math.random() * 256) + ', 1)',
        borderWidth: 1,
      };
    });

    const barCtx = document.getElementById('barChart').getContext('2d');
    const barChart = new Chart(barCtx, {
      type: 'bar',
      data: {
        labels: years,
        datasets: datasets,
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
          y: {
            beginAtZero: true,
            stacked: true,
          },
          x: {
            stacked: true,
          },
        },
      },
    });

    // Update the bar chart based on category and year filters
    const categoryFilterSelect = document.getElementById('categoryFilter');
    const yearFilterSelect = document.getElementById('yearFilter');

    categoryFilterSelect.addEventListener('change', () => updateChart(jsonData));
    yearFilterSelect.addEventListener('change', () => updateChart(jsonData));

    const updateChart = (data) => {
      const selectedCategory = categoryFilterSelect.value.toLowerCase();
      const selectedYear = yearFilterSelect.value;

      // Filter data based on selected category and year
      let filteredChartData = data.filter((item) => selectedCategory === 'all' || item.Product_Category.toLowerCase() === selectedCategory);
      if (selectedYear !== 'all') {
        filteredChartData = filteredChartData.filter((item) => item.Year == selectedYear);
      }

      // Regenerate grouped data based on selected category and year
      const groupedData = {};
      filteredChartData.forEach(function (item) {
        if (!groupedData[item.Year]) {
          groupedData[item.Year] = {};
        }
        if (!groupedData[item.Year][item.Product_Category]) {
          groupedData[item.Year][item.Product_Category] = 0;
        }
        groupedData[item.Year][item.Product_Category] += parseFloat(item.Profit.replace(/\./g, ''));
      });

      // Generate datasets based on selected category and year
      const updatedDatasets = allCategories.map((category) => {
        const data = years.map((year) => groupedData[year]?.[category] || 0);
        return {
          label: category,
          data: data,
          backgroundColor: 'rgba(' + Math.floor(Math.random() * 256) + ',' + Math.floor(Math.random() * 256) + ',' + Math.floor(Math.random() * 256) + ', 0.2)',
          borderColor: 'rgba(' + Math.floor(Math.random() * 256) + ',' + Math.floor(Math.random() * 256) + ',' + Math.floor(Math.random() * 256) + ', 1)',
          borderWidth: 1,
        };
      });

      // Update chart with new datasets
      barChart.data.datasets = updatedDatasets;
      barChart.update();
    };

    // Initialize chart with all categories and years
    updateChart(jsonData);
  })
  .catch((error) => console.error('Error fetching data:', error));

// Helper function to update the chart based on the selected category and year
const updateChart = (chart, data, category, year) => {
  let filteredData = category === 'all' ? data : data.filter((item) => item.Product_Category.toLowerCase() === category.toLowerCase());

  // Filter data based on the selected year
  filteredData = year === 'all' ? filteredData : filteredData.filter((item) => item.Year == year);

  // Sort the data based on the category
  filteredData = filteredData.sort((a, b) => b.value - a.value);

  const sortedData = filteredData.slice(0, 10); // Take the top 10

  chart.data.labels = sortedData.map((item) => item.Sub_Category);
  chart.data.datasets[0].data = sortedData.map((item) => item.value);
  chart.update();
};

// Function to fetch and process data for Order Quantity bar chart
fetch('json/order_quantity.json')
  .then((response) => response.json())
  .then((jsonData) => {
    const processedData = jsonData.map((item) => ({
      Sub_Category: item.Sub_Category,
      Year: item.Year,
      Product_Category: item.Product_Category,
      value: parseInt(item.Order_Quantity),
    }));

    const allCategories = [...new Set(processedData.map((item) => item.Product_Category))];

    const barCtxQty = document.getElementById('barChartQty').getContext('2d');
    const barChartQty = new Chart(barCtxQty, {
      type: 'bar',
      data: {
        labels: [],
        datasets: [
          {
            label: 'Order Quantity',
            data: [],
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
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
          y: {
            beginAtZero: true,
          },
        },
      },
    });

    // Update the chart based on the filter
    const filterSelect = document.getElementById('categoryFilter');
    const yearFilterSelect = document.getElementById('yearFilter');

    filterSelect.addEventListener('change', () => {
      const selectedCategory = filterSelect.value;
      const selectedYear = yearFilterSelect.value;
      updateChart(barChartQty, processedData, selectedCategory, selectedYear);
    });

    yearFilterSelect.addEventListener('change', () => {
      const selectedCategory = filterSelect.value;
      const selectedYear = yearFilterSelect.value;
      updateChart(barChartQty, processedData, selectedCategory, selectedYear);
    });

    // Initialize the chart with 'all' category and 'all' year
    updateChart(barChartQty, processedData, 'all', 'all');
  })
  .catch((error) => console.error('Error fetching order_qty.json data:', error));

// Function to fetch and process data for Difference bar chart
fetch('json/difference.json')
  .then((response) => response.json())
  .then((jsonData) => {
    const processedData = jsonData.map((item) => ({
      Sub_Category: item.Sub_Category,
      Year: item.Year,
      Product_Category: item.Product_Category,
      value: parseFloat(item.Cost),
    }));

    const barCtxDiff = document.getElementById('barChartDifference').getContext('2d');
    const barChartDifference = new Chart(barCtxDiff, {
      type: 'bar',
      data: {
        labels: [],
        datasets: [
          {
            label: 'Cost',
            data: [],
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
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
          y: {
            beginAtZero: true,
            stacked: true,
          },
        },
      },
    });

    // Update the chart based on the filter
    const filterSelect = document.getElementById('categoryFilter');
    const yearFilterSelect = document.getElementById('yearFilter');

    filterSelect.addEventListener('change', () => {
      const selectedCategory = filterSelect.value;
      const selectedYear = yearFilterSelect.value;
      updateChart(barChartDifference, processedData, selectedCategory, selectedYear);
    });

    yearFilterSelect.addEventListener('change', () => {
      const selectedCategory = filterSelect.value;
      const selectedYear = yearFilterSelect.value;
      updateChart(barChartDifference, processedData, selectedCategory, selectedYear);
    });

    // Initialize the chart with 'all' category and 'all' year
    updateChart(barChartDifference, processedData, 'all', 'all');
  })
  .catch((error) => console.error('Error fetching difference.json data:', error));

document.addEventListener('DOMContentLoaded', function () {
  // Initialize DataTable
  const table = $('#DataTable').DataTable({
    responsive: true,
    columns: [{ data: 'Product' }, { data: 'Product_Category' }, { data: 'Order_Quantity' }],
  });

  // Fetch data from top_produk.json
  fetch('json/top_produk.json')
    .then((response) => response.json())
    .then((data) => {
      // Add data to the table
      data.forEach((item) => {
        table.row
          .add({
            Product: item.Product,
            Product_Category: item.Product_Category,
            Order_Quantity: item.Order_Quantity,
          })
          .draw();
      });
    })
    .catch((error) => console.error('Error fetching top_produk.json data:', error));
});
