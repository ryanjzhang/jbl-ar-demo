"use strict";

//SETTINGS of this demo :

var SETTINGS = {
  // 'DamagedHelmet/glTF/DamagedHelmet.gltf',
  // 'Charmander/glTF/model.gltf',
  // 'EnglishHat/glTF/tophat.gltf',

  gltfModelURL: 'HeadphoneEars/glTF/headphone_with_ears.glb',
  faceMeshGltfModelURL: 'HeadTest/glTF/head.glb',
  cubeMapURL: 'Bridge2/',
  offsetYZ: [0.3, 0], //offset of the model in 3D along vertical and depth axis
  scale: 2.5 //width in 3D of the GLTF model
};

var THREECAMERA = null;

//build the 3D. called once when Jeeliz Face Filter is OK
function init_threeScene(spec) {
  var threeStuffs = THREE.JeelizHelper.init(spec, null);

  // CREATE THE ENVMAP:
  var path = SETTINGS.cubeMapURL;
  var format = '.jpg';
  var envMap = new THREE.CubeTextureLoader().load([path + 'posx' + format, path + 'negx' + format, path + 'posy' + format, path + 'negy' + format, path + 'posz' + format, path + 'negz' + format]);

  // IMPORT THE GLTF MODEL OF FACE MESH:
  var gltfMeshLoader = new THREE.GLTFLoader();
  gltfMeshLoader.load(SETTINGS.faceMeshGltfModelURL, function (gltf) {
    gltf.scene.traverse(function (child) {
      if (child.isMesh) {
        child.material.envMap = envMap;
        child.material.color.set(0xff0000);
        // child.material.colorWrite = false;
      }
      console.log(child);
    });
    gltf.scene.frustumCulled = false;
    console.log(gltf.scene);

    // center and scale the object:
    //const bbox = new THREE.Box3().expandByObject(gltf.scene);
    var bbox = new THREE.Box3().setFromObject(gltf.scene);
    console.log(bbox.getSize());
    // scale the model according to its width:
    var sizeX = bbox.getSize(new THREE.Vector3()).x;
    gltf.scene.scale.multiplyScalar(SETTINGS.scale / sizeX * 0.65);
    //gltf.scene.position.add(new THREE.Vector3(0, SETTINGS.offsetYZ[0], SETTINGS.offsetYZ[1]));
    gltf.scene.position.add(new THREE.Vector3(0, 0, -1));
    bbox = new THREE.Box3().setFromObject(gltf.scene);

    // center the model:
    var centerBBox = bbox.getCenter(new THREE.Vector3());
    gltf.scene.position.add(centerBBox.multiplyScalar(-1));

    //gltf.scene.rotateX(160);
    //gltf.scene.rotateY(1.57);
    // CREATE LIGHT
    var ambientLight = new THREE.AmbientLight(0XFFFFFF, 1);
    threeStuffs.scene.add(ambientLight);
    // dispatch the model:
    threeStuffs.faceObject.add(gltf.scene);
  }); //end gltfLoader.load callback


  // IMPORT THE GLTF MODEL OF OBJECT TO BE PLACED ON FACE:
  // from https://threejs.org/examples/#webgl_loader_gltf
  var gltfLoader = new THREE.GLTFLoader();
  gltfLoader.load(SETTINGS.gltfModelURL, function (gltf) {
    gltf.scene.traverse(function (child) {
      if (child.isMesh) {
        child.material.envMap = envMap;
      }
      console.log(child);
    });
    gltf.scene.frustumCulled = false;
    console.log(gltf.scene);

    // center and scale the object:
    //const bbox = new THREE.Box3().expandByObject(gltf.scene);
    var bbox = new THREE.Box3().setFromObject(gltf.scene);
    console.log(bbox.getSize());
    // scale the model according to its width:
    var sizeX = bbox.getSize(new THREE.Vector3()).x;
    gltf.scene.scale.multiplyScalar(SETTINGS.scale / sizeX / 2.8);
    bbox = new THREE.Box3().setFromObject(gltf.scene);
    // center the model:
    var centerBBox = bbox.getCenter(new THREE.Vector3());
    gltf.scene.position.add(centerBBox.multiplyScalar(-1));
    //gltf.scene.position.add(new THREE.Vector3(0, SETTINGS.offsetYZ[0], SETTINGS.offsetYZ[1]));
    gltf.scene.position.add(new THREE.Vector3(0, 1.2, -0.5));

    //gltf.scene.rotateX(160);
    gltf.scene.rotateY(-1.57);
    // CREATE LIGHT
    var ambientLight = new THREE.AmbientLight(0XFFFFFF, 1);
    threeStuffs.scene.add(ambientLight);
    // dispatch the model:
    threeStuffs.faceObject.add(gltf.scene);
  }); //end gltfLoader.load callback


  //CREATE THE CAMERA
  THREECAMERA = THREE.JeelizHelper.create_camera();
} //end init_threeScene()

//entry point, launched by body.onload():
function main() {
  JeelizResizer.size_canvas({
    canvasId: 'jeeFaceFilterCanvas',
    isFullScreen: true,
    callback: start,
    onResize: function onResize() {
      THREE.JeelizHelper.update_camera(THREECAMERA);
    }
  });
}

function start() {
  JEEFACEFILTERAPI.init({
    videoSettings: { //increase the default video resolution since we are in full screen
      'idealWidth': 1280, //ideal video width in pixels
      'idealHeight': 800, //ideal video height in pixels
      'maxWidth': 1920, //max video width in pixels
      'maxHeight': 1920 //max video height in pixels
    },
    followZRot: true,
    canvasId: 'jeeFaceFilterCanvas',
    NNCpath: '../../../dist/', //root of NNC.json file
    callbackReady: function callbackReady(errCode, spec) {
      if (errCode) {
        console.log('AN ERROR HAPPENS. SORRY BRO :( . ERR =', errCode);
        return;
      }

      console.log('INFO : JEEFACEFILTERAPI IS READY');
      init_threeScene(spec);
    }, //end callbackReady()

    //called at each render iteration (drawing loop):
    callbackTrack: function callbackTrack(detectState) {
      THREE.JeelizHelper.render(detectState, THREECAMERA);
    }
  }); //end JEEFACEFILTERAPI.init call
} //end start()