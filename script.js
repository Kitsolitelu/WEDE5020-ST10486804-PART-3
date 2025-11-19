//homepage
// Accordion functionality

document.addEventListener("DOMContentLoaded", () => {
  // --------------------
  // 1. Accordion Feature - FIXED
  // --------------------
  const accordionButtons = document.querySelectorAll(".accordion-btn");

  accordionButtons.forEach((button) => {
    // Set initial state
    const content = button.nextElementSibling;
    content.style.display = "none";
    button.setAttribute("aria-expanded", "false");

    button.addEventListener("click", () => {
      const expanded = button.getAttribute("aria-expanded") === "true";

      button.setAttribute("aria-expanded", !expanded);
      content.style.display = expanded ? "none" : "block";
    });
  });

  // -------------------------------
  // 2. Lightbox Image Viewer
  // -------------------------------
  const galleryImages = document.querySelectorAll(".gallery img");
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const closeBtn = document.querySelector(".close");

  galleryImages.forEach((img) => {
    img.addEventListener("click", () => {
      lightbox.style.display = "block";
      lightbox.setAttribute("aria-hidden", "false");
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
    });
  });

  closeBtn.addEventListener("click", () => {
    lightbox.style.display = "none";
    lightbox.setAttribute("aria-hidden", "true");
  });

  // Close lightbox when clicking outside the image
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
      lightbox.style.display = "none";
      lightbox.setAttribute("aria-hidden", "true");
    }
  });

  // -------------------------------------------
  // 3. Image Search / Filter - FIXED
  // -------------------------------------------
  const searchBox = document.getElementById("searchBox");

  if (searchBox) {
    searchBox.addEventListener("keyup", () => {
      const value = searchBox.value.toLowerCase();
      const galleryFigures = document.querySelectorAll(".gallery figure");

      galleryFigures.forEach((figure) => {
        const img = figure.querySelector("img");
        const alt = img.alt.toLowerCase();
        figure.style.display = alt.includes(value) ? "block" : "none";
      });
    });
  }

  // --------------------------------------------------
  // 4. Dynamically Load Content
  // --------------------------------------------------
  const dynamicArea = document.querySelector(".welcome-banner");

  if (dynamicArea) {
    const newNotice = document.createElement("p");
    newNotice.textContent =
      "New learning content is added every week! Stay tuned.";
    newNotice.style.fontWeight = "600";
    newNotice.style.color = "#5a3bea";

    dynamicArea.appendChild(newNotice);
  }

  // --------------------------------------
  // 5. Smooth Card Hover Animations
  // --------------------------------------
  document.querySelectorAll(".card").forEach((card) => {
    card.addEventListener("mouseover", () => {
      card.style.transform = "scale(1.05)";
      card.style.transition = "0.3s ease";
    });

    card.addEventListener("mouseout", () => {
      card.style.transform = "scale(1)";
    });
  });
});

//contact form - FIXED VERSION
document.addEventListener("DOMContentLoaded", function () {
  const contactForm = document.getElementById("contactForm");

  if (contactForm) {
    const successMessage = document.getElementById("successMessage");

    // Form validation function
    function validateContactForm() {
      let isValid = true;

      // Name validation
      const name = document.getElementById("name");
      const nameError = document.getElementById("nameError");
      if (name.value.trim() === "") {
        nameError.style.display = "block";
        isValid = false;
      } else {
        nameError.style.display = "none";
      }

      // Email validation
      const email = document.getElementById("email");
      const emailError = document.getElementById("emailError");
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email.value)) {
        emailError.style.display = "block";
        isValid = false;
      } else {
        emailError.style.display = "none";
      }

      // Phone validation (optional but must be valid if provided)
      const phone = document.getElementById("phone");
      const phoneError = document.getElementById("phoneError");
      const phonePattern = /^[\+]?[0-9\s\-\(\)]+$/;
      if (phone.value.trim() !== "" && !phonePattern.test(phone.value)) {
        phoneError.style.display = "block";
        isValid = false;
      } else {
        phoneError.style.display = "none";
      }

      // Message type validation
      const messageType = document.getElementById("messageType");
      const messageTypeError = document.getElementById("messageTypeError");
      if (messageType.value === "") {
        messageTypeError.style.display = "block";
        isValid = false;
      } else {
        messageTypeError.style.display = "none";
      }

      // Message validation
      const message = document.getElementById("message");
      const messageError = document.getElementById("messageError");
      if (message.value.trim().length < 10) {
        messageError.style.display = "block";
        isValid = false;
      } else {
        messageError.style.display = "none";
      }

      return isValid;
    }

    // Form submission handler
    contactForm.addEventListener("submit", function (e) {
      if (!validateContactForm()) {
        // Form is invalid - prevent submission
        e.preventDefault();
      }
      // If form is valid, let it submit naturally to Formspree
    });

    // Real-time validation
    const inputs = contactForm.querySelectorAll("input, select, textarea");
    inputs.forEach((input) => {
      input.addEventListener("blur", function () {
        validateContactForm();
      });
    });
  }
});

