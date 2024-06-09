document.addEventListener('DOMContentLoaded', function () {
  axios
    .get('json/profit.json')
    .then((response) => {
      const profitData = response.data;
      const years = profitData.map((data) => data.Year);
      const profit = profitData.map((data) => data.Profit);

      const ctx = document.getElementById('lib=neChart').getContext('2d');
      new Chart(ctx, {
        type: 'line',
        data: {
          labels: years,
          datasets: [
            {
              label: 'Revenue',
              data: revenues,
              borderColor: 'rgba(75, 192, 192, 1)',
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
            },
          ],
        },
        options: {
          responsive: true,
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
                text: 'Revenue',
              },
            },
          },
        },
      });
    })
    .catch((error) => {
      console.error(error);
    });
});
