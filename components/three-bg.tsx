"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function ThreeBg({ className = "" }: { className?: string }) {
  const mountRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;
    const isMobile =
      typeof window !== "undefined" &&
      (window.matchMedia?.("(max-width: 640px)").matches || window.matchMedia?.("(pointer: coarse)").matches);
    const prefersReduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const width = mount.clientWidth || 600;
    const height = mount.clientHeight || 600;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(55, width / height, 0.1, 100);
    camera.position.set(0, 0, 6);

  const renderer = new THREE.WebGLRenderer({ antialias: !isMobile, alpha: true });
    renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, isMobile ? 1 : 2));
    mount.appendChild(renderer.domElement);

    // Responsive
    const onResize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    const ro = new ResizeObserver(onResize);
    ro.observe(mount);

    // Subtle gradient background plane with shader-like effect
    const geometry = new THREE.IcosahedronGeometry(2.2, 1);
    const material = new THREE.MeshStandardMaterial({
      color: new THREE.Color(0x6ea8fe),
      metalness: 0.2,
      roughness: 0.7,
      transparent: true,
      opacity: 0.25,
    });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Lights
    const ambient = new THREE.AmbientLight(0xffffff, 0.6);
    const dir = new THREE.DirectionalLight(0x88aaff, 0.6);
    dir.position.set(3, 5, 4);
    const rim = new THREE.PointLight(0xff7bd5, 0.6);
    rim.position.set(-3, -4, -2);
    scene.add(ambient, dir, rim);

    // Animation
    const clock = new THREE.Clock();
    const animate = () => {
      const t = clock.getElapsedTime();
      mesh.rotation.x = t * (isMobile ? 0.08 : 0.12);
      mesh.rotation.y = t * (isMobile ? 0.12 : 0.18);
      const s = 1 + Math.sin(t * 0.6) * (isMobile ? 0.02 : 0.03);
      mesh.scale.set(s, s, s);
      renderer.render(scene, camera);
      frameRef.current = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
      ro.disconnect();
      mount.removeChild(renderer.domElement);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
    };
  }, []);

  return <div ref={mountRef} className={className} />;
}
