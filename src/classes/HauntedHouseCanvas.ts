import DefaultCanvas from "./common/DefaultCanvas";
import * as THREE from "three";

class HauntedHouseCanvas extends DefaultCanvas {
  static fogColor = "#262837";

  constructor(canvas: HTMLCanvasElement) {
    super(canvas);
    this.scene.fog = new THREE.Fog(HauntedHouseCanvas.fogColor, 1, 15);
  }

  run() {
    this.renderer.setClearColor(HauntedHouseCanvas.fogColor);
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    super.run();
  }
}

export default HauntedHouseCanvas;
