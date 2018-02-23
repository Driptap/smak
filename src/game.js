import * as THREE from 'three';
import JONATHON from './jonathan-hs.jpg';
import EIGEN from './tb.jpg';

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

  that.addWall = (vertices, material) => {
    const planeGeometry = new THREE.PlaneGeometry( 8, 8 );
    const plane = new THREE.Mesh( planeGeometry, material );

    vertices.forEach((coords, i) => {
      planeGeometry.vertices[i].x = coords[0];
      planeGeometry.vertices[i].y = coords[1];
      planeGeometry.vertices[i].z = coords[2];
    });

    that.scene.add( plane );
  }

  that.createWalls = () => {
    const left = -5;
    const right = 5;
    const up = 5;
    const down = -1;
    const near = 15;
    const far = 0;

    // vertices for the room
    const bottomLeftFar = [left, down, far];
    const topLeftFar =  [left, up, far];
    const bottomRightFar = [right, down, far];
    const topRightFar = [right, up, far];
    const bottomLeftNear =  [left, down, near];
    const topLeftNear = [left, up, near];
    const bottomRightNear = [right, down, near];
    const topRightNear = [right, up, near];

    const yellowMaterial = new THREE.MeshBasicMaterial( {color: 'yellow', side: THREE.DoubleSide} );
    const blueMaterial = new THREE.MeshBasicMaterial( {color: 'blue', side: THREE.DoubleSide} );
    const eigenMaterial = new THREE.MeshBasicMaterial({
      map:THREE.ImageUtils.loadTexture(EIGEN)
    });

    // back
    that.addWall(
      [ bottomLeftFar, topLeftFar, bottomRightFar, topRightFar ], eigenMaterial);
    // left
    that.addWall(
      [ bottomLeftNear, topLeftNear, bottomLeftFar, topLeftFar ], yellowMaterial);
    // right
    that.addWall(
      [ bottomRightFar, topRightFar, bottomRightNear, topRightNear ], yellowMaterial);
    // floor
    that.addWall(
      [ bottomLeftNear, bottomLeftFar, bottomRightNear, bottomRightFar ], blueMaterial);
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
    that.createWalls();
    that.animate();

    that.camera.position.y = 2;
    that.camera.position.z = 15;
    that.camera.lookAt = (0, 0, 0)
  }



  return that;
}


export default Game;
