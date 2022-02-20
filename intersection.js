function isIntersect(g1, g2){
    switch(g1.type + g2.type){
        case 'CC':
            return Cir2Cir(g1, g2)
            break
        case 'RR':
            return Rect2Rect(g1, g2)
            break
        case 'CR':
            return Rect2Cir(g2, g1)
            break
        case 'RC':
            return Rect2Cir(g1, g2)
            break
    }
}

function Rect2Cir(r, c){
    let rx = r.x + r.w / 2
    let ry = r.y + r.h / 2

    //以Rect中心為原點，將圓心映射至第一象限
    let cx = Math.abs(c.x - rx) + rx
    let cy = Math.abs(c.y - ry) + ry

    //計算圓心至矩形的最短距離
    let ax = cx - rx - r.w / 2
    ax = ax > 0 ? ax : 0
    let ay = cy - ry - r.h / 2
    ay = ay > 0 ? ay : 0
    
    return (Math.sqrt(ax ** 2 + ay ** 2) < c.r)
}

function Rect2Rect(r1, r2){
    return !(r1.x + r1.w < r2.x || r1.x > r2.x + r2.w ||
            r1.y + r1.h < r2.y || r1.y > r2.y + r2.h);
}

function Cir2Cir(c1, c2){
    return Math.sqrt((c1.x - c2.x) ** 2 + (c1.y - c2.y) ** 2) <= c1.r + c2.r
}