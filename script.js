// Үндсэн тохиргоо
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Гэрэлтүүлэг нэмэх
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);  // Энгийн гэрэлтүүлэг
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 1);
pointLight.position.set(10, 20, 10);
scene.add(pointLight);

// ДНХ гинж үүсгэх функц
const createDNA = () => {
  const group = new THREE.Group();
  const helixRadius = 2; // Гадна радиус
  const helixHeight = 0.5; // Давхаргын өндөр
  const segmentCount = 100; // Нийт сегментүүдийн тоо

  const colors = [
    '#ff5959', '#f9a8d4', '#5f96ff', '#79d45f', '#ffd700', '#6a5acd', '#ff6347', '#32cd32', '#00bfff', '#ff4500'
  ];

  for (let i = 0; i < segmentCount; i++) {
    const angle = (i / segmentCount) * Math.PI * 2 * 10; // Спиральын өнцөг
    const y = i * helixHeight;

    // Бөмбөлөгүүд үүсгэх
    const sphereGeometry = new THREE.SphereGeometry(0.3, 32, 32);
    const material = new THREE.MeshStandardMaterial({ color: colors[i % colors.length], metalness: 0.6, roughness: 0.5 });

    const sphere1 = new THREE.Mesh(sphereGeometry, material);
    const sphere2 = new THREE.Mesh(sphereGeometry, material);

    const x1 = Math.cos(angle) * helixRadius;
    const z1 = Math.sin(angle) * helixRadius;
    sphere1.position.set(x1, y, z1);

    const x2 = Math.cos(angle + Math.PI) * helixRadius;
    const z2 = Math.sin(angle + Math.PI) * helixRadius;
    sphere2.position.set(x2, y, z2);

    group.add(sphere1);
    group.add(sphere2);

    // Холбох саваанууд
    const cylinderGeometry = new THREE.CylinderGeometry(0.05, 0.05, helixRadius * 2, 32);
    const cylinderMaterial = new THREE.MeshStandardMaterial({ color: '#ffffff', metalness: 0.7, roughness: 0.5 });
    const cylinder = new THREE.Mesh(cylinderGeometry, cylinderMaterial);

    cylinder.position.set((x1 + x2) / 2, y, (z1 + z2) / 2);
    cylinder.lookAt(new THREE.Vector3(x1, y, z1));
    group.add(cylinder);
  }

  return group;
};

// ДНХ-г сценд нэмэх
const dna = createDNA();
scene.add(dna);

camera.position.z = 30;

// Анимаци
const animate = () => {
  requestAnimationFrame(animate);

  // Эргэлтийн хурд нэмэх
  dna.rotation.y += 0.005; // Эргэлтийн хурд удаан байна
  dna.rotation.x += 0.002;

  renderer.render(scene, camera);
};

animate();
