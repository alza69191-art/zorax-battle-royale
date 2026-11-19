import * as THREE from 'three';

const root = document.getElementById('game-root');
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x9aa99b);
scene.fog = new THREE.Fog(0x9aa99b, 75, 190);
const camera = new THREE.PerspectiveCamera(68, innerWidth / innerHeight, 0.1, 260);
const renderer = new THREE.WebGLRenderer({antialias:false, powerPreference:'low-power'});
renderer.setPixelRatio(Math.min(devicePixelRatio, 1.35));
renderer.setSize(innerWidth, innerHeight);
renderer.shadowMap.enabled = false;
renderer.outputColorSpace = THREE.SRGBColorSpace;
root.appendChild(renderer.domElement);

scene.add(new THREE.HemisphereLight(0xdce8e1, 0x62644b, 2.0));
const sun = new THREE.DirectionalLight(0xffe1b5, 2.2);
sun.position.set(-35, 65, 25); scene.add(sun);

const mat = (color, roughness=1, metalness=0) => new THREE.MeshStandardMaterial({color,roughness,metalness});
const groundMat=mat(0x777b59), sandMat=mat(0x9a8b68), darkMat=mat(0x303b34), orangeMat=mat(0xff6828), wallMat=mat(0x77786b), roofMat=mat(0x4b5148);
const ground=new THREE.Mesh(new THREE.PlaneGeometry(220,220),groundMat);ground.rotation.x=-Math.PI/2;ground.position.y=-.12;scene.add(ground);
const grid=new THREE.GridHelper(220,44,0x525b42,0x525b42);grid.position.y=-.1;grid.material.transparent=true;grid.material.opacity=.18;scene.add(grid);

const obstacles=[];
function box(x,y,z,w,h,d,material,collide=true){
 const m=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),material);m.position.set(x,y+h/2,z);scene.add(m);
 if(collide) obstacles.push({x,z,hw:w/2+.55,hd:d/2+.55});
 return m;
}
function building(x,z,w,d,h=5){
 box(x,0,z,w,h,d,wallMat);box(x,h,z,w+.25,.35,d+.25,roofMat,false);
 for(let side=-1;side<=1;side+=2){box(x+side*w*.28,1.7,z-d/2-.03,w*.18,2.1,.08,darkMat,false);}
 box(x,1.3,z+d/2+.04,w*.24,2.6,.1,darkMat,false);
}
building(-24,-19,17,13,5);building(25,-28,20,14,6);building(34,20,14,18,5);building(-34,27,18,14,5);
building(0,-48,25,10,4);building(-4,39,20,12,5);
for(let i=0;i<24;i++){
 const x=(Math.random()-.5)*150,z=(Math.random()-.5)*150;
 if(Math.abs(x)<13&&Math.abs(z)<13)continue;
 const r=1.1+Math.random()*2.2;
 const rock=new THREE.Mesh(new THREE.DodecahedronGeometry(r,0),sandMat);rock.position.set(x,r*.55,z);rock.rotation.set(Math.random(),Math.random(),Math.random());rock.scale.y=.65;scene.add(rock);
}
for(let i=0;i<18;i++){
 const x=(Math.random()-.5)*150,z=(Math.random()-.5)*150;
 const trunk=new THREE.Mesh(new THREE.CylinderGeometry(.18,.3,2.5,5),darkMat);trunk.position.set(x,1.25,z);scene.add(trunk);
 const crown=new THREE.Mesh(new THREE.DodecahedronGeometry(1.8,0),mat(0x566448));crown.position.set(x,3.1,z);crown.scale.set(1.1,.8,1);scene.add(crown);
}
for(let i=0;i<9;i++){const x=-55+i*14;box(x,0,-66,1.2,1.1,1.2,orangeMat,false);box(x,0,66,1.2,1.1,1.2,orangeMat,false);}

