import * as THREE from 'three';
import { renderer } from './renderer';
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls"




export const camera = new THREE.PerspectiveCamera( 45, 1, 0.1, 1000 );
export const controls = new OrbitControls( camera, renderer.domElement );

camera.position.set( 0, 0, 100 );
controls.maxDistance = 250;
controls.dampingFactor = 1;
controls.enableDamping = true;
controls.enableRotate = false;
controls.minDistance = 50;
