<template>
    <canvas class="webgl"></canvas>
</template>

<script setup>
import { onMounted, onBeforeUnmount } from 'vue';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { AfterimagePass } from 'three/examples/jsm/postprocessing/AfterimagePass';

let renderer, scene, camera, composer, controls;
let rafId;
let group;           // ★ attractor group
let trajectories = []; // ★ store all line + star

onMounted(() => {
    init();
    animate();
});

onBeforeUnmount(() => {
    cancelAnimationFrame(rafId);
    composer?.dispose();
    renderer?.dispose();
    window.removeEventListener('resize', onResize);
});

// ------------------------------------------------------
// INIT
// ------------------------------------------------------
function init() {
    const canvas = document.querySelector(".webgl");
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0b0b0b);

    const w = window.innerWidth, h = window.innerHeight;

    camera = new THREE.PerspectiveCamera(60, w / h, 0.01, 2000);
    camera.position.set(10, 8, 18);
    scene.add(camera);

    renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.06;

    composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));
    composer.addPass(new AfterimagePass(0.1));

    group = new THREE.Group();
    scene.add(group);

    generateTrajectories();
    controls.enabled = false;

    window.addEventListener("resize", onResize);
}

// ------------------------------------------------------
// WINDOW RESIZE
// ------------------------------------------------------
function onResize() {
    const w = window.innerWidth, h = window.innerHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
    composer.setSize(w, h);
}

// ------------------------------------------------------
// SPROTT SYSTEM
// ------------------------------------------------------
function f(s) {
    return [
        s[1] * s[2],
        s[0] - s[1],
        1 - s[0] * s[1]
    ];
}

function rk4(s, dt) {
    const k1 = f(s);
    const k2 = f([s[0] + dt * 0.5 * k1[0], s[1] + dt * 0.5 * k1[1], s[2] + dt * 0.5 * k1[2]]);
    const k3 = f([s[0] + dt * 0.5 * k2[0], s[1] + dt * 0.5 * k2[1], s[2] + dt * 0.5 * k2[2]]);
    const k4 = f([s[0] + dt * k3[0], s[1] + dt * k3[1], s[2] + dt * k3[2]]);
    return [
        s[0] + (dt / 6) * (k1[0] + 2 * k2[0] + 2 * k3[0] + k4[0]),
        s[1] + (dt / 6) * (k1[1] + 2 * k2[1] + 2 * k3[1] + k4[1]),
        s[2] + (dt / 6) * (k1[2] + 2 * k2[2] + 2 * k3[2] + k4[2])
    ];
}

// ------------------------------------------------------
// CREATE STAR PARTICLE
// ------------------------------------------------------
function createStar(color) {
    const geo = new THREE.SphereGeometry(0.03, 8, 8);
    const mat = new THREE.MeshBasicMaterial({
        color: color,
    });
    return new THREE.Mesh(geo, mat);
}

// ------------------------------------------------------
// GENERATE TRAJECTORIES + STAR PARTICLES
// ------------------------------------------------------
function generateTrajectories() {
    const params = {
        numTraj: 28,
        total: 6000,
        dt: 0.004,
        drawSpeed: 15
    };

    const hueBase = 0.1;       // 金色橙色
    const hueSpread = 0.015;

    for (let t = 0; t < params.numTraj; t++) {

        // ---------------------------
        // integrate Sprott attractor
        // ---------------------------
        const pos = new Float32Array(params.total * 3);
        const col = new Float32Array(params.total * 3);

        let s = [
            (Math.random() - 0.5) * 2 + t * 0.02,
            (Math.random() - 0.5) * 2,
            (Math.random() - 0.5) * 2 - t * 0.01
        ];

        const scale = 1.55;
        const hue = hueBase + (Math.random() - 0.5) * hueSpread;
        const sat = 0.85;
        const mid = 0.55;

        for (let i = 0; i < params.total; i++) {
            s = rk4(s, params.dt);

            pos[i * 3] = s[0] * scale;
            pos[i * 3 + 1] = s[1] * scale;
            pos[i * 3 + 2] = s[2] * scale;

            const tnorm = i / params.total;

            const c = new THREE.Color().setHSL(
                hue,
                sat,
                THREE.MathUtils.clamp(mid + (tnorm - 0.5) * 0.28, 0, 1)
            );
            col[i * 3] = c.r;
            col[i * 3 + 1] = c.g;
            col[i * 3 + 2] = c.b;
        }

        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute("position", new THREE.BufferAttribute(pos, 3));
        geometry.setAttribute("color", new THREE.BufferAttribute(col, 3));
        geometry.setDrawRange(0, params.total);

        const material = new THREE.LineBasicMaterial({
            vertexColors: true,
            transparent: true,
            opacity: 0.92
        });

        const line = new THREE.Line(geometry, material);
        group.add(line);

        // ---------------------------
        // ★ add star particle
        // ---------------------------
        
        const starColor = new THREE.Color().setHSL(hue, sat, Math.random() * 0.2 + 0.6);
        const star = createStar(starColor);
        scene.add(star);

        const traj = {
            line,
            pos,
            total: params.total,
            star,
            starIndex: Math.floor(Math.random() * params.total),
            starSpeed: 0.8 + Math.random() * 0.5
        };

        trajectories.push(traj);
    }
}

// ------------------------------------------------------
// UPDATE STAR PARTICLES
// ------------------------------------------------------
function updateStars() {
    trajectories.forEach(tr => {
        const i = Math.floor(tr.starIndex);

        const x = tr.pos[i * 3];
        const y = tr.pos[i * 3 + 1];
        const z = tr.pos[i * 3 + 2];

        tr.star.position.set(x, y, z);

        tr.starIndex += tr.starSpeed;
        if (tr.starIndex >= tr.total) tr.starIndex = 0;
    });
}

// ------------------------------------------------------
// ANIMATE
// ------------------------------------------------------
function animate() {
    rafId = requestAnimationFrame(animate);

    const radius = 10;
    const speed = 0.0003;

    const t = performance.now() * speed;

    camera.position.x = Math.cos(t) * radius;
    camera.position.z = Math.sin(t) * radius;
    camera.lookAt(0, 0, 0); 

    controls.update();
    updateStars();
    controls.update();
    composer.render();
}
</script>

<style scoped>
canvas.webgl {
    position: fixed;
    inset: 0;
    width: 100%;
    height: 100%;
}
</style>
