import { Raycaster, Vector2 } from "three";
import { states } from "./states";
import { canvasGame } from "../utils/vars";

export const raycaster = new Raycaster();
export let mouseCords = new Vector2();

export function setCords(){
    if (states.move === true){
        mouseCords.x = 0;
        mouseCords.y = 0;
    }
    else{
           canvasGame.addEventListener('click', (event)=>{
            mouseCords.x = (event.clientX / (window.innerWidth / 2));
            mouseCords.y = -(event.clientY / window.innerHeight) * 2 + 1;
        })
    }
}