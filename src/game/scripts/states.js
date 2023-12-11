import { controls } from '../core/camera';
import CameraControls from 'camera-controls';


export const states = {
    move: true,
    factory: false,
    tree: false,
}

const cursor = document.getElementById('btn-cursor');
const tree = document.getElementById('btn-tree');
const factory = document.getElementById('btn-factory');

cursor.addEventListener('click', () =>{
    states.move = true;
    states.factory = false;
    states.tree = false;

})

tree.addEventListener('click', () =>{
    states.move = false;
    states.tree = true;
    states.factory = false;

})

factory.addEventListener('click', () =>{
    states.move = false;
    states.tree = false;
    states.factory = true;

    console.log(states.factory)

})

// function buildFactory(){
//     controls.mouseButtons.left = CameraControls.ACTION.NONE; 
//     controls.mouseButtons.right = CameraControls.ACTION.NONE;
//     setCords();
//     console.log(mouseCords.x)
// }
//  function moveState(){
//     controls.mouseButtons.left = CameraControls.ACTION.TRUCK;
//     controls.mouseButtons.right = CameraControls.ACTION.TRUCK;
//     setCords();
// }