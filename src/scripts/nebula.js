import * as THREE from 'three';

/**
 * Copyright 2020 by RyanIndustries8
 * https://codepen.io/ryanindustries8/pen/XWdYdGz
 *
 * TODO: refactor this mess
 */

export function generateNebula(node) {
  let renderer, camera, scene, cloudParticles = [];

  function init(node) {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(35, node.offsetWidth / node.offsetHeight, 1, 1000);
    camera.position.z = 1;
    camera.rotation.x = 1.16;
    camera.rotation.y = -0.12;
    camera.rotation.z = 0.27;

    let ambient = new THREE.AmbientLight(0x55555);
    scene.add(ambient);

    let directionLight = new THREE.DirectionalLight(0xff8c19);
    directionLight.position.set(0,0,1);
    scene.add(directionLight);

    let orangeLight = new THREE.PointLight(0xcc6600, 50, 450, 1.7);
    orangeLight.position.set(200,300,100);
    scene.add(orangeLight);

    let redLight = new THREE.PointLight(0xd8547e, 50, 450, 1.7);
    redLight.position.set(100,300,100);
    scene.add(redLight);

    let blueLight = new THREE.PointLight(0x3677ac, 50, 450, 1.7);
    blueLight.position.set(300,300,200);
    scene.add(blueLight);

    renderer = new THREE.WebGLRenderer({ canvas: node });
    scene.fog = new THREE.FogExp2(0x03544e, 0.001);
    renderer.setClearColor(scene.fog.color);

    let loader = new THREE.TextureLoader();

    loader.load("./cloud.png", function(texture) {
      let cloudGeo = new THREE.PlaneBufferGeometry(500,500);
      let cloudMaterial = new THREE.MeshLambertMaterial({
        map: texture,
        transparent: true
      });

      for(let i = 0; i < 50; i++) {
        let cloud = new THREE.Mesh(cloudGeo, cloudMaterial);
        cloud.position.set(
          Math.random() * 800 - 400,
          500,
          Math.random() * 500 - 500
        );
        cloud.rotation.x = 1.16;
        cloud.rotation.y = -0.12;
        cloud.rotation.z = Math.random() * 2 * Math.PI;
        cloud.material.opacity = 0.07;
        cloudParticles.push(cloud);
        scene.add(cloud);
      }
    });

    window.addEventListener('resize', onWindowResize(node), false);
    render();
  }

  function onWindowResize(node) {
    camera.aspect = node.offsetWidth / node.offsetHeight;
    camera.updateProjectionMatrix();
  }

  function render() {
    cloudParticles.forEach(i => {
      i.rotation.z -=0.001
    });

    renderer.render(scene,camera);
    requestAnimationFrame(render);
  }

  init(node);
}
