import { useGLTF } from '@react-three/drei'


export default function Model(props) {
  const { nodes, materials } = useGLTF('models/logo.glb')
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.Mesh10.geometry} material={materials['Material.001']} rotation={[Math.PI / 2, 0, 0]} scale={[1, 0.435, 1]} />
    </group>
  )
}

useGLTF.preload('models/logo.glb')