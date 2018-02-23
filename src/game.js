import * as TWEEN from 'tween.js';
import * as THREE from 'three';
import EIGEN from './tb.jpg';
import CARPET from './carpet.jpg';

import Ammo from 'ammo.js';

const gravityConstant = 0;

const Game = () => {

  let that = {};

  that.pos = new THREE.Vector3();
  that.quat = new THREE.Quaternion();

  that.objects = {};
  that.throwing = false;

  that.raycaster = new THREE.Raycaster();
  that.mouseCoords = new THREE.Vector2();

  const createPhysics = () => {
    const collisionConfiguration = new Ammo.btDefaultCollisionConfiguration();
    const dispatcher = new Ammo.btCollisionDispatcher( collisionConfiguration );
    const broadphase = new Ammo.btDbvtBroadphase();
    const solver = new Ammo.btSequentialImpulseConstraintSolver();
    that.physicsWorld = new Ammo.btDiscreteDynamicsWorld( dispatcher, broadphase, solver, collisionConfiguration );
    that.physicsWorld.setGravity( new Ammo.btVector3( 0, - gravityConstant, 0 ) );
  }

  const createScene = () => {
    that.scene = new THREE.Scene();
    console.log(Ammo)
  }

  const createLight = () => {
    that.light = new THREE.DirectionalLight( 0xffffff, 1 );
    that.light.position.set( -10, 18, 5 );
    that.light.castShadow = true;
    var d = 14;
    that.light.shadow.camera.left = -d;
    that.light.shadow.camera.right = d;
    that.light.shadow.camera.top = d;
    that.light.shadow.camera.bottom = -d;
    that.light.shadow.camera.near = 2;
    that.light.shadow.camera.far = 50;
    that.light.shadow.mapSize.x = 1024;
    that.light.shadow.mapSize.y = 1024;
  }

  that.camera = new THREE.PerspectiveCamera( 75,
    window.innerWidth / window.innerHeight, 0.1, 1000 );
  that.renderer = new THREE.WebGLRenderer();

  that.configureRenderer = () => {
    createScene();
    createLight();
    createPhysics();
    that.scene.add(that.light);
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
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    that.objects.cube = new THREE.Mesh( geometry, material );
    that.objects.cube.castShadow = true;
    that.objects.cube.receiveShadow = true;
    that.objects.cube.position.set(0.05, 2.02 , 14);
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

    plane.receiveShadows = true;
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

    const eigenMaterial = new THREE.MeshBasicMaterial({
      map:THREE.ImageUtils.loadTexture(EIGEN)
    });
    const carpetMaterial = new THREE.MeshBasicMaterial({
      map:THREE.ImageUtils.loadTexture(CARPET)
    });

    // back
    that.addWall(
      [ bottomLeftFar, topLeftFar, bottomRightFar, topRightFar ], eigenMaterial);
    // left
    that.addWall(
      [ bottomLeftNear, topLeftNear, bottomLeftFar, topLeftFar ], eigenMaterial);
    // right
    that.addWall(
      [ bottomRightFar, topRightFar, bottomRightNear, topRightNear ], eigenMaterial);
    // floor
    that.addWall(
      [ bottomLeftNear, bottomLeftFar, bottomRightNear, bottomRightFar ], carpetMaterial);
  }

  that.throw = (object, e) => {
    that.throwing = true;

  };

  that.animate = () => {
    that.renderer.render( that.scene, that.camera );

    if (that.objects.cube) {
      console.log(that.objects.cube.position)
      if (that.throwing)
        that.objects.cube.translateZ(-0.5)
      if (that.objects.cube.position.z == -1) {
        that.throwing = false;
        that.scene.remove( that.objects.cube );
        window.dispatchEvent(new Event('shot'));
      }

    }

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
    object.position.set(pos.x, pos.y, 12);
  }

  that.start = () => {
    that.configureRenderer();

    that.createWalls();
    that.animate();

    that.camera.position.y = 2;
    that.camera.position.z = 15;
    that.camera.lookAt = (0, 0, 0)
  }


  return that;
}


export default Game;
