import Cell from './Cell.js';

class ItemObject {
  constructor(x, y) {
    this.cell = Object.assign({}, Cell);
    this.cell.x = x;
    this.cell.y = y;
    this.type = 'E';
  }

  neighbours(left, right, up, down) {
    this.cell.left = left;
    this.cell.right = right;
    this.cell.up = up;
    this.cell.down = down;
  }

  setType(type) {
    this.type = type;
    const td = document.getElementById(`${this.cell.x},${this.cell.y}`);
    td.style.backgroundColor = `var(--${td.classList.contains('odd') && type === 'E' ? 'grid-odd' : type})`
  }
}

export default ItemObject;