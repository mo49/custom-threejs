import EventEmitter from 'events';

export default class Duck extends THREE.Object3D {

  static ROTATION_SPEED = 100;
  _angle = 0;

  constructor(opts={}) {
    super();

    const loader = new THREE.GLTFLoader();
    loader.load('./model/glTF/Duck.gltf', data => {
        let gltf = data;
        let obj = gltf.scene;
        obj.scale.set(5, 5, 5);
        obj.position.set(0, 0, 0);
        this.add(obj);
    })
  }

  update(time,delta) {
    // 角度をインクリメント
    this._angle += delta * Duck.ROTATION_SPEED;
    let radian = this._angle * Math.PI / 180;

    this.rotation.set(
        0,
        radian * 0.2,
        0,
    );
  }
}
