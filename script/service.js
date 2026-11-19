document.addEventListener("DOMContentLoaded", () => {
  const repairForm = document.getElementById("repairForm");
  const backToTopBtn = document.getElementById("backToTop");

  // ==========================================
  // 1. SCROLL TO TOP & BOTTOM CONTROLS
  // ==========================================
  if (backToTopBtn) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 250) {
        backToTopBtn.classList.add("show");
      } else {
        backToTopBtn.classList.remove("show");
      }
    });

    backToTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // Expose scrollToBottom globally for inline onclick="scrollToBottom()"
  window.scrollToBottom = function () {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };

  // ==========================================
  // 2. BOTTOM NAVIGATION ACTIVE STATE
  // ==========================================
  const navItems = document.querySelectorAll(".bottom-nav .nav-item");
  const currentPage = window.location.pathname.split("/").pop() || "index.html";

  navItems.forEach((item) => {
    const link = item.querySelector("a");
    if (link && link.getAttribute("href") === currentPage) {
      navItems.forEach((nav) => nav.classList.remove("active"));
      item.classList.add("active");
    }
  });

  // ==========================================
  // 3. BOOKING CONFIRMATION (WHATSAPP, TELEGRAM & EMAIL)
  // ==========================================
  const WHATSAPP_NUMBER = "2349045252636"; // Replace with your WhatsApp number (no '+')
  const TELEGRAM_USERNAME = "orizboss"; // Replace with your Telegram @username (without '@')

  const confirmChannel = document.getElementById("confirmChannel");
  const emailGrp = document.getElementById("emailGrp");
  const telegramGrp = document.getElementById("telegramGrp");
  const customerEmail = document.getElementById("customerEmail");
  const telegramUser = document.getElementById("telegramUser");
  const submitIcon = document.getElementById("submitIcon");
  const submitText = document.getElementById("submitText");

  // Create status message box below the submit button if not already in HTML
  let statusBox = document.getElementById("formStatus");
  if (!statusBox && repairForm) {
    statusBox = document.createElement("div");
    statusBox.id = "formStatus";
    statusBox.className = "form-status";
    repairForm.appendChild(statusBox);
  }

  // Toggle extra inputs and button label/icon based on chosen channel
  function updateChannelUI() {
    if (!confirmChannel) return;
    const channel = confirmChannel.value;

    if (emailGrp) {
      emailGrp.style.display = channel === "email" ? "flex" : "none";
    }
    if (telegramGrp) {
      telegramGrp.style.display = channel === "telegram" ? "flex" : "none";
    }

    if (submitIcon && submitText) {
      if (channel === "whatsapp") {
        submitIcon.className = "fa-brands fa-whatsapp";
        submitText.textContent = "Confirm via WhatsApp";
      } else if (channel === "telegram") {
        submitIcon.className = "fa-brands fa-telegram";
        submitText.textContent = "Confirm via Telegram";
      } else {
        submitIcon.className = "fa-solid fa-envelope";
        submitText.textContent = "Confirm via Email";
      }
    }
  }

  if (confirmChannel) {
    confirmChannel.addEventListener("change", updateChannelUI);
    updateChannelUI();
  }

  // Handle form validation and submission
  if (repairForm) {
    repairForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const fullName = document.getElementById("fullName");
      const phone = document.getElementById("phone");
      const service = document.getElementById("service");
      const datetime = document.getElementById("datetime");
      const address = document.getElementById("address");
      const submitBtn = repairForm.querySelector('button[type="submit"]');
      const channel = confirmChannel ? confirmChannel.value : "whatsapp";

      if (statusBox) {
        statusBox.className = "form-status";
        statusBox.textContent = "";
      }

      // Build list of required fields for current selection
      const fieldsToCheck = [fullName, phone, service, datetime, address];
      if (channel === "email" && customerEmail) fieldsToCheck.push(customerEmail);
      if (channel === "telegram" && telegramUser) fieldsToCheck.push(telegramUser);

      // Clear previous error styling
      fieldsToCheck.forEach((field) => field && field.classList.remove("error"));

      // Validate empty fields
      let isValid = true;
      fieldsToCheck.forEach((field) => {
        if (!field || !field.value.trim()) {
          if (field) field.classList.add("error");
          isValid = false;
        }
      });

      // Validate email format if Email channel is selected
      if (channel === "email" && customerEmail && customerEmail.value.trim()) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(customerEmail.value.trim())) {
          customerEmail.classList.add("error");
          isValid = false;
        }
      }

      if (!isValid) {
        if (statusBox) {
          statusBox.className = "form-status error";
          statusBox.textContent =
            "Please complete all required fields for your selected confirmation method.";
        }
        return;
      }

      // Format selected date and time cleanly
      let formattedDate = datetime.value;
      const parsedDate = new Date(datetime.value);
      if (!isNaN(parsedDate.getTime())) {
        formattedDate = parsedDate.toLocaleString("en-NG", {
          dateStyle: "medium",
          timeStyle: "short",
        });
      }

      // Capture values before form reset
      const capturedEmail = customerEmail ? customerEmail.value.trim() : "";
      const capturedTelegram = telegramUser ? telegramUser.value.trim() : "";

      // Disable button during processing
      const originalBtnHTML = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Processing Booking...`;

      // Build plain-text booking summary for WhatsApp / Telegram
      const summaryLines = [
        "NEW REPAIR SERVICE BOOKING - KOB TECH",
        `Name: ${fullName.value.trim()}`,
        `Phone: ${phone.value.trim()}`,
        `Service: ${service.value}`,
        `Date & Time: ${formattedDate}`,
        `Address: ${address.value.trim()}`,
        `Confirm Via: ${channel.toUpperCase()}`,
      ];

      if (channel === "email" && capturedEmail) {
        summaryLines.push(`Customer Email: ${capturedEmail}`);
      }
      if (channel === "telegram" && capturedTelegram) {
        summaryLines.push(`Customer Telegram: ${capturedTelegram}`);
      }

      const plainMessage = summaryLines.join("\n");

      // Prepare Formspree payload
      const formData = new FormData();
      formData.append("Full Name", fullName.value.trim());
      formData.append("Phone Number", phone.value.trim());
      formData.append("Service Needed", service.value);
      formData.append("Preferred Date & Time", formattedDate);
      formData.append("Address", address.value.trim());
      formData.append("Confirmation Channel", channel);

      if (channel === "email" && capturedEmail) {
        formData.append("_replyto", capturedEmail);
        formData.append("Customer Email", capturedEmail);
      }
      if (channel === "telegram" && capturedTelegram) {
        formData.append("Customer Telegram", capturedTelegram);
      }

      // Submit to Formspree in the background
      let formspreeOk = false;
      try {
        const res = await fetch(repairForm.action, {
          method: "POST",
          body: formData,
          headers: { Accept: "application/json" },
        });
        formspreeOk = res.ok;
      } catch (err) {
        console.warn("Formspree submission error:", err);
      }

      // Reset form and restore button state
      repairForm.reset();
      datetime.type = "text";
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnHTML;
      updateChannelUI();

      // Route to selected confirmation channel
      if (channel === "whatsapp") {
        const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
          plainMessage
        )}`;
        window.open(waUrl, "_blank");
        if (statusBox) {
          statusBox.className = "form-status success";
          statusBox.textContent =
            "Booking prepared! Continue in WhatsApp to confirm your schedule.";
        }
      } else if (channel === "telegram") {
        const tgUrl = `https://t.me/${TELEGRAM_USERNAME}?text=${encodeURIComponent(
          plainMessage
        )}`;
        window.open(tgUrl, "_blank");
        if (statusBox) {
          statusBox.className = "form-status success";
          statusBox.textContent =
            "Booking prepared! Continue in Telegram to send your confirmation.";
        }
      } else if (statusBox) {
        statusBox.className = formspreeOk
          ? "form-status success"
          : "form-status error";
        statusBox.textContent = formspreeOk
          ? `Booking sent! Confirmation details will be sent to ${capturedEmail}.`
          : "Could not submit via email right now. Please try WhatsApp or Telegram.";
      }
    });
  }
});
