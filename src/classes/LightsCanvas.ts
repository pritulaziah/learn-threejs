import DefaultCanvas from "classes/common/DefaultCanvas";
import * as THREE from "three";

class LightsCanvas extends DefaultCanvas {
  constructor(canvas: HTMLCanvasElement) {
    super(canvas);
  }

  static lightsCollection = {
    AmbientLight: THREE.AmbientLight,
    PointLight: THREE.PointLight,
  };

  createDebugLights() {
    for (const [lightName, lightInstance] of Object.entries(
      LightsCanvas.lightsCollection
    )) {
      const targetLight = this.lights.find(
        (light) => light instanceof lightInstance
      );

      if (targetLight) {
        this.gui
          .addFolder(lightName)
          .add(targetLight, "intensity", 0, 1, 0.001);
      }
    }
  }

  createDebug() {
    if (this.lights.length > 0) {
      this.createDebugLights();
    }
  }
}

export default LightsCanvas;
