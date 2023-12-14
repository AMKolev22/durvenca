import { loader } from "../utils/vars";


const treePath = '../../../public/tree.glb';
export let models = {
    treeModel: null,
    factoryMode: null
}

loader.load(treePath, (gltf)=>{
    models.treeModel = gltf.scene;
    models.treeModel.scale.set(0.4, 0.4, 0.4);
})