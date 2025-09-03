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
  // Vibrant palettes
  const colorsLight = [0x22d3ee, 0xa78bfa, 0xfb7185, 0xf59e0b, 0x4ade80]; // cyan-400, violet-400, rose-400, amber-500, green-400
  const colorsDark = [0x06b6d4, 0x8b5cf6, 0xf43f5e, 0xf59e0b, 0x22c55e]; // cyan-500, violet-500, rose-500, amber-500, green-500
    const colorSet = resolvedTheme === "dark" ? colorsDark : colorsLight;

    const rand = (min: number, max: number) => Math.random() * (max - min) + min;
    const count = 10;
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
  // soft emissive glow for vibrancy
  mat.emissive = new THREE.Color(colorSet[i % colorSet.length]);
  mat.emissiveIntensity = 0.25;
      materials.push(mat);
      const mesh = new THREE.Mesh(geo, mat);
      const baseX = rand(-4.0, 4.0);
      const baseY = rand(-3.0, 3.0);
      const baseZ = rand(-1.8, 1.8);
      const ampX = rand(0.4, 0.9);
      const ampY = rand(0.3, 0.8);
      mesh.position.set(baseX, baseY, baseZ);
      mesh.userData = {
        baseX,
        baseY,
        baseZ,
        ampX,
        ampY,
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
        const { baseX, baseY, ampX, ampY, speedX, speedY, phase } = b.userData as {
          baseX: number;
          baseY: number;
          ampX: number;
          ampY: number;
          speedX: number;
          speedY: number;
          phase: number;
        };
        if (!prefersReduced) {
          // Oscillate around base positions to keep within bounds
          b.position.x = baseX + Math.sin(t * speedX + phase) * ampX;
          b.position.y = baseY + Math.cos(t * speedY + phase) * ampY;
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
    const colorsLight = [0x22d3ee, 0xa78bfa, 0xfb7185, 0xf59e0b, 0x4ade80];
    const colorsDark = [0x06b6d4, 0x8b5cf6, 0xf43f5e, 0xf59e0b, 0x22c55e];
    const set = resolvedTheme === "dark" ? colorsDark : colorsLight;
    mats.forEach((m, i) => {
      m.color.setHex(set[i % set.length]);
      m.opacity = resolvedTheme === "dark" ? 0.22 : 0.28;
  if ((m as THREE.MeshStandardMaterial).emissive) (m as THREE.MeshStandardMaterial).emissive.setHex(set[i % set.length]);
  // slightly adjust glow by theme
  (m as THREE.MeshStandardMaterial).emissiveIntensity = resolvedTheme === "dark" ? 0.22 : 0.26;
      m.needsUpdate = true;
    });
    lights.ambient.intensity = resolvedTheme === "dark" ? 0.6 : 0.75;
    lights.dir.intensity = resolvedTheme === "dark" ? 0.5 : 0.65;
    lights.rim.intensity = resolvedTheme === "dark" ? 0.5 : 0.65;
  }, [resolvedTheme]);

  return <div ref={mountRef} className={className} />;
}
