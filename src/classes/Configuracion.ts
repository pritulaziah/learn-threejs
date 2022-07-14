import * as THREE from "three";
import DoorColorImagePath from "../static/textures/door/color.jpg";

class Configuration {
  color: string;
  colorTexture: THREE.Texture;

  constructor(opts?: { color?: string }) {
    opts || (opts = {});
    this.color = opts.color || "#ff0000";
    const textureLoader = new THREE.TextureLoader();
    this.colorTexture = textureLoader.load(DoorColorImagePath);
    this.colorTexture.center.x = 0.5;
    this.colorTexture.center.y = 0.5;
  }
}

export default Configuration;
