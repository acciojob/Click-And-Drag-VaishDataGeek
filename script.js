// Your code here.
const container = document.getElementById('container');
const items = document.querySelectorAll('.item');

let draggedItem = null;
let offsetX = 0;
let offsetY = 0;

// Initial grid layout
items.forEach((item, index) => {
  const columns = 5;
  const spacing = 90;
  const x = (index % columns) * spacing;
  const y = Math.floor(index / columns) * spacing;
  item.style.left = `${x}px`;
  item.style.top = `${y}px`;
});

// Drag Logic
items.forEach(item => {
  item.addEventListener('mousedown', (e) => {
    draggedItem = item;
    offsetX = e.clientX - item.offsetLeft;
    offsetY = e.clientY - item.offsetTop;
    item.style.zIndex = 1000;
    item.style.cursor = 'grabbing';
  });
});

document.addEventListener('mousemove', (e) => {
  if (!draggedItem) return;

  let x = e.clientX - offsetX;
  let y = e.clientY - offsetY;

  // Boundaries (inside .items)
  const containerRect = container.getBoundingClientRect();
  const itemRect = draggedItem.getBoundingClientRect();

  if (x < 0) x = 0;
  if (y < 0) y = 0;
  if (x + itemRect.width > container.clientWidth)
    x = container.clientWidth - itemRect.width;
  if (y + itemRect.height > container.clientHeight)
    y = container.clientHeight - itemRect.height;

  draggedItem.style.left = `${x}px`;
  draggedItem.style.top = `${y}px`;
});

document.addEventListener('mouseup', () => {
  if (draggedItem) {
    draggedItem.style.cursor = 'grab';
    draggedItem = null;
  }
});
