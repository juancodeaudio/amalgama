'use client'

import { Canvas } from '@react-three/fiber'

const Box = () => (
  <mesh rotation={[90, 0, 20]}>
    <ambientLight intensity={0.5} />
    <directionalLight position={[-2, 5, 2]} />
    <boxGeometry attach="geometry" args={[2, 2, 2]} />
    <coneGeometry attach="geometry"/>
    <meshLambertMaterial attach="material" color="#93c5fd" />
  </mesh>
)

const Shapes = () => {
  return (
    <Canvas className='w-full h-full'>
      <Box />
    </Canvas>
  )
}

export default Shapes