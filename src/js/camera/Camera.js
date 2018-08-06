import OrbitControls from "three-orbitcontrols";

export default class Camera extends THREE.PerspectiveCamera {

  static get instance() {
    // 一回生成して各シーンで上書きできるようにする
    return Camera._instance || new Camera();
  }

  /**
   * コンストラクターです。
   * @constructor
   */
  constructor() {
    super(45, window.innerWidth / window.innerHeight, 10, 500);

    this.position.y = 40;
    this.position.z = 30;

    // OrbitControls
    this.orbitControls = new OrbitControls(this);

    Camera._instance = this;
  }

  update() {
    this.lookAt(new THREE.Vector3(0, 0, 0));
  }
}
