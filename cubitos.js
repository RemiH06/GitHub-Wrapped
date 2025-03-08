const scene = document.querySelector('.scene');

function getRandomColor() {
    const hue = Math.random() * 360;
    const saturation = 80 + Math.random() * 20;
    const lightness = 50 + Math.random() * 10;
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}

function createParticles(cube, color) {
    const particles = [];
    const numParticles = 20;
    const cubeRect = cube.getBoundingClientRect();
    for (let i = 0; i < numParticles; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = `${cubeRect.left + cubeRect.width / 2}px`;
        particle.style.top = `${cubeRect.top + cubeRect.height / 2}px`;
        particle.style.backgroundColor = color;
        particle.style.setProperty('--dx', `${(Math.random() - 0.5) * 100}px`);
        particle.style.setProperty('--dy', `${(Math.random() - 0.5) * 100}px`);
        particle.style.animation = `particle-explosion 0.5s forwards`;
        scene.appendChild(particle);
        particles.push(particle);
    }
    setTimeout(() => {
        particles.forEach(p => p.remove());
    }, 500);
}

function createCube() {
    const cube = document.createElement('div');
    cube.className = 'cube';

    const color = getRandomColor();

    for (let i = 0; i < 6; i++) {
        const face = document.createElement('div');
        face.style.background = color;
        face.style.border = `2px solid ${color}`;
        cube.appendChild(face);
    }

    const innerCube = document.createElement('div');
    innerCube.className = 'inner-cube';

    const innerColor = getRandomColor();

    for (let i = 0; i < 6; i++) {
        const innerFace = document.createElement('div');
        innerFace.style.background = innerColor;
        innerFace.style.border = `2px solid ${innerColor}`;
        innerCube.appendChild(innerFace);
    }

    cube.appendChild(innerCube);
    scene.appendChild(cube);

    const xDir = Math.random() * 2 - 1;
    const yDir = Math.random() * 2 - 1;

    cube.style.setProperty('--x-dir', xDir);
    cube.style.setProperty('--y-dir', yDir);

    const initialX = Math.random() * 100 + 'vw';
    const initialY = Math.random() * 100 + 'vh';

    cube.style.left = initialX;
    cube.style.top = initialY;

    const spinDuration = Math.random() * 3 + 2 + 's';
    const moveDuration = Math.random() * 5 + 7 + 's';
    cube.style.animationDuration = `${spinDuration}, ${moveDuration}`;

    setTimeout(() => {
        cube.style.animation = `explode 0.5s forwards`;
        setTimeout(() => {
            createParticles(cube, color);
            cube.remove();
        }, 500);
    }, parseFloat(moveDuration) * 1000);
}

function startGeneratingCubes() {
    setInterval(createCube, 200); // Genera un nuevo cubo cada 200ms
}

startGeneratingCubes();