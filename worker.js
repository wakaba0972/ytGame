importScripts('./quadtree.js');
importScripts('./object.js')

let r = 5
let end = 0
let width = 0
let tree = null
let detector = null
let encoder = new TextEncoder()

function initTree(x, y, w, h, gMid, gEnd, bWidth){
    tree = new quadtree(x, y, w, h)
    //team1
    for(let i = 0; i < gMid; i += bWidth){
        for(let j = 0; j < gMid; j += bWidth){
            tree.insert(new block(i + 1, j + 1, bWidth - 2, 1))
        }
    }

    //team2
    for(let i = gMid; i < gEnd; i += bWidth){
        for(let j = 0; j < gMid; j += bWidth){
            tree.insert(new block(i + 1, j + 1, bWidth - 2, 2))
        }
    }

    //team3
    for(let i = 0; i < gMid; i += bWidth){
        for(let j = gMid; j < gEnd; j += bWidth){
            tree.insert(new block(i + 1, j + 1, bWidth - 2, 3))
        }
    }

    //team4
    for(let i = gMid; i < gEnd; i += bWidth){
        for(let j = gMid; j < gEnd; j += bWidth){
            tree.insert(new block(i + 1, j + 1, bWidth - 2, 4))
        }
    }
}

function init(data){
    width = Math.floor(800 / data.value.number)
    end = data.value.number * width
    let mid = end / 2
    let config = {
        command: 'initFrame',
        value: {
            number: data.value.number, 
            width: width,
            end: end,
            mid: mid,
            cannonLength: 100,
            cannon1: {
                x: 0,
                y: 100,
                angleS: Math.PI + Math.PI / 2 + 0.1,
                angleE: Math.PI * 2 - 0.1
            },
            cannon2: {
                x: end - 100,
                y: 0,
                angleS: Math.PI + 0.1,
                angleE: Math.PI + Math.PI / 2 - 0.1
            },
            cannon3: {
                x: 100,
                y: end,
                angleS: 0 + 0.1,
                angleE: Math.PI / 2 - 0.1
            },
            cannon4: {
                x: end,
                y: end - 100,
                angleS: Math.PI / 2 + 0.1,
                angleE: Math.PI + Math.PI / 2 - 0.1
            }
        }
    }
    self.postMessage(encoder.encode(JSON.stringify(config)))

    initTree(0, 0, end, end, mid, end, width)
    detector = new Detector()
    let v = 3
    for(let i=0; i< 200; ++i){
        let angle = Math.random()*(Math.PI+1)
        detector.insert(new bullet(5, 5, r, Math.cos(angle) * v, Math.sin(angle) * v, 1))
    }
    
    loop()
}

function loop(){
    detector.update()
    requestAnimationFrame(loop)
}

onmessage = function(e){
    this.postMessage(e.data)
    switch(e.data.command){
        case 'init':
            init(e.data)
    }
}