//enquiry form
document.addEventListener("DOMContentLoaded", () => {
  const enquiryOptions = document.querySelectorAll(".enquiry-option");
  const enquiryTypeInput = document.getElementById("enquiryType");

  const formSections = {
    services: document.getElementById("servicesSection"),
    products: document.getElementById("productsSection"),
    volunteer: document.getElementById("volunteerSection"),
    sponsor: document.getElementById("sponsorSection"),
  };

  const enquiryForm = document.getElementById("enquiryForm");
  const responseSection = document.getElementById("responseSection");
  const responseContent = document.getElementById("responseContent");

  // Hide all sections at start
  Object.values(formSections).forEach((sec) => sec.classList.add("hidden"));

  // ==========================
  // SELECT ENQUIRY TYPE
  // ==========================
  enquiryOptions.forEach((option) => {
    option.addEventListener("click", () => {
      enquiryOptions.forEach((o) => o.classList.remove("selected"));
      option.classList.add("selected");

      const type = option.dataset.type;
      enquiryTypeInput.value = type;

      Object.values(formSections).forEach((sec) => sec.classList.add("hidden"));
      if (formSections[type]) formSections[type].classList.remove("hidden");

      document.getElementById("enquiryTypeError").style.display = "none";
    });
  });

  // ==========================
  // SUBMIT FORM
  // ==========================
  enquiryForm.addEventListener("submit", (e) => {
    e.preventDefault();

    if (validateForm()) {
      processEnquiry();
    }
  });

  // ==========================
  // VALIDATION
  // ==========================
  function validateForm() {
    let valid = true;

    if (!enquiryTypeInput.value) {
      document.getElementById("enquiryTypeError").style.display = "block";
      valid = false;
    }

    const name = document.getElementById("name").value.trim();
    if (name.length < 2) {
      document.getElementById("nameError").style.display = "block";
      valid = false;
    } else document.getElementById("nameError").style.display = "none";

    const email = document.getElementById("email").value.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      document.getElementById("emailError").style.display = "block";
      valid = false;
    } else document.getElementById("emailError").style.display = "none";

    const message = document.getElementById("message").value.trim();
    if (message.length < 20) {
      document.getElementById("messageError").style.display = "block";
      valid = false;
    } else document.getElementById("messageError").style.display = "none";

    const type = enquiryTypeInput.value;

    if (type === "services") {
      if (!document.getElementById("serviceType").value) {
        document.getElementById("serviceTypeError").style.display = "block";
        valid = false;
      } else document.getElementById("serviceTypeError").style.display = "none";
    }

    if (type === "products") {
      if (!document.getElementById("productInterest").value) {
        document.getElementById("productInterestError").style.display = "block";
        valid = false;
      } else
        document.getElementById("productInterestError").style.display = "none";
    }

    return valid;
  }

  // ==========================
  // PROCESS ENQUIRY
  // ==========================
  function processEnquiry() {
    const type = enquiryTypeInput.value;
    const name = document.getElementById("name").value.trim();

    let html = `<p>Dear <strong>${name}</strong>,</p>`;

    if (type === "services") {
      const serviceType = document.getElementById("serviceType").value;
      const participants = document.getElementById("participants").value;

      const names = {
        "online-courses": "Online Courses",
        tutoring: "One-on-One Tutoring",
        workshops: "Educational Workshops",
        curriculum: "Curriculum Development",
      };

      const total = calculateServiceCost(serviceType, participants);

      html += `
        <p>Thank you for your interest in <strong>${names[serviceType]}</strong>.</p>
        <p>Estimated Cost: <strong>R${total}</strong></p>
        <p>Our team will contact you shortly with more details.</p>
      `;
    }

    if (type === "products") {
      const productType = document.getElementById("productInterest").value;
      const quantity = document.getElementById("quantity").value;

      const names = {
        textbooks: "Educational Textbooks",
        software: "Learning Software",
        kits: "STEM Kits",
        resources: "Teacher Resources",
      };

      const total = calculateProductCost(productType, quantity);

      html += `
        <p>Thank you for your interest in <strong>${names[productType]}</strong>.</p>
        <p>Total Estimate: <strong>R${total}</strong></p>
      `;
    }

    if (type === "volunteer") {
      html += `<p>Thank you for your interest in joining as a volunteer. Our team will reach out shortly.</p>`;
    }

    if (type === "sponsor") {
      html += `<p>Thank you for your interest in becoming a sponsor. Our team will contact you with partnership details.</p>`;
    }

    responseContent.innerHTML = html;
    enquiryForm.classList.add("hidden");
    responseSection.classList.remove("hidden");
  }

  // ==========================
  // COST CALCULATIONS
  // ==========================
  function calculateServiceCost(type, num) {
    const prices = {
      "online-courses": 500,
      tutoring: 200,
      workshops: 1000,
      curriculum: 2500,
    };
    return prices[type] * num;
  }

  function calculateProductCost(type, qty) {
    const prices = {
      textbooks: 150,
      software: 800,
      kits: 350,
      resources: 200,
    };
    return prices[type] * qty;
  }
});

