import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'     

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 2000)
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg')
});

renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(window.innerWidth, window.innerHeight)
camera.position.setZ(40)

const earthTexture = new THREE.TextureLoader().load('https://github.com/alex-arango47/threejs-portfolio-01/blob/main/earth.jpg')

const earth = new THREE.Mesh(
  new THREE.SphereGeometry(4, 128, 128),
  new THREE.MeshStandardMaterial({
    map: earthTexture
  })
)

const moonTexture = new THREE.TextureLoader().load('https://raw.githubusercontent.com/alex-arango47/threejs-portfolio-01/main/moon.jpg')
const moonNormal = new THREE.TextureLoader().load('https://github.com/alex-arango47/threejs-portfolio-01/blob/main/moonnormal.jpg')

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(1, 128, 128),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
    normalMap: moonNormal
  }),
)

scene.add(moon)
scene.add(earth)  

const ambientLight = new THREE.AmbientLight(0xffffff, 2)
const directionalLight = new THREE.DirectionalLight(0xffffff, 2)

directionalLight.scale.set(10,10,10)
directionalLight.position.set(0,0,30)

//const lightHelper = new THREE.DirectionalLightHelper(directionalLight, 1)
//const gridHelper = new THREE.GridHelper(200, 50)

scene.add(ambientLight, directionalLight)
//scene.add(lightHelper)
//scene.add(gridHelper)

const controls = new OrbitControls(camera, renderer.domElement)

const addStar = () => {
  const geometry = new THREE.SphereGeometry(0.05, 24, 24)
  const material = new THREE.MeshStandardMaterial({color: 0xffffff})
  const star = new THREE.Mesh(geometry, material)

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(150))

  star.position.set(x*1.2, y*1.2, z*1.2)
  scene.add(star)
}

Array(5000).fill().forEach(addStar)

//const spaceTexture = new THREE.TextureLoader().load('hdr.jpg')
scene.background = new THREE.Color( 0x05070d )

// Variables for orbiting
const orbitRadius = 10; // The distance from the origin
let angle = 0;         // The current angle in radians
const speed = -0.002;    // The speed of the orbit (in radians per frame)

// Set an initial rotation on the Z-axis
const initialRotationZ = 0; 
moon.rotation.z = initialRotationZ;


const animate = () => {
  requestAnimationFrame(animate)

  earth.rotation.y += -0.0004

  // Update moon's position to make it orbit around the origin
  angle += speed;
  moon.position.x = orbitRadius * Math.cos(angle);
  moon.position.z = orbitRadius * Math.sin(angle);

  // Make the moon always face the center of its orbit
  moon.lookAt(0, 0, 0);  // Assuming the center of the orbit is at the origin

  // Apply the initial rotation again after the lookAt method
  moon.rotation.z += initialRotationZ;

  controls.update()

  renderer.render(scene,camera)
}

animate()
