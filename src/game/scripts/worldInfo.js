import { Random } from "random-js";

const seed = new Random().integer(10000000, 99999999);
const numElement = document.getElementById('num');

export const seedInfo = {
    trees: 0,
    factories: 0
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

numElement.innerHTML = seed;