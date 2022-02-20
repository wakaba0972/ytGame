let show_number = document.getElementById('tag-number')
let show_speed = document.getElementById('tag-speed')

let team1_c = 'rgb(255, 153, 153)'
let team2_c = 'rgb(255, 255, 153)'
let team3_c = 'rgb(102, 252, 102)'
let team4_c = 'rgb(102, 178, 255)'

let team1_b = 'rgb(255, 0, 0)'
let team2_b = 'rgb(255, 255, 12)'
let team3_b = 'rgb(0, 153, 0)'
let team4_b = 'rgb(0, 0, 255)'

function changeSize(num){
    show_number.innerText = num
}

function changeSpeed(num){
    show_speed.innerText = num
}