document.addEventListener('DOMContentLoaded', () => {
const icoscene = document.querySelector('.icoscene');

if (!icoscene) {
    console.log('El elemento .icoscene no se encontró en el DOM');
    // Opcional: intenta buscarlo más tarde o detén la ejecución
    throw new Error('Elemento .icoscene no encontrado');
}

function getRandomColor() {
    const hue = Math.random() * 360;
    const saturation = 80 + Math.random() * 20;
    const lightness = 50 + Math.random() * 10;
    return `hsla(${hue}, ${saturation}%, ${lightness}%, 0.5)`;
}

function createParticles(icosahedron, color) {
    const particles = [];
    const numParticles = 30; // Aumenta la cantidad de partículas
    const icosahedronRect = icosahedron.getBoundingClientRect();
    for (let i = 0; i < numParticles; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle20';
        particle.style.left = `${icosahedronRect.left + icosahedronRect.width / 2}px`;
        particle.style.top = `${icosahedronRect.top + icosahedronRect.height / 2}px`;
        particle.style.backgroundColor = color;
        particle.style.setProperty('--dx', `${(Math.random() - 0.5) * 200}px`); // Aumenta el alcance
        particle.style.setProperty('--dy', `${(Math.random() - 0.5) * 200}px`); // Aumenta el alcance
        particle.style.animation = `particle-explosion20 0.5s forwards`;
        icoscene.appendChild(particle);
        particles.push(particle);
    }
    setTimeout(() => {
        particles.forEach(p => p.remove());
    }, 500);
}

function createIcosahedron() {
    const icosahedron = document.createElement('div');
    icosahedron.className = 'icosahedron';

    const color = getRandomColor();

    for (let i = 0; i < 20; i++) {
        const face = document.createElement('div');
        face.style.borderBottomColor = color;
        icosahedron.appendChild(face);
    }

    icoscene.appendChild(icosahedron);

    const xDir = Math.random() * 2 - 1;
    const yDir = Math.random() * 2 - 1;

    icosahedron.style.setProperty('--x-dir', xDir);
    icosahedron.style.setProperty('--y-dir', yDir);

    const initialX = Math.random() * 100 + 'vw';
    const initialY = Math.random() * 100 + 'vh';

    icosahedron.style.left = initialX;
    icosahedron.style.top = initialY;

    const spinDuration = Math.random() * 3 + 2 + 's';
    const moveDuration = Math.random() * 5 + 7 + 's';
    icosahedron.style.animationDuration = `${spinDuration}, ${moveDuration}`;

    setTimeout(() => {
        icosahedron.style.animation = `explode20 0.5s forwards`;
        setTimeout(() => {
            createParticles(icosahedron, color);
            icosahedron.remove();
        }, 500);
    }, parseFloat(moveDuration) * 1000);
}

function startGeneratingIcosahedrons() {
    setInterval(createIcosahedron, 235); // Reducido en un 15%
}

startGeneratingIcosahedrons();
});