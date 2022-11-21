import DefaultCanvas from "classes/common/DefaultCanvas";
import * as THREE from "three";
import { IDefaultLights } from "types/lights";

type OptionLight = {
  instance: typeof THREE.Light;
  gui: (light: IDefaultLights) => void;
};

class LightsCanvas extends DefaultCanvas {
  constructor(canvas: HTMLCanvasElement) {
    super(canvas);
  }

  createDebugLights() {
    const optionLights = <OptionLight[]>[
      {
        instance: THREE.AmbientLight,
        gui: (light) => {
          this.gui
            .addFolder("AmbientLight")
            .add(light, "intensity", 0, 1, 0.001);
        },
      },
      {
        instance: THREE.PointLight,
        gui: (light) => {
          this.gui.addFolder("PointLight").add(light, "intensity", 0, 1, 0.001);
        },
      },
      {
        instance: THREE.DirectionalLight,
        gui: (light) => {
          this.gui
            .addFolder("DirectionalLight")
            .add(light, "intensity", 0, 1, 0.001);
        },
      },
      {
        instance: THREE.HemisphereLight,
        gui: (light) => {
          this.gui
            .addFolder("HemisphereLight")
            .add(light, "intensity", 0, 1, 0.001);
        },
      },
      {
        instance: THREE.RectAreaLight,
        gui: (light) => {
          const folder = this.gui.addFolder("RectAreaLight");
          folder.add(light, "intensity", 0, 5, 0.25);
          folder.add(light, "width", 0, 4, 0.5);
          folder.add(light, "height", 0, 4, 0.5);
        },
      },
    ];

    for (const optionLight of optionLights) {
      const targetLight = this.lights.find(
        (light) => light instanceof optionLight.instance
      );

      if (targetLight) {
        optionLight.gui(targetLight);
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
