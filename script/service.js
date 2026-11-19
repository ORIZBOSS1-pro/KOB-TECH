  /* ==========================================
     2. REPAIR FORM SUBMISSION (WhatsApp Redirect)
     ========================================== */
  const repairForm = document.getElementById("repairForm");
  if (repairForm) {
    repairForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const fullName = document.getElementById("fullName").value.trim();
      const phone = document.getElementById("phone").value.trim();
      const service = document.getElementById("service").value;
      const date = document.getElementById("date").value;
      const address = document.getElementById("address").value.trim();

      const message = `Hello KOB Tech, I would like to schedule a repair service.%0A%0A*Name:* ${encodeURIComponent(fullName)}%0A*Phone:* ${encodeURIComponent(phone)}%0A*Service:* ${encodeURIComponent(service)}%0A*Preferred Date:* ${encodeURIComponent(date)}%0A*Address:* ${encodeURIComponent(address)}`;

      const whatsappUrl = `https://wa.me/2347047451820?text=${message}`;
      window.open(whatsappUrl, "_blank");
    });
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