const player=new THREE.Group();scene.add(player);
const body=new THREE.Mesh(new THREE.CapsuleGeometry(.48,.95,3,6),darkMat);body.position.y=1.15;player.add(body);
const chest=new THREE.Mesh(new THREE.BoxGeometry(.82,.58,.48),mat(0x4b5847));chest.position.set(0,1.45,0);player.add(chest);
const head=new THREE.Mesh(new THREE.SphereGeometry(.31,8,6),mat(0x333b35));head.position.y=2.05;player.add(head);
const visor=new THREE.Mesh(new THREE.BoxGeometry(.42,.12,.12),mat(0xff6a24,.5));visor.position.set(0,2.07,-.27);player.add(visor);
const pack=new THREE.Mesh(new THREE.BoxGeometry(.55,.72,.28),mat(0x252f29));pack.position.set(0,1.45,.36);player.add(pack);
const gun=new THREE.Group();gun.position.set(.45,1.35,-.52);player.add(gun);
const barrel=new THREE.Mesh(new THREE.BoxGeometry(.16,.16,.95),darkMat);barrel.position.z=-.36;gun.add(barrel);
const grip=new THREE.Mesh(new THREE.BoxGeometry(.13,.35,.16),orangeMat);grip.position.set(0,-.22,-.12);gun.add(grip);
player.position.set(0,0,8);


/* ZORAX world assets: lightweight procedural equivalents for browser delivery.
   The editable Blender scene remains the high-detail source of truth. */
const steelMat=mat(0x50574f,.82,.25), tireMat=mat(0x171b19), glassMat=mat(0x18343a,.3,.35), fabricMat=mat(0xc6b88f);
function vehicle(x,z,type='jeep'){
 const g=new THREE.Group();scene.add(g);g.position.set(x,0,z);
 const addBox=(w,h,d,px,py,pz,m)=>{const o=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),m);o.position.set(px,py,pz);g.add(o);return o;};
 const addWheel=(px,pz,r=.52)=>{const o=new THREE.Mesh(new THREE.CylinderGeometry(r,r,.28,10),tireMat);o.rotation.z=Math.PI/2;o.position.set(px,.62,pz);g.add(o);const hub=new THREE.Mesh(new THREE.CylinderGeometry(r*.38,r*.38,.3,8),steelMat);hub.rotation.z=Math.PI/2;hub.position.copy(o.position);g.add(hub);};
 if(type==='jeep'){
  addBox(4.1,.55,1.9,0,1,0,steelMat);addBox(3.1,.75,1.8,-.25,1.55,0,mat(0x394632));addBox(1.2,.4,1.8,1.45,1.9,0,mat(0x46543b));
  addBox(1.8,.14,1.8,-.7,2.35,0,mat(0x303b30));
  for(const a of [-1.45,1.45])for(const b of [-1,1])addWheel(a,b*.98,.52);
  addBox(.55,.22,.06,.0,1.55,-.93,orangeMat);
 }else if(type==='truck'){
  addBox(6.2,.55,2.1,-.2,1,0,steelMat);addBox(1.9,1.55,2,2.05,1.75,0,mat(0x43503a));addBox(3.2,1.1,2.05,-1.45,1.6,0,mat(0x59614e));addBox(3.25,.12,2.12,-1.45,2.22,0,steelMat);
  for(const a of [-2.55,-.65,2.1])for(const b of [-1,1])addWheel(a,b*1.02,.5);
  addBox(.55,.22,.06,2.1,1.5,-1.03,orangeMat);
 }else{
  addBox(5.8,1.2,2.6,0,1.2,0,mat(0x394633));addBox(4.4,.8,2.35,-.2,2.1,0,steelMat);addBox(1.5,.55,1.5,-.3,2.8,0,steelMat);addBox(1.8,.16,.16,.9,2.85,0,tireMat);
  for(const a of [-2,-.7,.7,2])for(const b of [-1,1])addWheel(a,b*1.22,.42);
  addBox(.7,.22,.05,-.2,2.1,-1.2,orangeMat);
 }
 g.userData={vehicle:true,type};return g;
}
vehicle(-66,-45,'jeep');vehicle(-48,-45,'truck');vehicle(-29,-45,'apc');
function transportPlane(x,z){
 const g=new THREE.Group();scene.add(g);g.position.set(x,5,z);
 const b=(w,h,d,px,py,pz,m)=>{const o=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),m);o.position.set(px,py,pz);g.add(o);return o;};
 b(10,1.5,1.6,0,0,0,mat(0x46513c));b(1.5,.4,1.3,5,.2,0,mat(0x46513c));b(2.6,.18,14,-.3,.1,0,mat(0x59614d));b(1.2,2,.2,-4.5,.9,0,mat(0x46513c));b(1.3,.18,5,-4.2,.3,0,mat(0x46513c));
 for(const side of [-1,1]){b(2.2,.7,.8,-.5,-.65,side*3,steelMat);const prop=new THREE.Mesh(new THREE.CylinderGeometry(.08,.08,.5,8),orangeMat);prop.rotation.x=Math.PI/2;prop.position.set(.9,-.65,side*3);g.add(prop);}
 const cockpit=b(1.3,.5,1.1,4.1,.55,0,glassMat);return g;
}
transportPlane(55,55);
function parachute(x,z){
 const g=new THREE.Group();scene.add(g);g.position.set(x,0,z);
 const canopy=new THREE.Mesh(new THREE.SphereGeometry(3,12,7,0,Math.PI*2,0,Math.PI/2),fabricMat);canopy.scale.y=.5;canopy.position.y=12;g.add(canopy);
 for(let i=0;i<8;i++){const a=i*Math.PI/4;const line=new THREE.Mesh(new THREE.CylinderGeometry(.025,.025,5.5,5),steelMat);line.position.set(Math.cos(a)*1.3,8.7,Math.sin(a)*1.3);line.rotation.z=.22;g.add(line);}
 const jumper=new THREE.Mesh(new THREE.CapsuleGeometry(.35,.8,3,6),darkMat);jumper.position.y=5.8;g.add(jumper);
 const pack2=new THREE.Mesh(new THREE.BoxGeometry(.45,.65,.25),orangeMat);pack2.position.set(0,5.9,.35);g.add(pack2);
}
parachute(72,35);
function loot(x,z,color=0xff6828){
 const c=new THREE.Mesh(new THREE.BoxGeometry(1.15,.8,.85),mat(color,.8,.1));c.position.set(x,.42,z);scene.add(c);
 const band=new THREE.Mesh(new THREE.BoxGeometry(1.18,.12,.9),steelMat);band.position.set(x,.5,z);scene.add(band);
}
loot(-72,18);loot(65,-22,0x8d9b68);loot(18,65);
function poiHouse(x,z,w=13,d=11){
 box(x,0,z,w,4.6,d,wallMat);box(x,4.6,z,w+.3,.3,d+.3,roofMat,false);
 box(x+w*.25,1.3,z-d/2-.05,1.7,2.4,.12,glassMat,false);
 box(x-w*.25,1.3,z-d/2-.05,1.7,2.4,.12,glassMat,false);
}
poiHouse(-78,72);poiHouse(-98,48);poiHouse(85,80);poiHouse(94,55);
box(82,0,-82,24,8,19,steelMat);box(82,8,-82,25,.5,20,roofMat,false);

