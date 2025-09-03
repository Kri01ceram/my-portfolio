"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { useTheme } from "next-themes";

type Props = { className?: string };
type BubbleData = { vx: number; vy: number; radius: number };

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

    const isMobile =
      typeof window !== "undefined" &&
      (window.matchMedia?.("(max-width: 640px)").matches || window.matchMedia?.("(pointer: coarse)").matches);
    const dpr = Math.min(window.devicePixelRatio || 1, isMobile ? 1.2 : 2);
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
  const count = isMobile ? 6 : 10;
  for (let i = 0; i < count; i++) {
      const radius = rand(1.0, 2.2);
      const geo = new THREE.SphereGeometry(radius, 32, 32);
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
      const startZ = rand(-1.8, 1.8);
      // Spawn across the full visible window at this depth
      const fov = THREE.MathUtils.degToRad(camera.fov);
      const dist = Math.max(0.1, camera.position.z - startZ);
      const halfH = Math.tan(fov / 2) * dist;
      const halfW = halfH * camera.aspect;
      mesh.position.set(
        rand(-halfW + radius, halfW - radius),
        rand(-halfH + radius, halfH - radius),
        startZ
      );
      // Velocity in world units per second (scaled by delta)
      const vx = (isMobile ? rand(0.3, 0.7) : rand(0.5, 1.2)) * (Math.random() > 0.5 ? 1 : -1);
      const vy = (isMobile ? rand(0.25, 0.6) : rand(0.4, 1.0)) * (Math.random() > 0.5 ? 1 : -1);
  mesh.userData = { vx, vy, radius } as BubbleData;
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
      const dt = clock.getDelta();
      for (const b of bubbles) {
        const data = b.userData as BubbleData;
        if (!prefersReduced) {
          // Compute viewport bounds at this bubble's depth
          const fov = THREE.MathUtils.degToRad(camera.fov);
          const dist = Math.max(0.1, camera.position.z - b.position.z);
          const halfH = Math.tan(fov / 2) * dist;
          const halfW = halfH * camera.aspect;
          const marginX = data.radius;
          const marginY = data.radius;

          // Update position with velocity
          b.position.x += data.vx * dt;
          b.position.y += data.vy * dt;

          // Wrap around edges for continuous roaming
          if (b.position.x > halfW + marginX) {
            b.position.x = -halfW - marginX;
          } else if (b.position.x < -halfW - marginX) {
            b.position.x = halfW + marginX;
          }
          if (b.position.y > halfH + marginY) {
            b.position.y = -halfH - marginY;
          } else if (b.position.y < -halfH - marginY) {
            b.position.y = halfH + marginY;
          }

          // Subtle rotation for life
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
    const start = () => {
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(animate);
    };
    const stop = () => {
      if (!rafRef.current) return;
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    };
    const onVisibility = () => {
      if (document.hidden) stop();
      else start();
    };
    document.addEventListener("visibilitychange", onVisibility);
    start();

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      ro.disconnect();
      window.removeEventListener("mousemove", onMouseMove);
  document.removeEventListener("visibilitychange", onVisibility);
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
