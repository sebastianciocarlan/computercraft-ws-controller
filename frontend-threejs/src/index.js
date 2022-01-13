import { initializeScene, addCube } from "./enginecontroller";
let engine = initializeScene();
addCube(engine.scene, 0, 0, 0, 0xff00ff)
animate()





function animate() {
    requestAnimationFrame(animate);
    engine.renderer.render(engine.scene, engine.camera);
}