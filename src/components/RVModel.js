import React from 'react';
import { Canvas } from '@react-three/fiber';
import { useGLTF, OrbitControls, Stage, Environment } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';

const Model = ({ url }) => {
  const { scene } = useGLTF(url);
  return <primitive object={scene} />;
};

export default function RVModel() {
  return (
    <div className="bg-transparent h-fit w-full p-4 rounded-lg shadow-lg  col-span-3">
      <h2 className="text-2xl font-semibold mb-4 text-white">3D Model</h2>

      {/* React Three Fiber Canvas for the 3D model */}
      <Canvas
        style={{ height: '350px', width: '100%' }}
        shadows
        camera={{ position: [0, 0, 5], fov: 50 }}
      >
        <Environment preset="studio" />
        <Stage adjustCamera intensity={1}>
          <Model url="/model/model.glb" />
        </Stage>
        <OrbitControls 
          enableDamping={true} 
          dampingFactor={0.1}
          minPolarAngle={0}
          maxPolarAngle={Math.PI}
          enablePan={false}
        />
        <EffectComposer>
          <Bloom 
            luminanceThreshold={0} 
            luminanceSmoothing={0.9} 
            height={300} 
            opacity={1} 
          />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
