import { useState, useEffect } from 'react'
import { useGLTF, Float } from "@react-three/drei"
import { GLTF } from 'three-stdlib'
import { useTransform, MotionValue } from 'framer-motion';
import { motion as m } from 'framer-motion-3d';

type GLTFResult = GLTF & {
  nodes: {
    Sphere001: THREE.Mesh
    Sphere002: THREE.Mesh
    Cylinder002: THREE.Mesh
    Sphere003: THREE.Mesh
    Cylinder003: THREE.Mesh
    Cylinder005: THREE.Mesh
    Cube002: THREE.Mesh
    Cylinder006: THREE.Mesh
    Cylinder007: THREE.Mesh
    Cylinder009: THREE.Mesh
    Sphere: THREE.Mesh
  }
}

type ContextType = Record<string, React.ForwardRefExoticComponent<JSX.IntrinsicElements['mesh']>>
type ModelProps = {
  mouse: {
    x: MotionValue,
    y: MotionValue
  }
}
type MeshProps = {
  node: any,
  multiplier: number,
  mouse: {
    x: MotionValue,
    y: MotionValue
  },
  isActive: boolean
}

const Model = ({ mouse }: ModelProps) => {
  const [activeShape, setActiveShape] = useState(1);
  const { nodes } = useGLTF('/medias/floating_shapes.glb')  as GLTFResult

  useEffect( () => {
    setTimeout( () => {
      if(activeShape == 11){
        setActiveShape(1)
      }
      else{
        setActiveShape(activeShape + 1)
      }
    }, 2000)
  }, [activeShape])
  return (
    <Float>
      <group>
      <Mesh node={nodes.Sphere001} multiplier={2.4} mouse={mouse} isActive={activeShape == 1}/>
      <Mesh node={nodes.Sphere002} multiplier={2.4} mouse={mouse} isActive={activeShape == 2}/>
      {/* <Mesh node={nodes.Cylinder002} multiplier={1.2} mouse={mouse} isActive={activeShape == 3}/> */}
      <Mesh node={nodes.Sphere003} multiplier={1} mouse={mouse} isActive={activeShape == 4}/>
      <Mesh node={nodes.Cylinder003} multiplier={1.8} mouse={mouse} isActive={activeShape == 5}/>
      <Mesh node={nodes.Cylinder005} multiplier={1.8} mouse={mouse} isActive={activeShape == 6}/>
      <Mesh node={nodes.Cube002} multiplier={2} mouse={mouse} isActive={activeShape == 7}/>
      <Mesh node={nodes.Cylinder006} multiplier={1.2} mouse={mouse} isActive={activeShape == 8}/>
      <Mesh node={nodes.Cylinder007} multiplier={1.6} mouse={mouse} isActive={activeShape == 9}/>
      <Mesh node={nodes.Cylinder009} multiplier={1.8} mouse={mouse} isActive={activeShape == 10}/>
      <Mesh node={nodes.Sphere} multiplier={1.5} mouse={mouse} isActive={activeShape == 11}/>
      </group>
    </Float>
  )
}

const Mesh = ({ node, multiplier, mouse, isActive }: MeshProps) => {
  const { geometry, material, position, scale, rotation } = node;
  const a = multiplier / 2;
  const rotationX = useTransform(mouse.x, [0,1], [rotation.x - a, rotation.x + a]);
  const rotationY = useTransform(mouse.y, [0,1], [rotation.y - a, rotation.y + a]);
  const positionX = useTransform(mouse.x, [0,1], [position.x - multiplier * 2, position.x + multiplier * 2]);
  const positionY = useTransform(mouse.y, [0,1], [position.y + multiplier * 2, position.y - multiplier * 2]);

  const getRandomMultiplier = () => {
    return Math.floor(Math.random() * 2) * (Math.round(Math.random()) ? 1 : -1)
  }

  return (
    <Float>
      <m.mesh
        castShadow={true}
        receiveShadow={true}
        geometry={geometry}
        material={material}
        position={position}
        rotation={rotation}
        scale={scale}
        rotation-y={rotationX}
        rotation-x={rotationY}
        position-x={positionX}
        position-y={positionY}
        animate={{rotateZ: isActive ? rotation.z + getRandomMultiplier() : null}}
        transition={{type: "spring", stiffness: 75, damping: 100, mass: 3}}
      />
    </Float>
  )
}

useGLTF.preload('/medias/floating_shapes.glb')

export default Model