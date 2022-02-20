importScripts('./geometry.js', './intersection.js')

class quadtree{
    constructor(x, y, w, h){
        this.geo = new Rectangle(x, y, w, h)
        this.childs = []
        this.data = []
        this.length = 0
        this.divide = false
    }

    subdivide(){
        this.childs.push(new quadtree(this.geo.x + this.geo.w / 2, this.geo.y, this.geo.w / 2, this.geo.h / 2))
        this.childs.push(new quadtree(this.geo.x, this.geo.y, this.geo.w / 2, this.geo.h / 2))
        this.childs.push(new quadtree(this.geo.x, this.geo.y + this.geo.h / 2, this.geo.w / 2, this.geo.h / 2))
        this.childs.push(new quadtree(this.geo.x + this.geo.w / 2, this.geo.y + this.geo.h / 2, this.geo.w / 2, this.geo.h / 2))
    }

    insert(object){
        if(!isIntersect(this.geo, object.geo)) return false
        else if(this.length < 4){
            ++this.length
            this.data.push(object)
            return true
        }
        else{
            if(!this.divide) this.subdivide()
            for(let c of this.childs){
                if(c.insert(object)) return true
            }
        }
    }
    
    query(object){
        if(!isIntersect(this.geo, object.geo)) return
        for(let d of this.data){
            if(isIntersect(d.geo, object.geo)){
                if(d.team != object.team){
                    d.team = object.team
                    return d
                }
            }
        }
        for(let c of this.childs) {
            let a = c.query(object)
            if(a) return a
        }
    }
}