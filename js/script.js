document.documentElement.classList.add("js");

const header = document.querySelector("[data-header]");
const navToggle = document.querySelector("[data-nav-toggle]");
const navLinks = document.querySelectorAll("[data-nav] a");
const revealItems = document.querySelectorAll("[data-reveal]");
const heroMedia = document.querySelector(".hero-media");
const themeToggle = document.querySelector("[data-theme-toggle]");
const themeLabel = document.querySelector("[data-theme-label]");
const themeStorageKey = "kopikaaa-theme";

const setTheme = (theme, shouldSave = true) => {
    const nextTheme = theme === "dark" ? "dark" : "light";

    document.documentElement.dataset.theme = nextTheme;
    themeToggle?.setAttribute("aria-pressed", String(nextTheme === "dark"));
    themeToggle?.setAttribute(
        "aria-label",
        nextTheme === "dark" ? "Világos mód bekapcsolása" : "Sötét mód bekapcsolása"
    );

    if (themeLabel) {
        themeLabel.textContent = nextTheme === "dark" ? "Világos" : "Sötét";
    }

    if (shouldSave) {
        try {
            localStorage.setItem(themeStorageKey, nextTheme);
        } catch (error) {
            // Theme still changes for the current session if storage is unavailable.
        }
    }
};

setTheme(document.documentElement.dataset.theme, false);

const setHeaderState = () => {
    header?.classList.toggle("is-scrolled", window.scrollY > 16);
};

setHeaderState();
window.addEventListener("scroll", setHeaderState, { passive: true });

navToggle?.addEventListener("click", () => {
    const isOpen = document.body.classList.toggle("nav-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
    navToggle.setAttribute("aria-label", isOpen ? "Menü bezárása" : "Menü megnyitása");
});

navLinks.forEach((link) => {
    link.addEventListener("click", () => {
        document.body.classList.remove("nav-open");
        navToggle?.setAttribute("aria-expanded", "false");
        navToggle?.setAttribute("aria-label", "Menü megnyitása");
    });
});

themeToggle?.addEventListener("click", () => {
    const currentTheme = document.documentElement.dataset.theme === "dark" ? "dark" : "light";
    setTheme(currentTheme === "dark" ? "light" : "dark");
});

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if ("IntersectionObserver" in window && !prefersReducedMotion) {
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.14 });

    revealItems.forEach((item) => revealObserver.observe(item));
} else {
    revealItems.forEach((item) => item.classList.add("is-visible"));
}

if (heroMedia && !prefersReducedMotion) {
    heroMedia.addEventListener("mouseenter", () => {
        heroMedia.style.transform = "translateY(-2px)";
    });

    heroMedia.addEventListener("mouseleave", () => {
        heroMedia.style.transform = "";
    });
}
