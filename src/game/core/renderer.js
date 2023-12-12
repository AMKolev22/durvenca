import { WebGLRenderer } from "three";


export const renderer = new WebGLRenderer({antialias: false});
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setPixelRatio(window.devicePixelRatio)
