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

document.getElementById('country-dropdown').addEventListener('change', function () {
  var selectedCountry = this.value;
  var selectedSubCategory = document.getElementById('category-dropdown').value;
  fetchAndUpdateCharts(selectedCountry, selectedSubCategory);
});

document.getElementById('category-dropdown').addEventListener('change', function () {
  var selectedSubCategory = this.value;
  var selectedCountry = document.getElementById('country-dropdown').value;
  fetchAndUpdateCharts(selectedCountry, selectedSubCategory);
});

const musimApiUrl = 'fetch/top_product_by_season.json';
const profitApiUrl = 'fetch/top_product_by_country.json';
const recordCountUrl = 'fetch/top_product_by_agegroub.json';

fetchAndUpdateCharts();

function fetchAndUpdateCharts(country, subCategory) {
  fetch(musimApiUrl)
    .then((response) => response.json())
    .then((data) => {
      updateMusimChart(data, country, subCategory);
    })
    .catch((error) => {
      console.error('There has been a problem with your fetch operation:', error);
    });

  fetch(`${profitApiUrl}?country=${country}&subCategory=${subCategory}`)
    .then((response) => response.json())
    .then((data) => {
      updateProfitChart(data, country, subCategory);
    })
    .catch((error) => {
      console.error('There has been a problem with your fetch operation:', error);
    });

  fetch(`${recordCountUrl}?country=${country}&subCategory=${subCategory}`)
    .then((response) => response.json())
    .then((data) => {
      updateRecordCountChart(data, country, subCategory);
    })
    .catch((error) => {
      console.error('There has been a problem with your fetch operation:', error);
    });
}

function updateMusimChart(data, country = null, productCategory = null) {
  const musimCtx = document.getElementById('musimChart').getContext('2d');
  if (window.musimChart instanceof Chart) {
    window.musimChart.destroy();
  }

  const filteredData = data.filter((item) => (!country || item.Country === country) && (!productCategory || item.Product_Category === productCategory));

  const groupedData = filteredData.reduce((acc, item) => {
    if (!acc[item.Musim]) {
      acc[item.Musim] = {};
    }
    if (!acc[item.Musim][item.Product_Category]) {
      acc[item.Musim][item.Product_Category] = {};
    }
    if (!acc[item.Musim][item.Product_Category][item.Sub_Category]) {
      acc[item.Musim][item.Product_Category][item.Sub_Category] = 0;
    }
    acc[item.Musim][item.Product_Category][item.Sub_Category] += parseInt(item.Order_Quantity, 10);
    return acc;
  }, {});

  const seasons = Object.keys(groupedData);
  const productCategories = [...new Set(filteredData.map((item) => item.Product_Category))];

  // Calculate total order quantity for each Sub_Category within each season
  const seasonSubCategoryQuantities = seasons.map((season) => {
    const subCategories = Object.keys(groupedData[season]).reduce((acc, category) => {
      const subCatKeys = Object.keys(groupedData[season][category]);
      subCatKeys.forEach((subCatKey) => {
        if (!acc[subCatKey]) {
          acc[subCatKey] = 0;
        }
        acc[subCatKey] += groupedData[season][category][subCatKey];
      });
      return acc;
    }, {});

    return {
      season,
      subCategories,
    };
  });

  // Sort subCategories by total quantity within each season
  const sortedSeasonSubCategories = seasonSubCategoryQuantities.map(({ season, subCategories }) => {
    const sortedSubCategories = Object.keys(subCategories).sort((a, b) => subCategories[b] - subCategories[a]);
    return {
      season,
      sortedSubCategories,
    };
  });

  // Merge sorted subCategories from all seasons to maintain a consistent order
  const sortedSubCategories = [...new Set(sortedSeasonSubCategories.flatMap(({ sortedSubCategories }) => sortedSubCategories))];

  const datasets = productCategories.flatMap((category) => {
    return sortedSubCategories.map((subCategory) => {
      return {
        label: `${subCategory}`,
        data: seasons.map((season) => (groupedData[season][category] && groupedData[season][category][subCategory] ? groupedData[season][category][subCategory] : 0)),
        backgroundColor: `rgba(${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)}, 0.2)`,
        borderColor: `rgba(${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)}, 1)`,
        borderWidth: 3,
      };
    });
  });

  window.musimChart = new Chart(musimCtx, {
    type: 'bar',
    data: {
      labels: seasons,
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
        },
        x: {
          beginAtZero: true,
          stacked: false,
          barPercentage: 1,
          categoryPercentage: 0.5,
        },
      },
    },
  });
}

