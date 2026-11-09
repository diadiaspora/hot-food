// Top 10 most common chicken wing flavors
const flavors = [
  {
    id: "buffalo",
    name: "Buffalo",
    desc: "The classic. Tangy, buttery hot sauce that started it all.",
    img: "https://images.pexels.com/photos/60616/fried-chicken-chicken-fried-crunchy-60616.jpeg?auto=compress&cs=tinysrgb&w=600"
  },
  {
    id: "honey-bbq",
    name: "Honey BBQ",
    desc: "Sweet, smoky, and sticky. A crowd-pleasing favorite.",
    img: "https://images.pexels.com/photos/2338407/pexels-photo-2338407.jpeg?auto=compress&cs=tinysrgb&w=600"
  },
  {
    id: "garlic-parm",
    name: "Garlic Parmesan",
    desc: "Rich, buttery garlic and real Parmesan. Zero heat, all flavor.",
    img: "https://images.pexels.com/photos/4106483/pexels-photo-4106483.jpeg?auto=compress&cs=tinysrgb&w=600"
  },
  {
    id: "lemon-pepper",
    name: "Lemon Pepper",
    desc: "Zesty lemon and cracked pepper. Bright, crispy, addictive.",
    img: "https://images.pexels.com/photos/1624487/pexels-photo-1624487.jpeg?auto=compress&cs=tinysrgb&w=600"
  },
  {
    id: "honey-garlic",
    name: "Honey Garlic",
    desc: "Sticky-sweet honey meets savory roasted garlic.",
    img: "https://images.pexels.com/photos/2338407/pexels-photo-2338407.jpeg?auto=compress&cs=tinysrgb&w=600"
  },
  {
    id: "teriyaki",
    name: "Teriyaki",
    desc: "Sweet-salty glaze with deep umami. Glossy and satisfying.",
    img: "https://images.pexels.com/photos/60616/fried-chicken-chicken-fried-crunchy-60616.jpeg?auto=compress&cs=tinysrgb&w=600"
  },
  {
    id: "sweet-chili",
    name: "Sweet Chili",
    desc: "Sweet first, gentle heat later. Asian-inspired glaze.",
    img: "https://images.pexels.com/photos/4106483/pexels-photo-4106483.jpeg?auto=compress&cs=tinysrgb&w=600"
  },
  {
    id: "mango-habanero",
    name: "Mango Habanero",
    desc: "Tropical sweetness meets serious heat. Starts sweet, finishes hot.",
    img: "https://images.pexels.com/photos/1624487/pexels-photo-1624487.jpeg?auto=compress&cs=tinysrgb&w=600"
  },
  {
    id: "cajun",
    name: "Cajun",
    desc: "Bold Southern spices. Smoky, peppery, and full of attitude.",
    img: "https://images.pexels.com/photos/2338407/pexels-photo-2338407.jpeg?auto=compress&cs=tinysrgb&w=600"
  },
  {
    id: "hot-honey",
    name: "Hot Honey",
    desc: "Sticky honey with a kick. Sweet heat that keeps you coming back.",
    img: "https://images.pexels.com/photos/60616/fried-chicken-chicken-fried-crunchy-60616.jpeg?auto=compress&cs=tinysrgb&w=600"
  }
];

// Messenger base URL — replace with your actual page if you have one
const MESSENGER_URL = "https://m.me/";

function createCard(flavor) {
  const card = document.createElement("article");
  card.className = "wing-card";
  card.dataset.flavor = flavor.id;

  card.innerHTML = `
    <div class="card-image">
      <img src="${flavor.img}" alt="${flavor.name} chicken wings" loading="lazy">
    </div>
    <div class="card-body">
      <h3 class="card-title">${flavor.name}</h3>
      <p class="card-desc">${flavor.desc}</p>
      <div class="size-picker" role="group" aria-label="Select number of wings">
        <button type="button" class="size-btn" data-size="6">6</button>
        <button type="button" class="size-btn active" data-size="12">12</button>
        <button type="button" class="size-btn" data-size="24">24</button>
      </div>
      <button type="button" class="order-btn">Order on Messenger</button>
    </div>
  `;

  // Size selection
  const sizeBtns = card.querySelectorAll(".size-btn");
  sizeBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      sizeBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
    });
  });

  // Order button → opens Messenger with pre-filled message
  const orderBtn = card.querySelector(".order-btn");
  orderBtn.addEventListener("click", () => {
    const activeSize = card.querySelector(".size-btn.active").dataset.size;
    const message = encodeURIComponent(
      `Hey! I'd like to order ${activeSize} ${flavor.name} wings for delivery.`
    );
    // m.me supports a ref or you can just open the chat;
    // many businesses use a simple link + user types the order.
    // We open Messenger and also copy a helpful message for the user.
    window.open(MESSENGER_URL, "_blank", "noopener");

    // Optional: copy message to clipboard so user can paste
    if (navigator.clipboard) {
      navigator.clipboard.writeText(
        `I'd like to order ${activeSize} ${flavor.name} wings for delivery.`
      ).catch(() => {});
    }
  });

  return card;
}

function renderCards() {
  const grid = document.getElementById("cards-grid");
  if (!grid) return;
  flavors.forEach(flavor => {
    grid.appendChild(createCard(flavor));
  });
}

// Mobile nav
function setupMobileNav() {
  const toggle = document.querySelector(".mobile-toggle");
  const links = document.querySelector(".nav-links");
  const orderBtn = document.querySelector(".nav-order-btn");

  if (!toggle || !links) return;

  toggle.addEventListener("click", () => {
    links.classList.toggle("open");
    if (orderBtn) {
      orderBtn.classList.toggle("mobile-show");
    }
  });

  // Close on link click
  links.querySelectorAll("a").forEach(a => {
    a.addEventListener("click", () => {
      links.classList.remove("open");
      if (orderBtn) orderBtn.classList.remove("mobile-show");
    });
  });
}

// Init
document.addEventListener("DOMContentLoaded", () => {
  renderCards();
  setupMobileNav();
});
