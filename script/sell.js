// Trade-In / Sell Valuation Algorithm
function handleEstimate(event) {
  event.preventDefault();
  
  const type = document.getElementById('sellType').value;
  const age = parseInt(document.getElementById('sellAge').value);
  const condition = document.getElementById('sellCondition').value;
  const resultBox = document.getElementById('estimateResult');
  
  let basePrice = type === 'fridge' ? 120000 : 130000;
  
  // Age deduction
  if (age === 2) basePrice -= 10000;
  if (age === 4) basePrice -= 20000;
  
  // Condition adjustment
  if (condition === 'good') basePrice *= 0.8;
  if (condition === 'faulty') basePrice *= 0.6;
  
  basePrice = Math.max(basePrice, 50); // Minimum guaranteed scrap value
  
  const formattedPrice = `₦${basePrice.toFixed(2)}`;
  
  resultBox.style.display = 'block';
  resultBox.innerHTML = `Estimated Trade-in Offer: ${formattedPrice}<br><small>A technician will verify condition upon pickup.</small>`;
  
  // WhatsApp Button Integration
  const whatsappBtn = document.getElementById('whatsappBtn');
  if (whatsappBtn) {
    whatsappBtn.style.display = 'block';
    whatsappBtn.onclick = function() {
      const phoneNumber = "2349045252636";
      
      const message = `Hello, I would like to submit a sell/trade-in request:\n\n` +
        `*Appliance Type:* ${type}\n` +
        `*Condition:* ${condition}\n` +
        `*Estimated Valuation:* ${formattedPrice}`;
      
      const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');
    };
  }
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

