let rate=500;
let toggle=false;
let score=0;
const ch=document.querySelector("canvas").height;
const cw=document.querySelector("canvas").width;
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
            if (this.y+this.h>ch){
                this.vY=0;
			    this.y=ch-this.h;
            }
            if(this.y<0){this.vY=0;this.y=0;}
            if (this.x+this.w>cw){
                this.vX=0;
		    	this.x=cw-this.w;
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
const player=new Obj(cw/2,35,30,30,0,0,"black");
const coin=new Obj(cw*Math.random(),ch*Math.random(),30,30,0,0,"rgb(0,255,0)");
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
        if(event.key=="d"){dd=true;}
        if(event.key=="a"){aa=true;}
        if(event.key=="w"){ww=true;}
        if(event.key=="s"){ss=true;}
        if(event.key==" "){toggle=!toggle;}
    }
})
document.addEventListener("keyup",(event)=>{
    if(event.key=="d"){dd=false;}
    if(event.key=="a"){aa=false;}
    if(event.key=="w"){ww=false;}
    if(event.key=="s"){ss=false;}
})
let alive=true;
function drawFrame(){
    if(alive&&toggle){
    d();a();w();s();
    ctx.clearRect(0,0,cw,ch);
    player.draw(true);
    for(const i of enemys){
        if(Obj.coll(i,player)){alive=false;}
        i.draw(false);
    }
    coin.draw(false);
    if(Obj.coll(coin,player)){
        score+=1;
        document.getElementById("score").innerHTML="score:"+score;
        coin.x=cw*Math.random();
        coin.y=ch*Math.random();
    }
    }
    requestAnimationFrame(drawFrame);
}
let idd=setInterval(spawn,rate);
let enemys=[];
function spawn(){
    if(toggle){
    let enemy;
    let direc=Math.floor(4*Math.random());
    switch(direc){
        case 0:
            enemy=new Obj(cw*Math.random(),-40,40,40,0,5,"red");
            break;
        case 1:
            enemy=new Obj(cw,ch*Math.random(),40,40,-5,0,"red");
            break;
        case 2:
            enemy=new Obj(cw*Math.random(),ch,40,40,0,-5,"red");
            break;
        case 3:
            enemy=new Obj(-40,ch*Math.random(),40,40,5,0,"red");
            break;
    }
    enemys.push(enemy);
    }
}
drawFrame();