function updateProfitChart(data, country = null, productCategory = null) {
  const ctx = document.getElementById('profitChart').getContext('2d');

  if (window.profitChart instanceof Chart) {
    window.profitChart.destroy();
  }

  const filteredData = data.filter((item) => (!country || item.Country === country) && (!productCategory || item.Product_Category === productCategory));

  const allSubCategories = [...new Set(filteredData.map((item) => item.Sub_Category))]; // Hanya sub-kategori dari data yang difilter

  const groupedData = filteredData.reduce((acc, item) => {
    if (!acc[item.Sub_Category]) {
      acc[item.Sub_Category] = {};
    }
    if (!acc[item.Sub_Category][item.Country]) {
      acc[item.Sub_Category][item.Country] = 0;
    }
    acc[item.Sub_Category][item.Country] += parseFloat(item.profit);
    return acc;
  }, {});

  const countries = [...new Set(filteredData.map((item) => item.Country))];

  // Calculate total profit for each Sub_Category
  const subCategoryProfits = allSubCategories.map((subCategory) => ({
    subCategory,
    totalProfit: Object.values(groupedData[subCategory] || {}).reduce((sum, profit) => sum + profit, 0),
  }));

  // Sort Sub_Categories by total profit in descending order
  subCategoryProfits.sort((a, b) => b.totalProfit - a.totalProfit);

  // Extract sorted subCategories
  const sortedSubCategories = subCategoryProfits.map((item) => item.subCategory);

  const datasets = countries.map((country) => ({
    label: country,
    data: sortedSubCategories.map((subCategory) => (groupedData[subCategory] ? groupedData[subCategory][country] || 0 : 0)),
    fill: false,
    backgroundColor: `rgba(${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)}, 0.2)`,
    borderColor: `rgba(${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)}, 1)`,
    borderWidth: 2,
    tension: 0.4,
  }));

  window.profitChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: sortedSubCategories,
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
          ticks: {
            callback: function (value, index, values) {
              return value * 100 + '%';
            },
          },
        },
        x: {
          beginAtZero: true,
          stacked: false,
        },
      },
      elements: {
        line: {
          tension: 0.4,
        },
        point: {
          radius: 4,
          hitRadius: 10,
          hoverRadius: 6,
        },
      },
    },
  });
}

function updateRecordCountChart(data, country = null, productCategory = null) {
  const recordCountCtx = document.getElementById('recordCountChart').getContext('2d');
  if (window.recordCountChart instanceof Chart) {
    window.recordCountChart.destroy();
  }

  const filteredData = data.filter((item) => (!country || item.Country === country) && (!productCategory || item.Product_Category === productCategory));

  const groupedData = filteredData.reduce((acc, item) => {
    if (!acc[item.Sub_Category]) {
      acc[item.Sub_Category] = {};
    }
    if (!acc[item.Sub_Category][item.Age_Group]) {
      acc[item.Sub_Category][item.Age_Group] = 0;
    }
    acc[item.Sub_Category][item.Age_Group] += parseInt(item.Order_Quantity, 10);
    return acc;
  }, {});

  const ageGroups = [...new Set(filteredData.map((item) => item.Age_Group))];

  // Calculate total order quantity for each Sub_Category within each age group
  const subCategoryQuantities = Object.keys(groupedData).map((subCategory) => {
    const totalQuantity = ageGroups.reduce((sum, ageGroup) => {
      return sum + (groupedData[subCategory][ageGroup] || 0);
    }, 0);
    return { subCategory, totalQuantity };
  });

  // Sort subCategories by total quantity in descending order
  subCategoryQuantities.sort((a, b) => b.totalQuantity - a.totalQuantity);

  // Extract sorted subCategories
  const sortedSubCategories = subCategoryQuantities.map((item) => item.subCategory);

  const datasets = ageGroups.map((ageGroup) => ({
    label: ageGroup,
    data: sortedSubCategories.map((subCategory) => groupedData[subCategory][ageGroup] || 0),
    backgroundColor: `rgba(${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)}, 0.2)`,
    borderColor: `rgba(${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)}, 1)`,
    borderWidth: 3,
  }));

  window.recordCountChart = new Chart(recordCountCtx, {
    type: 'bar',
    data: {
      labels: sortedSubCategories,
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
}

function updateJsonData(data, newItem, filterKeys) {
  const existingItemIndex = data.findIndex((item) => filterKeys.every((key) => item[key] === newItem[key]));

  if (existingItemIndex > -1) {
    data[existingItemIndex] = newItem;
  } else {
    data.push(newItem);
  }

  const filteredData = data.filter((item) => filterKeys.every((key) => newItem[key] === null || item[key] === newItem[key]));

  return filteredData;
}

const exampleData = [
  { Country: 'United States', Product_Category: 'Clothing', Value: 100 },
  { Country: 'Canada', Product_Category: 'Clothing', Value: 150 },
];
const newItem = { Country: 'United States', Product_Category: 'Clothing', Value: 200 };
const filterKeys = ['Country', 'Product_Category'];

const updatedData = updateJsonData(exampleData, newItem, filterKeys);
console.log(updatedData);
