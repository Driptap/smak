import * as THREE from 'three';
import JONATHON from './jonathan-hs.jpg';

const Game = () => {

  let that = {};

  that.objects = {};

  that.scene = new THREE.Scene();
  that.camera = new THREE.PerspectiveCamera( 75,
    window.innerWidth / window.innerHeight, 0.1, 1000 );
  that.renderer = new THREE.WebGLRenderer();

  that.configureRenderer = () => {
    that.renderer.setSize( window.innerWidth, window.innerHeight );
  }

  that.createCube = image => {

    let material = new THREE.MeshFaceMaterial( [
      new THREE.MeshBasicMaterial( {
        map: THREE.ImageUtils.loadTexture( image )
      }),
      new THREE.MeshBasicMaterial( {
        map: THREE.ImageUtils.loadTexture( image )
      }),
      new THREE.MeshBasicMaterial( {
        map: THREE.ImageUtils.loadTexture( image )
      }),
      new THREE.MeshBasicMaterial( {
        map: THREE.ImageUtils.loadTexture( image )
      }),
      new THREE.MeshBasicMaterial( {
        map: THREE.ImageUtils.loadTexture( image )
      }),
      new THREE.MeshBasicMaterial( {
        map: THREE.ImageUtils.loadTexture( image )
      })
    ]);
    const geometry = new THREE.BoxGeometry(2, 2, 2);

    that.objects.cube = new THREE.Mesh( geometry, material );
    that.scene.add( that.objects.cube );
  }

  that.createPlane = () => {
    const planeGeometry = new THREE.PlaneGeometry( 8, 8 );
    const planeMaterial = new THREE.MeshBasicMaterial( {
      color: 0xffff00,
      side: THREE.DoubleSide,
    } );
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

  that.move = (object, e) => {
    let mouseX = (e.clientX / window.innerWidth) * 2 - 1;
    let mouseY = - (e.clientY / window.innerHeight) * 2 + 1;
    var vector = new THREE.Vector3(mouseX, mouseY, 0.5);

    vector.unproject( that.camera );
    var dir = vector.sub( that.camera.position ).normalize();
    var distance = - that.camera.position.z / dir.z;
    var pos = that.camera.position.clone().add(
      dir.multiplyScalar( distance )
    );
    object.position.set(pos.x, pos.y, 0);
  }

  that.start = () => {
    that.configureRenderer();
    that.createCube(JONATHON);
    that.createPlane();
    that.animate();

    that.camera.position.y = 1;
    that.camera.position.z = 5;
  }



  return that;
}


export default Game;
