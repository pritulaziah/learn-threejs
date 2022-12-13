import DefaultCanvas from "./common/DefaultCanvas";

class ShadowsCanvas extends DefaultCanvas {
  run() {
    this.renderer.shadowMap.enabled = true;
    super.run();
  }
}

export default ShadowsCanvas;
