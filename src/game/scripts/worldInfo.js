import { Random } from "random-js";

const seed = new Random().integer(10000000, 44444444);
const numElement = document.getElementById('num');

export const seedInfo = {
    trees: 0,
    factories: 0
}

const MAX_TREES = 15;
const MAX_FACTORIES = 10; 

function boundaryCheckAndSet(seedInfo){
    if (seedInfo.trees > 15){
        seedInfo.trees = MAX_TREES;
    }
    if (seedInfo.factories > 10){
        seedInfo.factories = MAX_FACTORIES
    }
}

function treeCount(seed){
    seed = seed.toString();
    let trees = seed.substring(0, 2);
    trees = Number(trees)
    return trees;
}

function factoryCount(seed){
    seed = seed.toString();
    let factories = seed.substring(2, 4);
    factories = Number(factories)
    return factories;
}

seedInfo.trees = treeCount(seed)
seedInfo.factories = factoryCount(seed);
boundaryCheckAndSet(seedInfo);

numElement.innerHTML = seed;