// RESET
function resetForm() {
  location.reload();
}

//Afrikaans quiz
// ------------------------------------
// QUIZ SETUP
// ------------------------------------
let score = 0;
let answered = 0;
const totalQuestions = document.querySelectorAll(".question").length;

// This DIV must exist at the bottom of the HTML page
const finalBox = document.getElementById("final-messages");

// Encouraging lines
const encouragement = [
  "Hou aan werk – jy doen uitstekend! 🌟",
  "Slimkop! 😊",
  "Moenie opgee nie, jy verbeter elke keer! 💪",
  "Baie mooi – jy het goeie fokus! ⭐",
  "Fantasties! Jy leer vinnig! 🎉",
  "Jy doen jou beste, en dit wys! 🌈",
];

// Store all messages here until the end
let messageList = [];

// ------------------------------------
// ADD PRESS ANIMATION TO ALL BUTTONS
// ------------------------------------
document.querySelectorAll(".options button").forEach((btn) => {
  btn.addEventListener("mousedown", () => btn.classList.add("pressed"));
  btn.addEventListener("mouseup", () => btn.classList.remove("pressed"));
});

// ------------------------------------
// CHECK ANSWER FUNCTION
// ------------------------------------
function checkAnswer(button, correctAnswer) {
  const options = button.parentElement.querySelectorAll("button");

  // Disable all buttons for this question
  options.forEach((b) => (b.disabled = true));

  const chosen = button.textContent.trim().toLowerCase();
  const correct = correctAnswer.toLowerCase();

  // CORRECT ANSWER
  if (chosen === correct) {
    button.classList.add("correct", "bounce");
    messageList.push("✔️ Vraag " + (answered + 1) + ": Reg! " + randomLine());
    score++;
  }
  // WRONG ANSWER
  else {
    button.classList.add("wrong", "shake");
    messageList.push(
      "❌ Vraag " + (answered + 1) + ": Verkeerd – maar hou aan probeer!"
    );
  }

  answered++;
  updateProgress();

  // After last question → show all stored messages
  if (answered === totalQuestions) {
    setTimeout(showAllMessages, 700);
  }
}

// ------------------------------------
// SHOW ALL FEEDBACK MESSAGES AT BOTTOM
// ------------------------------------
function showAllMessages() {
  let html = `<h3>🎉 Jou Antwoorde:</h3>`;

  messageList.forEach((msg) => {
    html += `<p class="fade-in">${msg}</p>`;
  });

  html += `
    <h3 style="margin-top:15px;">Jou Totaal: <strong>${score}</strong> uit <strong>${totalQuestions}</strong></h3>
    <p><strong>${finalEncouragement()}</strong></p>
    <button id="restart-btn">Herbegin</button>
  `;

  finalBox.innerHTML = html;

  // Restart the quiz
  document.getElementById("restart-btn").onclick = () => location.reload();
}

