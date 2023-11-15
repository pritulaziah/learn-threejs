import Canvas from "components/Canvas";
import useCanvas from "hooks/useCanvas";
import LearnPhysicsCanvas from "classes/LearnPhysicsCanvas";

const initCanvas = (canvasElement: HTMLCanvasElement) => new LearnPhysicsCanvas(canvasElement);

const PhysicsPage = () => {
  const canvasRef = useCanvas(initCanvas);

  return <Canvas ref={canvasRef} />;
};

export default PhysicsPage;
