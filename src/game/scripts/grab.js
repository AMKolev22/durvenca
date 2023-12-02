export const grab = document.querySelector('#game')

export function grabHandler(){
    grab.style.cursor = "grabbing";
}

export function grabDown(){
    grab.style.cursor = "grab";
}

grab.addEventListener('mousedown', grabHandler)
grab.addEventListener('mouseup', grabDown)
