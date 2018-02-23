import Game from './game';
import './index.css';

let game = Game();
document.getElementById('root').appendChild(game.renderer.domElement);
game.start();


document.getElementById('root').addEventListener('click', e => game.throw(game.objects.cube, e));
document.addEventListener('mousemove', e => game.move(game.objects.cube, e));

