function loop(){
    postMessage('You said: ');

    requestAnimationFrame(loop)
}