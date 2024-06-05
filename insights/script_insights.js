document.getElementById('contact-button').addEventListener('click', function () {
  document.getElementById('contact-form-container').style.display = 'block';
});

document.addEventListener('click', function (event) {
  if (event.target.id !== 'contact-button' && event.target.id !== 'contact-form-container' && event.target.tagName !== 'INPUT' && event.target.tagName !== 'TEXTAREA') {
    document.getElementById('contact-form-container').style.display = 'none';
  }
});

// Tambahkan event listener untuk tombol "Send"
document.querySelector('#contact-form button[type="submit"]').addEventListener('click', function (event) {
  // Jangan lakukan reload halaman (default action dari tombol submit)
  event.preventDefault();

  // Tambahkan kode untuk mengirim pesan
  alert('Pesan telah terkirim!');
  // Anda dapat menambahkan logika untuk mengirim pesan ke server di sini
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

fetchAndUpdateCharts('United States', 'Clothing');

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

function updateMusimChart(data, country = null, subCategory = null) {
  const musimCtx = document.getElementById('musimChart').getContext('2d');
  if (country && window.musimChart instanceof Chart) {
    window.musimChart.destroy();
  }
  const filteredData = data.filter((item) => (!country || item.Country === country) && (!subCategory || item.Product_Category === subCategory));
  const groupedData = filteredData.reduce((acc, item) => {
    if (!acc[item.Musim]) {
      acc[item.Musim] = {};
    }
    if (!acc[item.Musim][item.Sub_Category]) {
      acc[item.Musim][item.Sub_Category] = 0;
    }
    acc[item.Musim][item.Sub_Category] += parseInt(item.Order_Quantity, 10);
    return acc;
  }, {});
  const seasons = Object.keys(groupedData);
  const subCategories = Object.keys(groupedData[seasons[0]]);
  const sortedSubCategories = subCategories.sort((a, b) => {
    const totalA = seasons.reduce((sum, season) => sum + (groupedData[season][a] || 0), 0);
    const totalB = seasons.reduce((sum, season) => sum + (groupedData[season][b] || 0), 0);
    return totalB - totalA;
  });
  const datasets = sortedSubCategories.map((subCategory) => ({
    label: subCategory,
    data: seasons.map((season) => groupedData[season][subCategory] || 0),
    backgroundColor: `rgba(${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)}, 0.2)`,
    borderColor: `rgba(${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)}, 1)`,
    borderWidth: 1,
  }));
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
          stacked: false,
        },
        x: {
          stacked: false,
        },
      },
    },
  });
}
function updateProfitChart(data, country = null, subCategory = null) {
  const ctx = document.getElementById('profitChart').getContext('2d');

  if (country && window.profitChart instanceof Chart) {
    window.profitChart.destroy();
  }

  const filteredData = data.filter((item) => (!country || item.Country === country) && (!subCategory || item.Product_Category === subCategory));

  const subCategories = [...new Set(filteredData.map((item) => item.Product_Category))];
  const profits = subCategories.map((subCategory) => {
    const item = filteredData.find((dataItem) => dataItem.Product_Category === subCategory);
    return item ? parseFloat(item.profit) : 0;
  });

  window.profitChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: subCategories,
      datasets: [
        {
          label: 'Profit',
          data: profits,
          backgroundColor: subCategories.map(() => `rgba(${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)}, 0.2)`),
          borderColor: subCategories.map(() => `rgba(${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)}, 1)`),
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
}

function updateRecordCountChart(data, country = null, subCategory = null) {
  const recordCountCtx = document.getElementById('recordCountChart').getContext('2d');
  if (country && window.recordCountChart instanceof Chart) {
    window.recordCountChart.destroy();
  }

  const filteredData = data.filter((item) => (!country || item.Country === country) && (!subCategory || item.Product_Category === subCategory));

  const ageGroups = [...new Set(filteredData.map((item) => item.Age_Group))];
  const countries = [...new Set(filteredData.map((item) => item.Country))];

  const datasets = countries.map((country) => {
    return {
      label: country,
      data: ageGroups.map((ageGroup) => {
        const item = filteredData.find((dataItem) => dataItem.Country === country && dataItem.Age_Group === ageGroup);
        return item ? parseInt(item.Order_Quantity, 10) : 0;
      }),
      backgroundColor: `rgba(${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)}, 0.2)`,
      borderColor: `rgba(${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)}, 1)`,
      borderWidth: 1,
    };
  });

  window.recordCountChart = new Chart(recordCountCtx, {
    type: 'bar',
    data: {
      labels: ageGroups,
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
    // Update existing item
    data[existingItemIndex] = newItem;
  } else {
    // Add new item
    data.push(newItem);
  }

  // Optionally, remove items that don't match the new filter criteria
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

const dropdownProduct = document.getElementById('dropdown-product');
const linkProducts = document.getElementById('link-products');
dropdownProduct.addEventListener('click', function () {
  linkProducts.classList.toggle('link-products-active');
  dropdownProduct.classList.toggle('dropdown-product-active');
});

const asideLinks = document.querySelectorAll('#aside .aside-link');

asideLinks.forEach((link) => {
  link.addEventListener('click', function () {
    // Hapus kelas 'active' dari semua tautan
    asideLinks.forEach((link) => link.classList.remove('active'));

    // Tambahkan kelas 'active' pada tautan yang diklik
    this.classList.add('active');
  });
});