import React, { useState, useEffect, startTransition } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';

const RVModel = () => {
  // Load the GLTF model
  const { scene } = useGLTF(process.env.PUBLIC_URL + '/model.glb');
  const [loading, setLoading] = useState(true);

  // Load model with transition for smooth updates
  useEffect(() => {
    startTransition(() => {
      if (scene) {
        setLoading(false);
      }
    });
  }, [scene]);

  if (loading) {
    return <div>Loading model...</div>;
  }

  return (
    <Canvas style={{ height: '400px', width: '100%' }}>
      <ambientLight intensity={0.6} />
      <directionalLight intensity={1} position={[10, 10, 10]} />
      
      {/* Make model larger */}
      <primitive object={scene} scale={[4, 4, 4]} position={[0, -1, 0]} /> 

      {/* OrbitControls for zoom, pan, rotate */}
      <OrbitControls
        enableZoom={true}
        zoomSpeed={0.7} // Smooth zoom effect
        enablePan={true}
        enableRotate={true}
        minDistance={3} // Prevent over-zooming
        maxDistance={20} // Restrict zoom out
        maxPolarAngle={Math.PI / 2} // Restrict vertical rotation
      />
    </Canvas>
  );
};

// Preload the GLTF model
useGLTF.preload(process.env.PUBLIC_URL + '/model.glb');

export default RVModel;
