import DefaultCanvas from "classes/common/DefaultCanvas";

class LightsCanvas extends DefaultCanvas {
  constructor(canvas: HTMLCanvasElement) {
    super(canvas);
  }

  createDebug() {
    if (this.lights.length > 0) {
      const folderLight = this.gui.addFolder("Light");
      folderLight.add(this.lights[0], "intensity", 0, 1, 0.001);
      folderLight.open();
    }
  }
}

export default LightsCanvas;
