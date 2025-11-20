<template>
  <canvas class="webgl"></canvas>
</template>

<script setup>
import * as THREE from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { AfterimagePass } from "three/examples/jsm/postprocessing/AfterimagePass";
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { createNoise2D } from "simplex-noise";
import {  onBeforeUnmount, onMounted } from 'vue';

let renderer, scene, camera, composer, controls;
let noise;
let rafId;
let sizes;
let stop = false;

onMounted(() => {
  initWebGL();
  window.addEventListener('resize', onResize);
});

onBeforeUnmount(() => {
  stop = true;
  cancelAnimationFrame(rafId);
  composer?.dispose();
  renderer?.dispose();
  window.removeEventListener('resize', onResize);
});

const onResize = () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
}
function initWebGL() {
  // ! Preload
  const canvas = document.querySelector('canvas.webgl');
  scene = new THREE.Scene();
  sizes = {
    width: window.innerWidth,
    height: window.innerHeight
  };
  const zoom = 2.5;
  const aspect = sizes.width / sizes.height;
  camera = new THREE.OrthographicCamera(
    -zoom * aspect / 2,   // left
    zoom * aspect / 2,    // right
    zoom / 2,             // top
    -zoom / 2,            // bottom
    0.1,              // near
    1000              // far
  );

  camera.position.x = 0;
  camera.position.y = 0;
  camera.position.z = 1;

  // controls = new OrbitControls(camera, canvas);
  // controls.target.set(0, 0, 0);
  scene.add(camera);

  renderer = new THREE.WebGLRenderer({
    canvas: canvas
  });
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));


  const VAR = {
    NOISE_OFFSET_X: 0,
    NOISE_OFFSET_Y: 0,
    NOISE_SCOPE_X: zoom * aspect,
    NOISE_SCOPE_Y: zoom,
    NOISE_AMPLITUDE: 2,
    NOISE_SCALE: 1,
    VERTEX_DIM_NUM: 400,
    VERTEX_SIZE: 0.002,
    NOISE_SPEED: 0.001,
    FPS: 60,
    MAP_SCOPE: 0.5 * Math.PI,
    PARTICLES_NUM: 100000,
    PARTICLES_SPEED: 0.005,
    PARTICLES_SCOPE_SPEED: 0.003
  };

  // ! Particles
  class Particles {
    constructor() {
      this.position = new THREE.Vector3();
      this.color = new THREE.Color();
      this.generate();
    }

    generate() {
      this.position.x = Math.random() * VAR.NOISE_SCOPE_X - VAR.NOISE_SCOPE_X / 2;
      this.position.y = Math.random() * VAR.NOISE_SCOPE_Y - VAR.NOISE_SCOPE_Y / 2;
      this.position.z = 0;
      this.color.set(1, 1, 1);
    }

    update() {
      this.position.x -= Math.cos(noise(this.position.x + VAR.NOISE_OFFSET_X, this.position.y + VAR.NOISE_OFFSET_Y) * VAR.MAP_SCOPE) * VAR.PARTICLES_SPEED;
      this.position.y -= Math.sin(noise(this.position.x + VAR.NOISE_OFFSET_X, this.position.y + VAR.NOISE_OFFSET_Y) * VAR.MAP_SCOPE) * VAR.PARTICLES_SPEED;
      if (this.position.x > VAR.NOISE_SCOPE_X / 2 || this.position.x < -VAR.NOISE_SCOPE_X / 2 || this.position.y > VAR.NOISE_SCOPE_Y / 2 || this.position.y < -VAR.NOISE_SCOPE_Y / 2) {
        this.generate();
      }
    }
  }

  // ! Main
  noise = createNoise2D();
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(VAR.VERTEX_DIM_NUM * VAR.VERTEX_DIM_NUM * 3);
  const colors = new Float32Array(VAR.VERTEX_DIM_NUM * VAR.VERTEX_DIM_NUM * 3);
  const indices = [];
  const particles = new Array(VAR.PARTICLES_NUM).fill().map(() => new Particles());

  // ! materials
  const material = new THREE.PointsMaterial({
    size: VAR.VERTEX_SIZE,
    sizeAttenuation: true,
    vertexColors: true
  });

  const points = new THREE.Points(geometry, material);
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  // geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  scene.add(points);

  function CreateIndices() {
    // ! Create the Index
    for (let i = 0; i < VAR.VERTEX_DIM_NUM - 1; i++) {
      for (let j = 0; j < VAR.VERTEX_DIM_NUM - 1; j++) {
        const a = i * VAR.VERTEX_DIM_NUM + j;
        const b = i * VAR.VERTEX_DIM_NUM + j + 1;
        const c = (i + 1) * VAR.VERTEX_DIM_NUM + j;
        const d = (i + 1) * VAR.VERTEX_DIM_NUM + j + 1;
        indices.push(a, b, c);
        indices.push(b, c, d);
      }
    }
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometry.setIndex(indices);
  }

  CreateIndices();

  function updateVertices() {
    for (let i = 0; i < VAR.PARTICLES_NUM; i++) {
      particles[i].update();
      positions[i * 3] = particles[i].position.x;
      positions[i * 3 + 1] = particles[i].position.y;
      positions[i * 3 + 2] = particles[i].position.z;
      colors[i * 3] = particles[i].color.r;
      colors[i * 3 + 1] = particles[i].color.g;
      colors[i * 3 + 2] = particles[i].color.b;
    }
    geometry.attributes.position.needsUpdate = true;
    geometry.attributes.color.needsUpdate = true;
  }

  function update(par) {
    VAR.MAP_SCOPE += par * VAR.PARTICLES_SCOPE_SPEED;
    if (VAR.MAP_SCOPE > 2.2 || VAR.MAP_SCOPE < 0.8) {
      par *= -1;
    }
    updateVertices();
    geometry.attributes.position.needsUpdate = true;
    geometry.attributes.color.needsUpdate = true;
  }
  // ! EFFECTS
  composer = new EffectComposer(renderer);
  composer.addPass(new RenderPass(scene, camera));

  const afterimagePass = new AfterimagePass();
  composer.addPass(afterimagePass);
  // ! Loop

  function animate() {
    if (stop) return;
    rafId = requestAnimationFrame(animate);
    let par = 1;
    update(par);
    // controls.update();
    composer.render(scene, camera);
  }
  stop = false;
  animate();
}

</script>

<style scoped>
canvas {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  contain: content;
}
</style>
