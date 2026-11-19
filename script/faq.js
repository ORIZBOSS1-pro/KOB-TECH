// FAQ SECTION 
function toggleFAQ(button) {
const answer = button.nextElementSibling;
const icon = button.querySelector(".icon");
if (answer.style.display === "none" || answer.style.display === "") {
  answer.style.display = "block";
if (icon) icon.textContent = "−";
} else {
  answer.style.display = "none";
  if (icon) icon.textContent = "+";
  }
}
function filterCategory(category, btnElement) {
const buttons = document.querySelectorAll(".category-buttons button");
  buttons.forEach((btn) => btn.classList.remove("active"));
if (btnElement) btnElement.classList.add("active");
const faqItems = document.querySelectorAll(".faq-item");
const noResult = document.getElementById("noResult");
let visibleCount = 0;
  faqItems.forEach((item) => {
    const itemCat = item.getAttribute("data-category");
if (category === "All" || itemCat === category) {
  item.style.display = "block";
  visibleCount++;
} else {
  item.style.display = "none";
    }
  });
if (noResult) {
  noResult.style.display = visibleCount === 0 ? "block" : "none";
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
