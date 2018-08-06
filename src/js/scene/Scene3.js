import Camera from '../camera/Camera';
import Unitychan from '../object/Unitychan';

export default class Scene3 extends THREE.Scene {

  _camera;
  _cube;

  constructor(opts={}) {
    super();

    // カメラ
    this._camera = Camera.instance;
    this._camera.position.set(20,10,15);

    // 環境光源
    let ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    this.add(ambientLight);
    let directionaLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionaLight.position.set(0,30,10);
    this.add(directionaLight);

    // Unitychan
    this._unitychan = new Unitychan();
    this.add(this._unitychan);

    // helper
    let axisHelper = new THREE.AxisHelper(200,50);
    this.add(axisHelper);
    let gridHelper = new THREE.GridHelper(50,50);
    this.add(gridHelper);
  }

  update(time,delta) {
    this._camera.update();
    this._unitychan.update(time,delta);
  }

}
