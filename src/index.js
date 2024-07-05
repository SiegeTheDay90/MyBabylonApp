// import * as BABYLON from "@babylonjs/core/Legacy/legacy";

import { ArcRotateCamera, MeshBuilder } from "@babylonjs/core";
import { Engine } from "@babylonjs/core/Engines/engine";
import { HemisphericLight } from "@babylonjs/core/Lights/hemisphericLight";
import { Vector3 } from "@babylonjs/core/Maths/math.vector";
import { CreateGround } from "@babylonjs/core/Meshes/Builders/groundBuilder";
import { CreateSphere } from "@babylonjs/core/Meshes/Builders/sphereBuilder";
import { Scene } from "@babylonjs/core/scene";

import { GridMaterial, FireMaterial } from "@babylonjs/materials/";

// Get the canvas element from the DOM.
const canvas = document.getElementById("babylon-canvas");

// Associate a Babylon Engine to it.
const engine = new Engine(canvas);

// Create our first scene.
var scene = new Scene(engine);

// This creates and positions a free camera (non-mesh)
// var camera = new FreeCamera("camera1", new Vector3(0, 5, -10), scene);

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
// sphere.position.y = 2;

// Affect a material
sphere.material = material;

// Our built-in 'ground' shape.
var ground = CreateGround("ground1", { width: 25, height: 25, subdivisions: 4 }, scene);

// Affect a material
ground.material = material;

var camera2 = new ArcRotateCamera("camera2", 0, Math.PI*3/7, 10, sphere.position, scene, true);
camera2.attachControl(canvas,);
camera2.inputs.attached.keyboard.detachControl();
// scene.activeCamera = camera2;

function moveWithCamera(vector){
  sphere.position.addInPlace(vector);
  camera2.target = sphere.position;
  camera2.radius = 20;
}

let a = 0;
canvas.addEventListener("click", (event) => {
  var pickResult = scene.pick(scene.pointerX, scene.pointerY);

  if (pickResult.hit) {
    var pickedMesh = pickResult.pickedMesh; // The mesh that was picked
    var pickedPoint = pickResult.pickedPoint; // The point on the mesh that was picked

    if(pickedMesh.name === "ground1"){
      sphere.position = pickedPoint;
    }
    console.log("Picked Mesh:", pickedMesh);
    console.log("Picked Point:", pickedPoint);
    
    // You can add your own logic here, such as placing a marker at the picked point
    var marker = BABYLON.MeshBuilder.CreateSphere("marker", {diameter: 0.1}, scene);
    marker.position = pickedPoint;
  }
})
canvas.addEventListener('keydown', (e) => {
  const key = e.key;
  let vertical = new Vector3(Math.cos(camera2.alpha), 0, Math.sin(camera2.alpha));
  // vertical.y = 0;
  // vertical.normalize();
  let horizontal = new Vector3(Math.sin(camera2.alpha), 0, Math.cos(camera2.alpha));;

  switch(key){
    case "ArrowLeft":
      moveWithCamera(horizontal.negate());
      break;
    case "ArrowRight":
      moveWithCamera(horizontal);
      break;
    case "ArrowUp":
      moveWithCamera(vertical.negate());
      break;
      case "ArrowDown":
      moveWithCamera(vertical);
      break;
    default:
      return;
  }
})

// debugger;

// Render every frame
engine.runRenderLoop(() => {
  if(camera2.beta > Math.PI*5/14) camera2.beta = Math.PI*5/14;
  if(camera2.beta < Math.PI*2/11) camera2.beta = Math.PI*2/11;
  scene.render();

});