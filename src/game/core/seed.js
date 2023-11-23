import { Random } from "random-js";


export function generateSeed(){
    const seed = new Random().integer(10000000, 99999999);
    return seed;
}
export function outOfBoundaries({trees, factories}){
    if (factories > 250) {
        factories = 250
    }
    
    if (trees > 400) {
        trees = 400
    }
}

export function treeCount(seed){
    seed = seed.toString();
    let trees = seed.substring(0, 3);
    return trees;
}

export function factoryCount(seed){
    seed = seed.toString();
    let factories = seed.substring(3, 6);
    return factories;
}


