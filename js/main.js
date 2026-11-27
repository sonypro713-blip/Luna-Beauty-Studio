
/* ========================================
   LUNA BEAUTY STUDIO
   Shared Components + Website Functionality
======================================== */


/* Load shared header and footer */

async function loadComponent(containerId, filePath) {
  const container = document.getElementById(containerId);

  if (!container) return;

  try {
    const response = await fetch(filePath);

    if (!response.ok) {
      throw new Error("Could not load " + filePath);
    }

    container.innerHTML = await response.text();

  } catch (error) {
    console.error("Component loading error:", error);
  }
}


/* Update business details */

function updateBusinessDetails() {
  if (typeof siteConfig === "undefined") {
    console.error("siteConfig is missing.");
    return;
  }

  document.querySelectorAll("[data-site-name]").forEach(function (element) {
    element.textContent = siteConfig.name;
  });

  document.querySelectorAll("[data-site-tagline]").forEach(function (element) {
    element.textContent = siteConfig.tagline;
  });

  document.querySelectorAll("[data-site-phone]").forEach(function (element) {
    element.textContent = siteConfig.phone;
  });

  document.querySelectorAll("[data-site-address]").forEach(function (element) {
    element.textContent = siteConfig.address;
  });

  document.querySelectorAll("[data-site-hours]").forEach(function (element) {
    element.textContent = siteConfig.hours;
  });


  /* Phone call links */

  const phoneDigits = String(siteConfig.phone).replace(/\D/g, "");

  document.querySelectorAll("[data-phone-link]").forEach(function (link) {
    link.href = "tel:" + phoneDigits;
  });


  /* WhatsApp booking links */

  const whatsappNumber = String(siteConfig.whatsapp).replace(/\D/g, "");

  document.querySelectorAll("[data-whatsapp-link]").forEach(function (link) {
    const message =
      "Hi " + siteConfig.name +
      ", I'd like to book an appointment.";

    link.href =
      "https://wa.me/" + whatsappNumber +
      "?text=" + encodeURIComponent(message);

    link.target = "_blank";
    link.rel = "noopener noreferrer";
  });


  /* Social media links */

  document.querySelectorAll("[data-instagram-link]").forEach(function (link) {
    link.href = siteConfig.instagram;
  });

  document.querySelectorAll("[data-facebook-link]").forEach(function (link) {
    link.href = siteConfig.facebook;
  });
}


/* Mobile navigation menu */

function setupNavigation() {
  const menuButton = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (!menuButton || !navLinks) return;


  function openMenu() {
    navLinks.classList.add("is-open");
    menuButton.classList.add("active");

    menuButton.setAttribute("aria-expanded", "true");
    menuButton.setAttribute("aria-label", "Close navigation menu");
  }


  function closeMenu() {
    navLinks.classList.remove("is-open");
    menuButton.classList.remove("active");

    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Open navigation menu");
  }


  menuButton.addEventListener("click", function () {
    const isOpen = navLinks.classList.contains("is-open");

    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  });


  navLinks.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", closeMenu);
  });


  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      closeMenu();
    }
  });


  /* Highlight current page */

  const currentPage =
    window.location.pathname.split("/").pop() || "index.html";

  navLinks.querySelectorAll("a").forEach(function (link) {
    const linkPage = link.getAttribute("href");

    if (linkPage === currentPage) {
      link.classList.add("active");
      link.setAttribute("aria-current", "page");
    }
  });
}


/* Contact form booking */

function setupContactForm() {
  const form = document.querySelector(".contact-form");

  /* Other pages don't have a contact form */
  if (!form) return;

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const nameInput = document.getElementById("name");
    const phoneInput = document.getElementById("phone");
    const serviceInput = document.getElementById("service");
    const messageInput = document.getElementById("message");

    if (!nameInput || !phoneInput || !serviceInput || !messageInput) {
      console.error("Contact form fields are missing.");
      return;
    }

    const name = nameInput.value.trim();
    const phone = phoneInput.value.trim();
    const service = serviceInput.value;
    const message = messageInput.value.trim();

    if (!name || !phone || !service) {
      alert("Please fill in your name, phone number, and service.");
      return;
    }

    const whatsappNumber =
      String(siteConfig.whatsapp).replace(/\D/g, "");

    if (!whatsappNumber) {
      alert("WhatsApp number is missing in config.js");
      return;
    }

    const bookingMessage =
      "Hello " + siteConfig.name + "!\n\n" +
      "I'd like to book an appointment.\n\n" +
      "Name: " + name + "\n" +
      "Phone: " + phone + "\n" +
      "Service: " + service + "\n" +
      "Message: " + (message || "No additional message");

    const whatsappURL =
      "https://wa.me/" + whatsappNumber +
      "?text=" + encodeURIComponent(bookingMessage);

    window.location.href = whatsappURL;
  });
}


/* Copyright year */

function updateCopyrightYear() {
  const yearElement = document.getElementById("current-year");

  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
}


/* Initialize website */

document.addEventListener("DOMContentLoaded", async function () {
  await Promise.all([
    loadComponent("site-header", "components/header.html"),
    loadComponent("site-footer", "components/footer.html")
  ]);

  updateBusinessDetails();
  setupNavigation();
  setupContactForm();
  updateCopyrightYear();
});
