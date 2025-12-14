import { useGLTF } from '@react-three/drei'

export function Model(props) {
  const { nodes, materials } = useGLTF('/donald-duck.glb')
  return (
    <group {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <group position={[0.007, 0.2, 0.763]} rotation={[1.843, -0.007, 0.002]} scale={[0.112, 0.12, 0.12]}>
          <mesh geometry={nodes.Plane019_0.geometry} material={materials.bleu} />
          <mesh geometry={nodes.Plane019_1.geometry} material={materials.jaune} />
        </group>
        <group position={[0.007, 0.2, 0.763]} rotation={[0.272, -0.002, 3.135]} scale={0.865}>
          <mesh geometry={nodes.Plane020_0.geometry} material={materials.bleu} />
          <mesh geometry={nodes.Plane020_1.geometry} material={materials.jaune} />
        </group>
        <group position={[0.02, -0.123, 1.73]} rotation={[0.244, 0.056, -2.592]} scale={[0.024, 0.022, 0.021]}>
          <mesh geometry={nodes.Circle007_0.geometry} material={materials.bleu} />
          <mesh geometry={nodes.Circle007_1.geometry} material={materials.noir} />
        </group>
        <group position={[0.005, -0.082, 1.6]} rotation={[1.86, -0.007, -3.14]} scale={0.081}>
          <mesh geometry={nodes.Circle008_0.geometry} material={materials.noir} />
          <mesh geometry={nodes.Circle008_1.geometry} material={materials.oeil} />
        </group>
        <group position={[0.005, -0.072, 1.596]} rotation={[0.29, -0.002, 3.135]} scale={0.865}>
          <mesh geometry={nodes.Plane022_0.geometry} material={materials.orange} />
          <mesh geometry={nodes.Plane022_1.geometry} material={materials.orange_fonc} />
        </group>
        <mesh geometry={nodes.Circle006_0.geometry} material={materials.blanc} position={[0.007, 0.202, 0.756]} rotation={[0.273, -0.002, 3.135]} scale={0.008} />
        <mesh geometry={nodes.Plane016_0.geometry} material={materials.blanc} position={[-0.102, -0.043, 1.675]} rotation={[0.265, -0.062, 2.917]} scale={0.865} />
        <mesh geometry={nodes.Plane017_0.geometry} material={materials.orange} position={[0, -0.048, 1.622]} rotation={[0.272, 0, 0]} scale={0.897} />
        <mesh geometry={nodes.Plane018_0.geometry} material={materials.blanc} position={[-0.082, -0.039, 1.675]} rotation={[0.267, -0.055, 2.943]} scale={0.865} />
        <mesh geometry={nodes.Cube003_0.geometry} material={materials.rouge} position={[0.06, -0.137, 0.99]} rotation={[0.215, 0.04, -2.874]} scale={0.865} />
        <mesh geometry={nodes.Plane021_0.geometry} material={materials.noir} position={[-0.002, -0.106, 1.725]} rotation={[1.648, -1.106, -2.25]} scale={0.865} />
        <mesh geometry={nodes.Plane023_0.geometry} material={materials.blanc} position={[0.005, -0.176, 1.565]} rotation={[0.597, -0.002, 3.135]} scale={0.865} />
        <mesh geometry={nodes.Plane_0.geometry} material={materials.blanc} position={[0.125, -0.176, 1.515]} rotation={[Math.PI / 2, 0, 0]} scale={1.066} />
      </group>
    </group>
  )
}

useGLTF.preload('/models/donald-duck.glb')
