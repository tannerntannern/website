var t;let e,a,i,n;class s{constructor(t,e,a,i){this.x=t,this.y=e,this.xSpeed=a,this.ySpeed=i}}class r{constructor(t,e){this.p1=t,this.p2=e}}let o=1e3/60,l=0,c=0,u=60,h=0,d=0,f=0,p=0,y=!1,m=!1,x=!1,w=window,S=w.requestAnimationFrame||(e=Date.now(),function(t){return a=Date.now(),i=Math.max(0,o-(a-e)),e=a+i,setTimeout(function(){t(a+i)},i)}),M=w.cancelAnimationFrame||clearTimeout,g=function(...t){},b=g,T=g,v=g,A=g,F;function D(t){if(F=S(D),!(t<c+p)){for(l+=t-c,c=t,b(t,l),t>h+1e3&&(u=.9*d*1e3/(t-h)+.09999999999999998*u,h=t,d=0),d++,f=0;l>=o;)if(T(o),l-=o,++f>=240){x=!0;break}v(l/o),A(u,x),x=!1}}class P{static getSimulationTimestep(){return o}static setSimulationTimestep(t){return o=t,this}static getFPS(){return u}static getMaxAllowedFPS(){return 1e3/p}static setMaxAllowedFPS(t){return void 0===t&&(t=1/0),0===t?this.stop():p=1e3/t,this}static resetFrameDelta(){var t=l;return l=0,t}static setBegin(t){return b=t||b,this}static setUpdate(t){return T=t||T,this}static setDraw(t){return v=t||v,this}static setEnd(t){return A=t||A,this}static start(){return m||(m=!0,F=S(function(t){v(1),y=!0,c=t,h=t,d=0,F=S(D)})),this}static stop(){return y=!1,m=!1,M(F),this}static isRunning(){return y}}function k(){P.stop();let t=document.querySelector("canvas").getContext("2d"),e=document.body.clientWidth,a=window.innerHeight;t.canvas.width=e,t.canvas.height=a;let i=Math.min(Math.round(e*a/1900),1e3),n=e+130,o=a+130,l=e+260,c=a+260,u=[];for(let t=0;t<i;t++)u[t]=new s(Math.random()*l,Math.random()*c,.5*Math.random()-.25+.5,.5*Math.random()-.25);let h=[];for(let t=0;t<i;t++)for(let e=t;e<i;e++)h.push(new r(u[t],u[e]));let d=t.createLinearGradient(0,0,e,a);d.addColorStop(0,"#1e1e3c"),d.addColorStop(1,"#1c3f4a"),P.setMaxAllowedFPS(80).setUpdate(function(t){for(let e of(t/=20,u))e.x+=t*e.xSpeed,e.y+=t*e.ySpeed,e.x<-130&&(e.x+=l),e.x>n&&(e.x-=l),e.y<-130&&(e.y+=c),e.y>o&&(e.y-=c)}).setDraw(function(){for(let i of(t.fillStyle=d,t.fillRect(-1,-1,e+2,a+2),t.fillStyle="#ffe699",u))t.fillRect(i.x-1,i.y-1,3,3);for(let e of(t.strokeStyle="#d8dfa6",h)){let a=e.p1,i=e.p2,n=Math.abs(i.x-a.x)+Math.abs(i.y-a.y);n<130&&(t.globalAlpha=1-n/130,t.beginPath(),t.moveTo(a.x,a.y),t.lineTo(i.x,i.y),t.stroke())}t.globalAlpha=1}).start()}k(),$(window).on("resize",function(){let e=this,a=arguments,i=t&&!n;clearTimeout(n),n=setTimeout(function(){n=null,t||k.apply(e,a)},200),i&&k.apply(e,a)}).on("blur focus",function(t){if($(this).data("prevType")!=t.type)switch(t.type){case"blur":P.stop();break;case"focus":P.start()}$(this).data("prevType",t.type)});