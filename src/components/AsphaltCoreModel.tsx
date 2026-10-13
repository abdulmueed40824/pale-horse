import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { Info, ArrowsClockwise, ShieldCheck } from "@phosphor-icons/react";

/*
 * ObjectSculptSpec: Pavement Strata Engineering Core Sample (Chip Seal & Paving Fabric Interlayer)
 * Class: assembly / mechanism / engineering model
 * Primitives: Procedural layers with distinct physical materials and aggregate particles
 * - Layer 1: Compacted Subgrade Soil / Native Base
 * - Layer 2: Fractured Class II Aggregate Base Rock
 * - Layer 3: Paving Fabric Non-Woven Geotextile Interlayer (Polypropylene with Tack saturation)
 * - Layer 4: Hot Polymer Asphalt Emulsion Seal (PMRE)
 * - Layer 5: Fractured Stone Aggregate Surface Chips (Instanced 3D chips)
 */

export const AsphaltCoreModel: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [activeLayer, setActiveLayer] = useState<string>("all");

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#090d16");

    const camera = new THREE.PerspectiveCamera(
      40,
      mount.clientWidth / mount.clientHeight,
      0.1,
      100
    );
    camera.position.set(3.2, 2.4, 3.8);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;

    mount.appendChild(renderer.domElement);

    // 2. Lighting Rig
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xfff0dd, 1.6);
    keyLight.position.set(5, 8, 4);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0x38bdf8, 0.4);
    fillLight.position.set(-4, 3, -3);
    scene.add(fillLight);

    const goldAccentLight = new THREE.PointLight(0xf59e0b, 1.2, 10);
    goldAccentLight.position.set(0, 3, 2);
    scene.add(goldAccentLight);

    // 3. Model Hierarchy Group
    const modelGroup = new THREE.Group();
    modelGroup.name = "PavementStrata";

    // Layer Dimensions
    const width = 2.4;
    const depth = 2.4;

    // Layer 1: Subgrade / Native Soil Base (Bottom)
    const subgradeGeo = new THREE.BoxGeometry(width, 0.45, depth);
    const subgradeMat = new THREE.MeshStandardMaterial({
      color: 0x4a3b32,
      roughness: 0.95,
      metalness: 0.05,
    });
    const subgradeMesh = new THREE.Mesh(subgradeGeo, subgradeMat);
    subgradeMesh.position.y = -0.6;
    subgradeMesh.receiveShadow = true;
    subgradeMesh.castShadow = true;
    subgradeMesh.name = "subgrade";
    modelGroup.add(subgradeMesh);

    // Layer 2: Compacted Crushed Aggregate Base (Class II)
    const baseGeo = new THREE.BoxGeometry(width, 0.4, depth);
    const baseMat = new THREE.MeshStandardMaterial({
      color: 0x78716c,
      roughness: 0.88,
      metalness: 0.1,
    });
    const baseMesh = new THREE.Mesh(baseGeo, baseMat);
    baseMesh.position.y = -0.15;
    baseMesh.receiveShadow = true;
    baseMesh.castShadow = true;
    baseMesh.name = "aggregate-base";
    modelGroup.add(baseMesh);

    // Layer 3: Paving Fabric Interlayer (Geotextile Membrane)
    const fabricGeo = new THREE.BoxGeometry(width * 1.02, 0.05, depth * 1.02);
    const fabricMat = new THREE.MeshStandardMaterial({
      color: 0xf59e0b, // safety amber highlight
      roughness: 0.4,
      metalness: 0.2,
      emissive: 0x78350f,
      emissiveIntensity: 0.3,
    });
    const fabricMesh = new THREE.Mesh(fabricGeo, fabricMat);
    fabricMesh.position.y = 0.08;
    fabricMesh.receiveShadow = true;
    fabricMesh.castShadow = true;
    fabricMesh.name = "paving-fabric";
    modelGroup.add(fabricMesh);

    // Layer 4: Hot Polymer Modified Asphalt Emulsion (Tack & Binder)
    const tackGeo = new THREE.BoxGeometry(width, 0.12, depth);
    const tackMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      roughness: 0.25,
      metalness: 0.3,
    });
    const tackMesh = new THREE.Mesh(tackGeo, tackMat);
    tackMesh.position.y = 0.17;
    tackMesh.receiveShadow = true;
    tackMesh.castShadow = true;
    tackMesh.name = "emulsion-tack";
    modelGroup.add(tackMesh);

    // Layer 5: Fractured Stone Aggregate Chips (Instanced)
    const chipCount = 180;
    const chipGeo = new THREE.DodecahedronGeometry(0.045, 0);
    const chipMat = new THREE.MeshStandardMaterial({
      color: 0xd6d3d1,
      roughness: 0.8,
      metalness: 0.1,
    });
    const chipsMesh = new THREE.InstancedMesh(chipGeo, chipMat, chipCount);
    chipsMesh.name = "aggregate-chips";
    chipsMesh.castShadow = true;
    chipsMesh.receiveShadow = true;

    const dummy = new THREE.Object3D();
    for (let i = 0; i < chipCount; i++) {
      const rx = (Math.random() - 0.5) * (width - 0.2);
      const rz = (Math.random() - 0.5) * (depth - 0.2);
      const ry = 0.24 + Math.random() * 0.04;

      dummy.position.set(rx, ry, rz);
      dummy.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );
      const s = 0.7 + Math.random() * 0.6;
      dummy.scale.set(s, s * 0.6, s);
      dummy.updateMatrix();
      chipsMesh.setMatrixAt(i, dummy.matrix);
    }
    chipsMesh.instanceMatrix.needsUpdate = true;
    modelGroup.add(chipsMesh);

    scene.add(modelGroup);

    // 4. Orbit Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxPolarAngle = Math.PI / 2 + 0.1;
    controls.minDistance = 2.5;
    controls.maxDistance = 7.0;
    controls.autoRotate = !reduce;
    controls.autoRotateSpeed = 0.8;

    // 5. Render Loop
    let animId: number;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // 6. Handle Resizing
    const handleResize = () => {
      if (!mount) return;
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animId);
      controls.dispose();
      renderer.dispose();
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className="relative w-full rounded-xl overflow-hidden border border-slate-800 bg-slate-950 shadow-2xl flex flex-col">
      {/* 3D Canvas Mount Point */}
      <div className="relative h-[340px] sm:h-[400px] w-full cursor-grab active:cursor-grabbing">
        <div ref={mountRef} className="w-full h-full" />

        {/* Floating Interactive 3D Badge */}
        <div className="absolute top-4 left-4 z-10 flex items-center gap-2 px-3 py-1.5 rounded-md bg-slate-950/90 border border-amber-500/40 text-amber-300 text-xs font-mono font-bold uppercase backdrop-blur-sm pointer-events-none">
          <ArrowsClockwise size={14} className="animate-spin" />
          <span>Interactive 3D Engineering Strata</span>
        </div>

        {/* Orbit hint */}
        <div className="absolute bottom-4 right-4 z-10 text-[11px] font-mono text-slate-400 bg-slate-950/80 px-2.5 py-1 rounded border border-slate-800 backdrop-blur-sm pointer-events-none">
          Drag to 360° Orbit / Scroll to Zoom
        </div>
      </div>

      {/* Strata Layer Explainer Keys */}
      <div className="p-4 sm:p-5 bg-slate-900 border-t border-slate-800 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-sm bg-stone-300 shrink-0 border border-slate-600" />
          <span className="text-slate-300">1. Fractured Stone</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-sm bg-slate-950 shrink-0 border border-slate-700" />
          <span className="text-slate-300">2. Polymer Emulsion</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-sm bg-amber-500 shrink-0" />
          <span className="text-slate-300">3. Geotextile Fabric</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-sm bg-stone-600 shrink-0" />
          <span className="text-slate-300">4. Class II Base</span>
        </div>
      </div>
    </div>
  );
};
