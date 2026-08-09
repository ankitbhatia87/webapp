import * as THREE from 'three';

interface ConstellationConfig {
  canvas: HTMLCanvasElement;
  particleCount?: number;
  maxDistance?: number;
}

interface Velocity {
  x: number;
  y: number;
  z: number;
}

export function initConstellationBackground(config: ConstellationConfig) {
  const { canvas, particleCount = 70, maxDistance = 11 } = config;

  // Check for reduced motion preference
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isDesktop = window.matchMedia('(min-width: 901px)').matches;

  if (reduce) {
    console.info('3D background: skipped — reduced-motion preference is on.');
    return null;
  }

  if (!isDesktop) {
    console.info('3D background: skipped — viewport under 901px, CSS orb background used instead.');
    return null;
  }

  if (typeof THREE === 'undefined') {
    console.warn('3D background: skipped — THREE failed to load.');
    return null;
  }

  let renderer: THREE.WebGLRenderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  } catch (e) {
    console.warn('3D background: WebGL unavailable in this browser.', e);
    return null;
  }

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    55,
    canvas.clientWidth / canvas.clientHeight,
    0.1,
    1000
  );
  camera.position.z = 34;

  // Setup renderer
  function sizeRenderer() {
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    renderer.setSize(w, h, false);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }
  sizeRenderer();

  // Create particles (nodes)
  const positions = new Float32Array(particleCount * 3);
  const velocities: Velocity[] = [];

  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 60;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 34;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 30;
    velocities.push({
      x: (Math.random() - 0.5) * 0.008,
      y: (Math.random() - 0.5) * 0.008,
      z: (Math.random() - 0.5) * 0.008,
    });
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  const pointsMat = new THREE.PointsMaterial({
    color: 0x5eead4,
    size: 0.55,
    transparent: true,
    opacity: 0.85,
  });
  const points = new THREE.Points(geo, pointsMat);
  scene.add(points);

  // Create connecting lines
  const lineGeo = new THREE.BufferGeometry();
  const lineMat = new THREE.LineBasicMaterial({
    color: 0x14b8a6,
    transparent: true,
    opacity: 0.18,
  });
  const lineMesh = new THREE.LineSegments(lineGeo, lineMat);
  scene.add(lineMesh);

  function updateLines() {
    const verts: number[] = [];
    for (let i = 0; i < particleCount; i++) {
      for (let j = i + 1; j < particleCount; j++) {
        const dx = positions[i * 3] - positions[j * 3];
        const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
        const dz = positions[i * 3 + 2] - positions[j * 3 + 2];
        const d = Math.sqrt(dx * dx + dy * dy + dz * dz);

        if (d < maxDistance) {
          verts.push(
            positions[i * 3],
            positions[i * 3 + 1],
            positions[i * 3 + 2],
            positions[j * 3],
            positions[j * 3 + 1],
            positions[j * 3 + 2]
          );
        }
      }
    }
    lineGeo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(verts), 3));
  }
  updateLines();

  // Mouse parallax tracking
  let mx = 0;
  let my = 0;
  function handleMouseMove(e: MouseEvent) {
    mx = (e.clientX / window.innerWidth - 0.5) * 2;
    my = (e.clientY / window.innerHeight - 0.5) * 2;
  }
  window.addEventListener('mousemove', handleMouseMove);

  // Animation loop
  let running = true;
  let frame = 0;

  function animate() {
    if (!running) return;
    requestAnimationFrame(animate);

    frame++;

    // Update particle positions
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] += velocities[i].x;
      positions[i * 3 + 1] += velocities[i].y;
      positions[i * 3 + 2] += velocities[i].z;

      // Bounce particles off boundaries
      if (Math.abs(positions[i * 3]) > 30) velocities[i].x *= -1;
      if (Math.abs(positions[i * 3 + 1]) > 17) velocities[i].y *= -1;
      if (Math.abs(positions[i * 3 + 2]) > 15) velocities[i].z *= -1;
    }

    geo.attributes.position.needsUpdate = true;

    // Throttle proximity check (O(n²) operation)
    if (frame % 3 === 0) updateLines();

    // Apply mouse parallax to camera
    camera.position.x += (mx * 4 - camera.position.x) * 0.02;
    camera.position.y += (-my * 2.5 - camera.position.y) * 0.02;
    camera.lookAt(scene.position);

    renderer.render(scene, camera);
  }

  animate();

  // Handle visibility changes (pause when tab is backgrounded)
  function handleVisibilityChange() {
    running = !document.hidden;
    if (running) animate();
  }
  document.addEventListener('visibilitychange', handleVisibilityChange);

  // Handle window resize
  function handleResize() {
    if (window.matchMedia('(max-width: 900px)').matches) {
      running = false;
      return;
    }
    sizeRenderer();
  }
  window.addEventListener('resize', handleResize);

  // Return cleanup function
  return {
    dispose: () => {
      running = false;
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      geo.dispose();
      pointsMat.dispose();
      lineGeo.dispose();
      lineMat.dispose();
    },
  };
}
