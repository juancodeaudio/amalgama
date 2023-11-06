'use client'

import { useEffect } from 'react'

import { useMotionValue, useSpring, MotionValue } from "framer-motion"
import { Canvas } from '@react-three/fiber'
import { Environment } from '@react-three/drei'
import Model from './model'

const FloatingShapes = () => {

  const mouse = {
    x: useMotionValue(0),
    y: useMotionValue(0)
  }

  const smoothMouse: {x: MotionValue, y: MotionValue} = {
    x: useSpring(mouse.x, {stiffness: 75, damping: 100, mass: 3}),
    y: useSpring(mouse.y, {stiffness: 75, damping: 100, mass: 3})
  }

  const manageMouse = (e: MouseEvent) => {
    const { innerWidth, innerHeight } = window;
    const { clientX, clientY } = e;
    const x = clientX / innerWidth
    const y = clientY / innerHeight
    mouse.x.set(x);
    mouse.y.set(y);
  }

  useEffect( () => {
    window.addEventListener("mousemove", manageMouse)
    return () => window.removeEventListener("mousemove", manageMouse)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Canvas orthographic camera={{position: [0, 0, 200], zoom: 5}}>
      <Model mouse={smoothMouse}/>
      <Environment preset="studio"/>
    </Canvas>
  )
}

export default FloatingShapes