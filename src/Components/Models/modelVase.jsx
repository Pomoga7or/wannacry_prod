import { useGLTF } from '@react-three/drei'

export default function Model(props) {
  const { nodes, materials } = useGLTF('/models/modelVase.glb')
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.Mesh10.geometry} material={nodes.Mesh10.material} />
    </group>
  )
}

useGLTF.preload('/models/modelVase.glb')
