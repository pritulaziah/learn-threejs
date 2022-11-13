import { useEffect, useRef } from "react";
import Canvas from "../components/Canvas";
import Text3DCanvas from "../classes/Text3DCanvas";
import * as THREE from "three";
import DefaultObject3D from "../classes/common/DefaultObject3D";

class Cube extends DefaultObject3D {
  constructor() {
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial();
    super(geometry, material);
  }

  draw() {}

  update(delta: number) {}
}

const Text3D = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current == null) return;
    const canvas = new Text3DCanvas(canvasRef.current, [new Cube()]);
    canvas.init();
  }, []);

  return <Canvas ref={canvasRef} />;
};

export default Text3D;
