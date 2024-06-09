const product = "bikes.json";


// Fetch the product data from the JSON file
fetch(product)
  .then(function (response) {
    return response.json();
  })
  .then(function (bikes) {
    let placeholder = document.querySelector("#data-output");
    let out = "";
    // Iterate through each bike product
    for (let product of bikes) {
      out += `
          <tr>
          <td>${product.Product}</td>
              
              
            </button></td>
              <td>${product.Date}</td>
              <td>${product.Sub_Category}</td>
              <td><div class="order-quantity-value">
              ${product.Order_Quantity}
              </div></td>
              <td><div class="revenue-value">
              ${product.Revenue}
              </div></td>
              <td><div class="cost-value">
              ${product.Cost}
              
              </div>
              </td>
              <td>
              <div class="profit-value">
              ${product.Profit}
              
              </div>
              </td>
          <tr>
      `;
    }

    placeholder.innerHTML = out;
  });
  
const dropdownProduct = document.getElementById('dropdown-product');
const linkProducts = document.getElementById('link-products');

// Toggle product links dropdown
dropdownProduct.addEventListener('click', function () {
  linkProducts.classList.toggle('link-products-active');
  dropdownProduct.classList.toggle('dropdown-product-active');
});

// Highlight active aside link
const asideLinks = document.querySelectorAll('#aside .aside-link');
asideLinks.forEach((link) => {
  link.addEventListener('click', function () {
    asideLinks.forEach((link) => link.classList.remove('active'));
    this.classList.add('active');
  });
});

// Handle dropdown menu interactions
document.addEventListener("DOMContentLoaded", (event) => {
  const dropdownButton = document.querySelector(".dropdown-button");
  const dropdownContent = document.querySelector(".dropdown-content");
  const dropdownItems = document.querySelectorAll(".dropdown-item");

  // Toggle dropdown content display
  dropdownButton.addEventListener("click", () => {
    dropdownContent.style.display = dropdownContent.style.display === "block" ? "none" : "block";
  });

  // Handle dropdown item click
  dropdownItems.forEach((item) => {
    item.addEventListener("click", (event) => {
      dropdownButton.textContent = event.target.textContent;
      dropdownContent.style.display = "none";
    });
  });

  // Close dropdown if clicked outside
  window.addEventListener("click", (event) => {
    if (!event.target.matches(".dropdown-button")) {
      if (dropdownContent.style.display === "block") {
        dropdownContent.style.display = "none";
      }
    }
  });
});

// Show contact form
document.getElementById('contact-button').addEventListener('click', function () {
  document.getElementById('contact-form-container').style.display = 'block';
});

// Hide contact form if clicked outside
document.addEventListener('click', function (event) {
  if (event.target.id !== 'contact-button' && event.target.id !== 'contact-form-container' && event.target.tagName !== 'INPUT' && event.target.tagName !== 'TEXTAREA') {
    document.getElementById('contact-form-container').style.display = 'none';
  }
});

// Handle form submission
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