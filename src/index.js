import * as BABYLON from "@babylonjs/core/Legacy/legacy";
console.log("Let's fucking go");
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
// var camera = new FreeCamera("camera1", new Vector3(0, 5, -10), scene);
var camera = new BABYLON.ArcRotateCamera("camera2", 2, 1, 13, new BABYLON.Vector3(0, 0, 0), scene);

// This targets the camera to scene origin
// camera.setTarget(Vector3.Zero());

// This attaches the camera to the canvas
camera.attachControl(canvas, true);

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
var ground = CreateGround("ground1", { width: 6, height: 6, subdivisions: 2 }, scene);

// Affect a material
ground.material = material;
let x = 0;
let y = 0;
let z = 0;
// Render every frame
engine.runRenderLoop(() => {
  y += 0.03;
  x += 0.1;
  z += 0.1;
  sphere.position.x = 2 * Math.cos(x);
  sphere.position.y = 3 + 2 * Math.cos(y);
  sphere.position.z = 2 * Math.sin(z);
  scene.render();
});