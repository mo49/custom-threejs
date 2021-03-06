import Camera from '../camera/Camera';
import Cerberus from '../object/Cerberus';
import PubSub from 'pubsub-js';

export default class Scene1 extends THREE.Scene {

  _camera;
  _cube;

  constructor(opts={}) {
    super();

    // カメラ
    this._camera = Camera.instance;
    this._camera.position.set(30, 20, 10);

    // 環境光源
    let ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    this.add(ambientLight);
    let directionaLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionaLight.position.set(0,30,10);
    this.add(directionaLight);

    // Cerberus
    this._cerberus = new Cerberus();
    this.add(this._cerberus);

    // helper
    let axisHelper = new THREE.AxisHelper(200,50);
    this.add(axisHelper);
    let gridHelper = new THREE.GridHelper(50,50);
    this.add(gridHelper);
  }

  update(time,delta) {
    this._camera.update();
    this._cerberus.update(time,delta);
  }

}
