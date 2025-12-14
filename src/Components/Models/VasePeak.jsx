import { useGLTF } from '@react-three/drei'

export function Model(props) {
  const { nodes, materials } = useGLTF('/vasePeak.glb')
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.geometry_0.geometry} material={nodes.geometry_0.material} />
    </group>
  )
}

useGLTF.preload('/models/vasePeak.glb')
