// ===============================
// TYPING EFFECT
// ===============================
const typingElement = document.getElementById("typing");
const words = [
    "To KOB Tech Company. We trade and render service to our customers. You're highly welcomed.",
    "We buy and sell all kinds of products and home appliances (new and used) at a very affordable prices.",
    "We fix and repair faulty freezer, air conditioner and other equipments and home appliances. We deliver our products globally and render home service.",
    "We deal in installation of Air conditioner and fixing of less cooling Ac for a refreshing atmosphere."
];
let wordIndex = 0;
let characterIndex = 0;
let deleting = false;
function typingEffect() {
if (!typingElement) return;
  const currentWord = words[wordIndex];
if (!deleting) {
   typingElement.textContent =
    currentWord.substring(0, characterIndex + 1);
    characterIndex++;
if (characterIndex === currentWord.length) {
   deleting = true;
   setTimeout(typingEffect, 1500);
return;
        }
} else {
  typingElement.textContent =
  currentWord.substring(0, characterIndex - 1);
  characterIndex--;
if (characterIndex === 0) {
  deleting = false;
  wordIndex++;
if (wordIndex === words.length) {
  wordIndex = 0;
 }
 }
 }

setTimeout(
  typingEffect,
  deleting ? 60 : 100
    );
}
typingEffect();


 // AC Product Inventory Data
    const products = [
{
id: 3,
title: "Lg deep freezer",
type: "Freezer",
price: 250000,
specs: ["1.5horsepower", "Fast Cooling", "Early freezing and long lasting"],
image: "image/fri.jpg"
},
{
  id: 5,
  title: "Itel charger head",
  type: "Gadget",
  price: 5000,
  specs: ["Model:U100lKB", "Input:180-240V-50/60Hz 0.25A", "Fast charging"],
  image: "image/img1.jpg"
},
{
  id: 5,
  title: "M-KOB Follow-come",
  type: "Gadget",
  price: 5500,
  specs: ["Ultra Fast charging mode", "Auto disconnect", "Output:5.0V==2.0A"],
  image: "image/img2.jpg"
},
{
  id: 6,
  title: "Black Spec for guys",
  type: "Fashion",
  price: 4500,
  specs: ["Men/Big Boyz glasses", "Suitable for casual dress & occasion", "Give a cool and clear eyesight"],
  image: "image/img3.jpg"
},
{
  id: 7,
  title: "WUF-29 Music Player",
  type: "Audio",
  price: 12000,
  specs: ["USB Input/Output, TF Card", "100-300% Volume Type-C Charging Port", "Long lasting battery 🔋"],
  image: "image/img.jpg"
},
{
  id: 6,
  title: "Men Transparent Glass",
  type: "Fashion",
  price: 3500,
  specs: ["block direct sunlight contact to the eye", "Suitable for casual & occasion", "Clearer vision"],
  image: "image/img4.jpg"
},
{
  id: 5,
  title: "Oraimo Travel Charger",
  type: "Gadget",
  price: 6000,
  specs: ["Model: OCW-1112U", "Input:180-240V-50/60Hz 0.25A Max", "Output:5.0V==2.0A"],
  image: "image/img5.jpg"
},
{
id: 1,
title: "Lg Split Room AC",
type: "Air Conditioner",
price: 230000,
specs: ["1.5 HorsePower", "Splash proof outdoor side", "Ultrasonic Repellent Technology"],
image: "image/img6.jpg"
},
{
id: 2,
title: "Sonic Quad-Fan",
type: "Equipment",
price: 25000,
specs: ["Super-fast blows every corner of the room", "3 mode Regulator", "4hands centered diamond style"],
image: "image/img8.jpg"
},
{
id: 4,
title: "Camry Digital Scale",
type: "Equipment",
price: 205000,
specs: ["TCS-JES611ZB", "Max=150kg/330lb", "Min=1000g/2.2lb d=50g/0.1lb"],
image: "image/img7.jpg"
},
    ];

    let cart = [];

    // Currency Formatter Utility
    function formatNGN(amount) {
      return '₦' + amount.toLocaleString('en-NG');
    }

    // Render Product Cards
    function renderProducts(filterType = 'all') {
      const grid = document.getElementById('product-grid');
      grid.innerHTML = '';

      const filtered = filterType === 'all' 
        ? products 
        : products.filter(p => p.type === filterType);

      filtered.forEach(p => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
          <div class="product-image">
            <img src="${p.image}" alt="${p.title}" loading="lazy">
          </div>
          <div class="product-info">
            <span class="product-category">${p.type}</span>
            <h3 class="product-title">${p.title}</h3>
            <ul class="product-specs">
              ${p.specs.map(spec => `<li>${spec}</li>`).join('')}
            </ul>
            <div><span class="price">${formatNGN(p.price)}</span></div>
              <button class="add-btn" onclick="addToCart(${p.id})">Add to Cart</button>
          </div>
        `;
        grid.appendChild(card);
      });
    }

    // Filter Handler
    function filterProducts() {
      const selectedType = document.getElementById('type-filter').value;
      renderProducts(selectedType);
    }

    // Add Item to Cart
    function addToCart(productId) {
      const product = products.find(p => p.id === productId);
      const existingItem = cart.find(item => item.id === productId);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        cart.push({ ...product, quantity: 1 });
      }

      updateCartUI();
    }

    // Update Cart UI
    function updateCartUI() {
      const cartItemsContainer = document.getElementById('cart-items');
      const cartCount = document.getElementById('cart-count');
      const cartTotal = document.getElementById('cart-total');

      const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
      cartCount.textContent = totalItems;

      const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      cartTotal.textContent = formatNGN(totalPrice);

      if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p style="color: var(--text-muted);">Your cart is empty.</p>';
        return;
      }

      cartItemsContainer.innerHTML = cart.map(item => `
        <div class="cart-item">
          <div>
            <strong>${item.title}</strong>
            <p style="font-size: 0.85rem; color: var(--text-muted);">${formatNGN(item.price)} x ${item.quantity}</p>
          </div>
          <div>
            <button onclick="changeQuantity(${item.id}, -1)" style="padding: 2px 6px;">-</button>
            <button onclick="changeQuantity(${item.id}, 1)" style="padding: 2px 6px;">+</button>
          </div>
        </div>
      `).join('');
    }

    // Adjust Quantity in Cart
    function changeQuantity(productId, delta) {
      const item = cart.find(i => i.id === productId);
      if (!item) return;

      item.quantity += delta;
      if (item.quantity <= 0) {
        cart = cart.filter(i => i.id !== productId);
      }

      updateCartUI();
    }

    // Cart Drawer Toggle
    function toggleCart() {
      document.getElementById('cart-drawer').classList.toggle('open');
    }

    // Initialize Page
    renderProducts();

const STORE_WHATSAPP_NUMBER = "2347083085958"; 

function openCheckoutModal() {
  if (cart.length === 0) {
    alert("Your cart is empty. Please add items before checking out.");
    return;
  }
  document.getElementById('checkout-modal').style.display = 'flex';
}

function closeCheckoutModal() {
  document.getElementById('checkout-modal').style.display = 'none';
}

// 2. Process Order and Send to WhatsApp
function processWhatsAppCheckout(event) {
  event.preventDefault();

  const name = document.getElementById('customer-name').value;
  const phone = document.getElementById('customer-phone').value;
  const address = document.getElementById('customer-address').value;

  // Calculate Order Totals
  const totalAmount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  // Format Items List
  let orderItemsText = "";
  cart.forEach((item, index) => {
    orderItemsText += `${index + 1}. *${item.title}*\n   Qty: ${item.quantity} x ${formatNGN(item.price)} = ${formatNGN(item.price * item.quantity)}\n`;
  });

  // Construct structured WhatsApp Message
  const message = 
`🛒 *NEW ORDER RECEIVED*

👤 *Customer Details:*
• *Name:* ${name}
• *Phone:* ${phone}
• *Address:* ${address}

📦 *Order Summary:*
${orderItemsText}
💰 *Total Amount:* ${formatNGN(totalAmount)}

Please confirm order details and delivery arrangement.`;

  // Encode text for URL format
  const encodedMessage = encodeURIComponent(message);
  
  // Create Direct WhatsApp Link
  const whatsappURL = `https://wa.me/${STORE_WHATSAPP_NUMBER}?text=${encodedMessage}`;

  // Redirect to WhatsApp
  window.open(whatsappURL, '_blank');

  // Reset Cart and Close Modal
  cart = [];
  updateCartUI();
  closeCheckoutModal();
  toggleCart();
}


  /*==== back to top & bottom ====*/
const backToTopBtn = document.getElementById("backToTop");
  window.addEventListener("scroll", () => {
if (backToTopBtn) {
 if (window.scrollY > 300) {
   backToTopBtn.style.display = "flex";
 } else {
   backToTopBtn.style.display = "none";
      }
    }
  });
if (backToTopBtn) {
   backToTopBtn.addEventListener("click", () => {
   window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
  // Scroll To Bottom Function
function scrollToBottom() {
  window.scrollTo({
   top: document.body.scrollHeight,
   behavior: "smooth"
  });
}


// ==============================
// BOTTOM NAVIGATION
// ==============================
const navItems = document.querySelectorAll(".nav-item");
navItems.forEach(item => {
  item.addEventListener("click", function() {
    navItems.forEach(nav => {
      nav.classList.remove("active");
    });
this.classList.add("active");
const page = this.dataset.page;
if (page !== "Home") {
alert(page + " page selected.");
}
});
});