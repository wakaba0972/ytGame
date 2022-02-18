class cannon{

}

class bullet{
    constructor(x, y, r, vx, vy, color){
        this.vx = vx
        this.vy = vy
        this.pos = null
        this.color = color
        this.geo = new Circle(x, y, r)
    }

    changeNode(tree){
        if(!isIntersect(this.pos.geo, this.geo)){
            tree.insert(this)
        }
    }
}

class block{
    constructor(x, y, w, color){
        this.pos = null
        this.color = color
        this.geo = new Rectangle(x, y, w, w)
    }

    changeNode(tree){
        if(!isIntersect(this.pos.geo, this.geo)){
            tree.insert(this)
        }
    }
}