import Game from './game';
import './index.css';

import JONATHON from './jonathan-hs.jpg';
import LEWIS from './lewis-hs.jpg';
import CHARLIE from './charlie-hs.jpg';

let game = Game();
document.getElementById('root').appendChild(game.renderer.domElement);
game.start();


const randomImage = () => {

  let images = [ JONATHON, LEWIS, CHARLIE ];
  return images[Math.floor(Math.random() * Math.floor(images.length))]
}

document.getElementById('root').addEventListener('click', e => game.throw(game.objects.cube, e));
document.addEventListener('mousemove', e => game.move(game.objects.cube, e));

window.addEventListener('shot', () => {
  game.createCube(randomImage());
});

console.log(randomImage())
game.createCube(randomImage());
