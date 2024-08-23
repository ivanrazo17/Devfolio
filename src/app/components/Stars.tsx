import { useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, Preload } from "@react-three/drei";
import * as random from "maath/random";
import * as THREE from "three";

// Define the type for the Stars props
interface StarsProps {
  // Define any specific props if needed, otherwise an empty interface
}

const Stars: React.FC<StarsProps> = (props) => {
  const ref = useRef<THREE.Points>(null);

  // Generate random positions for the stars within a sphere
  const sphere = random.inSphere(new Float64Array(5000), { radius: 1.2 });

  // Convert Float64Array to Float32Array
  const positions = new Float32Array(sphere);

  // Update the rotation of the stars in each frame
  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
    }
  });

  return (
    // Group to hold the stars with initial rotation
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={positions} stride={3} frustumCulled {...props}>
        {/* Material for the points */}
        <PointMaterial 
          transparent
          color="#f272c8"
          size={0.002}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
};

const StarCanvas: React.FC = () => {
  return (
    // Full-screen container for the canvas
    <div className="w-full h-full absolute inset-0 z-0">
      <Canvas camera={{ position: [0, 0, 1] }}>
        {/* Suspense fallback to handle loading state */}
        <Suspense fallback={null}>
          <Stars />
        </Suspense>
        {/* Preload all assets for a smoother experience */}
        <Preload all />
      </Canvas>
    </div>
  );
};

export default StarCanvas;
