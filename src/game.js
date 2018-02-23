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

  that.createPlane = () => {
    const planeGeometry = new THREE.PlaneGeometry( 8, 8 );
    const planeMaterial = new THREE.MeshBasicMaterial( {color: 0xffff00, side: THREE.DoubleSide} );
    const plane = new THREE.Mesh( planeGeometry, planeMaterial );

    const planeCoords = [
      [-3, -1, -3],
      [-3, 5, -3],
      [3, -1, -3],
      [3, 5, -3],
    ];
    planeCoords.forEach((coords, i) => {
      planeGeometry.vertices[i].x = coords[0];
      planeGeometry.vertices[i].y = coords[1];
      planeGeometry.vertices[i].z = coords[2];
    });

    that.scene.add( plane );
  }

  that.animate = () => {
    that.renderer.render( that.scene, that.camera );
    requestAnimationFrame( that.animate )
  }

  that.start = () => {
    that.configureRenderer();
    that.createCube();
    that.createPlane();
    that.animate();

    that.camera.position.y = 1;
    that.camera.position.z = 5;
  }



  return that;
}


export default Game;
