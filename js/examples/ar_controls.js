import { run } from '../examples/face_tracking__threejs_overlay.js'
import { closeCamera } from '../ui/ui__input__camera.js'
import { stopTracking } from '../ui/ui__input__data.js'
import { hideThreejsOverlay } from '../ui/ui__overlay__threejs.js'

const stop = () => {
    closeCamera()
    stopTracking()
    hideThreejsOverlay()
}

const start = () => {
    document.getElementById('share-content').style.display = 'none'
    run()
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

window.shareImage = function shareImage() {
    var file = dataURLtoFile(document.getElementById('screenCaptureCanvas').toDataURL(), 'image.png');
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

window.cancelImage = function cancelImage() {
    start()
    document.getElementById('share-content').style.display = 'none';

}

window.startAR = function startAR() {
    start()
}

window.stopAR = function stopAR() {
    stop()
}
window.screenCapture = function screenCapture() {
    //generate image from the camera canvas and three js canvas

    document.getElementById('share-content').style.display = 'block'

    var cameraCanvas0 = document.getElementById("__brfv5__camera_canvas_0")
    var threeJsCanvas = document.getElementById("__brfv5__threejs_canvas")
    var width = cameraCanvas0.width
    var height = cameraCanvas0.height
    var screenCaptureCanvas = document.getElementById('screenCaptureCanvas')
    var screenCaptureContext = screenCaptureCanvas.getContext('2d')

    //set width and height in context 
    screenCaptureContext.canvas.width = width
    screenCaptureContext.canvas.height = height

    //draw both canvases on final canvas
    screenCaptureContext.drawImage(cameraCanvas0, 0, 0, width, height)
    screenCaptureContext.drawImage(threeJsCanvas, 0, 0, width, height)

    stop()


}

