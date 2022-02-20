//importScripts('./geometry.js')

class cannon{

}

class bullet{
    constructor(x, y, r, vx, vy, team){
        this.vx = vx
        this.vy = vy
        this.team = team
        this.detector = null
        this.geo = new Circle(x, y, r)
    }

    move(){
        this.geo.x += this.vx
        this.geo.y += this.vy

        if(this.geo.x - this.geo.r <= 0 && this.vx <= 0 || 
            this.geo.x + this.geo.r >= end && this.vx >= 0){
            this.vx *= -1
        }
        if(this.geo.y - this.geo.r <= 0 && this.vy <= 0 || 
            this.geo.y + this.geo.r >= end && this.vy >= 0){
            this.vy *= -1
        }
        //return 0

        
        let ans = tree.query(this)
        if(ans) return ans
    }
}

class block{
    constructor(x, y, w, team){
        this.team = team
        this.geo = new Rectangle(x, y, w, w)
    }
}

class Queue{
    constructor(){
        this.data = {};
        this.head = 0;
        this.tail = 0;
    }

    enqueue(item) {
        this.data[this.tail] = item;
        this.tail++;
    };

    dequeue() {
      let item = this.data[this.head];
      delete this.data[this.head];
      ++this.head;
      return item;
    };
  }

class Detector{
    constructor(){
        this.objects = new Queue()
        this.msg = []
        this.length = 0
        this.origin = {
            command: 'update',
            value: {
                r: r,
                width: width,
                bullets: {
                    1: [],
                    2: [],
                    3: [],
                    4: []
                },
                blocks: {
                    1: [],
                    2: [],
                    3: [],
                    4: []
                }
            }
        }

    }

    insert(obj){
        this.objects.enqueue(obj)
        obj.detector = this
        ++this.length
    }

    update(){
        let obj = null
        this.msg = JSON.parse(JSON.stringify(this.origin))
        for(let i=0; i<this.length; ++i){
            obj = this.objects.dequeue()
            //console.log(obj)
            let block = obj.move()
            if(block) {
                this.msg.value.blocks[block.team].push([block.geo.x, block.geo.y])
                //console.log(this.msg)
                --this.length
            }
            else{
                this.msg.value.bullets[obj.team].push([obj.geo.x, obj.geo.y])
                this.objects.enqueue(obj)
            }
        }
        let m = encoder.encode(JSON.stringify(this.msg))
        postMessage(m, [m.buffer])
    }
}