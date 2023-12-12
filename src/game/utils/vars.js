import { renderer } from "../core/renderer";
import * as THREE from "three"
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

export const scene = new THREE.Scene();
export const clock = new THREE.Clock();
export const canvasGame = renderer.domElement;
export const mapCords = new THREE.Vector3();
export const ambientLight = new THREE.AmbientLight( 0xffffff, 3)
export let cameraPos = new THREE.Vector3();
export const loader = new GLTFLoader();
export const treeLoader = new GLTFLoader();

