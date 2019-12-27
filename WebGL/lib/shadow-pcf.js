function init(){
var webGLRenderer = new THREE.WebGLRenderer();
//开启阴影效果
webGLRenderer.shadowMap.enabled = true;
webGLRenderer.shadowMap.type = THREE.PCFSoftShadowMap;
var spotLight = new THREE.SpotLight(0xcccccc);
spotLight.position.set(-100, 300, 10);
spotLight.castShadow = true;

var cubeGeometry = new THREE.CubeGeometry(40, 40, 40);
var cubeMaterial = new THREE.MeshLambertMaterial({color: Math.random() * 0xffffff});
var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
cube.position.x = 10;
cube.position.z = 150;
cube.castShadow = true;

// 创建平面
var planeGeometry = new THREE.PlaneGeometry(400, 400);
var planeMaterial = new THREE.MeshLambertMaterial({color: 0x6D6565});
var plane = new THREE.Mesh(planeGeometry, planeMaterial);
// 使平面就接收物体投掷过来的阴影
plane.receiveShadow = true;

var spotLight = new THREE.SpotLight(0xcccccc);
spotLight.position.set(-100, 300, 10);
spotLight.castShadow = true;
//设置阴影分辨率
spotLight.shadow.mapSize.width = 2048;
spotLight.shadow.mapSize.height = 2048;
scene.add(spotLight);

}
init();