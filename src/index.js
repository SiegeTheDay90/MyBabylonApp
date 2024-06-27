// import * as BABYLON from "@babylonjs/core/Legacy/legacy";

import { FreeCamera } from "@babylonjs/core/Cameras/freeCamera";
import { Engine } from "@babylonjs/core/Engines/engine";
import { HemisphericLight } from "@babylonjs/core/Lights/hemisphericLight";
import { Vector3 } from "@babylonjs/core/Maths/math.vector";
import { CreateGround } from "@babylonjs/core/Meshes/Builders/groundBuilder";
import { CreateSphere } from "@babylonjs/core/Meshes/Builders/sphereBuilder";
import { Scene } from "@babylonjs/core/scene";

import { GridMaterial } from "@babylonjs/materials/grid/gridMaterial";

// Get the canvas element from the DOM.
const canvas = document.getElementById("babylon-canvas");

// Associate a Babylon Engine to it.
const engine = new Engine(canvas);

// Create our first scene.
var scene = new Scene(engine);

// This creates and positions a free camera (non-mesh)
var camera = new FreeCamera("camera1", new Vector3(0, 5, -10), scene);

// This targets the camera to scene origin
// camera.setTarget(Vector3.Zero());

// This attaches the camera to the canvas
// camera.attachControl(canvas, true);

// This creates a light, aiming 0,1,0 - to the sky (non-mesh)
// var light = new HemisphericLight("light1", new Vector3(1, 0, 0), scene);

// Default intensity is 1. Let's dim the light a small amount
// light.intensity = 0;

// Create a grid material
var material = new GridMaterial("grid", scene);

// Our built-in 'sphere' shape.
var sphere = CreateSphere("sphere1", { segments: 16, diameter: 2 }, scene);

// Move the sphere upward 1/2 its height
sphere.position.y = 2;

// Affect a material
sphere.material = material;

// Our built-in 'ground' shape.
var ground = CreateGround("ground1", { width: 25, height: 25, subdivisions: 4 }, scene);

// Affect a material
ground.material = material;

var camera2 = new ArcRotateCamera("camera2", 1, Math.PI*3/7, 20, sphere, scene, true);
camera2.attachControl(canvas,);
camera2.inputs.attached.keyboard.detachControl();
// scene.activeCamera = camera2;



canvas.addEventListener('keydown', (e) => {
  const key = e.key;
  let vertical = sphere.position.subtractInPlace(camera2.position).normalize();
  vertical.y = 0;
  let horizontal = new Vector3(vertical.z, 0, -vertical.x);
  switch(key){
    case "ArrowLeft":
      sphere.position.addInPlace(horizontal);
      break;
    case "ArrowRight":
      sphere.position.subtractInPlace(horizontal);
      break;
    case "ArrowUp":
      sphere.position.subtractInPlace(vertical);
      break;
      case "ArrowDown":
      sphere.position.addInPlace(vertical);
      break;
    default:
      return;
  }
})


// Render every frame
engine.runRenderLoop(() => {
  scene.render();
});