const rotatingWords = [
  "gorilla treks",
  "sunset cruises",
  "cultural journeys",
  "wildlife safaris",
  "river adventures"
];

let rotateIndex = 0;
const rotatingText = document.getElementById("rotatingText");
const counters = document.querySelectorAll("[data-count]");
const filters = document.querySelectorAll(".filter");
const journeyItems = document.querySelectorAll(".journey");
const testimonials = [
  {
    text: "The gorilla trek was flawless. We felt safe, seen, and deeply cared for.",
    name: "Amina K., Nairobi"
  },
  {
    text: "Makoporo Ntwala built a route that balanced wildlife with community visits.",
    name: "Daniel R., Cape Town"
  },
  {
    text: "Our guide in Queen Elizabeth was a walking encyclopedia of the park.",
    name: "Samantha J., London"
  }
];

let testimonialIndex = 0;
const testimonialBox = document.getElementById("testimonialBox");
const testimonialText = testimonialBox?.querySelector(".testimonial__text");
const testimonialName = testimonialBox?.querySelector(".testimonial__name");

const storyModal = document.getElementById("storyModal");
const openStory = document.getElementById("watchStory");
const closeStory = document.getElementById("closeStory");
const openPlanner = document.getElementById("openPlanner");

const plannerForm = document.getElementById("plannerForm");
const formStatus = document.getElementById("formStatus");

const menuToggle = document.getElementById("menuToggle");

function rotateHeroText() {
  if (!rotatingText) return;
  rotateIndex = (rotateIndex + 1) % rotatingWords.length;
  rotatingText.textContent = rotatingWords[rotateIndex];
}

function animateCounters() {
  counters.forEach((counter) => {
    const target = Number(counter.dataset.count || 0);
    let current = 0;
    const step = Math.max(1, Math.floor(target / 60));
    const interval = setInterval(() => {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(interval);
      }
      counter.textContent = String(current);
    }, 30);
  });
}

function updateTestimonials(direction) {
  testimonialIndex = (testimonialIndex + direction + testimonials.length) % testimonials.length;
  const entry = testimonials[testimonialIndex];
  if (testimonialText) testimonialText.textContent = `“${entry.text}”`;
  if (testimonialName) testimonialName.textContent = entry.name;
}

filters.forEach((filter) => {
  filter.addEventListener("click", () => {
    filters.forEach((btn) => btn.classList.remove("is-active"));
    filter.classList.add("is-active");
    const selected = filter.dataset.filter || "all";

    journeyItems.forEach((item) => {
      const tags = item.dataset.tags || "";
      const match = selected === "all" || tags.includes(selected);
      item.classList.toggle("hidden", !match);
    });
  });
});

plannerForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(plannerForm);
  const name = String(formData.get("name") || "").trim();
  const email = String(formData.get("email") || "").trim();
  const dates = String(formData.get("dates") || "").trim();

  if (!name || !email || !dates) {
    formStatus.textContent = "Please complete all required fields.";
    formStatus.style.color = "#d46f4d";
    return;
  }

  formStatus.textContent = `Thanks ${name}! We will email a draft itinerary within 48 hours.`;
  formStatus.style.color = "#1b4d3e";
  plannerForm.reset();
});

openStory?.addEventListener("click", () => {
  storyModal?.classList.add("is-open");
  storyModal?.setAttribute("aria-hidden", "false");
});

closeStory?.addEventListener("click", () => {
  storyModal?.classList.remove("is-open");
  storyModal?.setAttribute("aria-hidden", "true");
});

openPlanner?.addEventListener("click", () => {
  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
});

menuToggle?.addEventListener("click", () => {
  const nav = document.querySelector(".nav");
  if (!nav) return;
  const isOpen = nav.style.display === "flex";
  nav.style.display = isOpen ? "none" : "flex";
});

const nextTestimonial = document.getElementById("nextTestimonial");
const prevTestimonial = document.getElementById("prevTestimonial");

nextTestimonial?.addEventListener("click", () => updateTestimonials(1));
prevTestimonial?.addEventListener("click", () => updateTestimonials(-1));

if (rotatingText) {
  setInterval(rotateHeroText, 2600);
}
window.addEventListener("load", animateCounters);
