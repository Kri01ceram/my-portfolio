"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { useTheme } from "next-themes";

type Props = { className?: string };

export default function Global3DBackground({ className = "" }: Props) {
  const mountRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const { resolvedTheme } = useTheme();

  // Store refs to allow theme updates without recreating scene
  const sceneRef = useRef<THREE.Scene | null>(null);
  const lightsRef = useRef<{ ambient: THREE.AmbientLight; dir: THREE.DirectionalLight; rim: THREE.PointLight } | null>(null);
  const materialsRef = useRef<THREE.MeshStandardMaterial[]>([]);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const prefersReduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(dpr);
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    sceneRef.current = scene;

  const camera = new THREE.PerspectiveCamera(55, mount.clientWidth / mount.clientHeight, 0.1, 100);
  camera.position.set(0, 0, 8.5);

    // Lights
  const ambient = new THREE.AmbientLight(0xffffff, 0.7);
  const dir = new THREE.DirectionalLight(0x88aaff, 0.6);
    dir.position.set(3, 5, 6);
  const rim = new THREE.PointLight(0xff7bd5, 0.6);
    rim.position.set(-4, -3, -2);
    lightsRef.current = { ambient, dir, rim };
    scene.add(ambient, dir, rim);

    // Bubbles (transparent spheres) with varying sizes/positions
  const bubbles: THREE.Mesh[] = [];
    const materials: THREE.MeshStandardMaterial[] = [];
    const colorsLight = [0x60a5fa, 0x34d399, 0xf472b6, 0xf59e0b]; // blue, green, pink, amber
    const colorsDark = [0x3b82f6, 0x22c55e, 0xec4899, 0xf59e0b];
    const colorSet = resolvedTheme === "dark" ? colorsDark : colorsLight;

    const rand = (min: number, max: number) => Math.random() * (max - min) + min;
    const count = 12;
    for (let i = 0; i < count; i++) {
      const geo = new THREE.SphereGeometry(rand(1.0, 2.2), 32, 32);
      const mat = new THREE.MeshStandardMaterial({
        color: new THREE.Color(colorSet[i % colorSet.length]),
        metalness: 0.15,
        roughness: 0.55,
        transparent: true,
        opacity: 0.26,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      });
      materials.push(mat);
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(rand(-4.5, 4.5), rand(-3.5, 3.5), rand(-2.2, 2.2));
      mesh.userData = {
        speedX: rand(0.03, 0.06) * (Math.random() > 0.5 ? 1 : -1),
        speedY: rand(0.02, 0.05) * (Math.random() > 0.5 ? 1 : -1),
        phase: Math.random() * Math.PI * 2,
      };
      bubbles.push(mesh);
      scene.add(mesh);
    }
    // Mouse parallax
    const target = { x: 0, y: 0 };
    const onMouseMove = (e: MouseEvent) => {
      const w = window.innerWidth || 1;
      const h = window.innerHeight || 1;
      const nx = e.clientX / w - 0.5;
      const ny = e.clientY / h - 0.5;
      target.x = nx * 0.9; // horizontal influence
      target.y = -ny * 0.6; // vertical influence
    };
    window.addEventListener("mousemove", onMouseMove);

    materialsRef.current = materials;

    // Resize handling
    const onResize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    const ro = new ResizeObserver(onResize);
    ro.observe(mount);

    // Animation
    const clock = new THREE.Clock();
    const animate = () => {
      const t = clock.getElapsedTime();
      for (const b of bubbles) {
        const { speedX, speedY, phase } = b.userData as { speedX: number; speedY: number; phase: number };
        if (!prefersReduced) {
          b.position.x += Math.sin(t * speedX + phase) * 0.007;
          b.position.y += Math.cos(t * speedY + phase) * 0.005;
          b.rotation.x += 0.0015;
          b.rotation.y += 0.0012;
        }
      }
      if (!prefersReduced) {
        camera.position.x += (target.x - camera.position.x) * 0.05;
        camera.position.y += (target.y - camera.position.y) * 0.05;
        camera.lookAt(0, 0, 0);
      }
      renderer.render(scene, camera);
      rafRef.current = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      ro.disconnect();
      window.removeEventListener("mousemove", onMouseMove);
      mount.removeChild(renderer.domElement);
      renderer.dispose();
      // cleanup
      bubbles.forEach((m) => {
        (m.geometry as THREE.BufferGeometry).dispose();
        (m.material as THREE.Material).dispose();
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Adapt colors/intensity on theme change
  useEffect(() => {
    const mats = materialsRef.current;
    const lights = lightsRef.current;
    if (!mats || !lights) return;
    const colorsLight = [0x60a5fa, 0x34d399, 0xf472b6, 0xf59e0b];
    const colorsDark = [0x3b82f6, 0x22c55e, 0xec4899, 0xf59e0b];
    const set = resolvedTheme === "dark" ? colorsDark : colorsLight;
    mats.forEach((m, i) => {
      m.color.setHex(set[i % set.length]);
      m.opacity = resolvedTheme === "dark" ? 0.22 : 0.26;
      m.needsUpdate = true;
    });
    lights.ambient.intensity = resolvedTheme === "dark" ? 0.55 : 0.7;
    lights.dir.intensity = resolvedTheme === "dark" ? 0.45 : 0.6;
    lights.rim.intensity = resolvedTheme === "dark" ? 0.45 : 0.6;
  }, [resolvedTheme]);

  return <div ref={mountRef} className={className} />;
}
