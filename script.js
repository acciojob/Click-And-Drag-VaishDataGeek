const container = document.querySelector('.container');
const cubes = document.querySelectorAll('.cube');

// Position cubes in a grid layout manually (to allow free movement)
const gridSize = 5;
const gap = 10;
const cubeSize = (600 - gap * (gridSize + 1)) / gridSize;

// Set initial positions
cubes.forEach((cube, index) => {
  const row = Math.floor(index / gridSize);
  const col = index % gridSize;

  const left = gap + col * (cubeSize + gap);
  const top = gap + row * (cubeSize + gap);

  cube.style.left = `${left}px`;
  cube.style.top = `${top}px`;
  cube.style.width = `${cubeSize}px`;
  cube.style.height = `${cubeSize}px`;
});

// Drag logic
let selectedCube = null;
let offsetX = 0;
let offsetY = 0;

cubes.forEach((cube) => {
  cube.addEventListener('mousedown', (e) => {
    selectedCube = cube;
    const rect = cube.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();

    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
});

function onMouseMove(e) {
  if (!selectedCube) return;

  const containerRect = container.getBoundingClientRect();

  let newX = e.clientX - containerRect.left - offsetX;
  let newY = e.clientY - containerRect.top - offsetY;

  // Constrain within bounds
  const maxX = container.clientWidth - selectedCube.offsetWidth;
  const maxY = container.clientHeight - selectedCube.offsetHeight;

  newX = Math.max(0, Math.min(newX, maxX));
  newY = Math.max(0, Math.min(newY, maxY));

  selectedCube.style.left = `${newX}px`;
  selectedCube.style.top = `${newY}px`;
}

function onMouseUp() {
  selectedCube = null;
  document.removeEventListener('mousemove', onMouseMove);
  document.removeEventListener('mouseup', onMouseUp);
}
