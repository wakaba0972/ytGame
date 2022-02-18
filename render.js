let canvas = document.getElementById('canvas')
let Worker = new Worker('worker.js')

onmessage = function(event){
    postMessage('You said: ' + event.data);
}