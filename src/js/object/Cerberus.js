import EventEmitter from 'events';
import PubSub from 'pubsub-js';

export default class Cerberus extends THREE.Object3D {

  static ROTATION_SPEED = 100;
  _angle = 0;

  constructor(opts={}) {
    super();

    // shader
    const vs = document.getElementById("vertexShader").textContent;
    const fs = document.getElementById("fragmentShader").textContent;
    this.uniforms = {
      time : {      // 変数
        type : 'f', // 型 float
        value : 0.0 // 値
      }
    };
    const material = new THREE.ShaderMaterial({
        vertexShader: vs,
        fragmentShader: fs,
        uniforms: this.uniforms
    });

    const loader = new THREE.DRACOLoader();
    loader.load('./model/draco/cerberus.obj.drc', geometry => {
        geometry.computeVertexNormals();
        // const material = new THREE.MeshStandardMaterial( { vertexColors: THREE.VertexColors } );
        const mesh = new THREE.Mesh( geometry, material );
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        this.add(mesh);
        mesh.scale.set(10, 10, 10);
        PubSub.publish('loadend');
    })
  }

  update(time, delta) {
    this.uniforms.time.value += 0.1;

    // 角度をインクリメント
    this._angle += delta * Cerberus.ROTATION_SPEED;
    let radian = this._angle * Math.PI / 180;

    this.rotation.set(
        0,
        radian * 0.2,
        0,
    );
  }
}
