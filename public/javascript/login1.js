// Polyfill for requestAnimationFrame to ensure it works in all browsers (including older versions of Edge)
window.requestAnimationFrame = window.requestAnimationFrame || 
                               window.mozRequestAnimationFrame || 
                               window.webkitRequestAnimationFrame || 
                               window.msRequestAnimationFrame;

// Get canvas and context
const canvas = document.getElementById('backgroundCanvas');
const ctx = canvas.getContext('2d');

// Explicitly set the canvas size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Mouse object to store mouse coordinates
const mouse = {
    x: null,
    y: null,
    radius: 150 // Interaction radius around the mouse
};

// Array to hold particles
let particlesArray = [];

// Create Particle class
class Particle {
    constructor(x, y, size, speedX, speedY, color) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.speedX = speedX;
        this.speedY = speedY;
        this.color = color;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
    }

    update() {
        // Check if particle is within the canvas bounds
        if (this.x + this.size > canvas.width || this.x - this.size < 0) {
            this.speedX = -this.speedX;
        }
        if (this.y + this.size > canvas.height || this.y - this.size < 0) {
            this.speedY = -this.speedY;
        }

        // Calculate distance between mouse and particle
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Interaction with mouse: Move particles away when mouse is close
        if (distance < mouse.radius) {
            if (mouse.x < this.x && this.x < canvas.width - this.size * 10) {
                this.x += 3; // Move particle right if mouse is on the left
            } else if (mouse.x > this.x && this.x > this.size * 10) {
                this.x -= 3; // Move particle left if mouse is on the right
            }
            if (mouse.y < this.y && this.y < canvas.height - this.size * 10) {
                this.y += 3; // Move particle down if mouse is above
            } else if (mouse.y > this.y && this.y > this.size * 10) {
                this.y -= 3; // Move particle up if mouse is below
            }
        }

        // Move the particle normally
        this.x += this.speedX;
        this.y += this.speedY;

        // Draw particle
        this.draw();
    }
}

// Initialize particles
function initParticles() {
    particlesArray = [];
    let numberOfParticles = (canvas.width * canvas.height) / 9000;  // Adjust particle density
    for (let i = 0; i < numberOfParticles; i++) {
        let size = Math.random() * 10 + 2;
        let x = Math.random() * (canvas.width - size * 2) + size;
        let y = Math.random() * (canvas.height - size * 2) + size;
        let speedX = (Math.random() * 1.5) - 0.75;
        let speedY = (Math.random() * 1.5) - 0.75;
        let color = 'rgba(255, 255, 255, 0.8)';
        particlesArray.push(new Particle(x, y, size, speedX, speedY, color));
    }
}

// Animate particles
function animateParticles() {
    requestAnimationFrame(animateParticles);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particlesArray.forEach(particle => {
        particle.update();
    });
}

// Track mouse movement
window.addEventListener('mousemove', function(event) {
    mouse.x = event.x;
    mouse.y = event.y;
});

// Resize Canvas on window resize
window.addEventListener('resize', function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initParticles(); // Reinitialize the particles after resize
});

// Initialize particles and start animation
initParticles();
animateParticles();
