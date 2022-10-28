import Game from './Game.js';
import getDirection from './helpers/getDirection.js';

window.Game = new Game(document.getElementById('board'));
window.addEventListener("keydown", (e) => {
  window.Game.changeDiirection(getDirection(e.key));
  e.preventDefault();
});
window.addEventListener("load", (e) => setInterval(() => window.Game.gameLoop(), 30));