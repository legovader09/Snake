import Game from './Game.js';
import getDirection from './helpers/getDirection.js';

window.Game = new Game(document.getElementById('board'));
window.addEventListener("keypress", (e) => window.Game.changeDirection(getDirection(e.key)));
window.addEventListener("load", (e) => setInterval(() => window.Game.gameLoop(), 100));