const targets=[];
const targetMat=mat(0x6d2920), targetGlow=mat(0xff542b,.45);
for(let i=0;i<5;i++){
 const group=new THREE.Group();const x=[-43,42,8,-10,52][i],z=[-3,-3,43,-57,42][i];
 const torso=new THREE.Mesh(new THREE.CapsuleGeometry(.42,.8,3,6),targetMat);torso.position.y=1.15;group.add(torso);
 const helmet=new THREE.Mesh(new THREE.SphereGeometry(.32,8,6),darkMat);helmet.position.y=2.08;group.add(helmet);
 const marker=new THREE.Mesh(new THREE.SphereGeometry(.13,8,6),targetGlow);marker.position.set(0,2.45,0);group.add(marker);
 group.position.set(x,0,z);group.userData={alive:true,health:100};scene.add(group);targets.push(group);
 const ring=new THREE.Mesh(new THREE.TorusGeometry(.75,.045,5,18),orangeMat);ring.rotation.x=Math.PI/2;ring.position.set(x,.12,z);scene.add(ring);
}

let yaw=0,pitch=-.12,velocityY=0,onGround=true,ammo=30,kills=0,active=false,elapsed=0,lastShot=0,reloading=false;
const keys={};const clock=new THREE.Clock();const raycaster=new THREE.Raycaster();
const startScreen=document.getElementById('start-screen'),pauseScreen=document.getElementById('pause-screen');
const toast=document.getElementById('toast');
function notify(t){toast.textContent=t;toast.style.opacity='1';clearTimeout(notify.timer);notify.timer=setTimeout(()=>toast.style.opacity='0',1250);}
function start(){active=true;startScreen.classList.add('hidden');pauseScreen.classList.add('hidden');renderer.domElement.requestPointerLock?.();}
document.getElementById('start-button').addEventListener('click',start);
document.getElementById('resume-button').addEventListener('click',()=>{active=true;pauseScreen.classList.add('hidden');renderer.domElement.requestPointerLock?.();});
document.addEventListener('pointerlockchange',()=>{if(document.pointerLockElement!==renderer.domElement&&active){active=false;pauseScreen.classList.remove('hidden');}});
document.addEventListener('mousemove',e=>{if(!active||document.pointerLockElement!==renderer.domElement)return;yaw-=e.movementX*.0022;pitch-=e.movementY*.0018;pitch=THREE.MathUtils.clamp(pitch,-.65,.35);});
document.addEventListener('keydown',e=>{keys[e.code]=true;if(e.code==='Space'&&active&&onGround){velocityY=7.2;onGround=false;}if(e.code==='KeyR'&&active)reload();if(e.code==='Escape')active=false;});
document.addEventListener('keyup',e=>keys[e.code]=false);
document.addEventListener('mousedown',e=>{if(e.button===0&&active&&document.pointerLockElement===renderer.domElement)shoot();});
function reload(){if(reloading||ammo===30)return;reloading=true;notify('RELOADING');setTimeout(()=>{ammo=30;document.getElementById('ammo').textContent=ammo;reloading=false;},1150);}
function shoot(){
 const now=performance.now();if(now-lastShot<170||reloading)return;lastShot=now;
 if(ammo<=0){notify('PRESS R TO RELOAD');return;}ammo--;document.getElementById('ammo').textContent=ammo;
 const dir=new THREE.Vector3();camera.getWorldDirection(dir);raycaster.set(camera.position,dir);raycaster.far=95;
 const living=targets.filter(t=>t.userData.alive);const hits=raycaster.intersectObjects(living.flatMap(t=>t.children),false);
 if(hits.length){const target=hits[0].object.parent;target.userData.health-=50;
  if(target.userData.health<=0){target.userData.alive=false;target.visible=false;kills++;document.getElementById('kills').textContent=kills;document.getElementById('progress').style.width=(kills/5*100)+'%';notify(kills===5?'AREA SECURED':'TARGET ELIMINATED');}
  else notify('TARGET HIT');
 }else notify('SHOT FIRED');
}
function blocked(x,z){return obstacles.some(o=>Math.abs(x-o.x)<o.hw&&Math.abs(z-o.z)<o.hd);}
function update(dt){
 if(!active)return;
 elapsed+=dt;const mm=Math.floor(elapsed/60).toString().padStart(2,'0'),ss=Math.floor(elapsed%60).toString().padStart(2,'0');document.getElementById('clock').textContent=mm+':'+ss;
 const forward=(keys.KeyW?1:0)-(keys.KeyS?1:0),strafe=(keys.KeyD?1:0)-(keys.KeyA?1:0);
 const speed=keys.ShiftLeft?12:7.5;const move=new THREE.Vector3(-Math.sin(yaw)*forward+Math.cos(yaw)*strafe,0,-Math.cos(yaw)*forward-Math.sin(yaw)*strafe);
 if(move.lengthSq()>0){move.normalize().multiplyScalar(speed*dt);const nx=THREE.MathUtils.clamp(player.position.x+move.x,-99,99),nz=THREE.MathUtils.clamp(player.position.z+move.z,-99,99);if(!blocked(nx,player.position.z))player.position.x=nx;if(!blocked(player.position.x,nz))player.position.z=nz;}
 velocityY-=18*dt;player.position.y+=velocityY*dt;if(player.position.y<=0){player.position.y=0;velocityY=0;onGround=true;}
 player.rotation.y=yaw;gun.rotation.x=THREE.MathUtils.clamp(pitch,-.3,.3);
 const offset=new THREE.Vector3(Math.sin(yaw)*7,3.4+pitch*2,Math.cos(yaw)*7);const desired=player.position.clone().add(offset);camera.position.lerp(desired,1-Math.pow(.001,dt));const aimPoint=player.position.clone().add(new THREE.Vector3(-Math.sin(yaw)*35,1.5+pitch*35,-Math.cos(yaw)*35));camera.lookAt(aimPoint);
}
function animate(){requestAnimationFrame(animate);const dt=Math.min(clock.getDelta(),.04);update(dt);renderer.render(scene,camera);}
animate();
addEventListener('resize',()=>{camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();renderer.setPixelRatio(Math.min(devicePixelRatio,1.35));renderer.setSize(innerWidth,innerHeight);});
