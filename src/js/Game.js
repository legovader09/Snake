import { Point, ItemObject } from './components/index.js';
import createRandomNumber from './helpers/createRandomNumber.js';

class Game {
  constructor(board) {
    this.board = board;
    this.boardSize = new Point(40, 26);
    this.gameObjects = [];
    this.snakeSize = 4;
    this.snake = [];
    this.directionBuffer;
    this.snakeDirection;
    this.gamePaused = false;
    this.lockGame = false;

    this.drawMap();
    this.setObjectNeighbours();
    this.placeFruit();
    this.initSnake();
  }
  
  /**
   * Creates a (boardSize) by (boardSize) table grid, and adds a click event listener to each cell.
   */
  drawMap() {
    const table = document.createElement('table');
    table.id = 'gameGrid';
    for (let y = 0; y < this.boardSize.y; y++) {
      let tr = document.createElement('tr');
      for (let x = 0; x < this.boardSize.x; x++) {
        let td = document.createElement('td');
        td.id = `${x},${y}`;
        this.gameObjects.push(new ItemObject(x, y));
        tr.appendChild(td);
      }
      table.appendChild(tr);
    }
    this.board.insertAdjacentElement('beforeend', table);
  }

  setObjectNeighbours() {
    this.gameObjects.forEach((item) => {
      item.neighbours(
        this.gameObjects.find((i) => i.cell.x === item.cell.x - 1 && i.cell.y === item.cell.y),
        this.gameObjects.find((i) => i.cell.x === item.cell.x + 1 && i.cell.y === item.cell.y),
        this.gameObjects.find((i) => i.cell.y === item.cell.y - 1 && i.cell.x === item.cell.x),
        this.gameObjects.find((i) => i.cell.y === item.cell.y + 1 && i.cell.x === item.cell.x),
      )
    })
  }

  placeFruit() {
    const randX = createRandomNumber(0, this.boardSize.x);
    const randY = createRandomNumber(0, this.boardSize.y);
    const fruit = this.gameObjects.find((i) => randX === i.cell.x && randY === i.cell.y);
    if (fruit && fruit.type === 'E') 
      fruit.setType('F');
    else 
      this.placeFruit();
  }

  initSnake() {
    this.snake.push(this.gameObjects.find((i) => i.cell.x === this.boardSize.x / 2 && i.cell.y === this.boardSize.y / 2));
    this.snake[0].setType('S');
    for(let i = 1; i < this.snakeSize; i++) {
      this.snake.push(this.snake[i - 1].cell.right);
      this.snake[i].setType('S');
    }
  }

  changeDirection(e) {
    if (this.lockGame) return;
    if (e === 'restart') this.gameOver();
    if (e === 'pause') {
      if (!this.directionBuffer) {
        this.directionBuffer = 'left';
        document.getElementById('hoverText').classList.toggle('disabled', this.directionBuffer !== null);
      }
      else this.gamePaused = !this.gamePaused;
      return;
    }
    if (this.snake[0].cell[e] && this.snake[0].cell[e].type !== 'S' && this.directionBuffer) this.directionBuffer = e;
  }

  moveSnake(e) {
    const snek = this.snake[0].cell[e];
    if (!snek) return;
    // Add new snake part to the beginning of array, then pop last snake piece.
    switch (snek.type) {
      case 'S':
        this.gameOver();
        break;
      case 'F':
        this.snakeSize++;
        this.snakeSize++;
        this.snake.unshift(snek);
        this.snake.unshift(snek);
        document.getElementById('score').innerText = 'Score: ' + (this.snakeSize - 5);
        this.placeFruit();
      case 'E':
        this.snake.unshift(snek);
        snek.setType('S');
        this.snake.pop().setType('E');
        break;
    }
    this.snakeDirection = e;
  }

  gameLoop() {
    !this.gamePaused && !this.lockGame && this.moveSnake(this.directionBuffer);
  }

  gameOver() {
    this.lockGame = true;
    this.reset();
  }

  reset() {
    this.gameObjects.filter((x) => x.type !== 'E')
      .forEach((x) => x.setType('E'));
    this.snakeSize = 4;
    this.snake = [];
    this.directionBuffer = null;
    this.snakeDirection = null;
    this.initSnake();
    this.placeFruit();
    this.lockGame = false;
    this.gamePaused = false;
  }
}

export default Game;