import Canvas from "components/Canvas";
import useCanvas from "hooks/useCanvas";
import LearnPhysicsCanvas from "classes/LearnPhysics/LearnPhysicsCanvas";

const initCanvas = (canvasElement: HTMLCanvasElement) => new LearnPhysicsCanvas(canvasElement);

const LearnPhysicsPage = () => {
  const canvasRef = useCanvas(initCanvas);

  return <Canvas ref={canvasRef} />;
};

export default LearnPhysicsPage;
