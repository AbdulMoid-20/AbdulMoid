const roles = [
    "Frontend Developer",
    "React Developer",
    "UI Engineer"
];
const header = document.querySelector("header");
const sections = document.querySelectorAll("section[id]");
const navItems = document.querySelectorAll(".navbar .nav-item");
const modalElement = document.getElementById("projectModal");
const modal = new bootstrap.Modal(modalElement);
const chatToggle = document.getElementById("chatToggle");
const chatWindow = document.getElementById("chatWindow");
const chatClose = document.getElementById("chatClose");
const chatSend = document.getElementById("chatSend");
const chatInput = document.getElementById("chatInput");
const chatMessages = document.getElementById("chatMessages");


/* ================================
   TYPEWRITER EFFECT
================================ */
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


window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
});


window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 140;
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute("id");
        }
    });

    navItems.forEach(item => {
        item.classList.remove("active");

        const link = item.querySelector("a");
        if (link.getAttribute("href") === `#${current}`) {
            item.classList.add("active");
        }
    });
});


document.querySelectorAll(".project-card").forEach(card => {
    card.addEventListener("click", () => {

        // Set modal text
        document.getElementById("modalTitle").innerText =
            card.dataset.title;

        document.getElementById("modalDescription").innerText =
            card.dataset.long;

        document.getElementById("modalTech").innerHTML =
            card.dataset.tech
                .split(",")
                .map(t => `<span>${t}</span>`)
                .join("");

        document.getElementById("modalLive").href =
            card.dataset.live;

        document.getElementById("modalCode").href =
            card.dataset.code;

        // Get project image from card
        const imgSrc = card.querySelector("img").src;
        document.getElementById("modalImage").src = imgSrc;

        // Reset animations
        document.querySelectorAll(".modal-line").forEach(el => {
            el.style.animation = "none";
            el.offsetHeight; // force reflow
            el.style.animation = "";
        });

        modal.show();
    });
});


// Open / Close
chatToggle.onclick = () => chatWindow.classList.toggle("active");
chatClose.onclick = () => chatWindow.classList.remove("active");

// Send message
chatSend.onclick = sendMessage;
chatInput.addEventListener("keypress", e => {
    if (e.key === "Enter") sendMessage();
});

function sendMessage() {
    const text = chatInput.value.trim();
    if (!text) return;

    addMessage(text, "user");
    chatInput.value = "";

    setTimeout(() => {
        addMessage(getBotReply(text), "bot");
    }, 600);
}

function addMessage(text, type) {
    const msg = document.createElement("div");
    msg.className = type === "user" ? "user-message" : "bot-message";
    msg.innerText = text;
    chatMessages.appendChild(msg);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Simple responses
function getBotReply(msg) {
    msg = msg.toLowerCase();

    if (msg.includes("project"))
        return "You can check Abdul Moid’s projects section for frontend apps, dashboards, and UI work.";

    if (msg.includes("skill"))
        return "He works with HTML, CSS, JavaScript, Bootstrap, Tailwind, and React.";

    if (msg.includes("contact"))
        return "You can contact him via WhatsApp, LinkedIn, or the contact form below.";

    if (msg.includes("hire"))
        return "Abdul Moid is open to frontend internships and junior roles.";

    return "Thanks for your message! Feel free to explore the portfolio or ask about skills or projects.";
}
