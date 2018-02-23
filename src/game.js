import * as THREE from 'three';

const Game = () => {

  let that = {};

  that.scene = new THREE.Scene();
  that.camera = new THREE.PerspectiveCamera( 75,
    window.innerWidth / window.innerHeight, 0.1, 1000 );
  that.renderer = new THREE.WebGLRenderer();

  that.configureRenderer = () => {
    that.renderer.setSize( window.innerWidth, window.innerHeight );
  }

  that.createCube = () => {
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh( geometry, material );
    that.scene.add( cube );
  }


  that.animate = () => {
    that.renderer.render( that.scene, that.camera );
    requestAnimationFrame( that.animate )
  }

  that.start = () => {
    that.configureRenderer();
    that.createCube();
    that.animate();


    that.camera.position.y = 1;
    that.camera.position.z = 5;
  }



  return that;
}


export default Game;
