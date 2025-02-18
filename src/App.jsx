import { Canvas, useFrame } from '@react-three/fiber'
import './App.css'
import { DirectionalLight } from 'three'
import { useRef } from 'react'
import LabScene from './components/LabScene'

const Cube = () => {
  const ref = useRef();

  useFrame((state, delta) => {
    ref.current.rotation.x += delta
    ref.current.rotation.y += delta * 2.0
    ref.current.position.z = Math.sin(state.clock.elapsedTime) * 2;
    console.log('delta', state.clock.elapsedTime)

  })
  return (
    <mesh ref={ref} >
      <boxGeometry />
      <meshStandardMaterial color={"orange"} />
    </mesh>
  )
}
function App() {

  return (
    <>
      <LabScene/>
    </>
  )
}

export default App
