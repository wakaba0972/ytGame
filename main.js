let worker = new Worker('./worker.js')

let start = document.getElementById('start')
let setting = document.getElementById('SettingButton')
let menu = document.getElementById('menu')
let main = document.getElementById('main')
let decoder = new TextDecoder()

start.addEventListener('click', ()=> {
    init()
})

setting.addEventListener('click', ()=> {
    if(menu.style.display == 'block'){
        canvas.classList.remove('BlurAnime')
        menu.style.display = 'none'
    }
    else{
        canvas.classList.add('BlurAnime')
        menu.style.display = 'block'
    }
})

window.addEventListener('mousedown', e=> {
    if(menu.style.display == 'block'){
        let bound = menu.getBoundingClientRect()
        if(e.pageX < bound.left || e.pageX > bound.right || e.pageY < bound.top || e.pageY > bound.bottom){
            canvas.classList.remove('BlurAnime')
            menu.style.display = 'none'
        }
    }
})

worker.onmessage = function(e){
    let data = JSON.parse(decoder.decode(e.data))
    switch(data.command){
        case 'initFrame':
            initFrame(data.value)
            break
        case 'update':
            updateFrame(data.value)
            break
    }
}

function init(){
    config = {
        command: 'init',
        value: {
            number: show_number.innerText,
            speed: show_speed.innerText
        }
    }
    worker.postMessage(config)
}
