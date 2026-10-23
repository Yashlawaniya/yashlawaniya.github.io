/* =========================================
   YASH LAWANIYA — PORTFOLIO INTERACTIONS
   File: script.js
========================================= */


/* =========================================
   1. MOBILE NAVIGATION
========================================= */

const nav = document.querySelector("#nav");
const menu = document.querySelector("#menu");

if (nav && menu) {

    menu.addEventListener("click", () => {
        const isOpen = nav.classList.toggle("open");

        menu.setAttribute("aria-expanded", String(isOpen));
        menu.textContent = isOpen ? "✕" : "☰";
    });


    // Close navigation after selecting a section
    nav.querySelectorAll("a").forEach((link) => {

        link.addEventListener("click", () => {
            nav.classList.remove("open");

            menu.setAttribute("aria-expanded", "false");
            menu.textContent = "☰";
        });

    });


    // Close navigation when clicking outside
    document.addEventListener("click", (event) => {

        const clickedInsideNav = nav.contains(event.target);
        const clickedMenu = menu.contains(event.target);

        if (
            !clickedInsideNav &&
            !clickedMenu &&
            nav.classList.contains("open")
        ) {
            nav.classList.remove("open");

            menu.setAttribute("aria-expanded", "false");
            menu.textContent = "☰";
        }

    });


    // Close mobile menu when switching to desktop layout
    window.addEventListener("resize", () => {

        if (window.innerWidth > 700) {
            nav.classList.remove("open");

            menu.setAttribute("aria-expanded", "false");
            menu.textContent = "☰";
        }

    });

}


/* =========================================
   2. AUTOMATIC COPYRIGHT YEAR
========================================= */

const yearElement = document.querySelector("#year");

if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}


/* =========================================
   3. SCROLL REVEAL ANIMATIONS
========================================= */

const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
).matches;

const revealElements = document.querySelectorAll(".reveal");

if (
    "IntersectionObserver" in window &&
    !prefersReducedMotion
) {

    const revealObserver = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    observer.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.12
        }
    );


    revealElements.forEach((element) => {
        revealObserver.observe(element);
    });

} else {

    // Show all content if animation is unavailable or disabled
    revealElements.forEach((element) => {
        element.classList.add("visible");
    });

}


/* =========================================
   4. ANIMATED STAR BACKGROUND
========================================= */

const canvas = document.querySelector("#stars");

if (canvas) {

    const ctx = canvas.getContext("2d");

    if (ctx) {

        let canvasWidth = 0;
        let canvasHeight = 0;

        let stars = [];
        let animationFrameId = null;


        // Create stars
        function createStars() {

            const starCount = Math.min(
                90,
                Math.floor(canvasWidth / 14)
            );

            stars = Array.from(
                { length: starCount },
                () => ({
                    x: Math.random() * canvasWidth,
                    y: Math.random() * canvasHeight,

                    radius: Math.random() + 0.3,

                    opacity: Math.random() * 0.4 + 0.1,

                    speed: Math.random() * 0.12 + 0.03
                })
            );

        }


        // Resize the canvas to fit the screen
        function resizeCanvas() {

            const pixelRatio = Math.min(
                window.devicePixelRatio || 1,
                2
            );

            canvasWidth = window.innerWidth;
            canvasHeight = window.innerHeight;

            canvas.width = canvasWidth * pixelRatio;
            canvas.height = canvasHeight * pixelRatio;

            canvas.style.width = `${canvasWidth}px`;
            canvas.style.height = `${canvasHeight}px`;

            ctx.setTransform(
                pixelRatio,
                0,
                0,
                pixelRatio,
                0,
                0
            );

            createStars();

            drawStars();

        }


        // Draw and animate stars
        function drawStars() {

            ctx.clearRect(
                0,
                0,
                canvasWidth,
                canvasHeight
            );


            stars.forEach((star) => {

                ctx.beginPath();

                ctx.arc(
                    star.x,
                    star.y,
                    star.radius,
                    0,
                    Math.PI * 2
                );

                ctx.fillStyle = `rgba(166, 198, 255, ${star.opacity})`;

                ctx.fill();


                // Move stars slowly upward
                if (!prefersReducedMotion) {

                    star.y -= star.speed;

                    // Reposition stars after they leave the screen
                    if (star.y < 0) {

                        star.y = canvasHeight;

                        star.x = Math.random() * canvasWidth;

                    }

                }

            });


            // Continue animation only when allowed
            if (!prefersReducedMotion) {

                animationFrameId = requestAnimationFrame(drawStars);

            }

        }


        // Initialise the background
        resizeCanvas();


        // Update the background when the viewport changes
        window.addEventListener("resize", () => {

            if (animationFrameId !== null) {

                cancelAnimationFrame(animationFrameId);

                animationFrameId = null;

            }

            resizeCanvas();

        });

    }

}
// Always start at the top when the page is refreshed
if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual";
}

window.addEventListener("load", () => {
    window.scrollTo(0, 0);
});