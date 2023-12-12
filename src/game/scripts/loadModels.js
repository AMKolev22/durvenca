import { loader } from "../utils/vars";


export async function loadTree(modelPath) {
    return new Promise((resolve, reject) => {
        loader.load(modelPath, (gltf) => {
            const model = gltf.scene;
            model.scale.set(0.4, 0.4, 0.4);
            resolve(model);
        }, undefined, reject);
    });
}

export async function loadFactory(modelPath) {
    return new Promise((resolve, reject) => {
        loader.load(modelPath, (gltf) => {
            const model = gltf.scene;
            model.scale.set(0.05, 0.05, 0.05);
            resolve(model);
        }, undefined, reject);
    });
}

