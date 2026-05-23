const themeToggle = document.querySelector(".theme-toggle");
const themeToggleIcon = themeToggle?.querySelector("i");
const themeToggleText = themeToggle?.querySelector("span");
const contactForm = document.querySelector(".contact-form");
const revealElements = document.querySelectorAll(
    "main > section, .experience-item, .project-card, .topic-card, .flex-sections > section, .contact-copy, .contact-form"
);

function setTheme(theme) {
    const isDark = theme === "dark";

    document.documentElement.dataset.theme = theme;
    localStorage.setItem("theme", theme);

    if (!themeToggle || !themeToggleIcon || !themeToggleText) {
        return;
    }

    themeToggle.setAttribute("aria-pressed", String(isDark));
    themeToggle.setAttribute("aria-label", isDark ? "Switch to light mode" : "Switch to dark mode");
    themeToggleIcon.className = isDark ? "fas fa-sun" : "fas fa-moon";
    themeToggleText.textContent = isDark ? "Light" : "Dark";
}

themeToggle?.addEventListener("click", () => {
    const currentTheme = document.documentElement.dataset.theme || "light";
    setTheme(currentTheme === "dark" ? "light" : "dark");
});

setTheme(document.documentElement.dataset.theme || "light");

if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) {
                return;
            }

            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
        });
    }, {
        threshold: 0.14
    });

    revealElements.forEach((element, index) => {
        element.classList.add("reveal");
        element.style.setProperty("--reveal-delay", `${Math.min(index * 45, 220)}ms`);
        revealObserver.observe(element);
    });
} else {
    revealElements.forEach((element) => {
        element.classList.add("is-visible");
    });
}

contactForm?.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(contactForm);
    const recipient = contactForm.dataset.email;
    const message = String(formData.get("message") || "").trim();
    const status = contactForm.querySelector(".form-status");
    const mailtoUrl = `mailto:${recipient}?subject=${encodeURIComponent("Portfolio message")}&body=${encodeURIComponent(message)}`;

    window.location.href = mailtoUrl;

    if (status) {
        status.textContent = "Opening your email app to send the message.";
    }
});
