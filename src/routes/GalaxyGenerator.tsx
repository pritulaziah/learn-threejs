import Canvas from "components/Canvas";
import useCanvas from "hooks/useCanvas";
import GalaxyGeneratorCanvas from "classes/GalaxyGeneratorCanvas";

const initCanvas = (canvasElement: HTMLCanvasElement) => new GalaxyGeneratorCanvas(canvasElement);

const GalaxyGeneratorPage = () => {
  const canvasRef = useCanvas(initCanvas);

  return <Canvas ref={canvasRef} />;
};

export default GalaxyGeneratorPage;
