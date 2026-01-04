const roles = [
    "Frontend Developer",
    "React Developer",
    "UI Engineer"
];

let roleIndex = 0;
let charIndex = 0;
const speed = 100;
const typewriter = document.getElementById("typewriter");

function type() {
    if (charIndex < roles[roleIndex].length) {
        const span = document.createElement("span");
        span.textContent = roles[roleIndex][charIndex];
        typewriter.appendChild(span);

        charIndex++;
        setTimeout(type, speed);
    } else {
        setTimeout(erase, 2000);
    }
}

function erase() {
    if (charIndex > 0) {
        typewriter.removeChild(typewriter.lastChild);
        charIndex--;
        setTimeout(erase, speed / 2);
    } else {
        roleIndex = (roleIndex + 1) % roles.length;
        setTimeout(type, speed);
    }
}

type();

/* Contact Form Validation */
document.getElementById("contactForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();
    const formMessage = document.getElementById("formMessage");

    if (!name || !email || !message) {
        formMessage.style.color = "red";
        formMessage.textContent = "Please fill in all fields.";
        return;
    }

    if (!email.includes("@")) {
        formMessage.style.color = "red";
        formMessage.textContent = "Please enter a valid email.";
        return;
    }

    formMessage.style.color = "lightgreen";
    formMessage.textContent = "Message sent successfully!";
    this.reset();
});


let lastTime = 0;

document.addEventListener("mousemove", (e) => {
    const now = Date.now();
    if (now - lastTime < 20) return; // throttle
    lastTime = now;

    // create multiple sparks per move
    const sparksCount = 2 + Math.floor(Math.random() * 2);

    for (let i = 0; i < sparksCount; i++) {
        const spark = document.createElement("div");
        spark.className = "lightning-spark";

        const angle = Math.random() * 360;
        spark.style.setProperty("--angle", `${angle}deg`);

        spark.style.left = `${e.clientX}px`;
        spark.style.top = `${e.clientY}px`;

        // random size
        spark.style.width = `${8 + Math.random() * 16}px`;

        document.body.appendChild(spark);

        setTimeout(() => spark.remove(), 400);
    }
});


const core = document.createElement("div");
const ring = document.createElement("div");

core.className = "cursor-core";
ring.className = "cursor-ring";

document.body.appendChild(core);
document.body.appendChild(ring);

let mouseX = 0, mouseY = 0;
let ringX = 0, ringY = 0;

// Smooth trailing effect
function animateCursor() {
    ringX += (mouseX - ringX) * 0.15;
    ringY += (mouseY - ringY) * 0.15;

    core.style.left = `${mouseX}px`;
    core.style.top = `${mouseY}px`;

    ring.style.left = `${ringX - 18}px`;
    ring.style.top = `${ringY - 18}px`;

    requestAnimationFrame(animateCursor);
}

animateCursor();

document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    // Subtle energy arcs
    if (Math.random() > 0.85) {
        const arc = document.createElement("span");
        arc.className = "energy-arc";

        arc.style.left = `${mouseX}px`;
        arc.style.top = `${mouseY}px`;
        arc.style.setProperty("--angle", `${Math.random() * 360}deg`);

        document.body.appendChild(arc);
        setTimeout(() => arc.remove(), 350);
    }
});
