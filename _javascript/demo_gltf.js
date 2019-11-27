"use strict";

//SETTINGS of this demo :
const SETTINGS = {
  // 'DamagedHelmet/glTF/DamagedHelmet.gltf',
  // 'Charmander/glTF/model.gltf',
  // 'EnglishHat/glTF/tophat.gltf',
  gltfModelURL: 'models/jeeliz/headphones/scene.gltf',
  //gltfModelURL: 'models/jeeliz/HeadphoneEars/glTF/headphone_with_ears.glb',
  faceMeshGltfModelURL: 'models/jeeliz/HeadTest/glTF/head.glb',
  cubeMapURL: 'models/jeeliz/Bridge2/',
  offsetYZ: [0.3, 0], //offset of the model in 3D along vertical and depth axis
  scale: 2.5, //width in 3D of the GLTF model
  maxFaces: 4 //max number of detected faces
};

var THREECAMERA = null;


//build the 3D. called once when Jeeliz Face Filter is OK
function init_threeScene(spec) {
  const threeStuffs = THREE.JeelizHelper.init(spec, null);

  // CREATE THE ENVMAP:
  const path = SETTINGS.cubeMapURL;
  const format = '.jpg';
  const envMap = new THREE.CubeTextureLoader().load([
    path + 'posx' + format, path + 'negx' + format,
    path + 'posy' + format, path + 'negy' + format,
    path + 'posz' + format, path + 'negz' + format
  ]);

  // IMPORT THE GLTF MODEL OF FACE MESH:
  const gltfMeshLoader = new THREE.GLTFLoader();
  gltfMeshLoader.load(SETTINGS.faceMeshGltfModelURL, function (gltf) {
    gltf.scene.traverse(function (child) {
      if (child.isMesh) {
        child.material.envMap = envMap;
        child.material.color.set(0xff0000);
        child.material.colorWrite = false;
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
    const centerBBox = bbox.getCenter(new THREE.Vector3());
    gltf.scene.position.add(centerBBox.multiplyScalar(-1));

    //gltf.scene.rotateX(160);
    //gltf.scene.rotateY(1.57);

    // Multiple faces
    // threeStuffs.scene.maxFacesDetected = SETTINGS.maxFacesDetected;

    // CREATE LIGHT
    const ambientLight = new THREE.AmbientLight(0XFFFFFF, 1);
    threeStuffs.scene.add(ambientLight);

    // Display scenes
    threeStuffs.faceObjects.forEach(function (faceObject) { //display the cube for each detected face
      faceObject.add(gltf.scene.clone());
    });
  }); //end gltfLoader.load callback


  // IMPORT THE GLTF MODEL OF OBJECT TO BE PLACED ON FACE:
  // from https://threejs.org/examples/#webgl_loader_gltf
  const gltfLoader = new THREE.GLTFLoader();
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
    gltf.scene.scale.multiplyScalar(SETTINGS.scale / sizeX / 1.5);
    bbox = new THREE.Box3().setFromObject(gltf.scene);
    // center the model:
    const centerBBox = bbox.getCenter(new THREE.Vector3());
    gltf.scene.position.add(centerBBox.multiplyScalar(-1));
    gltf.scene.position.add(new THREE.Vector3(0, 0.8, SETTINGS.offsetYZ[1]));
    //gltf.scene.position.add(new THREE.Vector3(0, 1.2, -0.5));

    //gltf.scene.rotateX(160);
    //gltf.scene.rotateY(-1.57);

    // CREATE LIGHT
    const ambientLight = new THREE.AmbientLight(0XFFFFFF, 1);
    threeStuffs.scene.add(ambientLight);

    // dispatch the model:
    threeStuffs.faceObjects.forEach(function (faceObject) { //display the cube for each detected face
      faceObject.add(gltf.scene.clone());
    });
  }); //end gltfLoader.load callback



  //CREATE THE CAMERA
  THREECAMERA = THREE.JeelizHelper.create_camera();
} //end init_threeScene()

//entry point, launched by body.onload():
function main() {
  document.getElementById('ar-container').style.display = 'block';
  JeelizResizer.size_canvas({
    canvasId: 'jeeFaceFilterCanvas',
    isFullScreen: true,
    callback: start,
    onResize: function () {
      THREE.JeelizHelper.update_camera(THREECAMERA);
    }
  })
}

function start() {
  if (typeof JEEFACEFILTERAPI.toggle_pause(false, true) == 'undefined') {
    JEEFACEFILTERAPI.init({
      videoSettings: { //increase the default video resolution since we are in full screen
        'idealWidth': 1280,  //ideal video width in pixels
        'idealHeight': 800, //ideal video height in pixels
        'maxWidth': 1920,   //max video width in pixels
        'maxHeight': 1920   //max video height in pixels
      },
      followZRot: true,
      canvasId: 'jeeFaceFilterCanvas',
      NNCpath: 'lib/dist/', //root of NNC.json file
      maxFacesDetected: SETTINGS.maxFaces,
      callbackReady: function (errCode, spec) {
        if (errCode) {
          console.log('AN ERROR HAPPENS. SORRY BRO :( . ERR =', errCode);
          return;
        }

        console.log('INFO : JEEFACEFILTERAPI IS READY');
        init_threeScene(spec);
      }, //end callbackReady()

      //called at each render iteration (drawing loop):
      callbackTrack: function (detectState) {
        THREE.JeelizHelper.render(detectState, THREECAMERA);
      }
    }); //end JEEFACEFILTERAPI.init call
    //scroll to top of screen

  }
  window.scrollTo(0, 0);
  //end start()
}
function screenCapture() {
  var url = jeeFaceFilterCanvas.toDataURL('image/png');
  document.getElementById('screencapture-img').src = url;
  stop()
  document.getElementById('share-container').style.display = 'block';

}

function dataURLtoFile(dataurl, filename) {

  var arr = dataurl.split(','),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new File([u8arr], filename, { type: mime });
}

function shareImage() {
  var file = dataURLtoFile(document.getElementById('screencapture-img').src, 'image.png');
  console.log(file);
  var filesArray = [];
  filesArray.push(file);
  if (navigator.canShare && navigator.canShare({ files: filesArray })) {
    navigator.share({
      files: filesArray,
      title: 'Check this out',
      text: 'Hello friend\nWhat do you think of this look?\n\nRyan',
    })
      .then(() => console.log('Share was successful.'))
      .catch((error) => console.log('Sharing failed', error));
  } else {
    console.log('Your system doesn\'t support sharing files.');
  }
}

function cancelImage() {
  document.getElementById('share-container').style.display = 'none';
  main()
}

//stop AR
function stop() {
  document.getElementById('ar-container').style.display = 'none';
  JEEFACEFILTERAPI.toggle_pause(true, true)
}
