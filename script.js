// 3D Background Animation with Three.js
const container = document.getElementById('canvas-container');

// Scene, Camera, Renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
container.appendChild(renderer.domElement);

// Particles
const particlesGeometry = new THREE.BufferGeometry();
const particlesCount = 1500;

const posArray = new Float32Array(particlesCount * 3);

for (let i = 0; i < particlesCount * 3; i++) {
  posArray[i] = (Math.random() - 0.5) * 10;
}

particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

// Materials
const particlesMaterial = new THREE.PointsMaterial({
  size: 0.03,
  color: 0x3b82f6,
  transparent: true,
  opacity: 0.8
});

// Music Player Functionality
document.addEventListener('DOMContentLoaded', function () {
  const musicToggleBtn = document.getElementById('music-toggle');
  const backgroundMusic = document.getElementById('background-music');
  const soundOnIcon = document.querySelector('.sound-on');
  const soundOffIcon = document.querySelector('.sound-off');
  let isPlaying = false;

  // Update button text and icon state
  function updateButtonState() {
    if (isPlaying) {
      musicToggleBtn.classList.add('playing');
      musicToggleBtn.querySelector('span').textContent = 'Pause Music';
      soundOnIcon.classList.remove('hidden');
      soundOffIcon.classList.add('hidden');
    } else {
      musicToggleBtn.classList.remove('playing');
      musicToggleBtn.querySelector('span').textContent = 'Play Music';
      soundOnIcon.classList.add('hidden');
      soundOffIcon.classList.remove('hidden');
    }
  }

  // Toggle music play/pause
  musicToggleBtn.addEventListener('click', function () {
    if (isPlaying) {
      backgroundMusic.pause();
    } else {
      backgroundMusic.play().catch(e => {
        console.log('Audio playback failed:', e);
      });
    }

    isPlaying = !isPlaying;
    updateButtonState();
  });

  // Handle audio errors
  backgroundMusic.addEventListener('error', function () {
    console.error('Error loading audio file');
    alert('Unable to load the music file. Please check the file path.');
  });
});

// Mesh
const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particlesMesh);

// Position camera
camera.position.z = 4;

// Mouse movement effect
let mouseX = 0;
let mouseY = 0;

document.addEventListener('mousemove', (event) => {
  mouseX = event.clientX / window.innerWidth - 0.5;
  mouseY = event.clientY / window.innerHeight - 0.5;
});

// Animation
const animate = () => {
  requestAnimationFrame(animate);

  particlesMesh.rotation.x += 0.0005;
  particlesMesh.rotation.y += 0.0005;

  particlesMesh.rotation.x += mouseY * 0.005;
  particlesMesh.rotation.y += mouseX * 0.005;

  renderer.render(scene, camera);
};

animate();

// Resize Event
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Card Hover Animation
const cards = document.querySelectorAll('.option-card');

cards.forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    card.style.setProperty('--x', `${x}px`);
    card.style.setProperty('--y', `${y}px`);
  });
});

// Button click animations
const buttons = document.querySelectorAll('.option-btn');

buttons.forEach(button => {
  button.addEventListener('click', function () {
    gsap.to(this, {
      scale: 0.95,
      duration: 0.1,
      onComplete: () => {
        gsap.to(this, {
          scale: 1,
          duration: 0.1
        });
      }
    });
  });
});

document.getElementById('join-faculty-btn').addEventListener('click', function () {
  window.location.href = 'attendance.html';
});


// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();

    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);

    if (targetElement) {
      // Smooth scroll to the target
      window.scrollTo({
        top: targetElement.offsetTop - 70, // Offset for navbar
        behavior: 'smooth'
      });
    }
  });
});

const studentBtn = document.getElementById('student-btn');

studentBtn.addEventListener('click', () => {
  gsap.to(studentBtn, {
    scale: 0.95,
    duration: 0.1,
    onComplete: () => {
      gsap.to(studentBtn, {
        scale: 1,
        duration: 0.1,
        onComplete: () => {
          window.location.href = 'student_register.html';
        }
      });
    }
  });
});


document.getElementById('student-btn').addEventListener('click', () => {
  window.location.href = 'sregister.html';
});


// Animation for feature cards
const featureCards = document.querySelectorAll('.feature-card');
featureCards.forEach((card, index) => {
  card.style.setProperty('--i', index + 1);
});

// Animation for team cards
const teamCards = document.querySelectorAll('.team-card');
teamCards.forEach((card, index) => {
  card.style.setProperty('--i', index + 1);
});

// Scroll animation
window.addEventListener('scroll', () => {
  const sections = document.querySelectorAll('section');

  sections.forEach(section => {
    const sectionTop = section.getBoundingClientRect().top;
    const sectionHeight = section.offsetHeight;
    const windowHeight = window.innerHeight;

    if (sectionTop < windowHeight - 100 && sectionTop > -sectionHeight + 100) {
      section.classList.add('in-view');
    }
  });

  // Navbar background change on scroll
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 100) {
    navbar.style.background = 'rgba(15, 23, 42, 0.95)';
    navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
  } else {
    navbar.style.background = 'rgba(15, 23, 42, 0.8)';
    navbar.style.boxShadow = 'none';
  }
});