// ------------------------------------
// UPDATE PROGRESS BAR
// ------------------------------------
function updateProgress() {
  const bar = document.getElementById("progress-bar");
  const percent = Math.round((answered / totalQuestions) * 100);
  bar.style.width = percent + "%";
}

// ------------------------------------
// RANDOM MOTIVATIONAL LINE
// ------------------------------------
function randomLine() {
  return encouragement[Math.floor(Math.random() * encouragement.length)];
}

// ------------------------------------
// FINAL ENCOURAGEMENT AFTER QUIZ
// ------------------------------------
function finalEncouragement() {
  if (score === totalQuestions) {
    return "Perfek! Jy is 'n superster! 🌟";
  } else if (score >= totalQuestions - 2) {
    return "Baie mooi! Jy is amper daar! 🎉";
  } else if (score >= 3) {
    return "Goeie poging! Jy word elke keer beter! 💪";
  } else {
    return "Dis okay! Elke fout help jou leer. Hou aan probeer! 😊";
  }
}

//math quiz
function checkAnswer(inputId, correctAnswer) {
  const input = document.getElementById(inputId);
  const feedback = document.getElementById("f" + inputId.slice(1));
  const userAnswer = input.value.trim();

  // Encouraging messages
  const encouragement = [
    "Keep going, you're doing great! 🌟",
    "Nice effort! Try again! 💪",
    "Don't give up, you can do this! 🚀",
    "Amazing job! 🎉",
    "You're getting smarter every day! 📚✨",
  ];

  // Random message
  const message =
    encouragement[Math.floor(Math.random() * encouragement.length)];

  if (userAnswer === correctAnswer) {
    feedback.innerHTML = `✅ Correct! The answer is indeed <strong>${correctAnswer}</strong>.<br>${message}`;
    feedback.style.color = "#4CAF50";
    input.disabled = true;
  } else {
    feedback.innerHTML = `❌ Incorrect. You answered <strong>${userAnswer}</strong>.  
    <br>Try again — remember, the correct answer is not <strong>${userAnswer}</strong>.  
    <br>${message}`;
    feedback.style.color = "#ff4444";
  }
}

//seo for the homepage
// Accordion functionality
document.querySelectorAll(".accordion-btn").forEach((button) => {
  button.addEventListener("click", () => {
    const content = button.nextElementSibling;
    content.style.display =
      content.style.display === "block" ? "none" : "block";
  });
});

// Image search filter
document.getElementById("searchBox").addEventListener("input", function () {
  const searchTerm = this.value.toLowerCase();
  const images = document.querySelectorAll(".gallery img");

  images.forEach((img) => {
    const altText = img.alt.toLowerCase();
    img.style.display = altText.includes(searchTerm) ? "inline-block" : "none";
  });
});

// Lightbox functionality
const galleryImages = document.querySelectorAll(".gallery img");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const closeBtn = document.querySelector(".close");

galleryImages.forEach((img) => {
  img.addEventListener("click", () => {
    lightbox.style.display = "block";
    lightboxImg.src = img.src;
  });
});

closeBtn.addEventListener("click", () => {
  lightbox.style.display = "none";
});

lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) {
    lightbox.style.display = "none";
  }
});

