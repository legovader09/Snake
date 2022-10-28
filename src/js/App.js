import Game from './Game.js';
import getDirection from './helpers/getDirection.js';

window.Game = new Game(document.getElementById('board'));
window.addEventListener("keydown", (e) => {
  e.preventDefault();
  return window.Game.changeDirection(getDirection(e.key));
});
window.addEventListener("load", (e) => setInterval(() => window.Game.gameLoop(), 30));