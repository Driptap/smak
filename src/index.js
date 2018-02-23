import Game from './game';
import './index.css';

let game = Game();
document.getElementById('root').appendChild(game.renderer.domElement);
game.start();
