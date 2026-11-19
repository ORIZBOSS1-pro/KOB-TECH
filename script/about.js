/*----NEWSLETTER -----*/
const newsForm = document.getElementById('newsletter-form');
const newsStatus = document.getElementById('news-status');
const newsBtn = document.getElementById('news-submit-btn');
if (newsForm) {
  newsForm.addEventListener('submit', async (e) => {
    e.preventDefault();
const formData = new FormData(newsForm);
  try {
const response = await fetch(newsForm.action, {
  method: 'POST',
  body: formData,
  headers: {'Accept': 'application/json'}
});
if (response.ok) {
  newsStatus.textContent = '🎉 Thank you for subscribing!';
  newsStatus.className = 'news-status-msg success';
  newsForm.reset();
} else {
 throw new Error('Form submission failed');
  }
 } catch (err) {
  newsStatus.textContent = '❌ Something went wrong. Please try again.';
  newsStatus.className = 'news-status-msg error';
    } finally {
  newsBtn.disabled = false;
  newsBtn.innerHTML = `<span>Subscribe</span> <i class="fa-solid fa-arrow-right"></i>`;
    }
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