// Enhanced SEO and Performance Script
document.addEventListener("DOMContentLoaded", function () {
  // Accordion functionality with ARIA attributes
  const accordionBtns = document.querySelectorAll(".accordion-btn");

  accordionBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      const isExpanded = this.getAttribute("aria-expanded") === "true";
      this.setAttribute("aria-expanded", !isExpanded);

      const content = this.nextElementSibling;
      if (content.style.display === "block") {
        content.style.display = "none";
      } else {
        content.style.display = "block";
      }
    });
  });

  // Add animation to logo letters on hover
  const letters = document.querySelectorAll(".letter");
  letters.forEach((letter) => {
    letter.addEventListener("mouseover", function () {
      this.style.transform = "translateY(-15px) rotate(5deg)";
      this.style.color = "#ffeb3b";
    });

    letter.addEventListener("mouseout", function () {
      this.style.transform = "translateY(0) rotate(0)";
      this.style.color = "white";
    });
  });

  // Lightbox functionality with accessibility
  const galleryImages = document.querySelectorAll(".gallery img");
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const closeBtn = document.querySelector(".close");

  galleryImages.forEach((img) => {
    img.addEventListener("click", function () {
      lightbox.style.display = "flex";
      lightbox.setAttribute("aria-hidden", "false");
      lightboxImg.src = this.src;
      lightboxImg.alt = this.alt;

      // Trap focus inside lightbox
      closeBtn.focus();
    });

    // Add keyboard navigation
    img.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        this.click();
      }
    });
  });

  closeBtn.addEventListener("click", function () {
    lightbox.style.display = "none";
    lightbox.setAttribute("aria-hidden", "true");
  });

  lightbox.addEventListener("click", function (e) {
    if (e.target !== lightboxImg) {
      lightbox.style.display = "none";
      lightbox.setAttribute("aria-hidden", "true");
    }
  });

  // Close lightbox with Escape key
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && lightbox.style.display === "flex") {
      lightbox.style.display = "none";
      lightbox.setAttribute("aria-hidden", "true");
    }
  });

  // Search functionality
  const searchBox = document.getElementById("searchBox");
  if (searchBox) {
    searchBox.addEventListener("input", function () {
      // Implement search functionality here
      console.log("Searching for:", this.value);
    });
  }

  // Performance monitoring
  const observeResources = () => {
    if ("PerformanceObserver" in window) {
      const observer = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          console.log(`${entry.name} loaded in ${entry.duration}ms`);
        });
      });

      observer.observe({ entryTypes: ["resource", "navigation", "paint"] });
    }
  };

  // Initialize performance monitoring
  observeResources();

  // Track user engagement
  let timeOnPage = 0;
  setInterval(() => {
    timeOnPage++;
    // You can send this data to analytics
    if (timeOnPage % 30 === 0) {
      console.log(`User has been on page for ${timeOnPage} seconds`);
    }
  }, 1000);

  // Error tracking
  window.addEventListener("error", function (e) {
    console.error("Page error:", e.error);
    // Send to analytics service
  });

  // Offline functionality
  window.addEventListener("online", function () {
    console.log("Connection restored");
  });

  window.addEventListener("offline", function () {
    console.log("Connection lost");
  });
});

// Service Worker registration for PWA capabilities (optional)
if ("serviceWorker" in navigator) {
  window.addEventListener("load", function () {
    navigator.serviceWorker
      .register("/sw.js")
      .then(function (registration) {
        console.log("SW registered: ", registration);
      })
      .catch(function (registrationError) {
        console.log("SW registration failed: ", registrationError);
      });
  });
}

// Basic Leaflet map example
var map = L.map("map").setView([-26.2041, 28.0473], 10);
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
}).addTo(map);

L.marker([-26.2041, 28.0473])
  .addTo(map)
  .bindPopup("ThutoPula is based in Gauteng.")
  .openPopup();

//afrikkans quiz
// Global variables
var scores = 0;
var totalQuestion = 7;
var questionsAnswered = 0;
var answeredQuestions = [];

function checkAnswer(button, correctAnswer, questionId) {
  // Prevent answering same question multiple times
  if (answeredQuestions.indexOf(questionId) !== -1) {
    return;
  }

  var userAnswer = button.textContent.trim().toLowerCase();
  var correct = correctAnswer.toLowerCase();
  var feedback = document.getElementById("feedback");

  // Disable all buttons in this question
  var buttons = button.parentElement.getElementsByTagName("button");
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].disabled = true;
  }

  if (userAnswer === correct) {
    button.classList.add("correct");
    feedback.textContent = "Korrek! 🎉";
    feedback.style.color = "green";
    score++;
    document.getElementById("score").textContent = score;
  } else {
    button.classList.add("incorrect");
    feedback.textContent = "Verkeerd. ❌";
    feedback.style.color = "red";

    // Highlight correct answer
    for (var j = 0; j < buttons.length; j++) {
      if (buttons[j].textContent.trim().toLowerCase() === correct) {
        buttons[j].classList.add("correct");
      }
    }
  }

  answeredQuestions.push(questionId);
  questionsAnswered++;

  // Check if all questions are answered
  if (questionsAnswered === totalQuestion) {
    showFinalScore();
  }
}

