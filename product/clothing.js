const product = "clothing.json";

fetch(product)
  .then(function (response) {
    return response.json();
  })
  .then(function (clothing) {
    let placeholder = document.querySelector("#data-output");
    let out = "";
    for (let product of clothing) {
      out += `
          <tr>
          <td>${product.Product}</td>
              <td><button class="action-btn">
              <div class="action-btn-wrapper">
                <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#3a9be0">
                  <path
                    d="M841-518v318q0 33-23.5 56.5T761-120H201q-33 0-56.5-23.5T121-200v-318q-23-21-35.5-54t-.5-72l42-136q8-26 28.5-43t47.5-17h556q27 0 47 16.5t29 43.5l42 136q12 39-.5 71T841-518Zm-272-42q27 0 41-18.5t11-41.5l-22-140h-78v148q0 21 14 36.5t34 15.5Zm-180 0q23 0 37.5-15.5T441-612v-148h-78l-22 140q-4 24 10.5 42t37.5 18Zm-178 0q18 0 31.5-13t16.5-33l22-154h-78l-40 134q-6 20 6.5 43t41.5 23Zm540 0q29 0 42-23t6-43l-42-134h-76l22 154q3 20 16.5 33t31.5 13ZM201-200h560v-282q-5 2-6.5 2H751q-27 0-47.5-9T663-518q-18 18-41 28t-49 10q-27 0-50.5-10T481-518q-17 18-39.5 28T393-480q-29 0-52.5-10T299-518q-21 21-41.5 29.5T211-480h-4.5q-2.5 0-5.5-2v282Zm560 0H201h560Z"
                  />
                </svg>
                <span>3</span>
              </div>
            </button></td>
              <td>${product.Date}</td>
              <td>${product.Sub_Category}</td>
              <td><div class="order-quantity-value">
              ${product.Order_Quantity}
              <span>29.63% of all</span>
              </div></td>
              <td><div class="revenue-value">
              ${product.Revenue}
              <span>29.63% of all</span>
              </div></td>
              <td><div class="cost-value">
              ${product.Cost}
              <div class="progress-bar-wrapper">
                  <div class="progress-bar"></div>
                </div>
              </div>
              </td>
              <td>
              <div class="profit-value">
              ${product.Profit}
              <div class="progress-bar-wrapper">
                  <div class="progress-bar"></div>
                </div>
              </div>
              </td>
          <tr>
      `;
    }

    placeholder.innerHTML = out;
  });

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

document.addEventListener("DOMContentLoaded", (event) => {
  const dropdownButton = document.querySelector(".dropdown-button");
  const dropdownContent = document.querySelector(".dropdown-content");
  const dropdownItems = document.querySelectorAll(".dropdown-item");

  dropdownButton.addEventListener("click", () => {
    dropdownContent.style.display = dropdownContent.style.display === "block" ? "none" : "block";
  });

  dropdownItems.forEach((item) => {
    item.addEventListener("click", (event) => {
      dropdownButton.textContent = event.target.textContent;
      dropdownContent.style.display = "none";
    });
  });

  window.addEventListener("click", (event) => {
    if (!event.target.matches(".dropdown-button")) {
      if (dropdownContent.style.display === "block") {
        dropdownContent.style.display = "none";
      }
    }
  });
});
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