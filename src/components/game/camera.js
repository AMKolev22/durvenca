import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import {TrackballControls} from 'three/examples/jsm/controls/TrackballControls'
import { renderer } from './renderer';


export const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 1000 );
export const controls = new OrbitControls(camera, renderer.domElement);
export const controls2  = new TrackballControls(camera, renderer.domElement);


controls.mouseButtons = {LEFT: 2, MIDDLE: 1, RIGHT: 0};
controls.enableDamping = true;
controls.dampingFactor = 0.2;
controls.enableZoom = false;
controls.enableRotate = false;

controls2.noRotate = true;
controls2.noPan = true;
controls2.noZoom = false;
controls.zoomSpeed = 1
controls2.maxDistance = 30
controls2.minDistance = 10
controls2.dynamicDampingFactor = 0.8

camera.position.z = 5;
camera.position.y = 20