function showFinalScore() {
  var finalMessages = document.getElementById("final-messages");
  var message = "";

  if (score === totalQuestion) {
    message = "Uitstekend! Jy het alles reg! 🏆";
    finalMessages.style.backgroundColor = "#4CAF50";
  } else if (score >= totalQuestion * 0.7) {
    message = "Goed gedaan! Baie goeie punt! 👍";
    finalMessages.style.backgroundColor = "#2196F3";
  } else if (score >= totalQuestion * 0.5) {
    message = "Nie sleg nie! Blyf oefen! 💪";
    finalMessages.style.backgroundColor = "#FF9800";
  } else {
    message = "Moet nie opgee nie! Probeer weer! 📚";
    finalMessages.style.backgroundColor = "#f44336";
  }

  finalMessages.style.color = "white";
  finalMessages.innerHTML =
    "<h3>Klaar!</h3><p>Jou finale telling: " +
    scores +
    " / " +
    totalQuestion +
    "</p><p>" +
    message +
    "</p>";
}

function resetQuiz() {
  // Reset variables
  scores = 0;
  questionsAnswered = 0;
  answeredQuestions = [];

  // Reset score display
  document.getElementById("score").textContent = "0";

  // Reset all buttons
  var allButtons = document.querySelectorAll(".options button");
  for (var i = 0; i < allButtons.length; i++) {
    allButtons[i].disabled = false;
    allButtons[i].classList.remove("correct", "incorrect");
  }

  // Reset feedback and final messages
  document.getElementById("feedback").textContent = "";
  document.getElementById("feedback").style.color = "";
  document.getElementById("final-messages").innerHTML = "";
  document.getElementById("final-messages").style.backgroundColor = "";
}

// Function to go back to previous page
function goBack() {
  window.history.back();
}

//jquery
// Search Filter (Images)
$("#searchBox").on("keyup", function () {
  const value = $(this).val().toLowerCase();

  $(".gallery figure").each(function () {
    const altText = $(this).find("img").attr("alt").toLowerCase();
    $(this).toggle(altText.includes(value));
  });
});
// Accordion
$(".accordion-btn").click(function () {
  $(this).next(".accordion-content").slideToggle(250);
});

// Wait for page to load
$(document).ready(function () {
  /* -----------------------------------
       1. Accordion
    ----------------------------------- */
  $(".accordion-btn").click(function () {
    var content = $(this).next(".accordion-content");

    // Toggle active state
    $(this).toggleClass("active");

    // Slide panel
    content.stop(true, true).slideToggle(250);

    // Update aria-expanded
    var expanded = $(this).attr("aria-expanded") === "true";
    $(this).attr("aria-expanded", !expanded);
  });

  /* -----------------------------------
       2. Tabs
    ----------------------------------- */
  $(".tab-button").click(function () {
    var tabID = $(this).data("tab");

    $(".tab-button").removeClass("active");
    $(this).addClass("active");

    $(".tab-content").hide();
    $("#" + tabID).fadeIn(200);
  });

  /* -----------------------------------
       3. Image Lightbox
    ----------------------------------- */
  $(".gallery img").click(function () {
    var src = $(this).attr("src");

    $("#lightbox-img").attr("src", src);
    $("#lightbox").attr("aria-hidden", "false").fadeIn(200);
  });

  $(".close, #lightbox").click(function (e) {
    if (e.target !== this) return;
    $("#lightbox").fadeOut(200).attr("aria-hidden", "true");
  });

  /* -----------------------------------
       4. Search Filter (Images)
    ----------------------------------- */
  $("#searchBox").on("keyup", function () {
    var value = $(this).val().toLowerCase();

    $(".gallery figure").filter(function () {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
    });
  });

  /* -----------------------------------
       5. Back-to-Top Button
    ----------------------------------- */
  $(window).scroll(function () {
    if ($(this).scrollTop() > 300) {
      $("#back-to-top").fadeIn(200);
    } else {
      $("#back-to-top").fadeOut(200);
    }
  });

  $("#back-to-top").click(function () {
    $("html, body").animate({ scrollTop: 0 }, 400);
  });

  /* -----------------------------------
       6. Dynamic Content Loader
    ----------------------------------- */
  $("#dynamic-content").load("dynamic-content.html", function () {
    console.log("Dynamic content loaded");
  });

  /* -----------------------------------
       7. Leaflet Map for Footer
    ----------------------------------- */
  if ($("#map").length) {
    var map = L.map("map").setView([-26.2041, 28.0473], 9); // Johannesburg default

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 18,
    }).addTo(map);

    L.marker([-26.2041, 28.0473])
      .addTo(map)
      .bindPopup("ThutoPula - Johannesburg")
      .openPopup();
  }
});
