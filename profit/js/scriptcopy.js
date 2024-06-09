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

// Add event listener for the "Send" button
document.querySelector('#contact-form button[type="submit"]').addEventListener('click', function (event) {
  event.preventDefault();
  alert('Pesan telah terkirim!');
});

// Toggle dropdown product list
const dropdownProduct = document.getElementById('dropdown-product');
const linkProducts = document.getElementById('link-products');
dropdownProduct.addEventListener('click', function () {
  linkProducts.classList.toggle('link-products-active');
  dropdownProduct.classList.toggle('dropdown-product-active');
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

// Line chart for sum profit
var lineJsonData = [
  { Year: '2011', SumProfit: '1725478' },
  { Year: '2012', SumProfit: '1769900' },
  { Year: '2013', SumProfit: '7655093' },
];

// Prepare data for the line chart
var lineLabels = lineJsonData.map(function (item) {
  return item.Year;
});
var lineData = lineJsonData.map(function (item) {
  return parseFloat(item.SumProfit);
});

// Create and configure the line chart for sum profit
var lineCtx = document.getElementById('SumProfit').getContext('2d');
var lineChart = new Chart(lineCtx, {
  type: 'line',
  data: {
    labels: lineLabels,
    datasets: [
      {
        label: 'SumProfit',
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

// Line chart for average profit
var lineJsonData = [
  { Year: '2011', AvgProfit: '855.89186507936506' },
  { Year: '2012', AvgProfit: '1017.183908045977' },
  { Year: '2013', AvgProfit: '316.07799661422848' },
];

// Prepare data for the line chart
var lineLabels = lineJsonData.map(function (item) {
  return item.Year;
});
var lineData = lineJsonData.map(function (item) {
  return parseFloat(item.AvgProfit);
});

// Create and configure the line chart for average profit
var lineCtx = document.getElementById('AvgProfit').getContext('2d');
var lineChart = new Chart(lineCtx, {
  type: 'line',
  data: {
    labels: lineLabels,
    datasets: [
      {
        label: 'AvgProfit',
        data: lineData,
        fill: false,
        borderColor: 'rgb(255, 0, 0)', // Set the line color to red
        backgroundColor: 'rgba(255, 0, 0, 0.2)', // Optional: Set the fill color to a light red
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

// Line chart for quarterly profit
var quarterJsonData = [
  { Kuartal: 'K1, 2011', Profit: '2611,66' },
  { Kuartal: 'K2, 2011', Profit: '3433.42' },
  { Kuartal: 'K3, 2011', Profit: '4517.74' },
  { Kuartal: 'K4, 2011', Profit: '3433.42' },
  { Kuartal: 'K1, 2012', Profit: '4517.74' },
  { Kuartal: 'K2, 2012', Profit: '5466.71' },
  { Kuartal: 'K3, 2012', Profit: '6524.03' },
  { Kuartal: 'K4, 2012', Profit: '7506.53' },
  { Kuartal: 'K1, 2013', Profit: '8319.53' },
  { Kuartal: 'K2, 2013', Profit: '9106.83' },
  { Kuartal: 'K3, 2013', Profit: '9388.19' },
  { Kuartal: 'K4, 2013', Profit: '9665.88' },
];

// Prepare data for the line chart
var quarterLabels = quarterJsonData.map(function (item) {
  return item.Kuartal;
});
var quarterData = quarterJsonData.map(function (item) {
  return parseFloat(item.Profit);
});

// Create and configure the line chart for quarterly profit
var quarterCtx = document.getElementById('QuarterProfit').getContext('2d');
var quarterChart = new Chart(quarterCtx, {
  type: 'line',
  data: {
    labels: quarterLabels,
    datasets: [
      {
        label: 'QuarterProfit',
        data: quarterData,
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
          text: 'Quarter',
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

// Bar chart for profit by product category
var categoryJsonData = [
  { Year: '2011', Product_Category: 'Bikes', Profit: '1725478' },
  { Year: '2012', Product_Category: 'Bikes', Profit: '1769900' },
  { Year: '2013', Product_Category: 'Bikes', Profit: '4464349' },
  { Year: '2013', Product_Category: 'Clothing', Profit: '875034' },
  { Year: '2013', Product_Category: 'Accessories', Profit: '2315710' },
];

// Extract unique categories and years
var categories = [...new Set(categoryJsonData.map((item) => item.Product_Category))];
var years = [...new Set(categoryJsonData.map((item) => item.Year))];

// Prepare datasets for the bar chart
var datasets = categories.map(function (category, index) {
  return {
    label: category,
    data: years.map(function (year) {
      var item = categoryJsonData.find(function (data) {
        return data.Year === year && data.Product_Category === category;
      });
      return item ? parseFloat(item.Profit) : 0;
    }),
    backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'][index],
  };
});

// Create and configure the bar chart for profit by product category
var categoryCtx = document.getElementById('CategoryProfit').getContext('2d');
var categoryChart = new Chart(categoryCtx, {
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
      x: {
        stacked: true,
        display: true,
        title: {
          display: true,
          text: 'Year',
        },
      },
      y: {
        stacked: true,
        display: true,
        title: {
          display: true,
          text: 'Profit',
        },
      },
    },
  },
});
