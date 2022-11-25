import DefaultCanvas from "classes/common/DefaultCanvas";
import * as THREE from "three";
import { ILights } from "types/lights";
import * as dat from "dat.gui";

type OptionLight = {
  instance: typeof THREE.Light;
  gui: (light: ILights) => void;
};

class LightsCanvas extends DefaultCanvas {
  createDebug() {
    const addPosition = (folder: dat.GUI, light: ILights) => {
      folder.add(light.position, "x", -5, 5, 0.25);
      folder.add(light.position, "y", -5, 5, 0.25);
      folder.add(light.position, "z", -5, 5, 0.25);
    };

    const optionLights = [
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
      {
        instance: THREE.SpotLight,
        gui: (light) => {
          const folder = this.gui.addFolder("SpotLight");
          folder.add(light, "intensity", 0, 1, 0.15);
          folder.add(light, "angle", 0, Math.PI, 0.025);
          folder.add(light, "penumbra", 0, 1, 0.1);
          addPosition(folder, light);
        },
      },
    ] as OptionLight[];

    for (const optionLight of optionLights) {
      const targetLight = this.lights.find(
        (light) => light instanceof optionLight.instance
      );

      if (targetLight) {
        optionLight.gui(targetLight);
      }
    }
  }
}

export default LightsCanvas;
