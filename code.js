let rate=500;
let timer=0;
const ctx=document.querySelector("canvas").getContext("2d");
class Obj{
    constructor(posX,posY,sizeX,sizeY,velocityX,velocityY,objColor){
        this.color=objColor;
        this.x=posX;
        this.y=posY;
        this.w=sizeX;
        this.h=sizeY;
        this.vX=velocityX;
        this.vY=velocityY;
    }
    draw(physics){
        if (physics){
            if (this.y+this.h>document.querySelector("canvas").height){
                this.vY=0;
			    this.y=document.querySelector("canvas").height-this.h;
            }
            if(this.y<0){this.vY=0;this.y=0;}
            if (this.x+this.w>document.querySelector("canvas").width){
                this.vX=0;
		    	this.x=document.querySelector("canvas").width-this.w;
            }
            if(this.x<0){this.vX=0;this.x=0;}
            
        }
        this.x+=this.vX;
        this.y+=this.vY;
        if(physics){this.vY+=0.3;}
        ctx.fillStyle=this.color;
        ctx.fillRect(this.x,this.y,this.w,this.h);
    }
    static coll(obj1,obj2){
        if ((obj1.y+obj1.h>obj2.y)&&(obj2.x+obj2.w>obj1.x)&&(obj1.x+obj1.w>obj2.x)&&(obj2.y+obj2.h>obj1.y)){
            return true;
        }else{return false;}
    }
}
const player=new Obj(300,35,30,30,0,0,"black");
document.getElementById("colo").addEventListener("input",(event)=>{
    player.color=event.target.value;
})
document.getElementById("rate").addEventListener("input",(event)=>{
    clearInterval(idd);
    rate=Number(event.target.value);
    idd=setInterval(spawn,rate);
})
let dd=false;let aa=false;let ww=false;let ss=false;
function d(){if(dd){player.vX+=1;}}
function a(){if(aa){player.vX-=1;}}
function w(){if(ww){player.vY-=1;}}
function s(){if(ss){player.vY+=1;}}
document.addEventListener("keydown",(event)=>{
    if (event.repeat==false){
        if (event.key=="d"){dd=true;}
        if (event.key=="a"){aa=true;}
        if (event.key=="w"){ww=true;}
        if (event.key=="s"){ss=true;}
    }
})
document.addEventListener("keyup",(event)=>{
    if (event.key=="d"){dd=false;}
    if (event.key=="a"){aa=false;}
    if (event.key=="w"){ww=false;}
    if (event.key=="s"){ss=false;}
})
let alive=true;
function drawFrame(){
    time();
    d();a();w();s();
    ctx.clearRect(0,0,document.querySelector("canvas").width,document.querySelector("canvas").height);
    if(alive==true){player.draw(true);}
    for(const i of enemys){
        if(Obj.coll(i,player)){alive=false;}
        i.draw(false);
    }
    requestAnimationFrame(drawFrame);
}
let idd=setInterval(spawn,rate);
let enemys=[];
function spawn(){
    let enemy;
    let direc=Math.floor(4*Math.random());
    switch(direc){
        case 0:
            enemy=new Obj(600*Math.random(),-40,40,40,0,5,"red");
            break;
        case 1:
            enemy=new Obj(600,300*Math.random(),40,40,-5,0,"red");
            break;
        case 2:
            enemy=new Obj(600*Math.random(),300,40,40,0,-5,"red");
            break;
        case 3:
            enemy=new Obj(-40,300*Math.random(),40,40,5,0,"red");
            break;
    }
    enemys.push(enemy);
}
function time(){
    timer+=1/60;
    document.getElementById("timer").innerHTML="time:"+Math.round(timer);
}
drawFrame();
t();