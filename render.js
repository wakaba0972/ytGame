let canvas = document.getElementById('canvas')
let ctx = canvas.getContext("2d")

let canvas2 = document.getElementById('canvas2')
let ctx2 = canvas2.getContext("2d")

canvas.height = 800
canvas.width = window.innerWidth

function initFrame(data){
    canvas2.height = 800
    canvas2.width = data.end

    ctx.beginPath()
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    //team1
    ctx.fillStyle = team1_c
    ctx.fillRect(0, 0, data.mid, data.mid)
    ctx.stroke()


    //team2
    ctx.fillStyle = team2_c
    ctx.fillRect(data.mid, 0, data.mid, data.mid)
    ctx.stroke()

    //team3
    ctx.fillStyle = team3_c
    ctx.fillRect(0, data.mid, data.mid, data.mid)
    ctx.stroke()

    //team4
    ctx.fillStyle = team4_c
    ctx.fillRect(data.mid, data.mid, data.mid, data.mid)
    ctx.stroke()

    //grid
    for(let i = 0; i <= data.end; i += data.width){
        ctx.moveTo(i, 0)
        ctx.lineTo(i, data.end)
        ctx.moveTo(0, i)
        ctx.lineTo(data.end, i)
    }
    ctx.stroke()
}

function updateFrame(data){
    ctx2.beginPath()
    ctx2.clearRect(0, 0, canvas2.height, canvas2.width)
    //blocks
    //team1
    ctx.fillStyle = team1_c
    for(let i of data.blocks['1']){
        ctx.fillRect(i[0], i[1], data.width, data.width)
        ctx.stroke()
    }

    //team2
    ctx.fillStyle = team2_c
    for(let i of data.blocks['2']){
        ctx.fillRect(i[0], i[1], data.width, data.width)
        ctx.stroke()
    }

    //team3
    ctx.fillStyle = team3_c
    for(let i of data.blocks['3']){
        ctx.fillRect(i[0], i[1], data.width, data.width)
        ctx.stroke()
    }

    //team4
    ctx.fillStyle = team4_c
    for(let i of data.blocks['4']){
        ctx.fillRect(i[0], i[1], data.width, data.width)
        ctx.stroke()
    }

    //bullets
    //team1
    ctx2.fillStyle = team1_b
    for(let i of data.bullets['1']){
        ctx2.beginPath();
        ctx2.arc(i[0], i[1], data.r, 0, Math.PI * 2)
        ctx2.fill()
    }

    //team2
    ctx2.fillStyle = team2_b
    for(let i of data.bullets['2']){
        ctx2.beginPath();
        ctx2.arc(i[0], i[1], data.r, 0, Math.PI * 2)
        ctx2.fill()
    }

    //team3
    ctx2.fillStyle = team3_b
    for(let i of data.bullets['3']){
        ctx2.beginPath();
        ctx2.arc(i[0], i[1], data.r, 0, Math.PI * 2)
        ctx2.fill()
    }

    //team4
    ctx2.fillStyle = team4_b
    for(let i of data.bullets['4']){
        ctx2.beginPath();
        ctx2.arc(i[0], i[1], data.r, 0, Math.PI * 2)
        ctx2.fill()
    }
}
