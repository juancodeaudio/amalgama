'use client'

import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { motion as m3d } from 'framer-motion-3d'
import { useScroll, useTransform, MotionValue } from 'framer-motion'

type ShapeProps = {
  progress?: MotionValue
  progress2?: MotionValue
  progress3?: MotionValue
}

const Box = ({progress, progress2, progress3}: ShapeProps) => (
  <m3d.mesh initial={{ scale: 0, opacity: 0}} whileHover={{scale: 1.2}} animate={{scale: 1, opacity: 1, transition: { delay: 0, type: 'spring'}}} rotation={[90, 0, 20]} position={[0,-1,0]}>
    <boxGeometry attach="geometry" args={[2, 2, 2]} />
    <meshPhongMaterial color="#93e8ff" specular="#61dafb" shininess={10} />
    <OrbitControls autoRotate enableZoom={false} enableRotate={false} enablePan={false}/>
  </m3d.mesh>
)

const Cone = ({progress, progress2, progress3}: ShapeProps) => (
  <m3d.mesh initial={{ scale: 0, opacity: 0}}whileHover={{scale: 1.1}} animate={{scale: 1, opacity: 1, transition: { delay: 0.1, type: 'spring'}}} rotation={[90, 0, 20]} position={[1.5,1,1]}>
    <coneGeometry />
    <meshPhongMaterial color="#ff96ed" specular="#61dafb" shininess={10} />
  </m3d.mesh>
)

const Sphere = ({progress, progress2, progress3}: ShapeProps) => (
  <m3d.mesh initial={{ scale: 0, opacity: 0}} whileHover={{scale: 1.3}} animate={{scale: 1, opacity: 1, transition: { delay: 0.2, type: 'spring'}}} rotation={[90, 0, 20]} position={[-1.5,1,-1.5]}>
    <sphereGeometry />
    <meshPhongMaterial color="#ff96ed" specular="#61dafb" shininess={10} />
  </m3d.mesh>
)

const Shapes = () => {
  const { scrollYProgress } = useScroll()
  const progress = useTransform(scrollYProgress, [0,1], [0,1])
  const progress2 = useTransform(scrollYProgress, [0,1], [0,-1])
  const progress3 = useTransform(scrollYProgress, [0,1], [-0.5,-0.5])
  return (
    <Canvas className='w-full h-full'>
      <ambientLight intensity={1} />
      <spotLight color="#93e8ff" position={[-2, -2, -2]} intensity={5} />
      <spotLight color="#93e8ff" position={[-2, 0, 3]} intensity={3} />
      <spotLight color="#93e8ff" position={[-1, 4, 1]} intensity={2} />
      <spotLight color="#ff96ed" position={[3, 2, -1]} intensity={6} />
      <spotLight color="#ff96ed" position={[3, 2, 1]} intensity={3} />
      <spotLight color="#ba65ff" position={[1, -3, 1]} intensity={0.8} />
      <Box progress={progress} progress2={progress2} progress3={progress3} />
      <Cone progress={progress} />
      <Sphere progress={progress} />
    </Canvas>
  )
}

export default Shapes