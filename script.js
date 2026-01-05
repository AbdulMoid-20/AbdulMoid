/* ================================
   TYPEWRITER EFFECT
================================ */
const roles = [
    "Frontend Developer",
    "React Developer",
    "UI Engineer"
];

let roleIndex = 0;
let charIndex = 0;
const speed = 90;
const typewriter = document.getElementById("typewriter");

function type() {
    if (charIndex < roles[roleIndex].length) {
        const span = document.createElement("span");
        span.textContent = roles[roleIndex][charIndex];
        typewriter.appendChild(span);
        charIndex++;
        setTimeout(type, speed);
    } else {
        setTimeout(erase, 1800);
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

/* ================================
   CONTACT FORM + MODAL
================================ */
document.getElementById("contactForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!name || !email || !message) {
        alert("Please fill in all fields.");
        return;
    }

    if (!email.includes("@")) {
        alert("Please enter a valid email address.");
        return;
    }

    this.reset();

    // Show Bootstrap modal
    const modal = new bootstrap.Modal(
        document.getElementById("sendModal")
    );
    modal.show();
});

/* ================================
   LIGHTNING SPARK CURSOR
================================ */
let lastTime = 0;

document.addEventListener("mousemove", (e) => {
    const now = Date.now();
    if (now - lastTime < 18) return;
    lastTime = now;

    const sparksCount = 2 + Math.floor(Math.random() * 2);

    for (let i = 0; i < sparksCount; i++) {
        const spark = document.createElement("div");
        spark.className = "lightning-spark";

        spark.style.setProperty("--angle", `${Math.random() * 360}deg`);
        spark.style.left = `${e.clientX}px`;
        spark.style.top = `${e.clientY}px`;
        spark.style.width = `${8 + Math.random() * 14}px`;

        document.body.appendChild(spark);
        setTimeout(() => spark.remove(), 400);
    }
});

/* ================================
   CUSTOM CURSOR CORE + RING
================================ */
const core = document.createElement("div");
const ring = document.createElement("div");

core.className = "cursor-core";
ring.className = "cursor-ring";

document.body.appendChild(core);
document.body.appendChild(ring);

let mouseX = 0, mouseY = 0;
let ringX = 0, ringY = 0;

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

    // Energy arc effect
    if (Math.random() > 0.88) {
        const arc = document.createElement("span");
        arc.className = "energy-arc";
        arc.style.left = `${mouseX}px`;
        arc.style.top = `${mouseY}px`;
        arc.style.setProperty("--angle", `${Math.random() * 360}deg`);

        document.body.appendChild(arc);
        setTimeout(() => arc.remove(), 350);
    }
});


function openWhatsApp() {
    const phoneNumber = "919876543210"; // country code + number
    const message = encodeURIComponent(
        "Hi Abdul Moid, I came across your portfolio and would like to connect."
    );

    const url = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(url, "_blank");
}

function openEmail() {
    const email = "abdulmoidsiddiqui2008@gmail.com";
    const subject = encodeURIComponent("Portfolio Inquiry");
    const body = encodeURIComponent(
        "Hi Abdul Moid,\n\nI came across your portfolio and would like to connect with you.\n\nRegards,"
    );

    const mailtoLink = `mailto:${email}?subject=${subject}&body=${body}`;
    window.location.href = mailtoLink;
    
}

const header = document.querySelector("header");

window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
});
