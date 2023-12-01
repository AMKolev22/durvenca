import {renderer} from "./renderer"
import * as THREE from "three"
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader"
import { camera, controls } from "./camera";

const scene = new THREE.Scene();
const canvasGame = renderer.domElement;
const loader = new GLTFLoader();
const canvas = document.getElementById('game');
const light = new THREE.AmbientLight(0xfff)
scene.background = new THREE.Color(0xffffff);
scene.add(light)

loader.load("../../../public/tree.glb", (gltf)=>{
    const model = gltf.scene;
    model.scale.set(1.5,1.5,1.5)
    model.position.set(0, -30 ,0)
    scene.add(model);
    console.log("successfully added")
})



const color = new THREE.Color(0xffffff)
scene.background = color;


canvas.appendChild( renderer.domElement);
function animate() {
    controls.update()
    requestAnimationFrame( animate );
	renderer.render( scene, camera );
}
animate();