import React from 'react'
import {notification} from 'antd'

class NotFound extends React.Component{
  componentDidMount(){
    this.createText()
    notification.open({
      description: '鼠标移入到文字上，或者鼠标点击屏幕',
      style:{marginTop:64}
    });

  }
  componentWillUnmount(){
    window.cancelAnimationFrame(this.myReq)
    //绑定到DOM、window上的事件需要自己手动销毁吗
    notification.destroy()
  }
  createText =()=> {
    const _this = this
    // WRITTEN BY TRUMAN HEBERLE
    const COLOR = "#000"
    const MESSAGE = '404'

    const FONT_SIZE = 400;
    const AMOUNT = 3000;
    const CLEAR_AMOUNT = 2;
    const SIZE = 2;
    const INITIAL_DISPLACEMENT = 100;
    const INITIAL_VELOCITY = 5;
    const VELOCITY_RETENTION = 0.95;
    const SETTLE_SPEED = 0.01;
    const FLEE_SPEED = 0.1;
    const FLEE_DISTANCE = 50;
    const FLEE = true;
    const SCATTER_VELOCITY = 30;
    const SCATTER = true;
    
// MAIN
    const CLEAR_RADIUS = Math.round(CLEAR_AMOUNT + SIZE);
    const MOVED_O = Array.apply(null, Array(AMOUNT)).map(function () {return null;});

    const canvas = document.getElementById("spring-text");
    const ctx = canvas.getContext("2d");
    let offsetX = canvas.getBoundingClientRect().left
    let POINTS = [];
    let MOVED = [];
    let moved_length = 0;
    let MOUSE = {
      x: 0,
      y: 0
    }

    function Point(x,y,r,g,b,a) {
      let angle = Math.random() * 6.28;
      this.dest_x = x;
      this.dest_y = y;
      this.original_r = r;
      this.original_g = g;
      this.original_a = a;
      this.lastx = 0;
      this.lasty = 0;
      this.x = canvas.width/2 - x + (Math.random() - 0.5) * INITIAL_DISPLACEMENT;
      this.y = canvas.height/2 - y + (Math.random() - 0.5) * INITIAL_DISPLACEMENT;
      this.velx = INITIAL_VELOCITY * Math.cos(angle);
      this.vely = INITIAL_VELOCITY * Math.sin(angle);
      this.target_x = canvas.width/2 - x;
      this.target_y = canvas.height/2 - y;
      this.r = r;
      this.g = g;
      this.b = b;
      this.a = a;
      this.moved = false;
      MOVED[moved_length] = this;
      moved_length++;

      this.getX = function() {
        return this.x;
      }

      this.getY = function() {
        return this.y;
      }

      this.fleeFrom = function(x, y) {
        this.velx -= ((MOUSE.x - this.x) * FLEE_SPEED);
        this.vely -= ((MOUSE.y - this.y) * FLEE_SPEED);
      }

      this.settleTo = function(x, y) {
        this.velx = VELOCITY_RETENTION * (this.velx + (this.target_x - this.x) * SETTLE_SPEED);
        this.vely = VELOCITY_RETENTION * (this.vely + (this.target_y - this.y) * SETTLE_SPEED);
      }

      this.scatter = function() {
        let unit = this.unitVecTo(MOUSE.x, MOUSE.y);
        let vel = SCATTER_VELOCITY * (0.5 + Math.random() / 2);
        this.velx = -unit.x * vel;
        this.vely = -unit.y * vel;
      }

      this.checkMove = function() {
        this.moved = (!Math.abs(Math.round(this.target_x - this.x)) === false || !Math.abs(Math.round(this.target_y - this.y)) === false || !Math.abs(Math.round(this.velx)) === false || !Math.abs(Math.round(this.vely)) === false);
      }

      this.simpleMove = function() {
        this.checkMove();
        if (!this.moved) {
          return;
        }

        this.lastx = this.x;
        this.lasty = this.y;
        this.x += this.velx;
        this.y += this.vely;
        MOVED[moved_length] = this;
        moved_length++;
      }

      this.move = function() {
        if (this.distanceTo(MOUSE.x, MOUSE.y) <= FLEE_DISTANCE) {
          this.fleeFrom(MOUSE.x, MOUSE.y);
        }
        else {
          this.settleTo(this.target_x, this.target_y);
        }
        this.simpleMove();
      }

      this.distanceTo = function(x, y) {
        let dx = x - this.x;
        let dy = y - this.y;
        return Math.sqrt(dx*dx+ dy*dy);
      }

      this.unitVecTo = function(x, y) {
        let dx = x - this.x;
        let dy = y - this.y;
        let d = Math.sqrt(dx*dx + dy*dy);
        return {
          x: dx / d,
          y: dy / d
        };
      }

      this.inMotion = function() {
        return this.moved;
      }

      this.clear = function() {
        ctx.clearRect(this.lastx-CLEAR_RADIUS,this.lasty-CLEAR_RADIUS,CLEAR_RADIUS*2,CLEAR_RADIUS*2);
      }

      this.draw = function() {
        ctx.fillStyle = "rgba("+this.r+","+this.g+","+this.b+","+this.a+")";
        ctx.beginPath();
        ctx.arc(this.x,this.y,SIZE,0,2*Math.PI);
        ctx.fill();
      }
    }

    window.addEventListener("resize", function() {
      resizeCanvas()
      adjustText()
    });

    if (FLEE) {
      canvas.addEventListener("mousemove", function(event) {
        MOUSE.x = event.clientX -offsetX;
        MOUSE.y = event.clientY - 0;
      });
    }

    if (SCATTER) {
        canvas.addEventListener("click", function(event) {
        MOUSE.x = event.clientX-offsetX;
        MOUSE.y = event.clientY -0 ;
        for (let i=0; i<POINTS.length; i++) {
          POINTS[i].scatter();
        }
      });
    }

    function resizeCanvas() {
      canvas.width  = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
    }

    function adjustText() {
      ctx.fillStyle = COLOR;
      ctx.textBaseline = "middle";
      ctx.textAlign = "center";
      ctx.font = FONT_SIZE + "px Arial";
      ctx.fillText(MESSAGE, canvas.width/2, canvas.height/2);
      let textWidth = Number(ctx.measureText(MESSAGE).width);
      if (textWidth === 0) {
        return;
      }
      let minX = canvas.width/2 - textWidth/2;
      let minY = canvas.height/2 - FONT_SIZE/2;
      let data = ctx.getImageData(minX, minY, textWidth, FONT_SIZE).data;
      ctx.clearRect(0,0,canvas.width,canvas.height);
      let isBlank = true;
      for (let i=0; i<data.length; i++) {
        if (data[i] !== 0) {
          isBlank = false;
          break;
        }
      }

      if (!isBlank) {
        let count = 0;
        let curr = 0;
        let num = 0;
        let x = 0;
        let y = 0;
        let w = Math.floor(textWidth);
        POINTS = [];
        while (count < AMOUNT) {
          while (curr === 0) {
            num = Math.floor(Math.random() * data.length);
            curr = data[num];
          }
          num = Math.floor(num / 4);
          x = w/2 - num%w;
          y = FONT_SIZE/2 - Math.floor(num/w);
          POINTS.push(new Point(x,y,data[num*4],data[num*4 + 1],data[num*4 + 2],data[num*4 + 3]));
          curr = 0;
          count++;
        }
      }
    }

    function init() {
      resizeCanvas()
      adjustText()
      animate()
      // window.requestAnimationFrame(animate);
    }

    function animate() {
      update();
      draw();
    }

    function update() {
      for (let i=0; i<POINTS.length; i++) {
        POINTS[i].move()
      }
    }

    function draw() {
      for (let i=0; i<moved_length; i++) {
        MOVED[i].clear();
      }
      MOVED = MOVED_O;
      moved_length = 0;

      for (let i=0; i<POINTS.length; i++) {
        POINTS[i].draw()
      }

      _this.myReq = window.requestAnimationFrame(animate);
    }

    init();
  }
  render(){
    return (
      <div>
        <div style={styles.bg}>
          <canvas id="spring-text" style={styles.bg}/>
        </div>
        <a href="/"  style={{color:'#000',position: 'absolute'}}>返回主页</a>
      </div>
    )
  }
}
const styles = {
  bg: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: 'calc(100vh - 64px)',
  },
}
export default NotFound
