import { IDefaultMaterial } from "../types/DefaultObject";
import DefaultObject from "./common/DefaultObject";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import { Font } from "three/examples/jsm/loaders/FontLoader";

class Text3D extends DefaultObject {
  constructor(font: Font, material: IDefaultMaterial) {
    const geometry = new TextGeometry("Hello Three.js", {
      font,
      size: 0.5,
      height: 0.2,
      curveSegments: 12,
      bevelEnabled: true,
      bevelThickness: 0.03,
      bevelSize: 0.02,
      bevelOffset: 0,
      bevelSegments: 5,
    });
    geometry.center();
    super(geometry, material);
  }
}

export default Text3D;
