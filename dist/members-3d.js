// A real Three.js backing plate; the readable, accessible table stays in HTML.
export function createMemberTable(T) {
  const table=document.querySelector('#members .table-wrap');
  if(!table)return;
  const stage=document.createElement('div');
  stage.className='member-table-stage';
  table.before(stage);stage.append(table);
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  const fine=matchMedia('(pointer:fine)');
  let renderer,scene,camera,plate,key,frame=0,visible=false;
  let targetX=0,targetY=0,tiltX=0,tiltY=0,last=0;
  function initialize(){
    scene=new T.Scene();
    renderer=new T.WebGLRenderer({alpha:true,antialias:true,powerPreference:'low-power'});
    renderer.setPixelRatio(Math.min(devicePixelRatio||1,1.5));
    renderer.setClearColor(0,0);renderer.outputColorSpace=T.SRGBColorSpace;
    renderer.domElement.className='member-table-canvas';
    renderer.domElement.setAttribute('aria-hidden','true');stage.prepend(renderer.domElement);
    camera=new T.PerspectiveCamera(45,1,.1,3000);camera.position.z=1200;
    plate=new T.Group();scene.add(plate);
    scene.add(new T.AmbientLight(0xffffff,2));
    key=new T.DirectionalLight(0xfff6e1,2.5);key.position.set(-350,400,600);scene.add(key);
    const fill=new T.DirectionalLight(0xa9bba0,1.5);fill.position.set(400,-200,200);scene.add(fill);
    renderer.domElement.addEventListener('webglcontextlost',e=>{e.preventDefault();cancelAnimationFrame(frame);frame=0;stage.classList.remove('table-three-ready')});
    renderer.domElement.addEventListener('webglcontextrestored',()=>{stage.classList.add('table-three-ready');render()});
    resize();stage.classList.add('table-three-ready');
  }
  function resize(){
    if(!renderer)return;
    const width=stage.clientWidth,height=stage.clientHeight;
    const rw=width+48,rh=height+48;
    camera.fov=2*Math.atan(rh/(2*1200))*180/Math.PI;camera.aspect=rw/rh;camera.updateProjectionMatrix();
    renderer.setSize(rw,rh,false);
    while(plate.children.length){const mesh=plate.children[0];plate.remove(mesh);mesh.geometry.dispose();mesh.material.forEach(m=>m.dispose())}
    const shape=new T.Shape(),w=width/2+4,h=height/2+4,r=18;
    shape.moveTo(-w+r,-h);shape.lineTo(w-r,-h);shape.quadraticCurveTo(w,-h,w,-h+r);
    shape.lineTo(w,h-r);shape.quadraticCurveTo(w,h,w-r,h);shape.lineTo(-w+r,h);
    shape.quadraticCurveTo(-w,h,-w,h-r);shape.lineTo(-w,-h+r);shape.quadraticCurveTo(-w,-h,-w+r,-h);
    const geometry=new T.ExtrudeGeometry(shape,{depth:12,bevelEnabled:true,bevelThickness:2,bevelSize:2,bevelSegments:3,curveSegments:8});
    const materials=[new T.MeshStandardMaterial({color:'#e3e8dc',roughness:.65}),new T.MeshStandardMaterial({color:'#a9b89c',roughness:.52,metalness:.12})];
    const mesh=new T.Mesh(geometry,materials);mesh.position.z=-16;plate.add(mesh);render();
  }
  function render(){
    if(!renderer)return;
    plate.rotation.set(tiltX,tiltY,0);
    key.position.set(-350+tiltY*8000,400+tiltX*6000,600);
    table.style.setProperty('--table-rx',`${tiltX*-180/Math.PI}deg`);
    table.style.setProperty('--table-ry',`${tiltY*180/Math.PI}deg`);
    renderer.render(scene,camera);
  }
  function animate(now){
    frame=0;if(!visible||document.hidden)return;
    const dt=last?Math.min((now-last)/1000,.05):1/60;last=now;
    const smoothing=1-Math.exp(-dt*8);
    tiltX+=(targetX-tiltX)*smoothing;tiltY+=(targetY-tiltY)*smoothing;render();
    if(Math.abs(targetX-tiltX)+Math.abs(targetY-tiltY)>.00002)frame=requestAnimationFrame(animate);
  }
  function start(){if(renderer&&visible&&!frame&&!document.hidden){last=0;frame=requestAnimationFrame(animate)}}
  stage.addEventListener('pointermove',e=>{
    if(reduced.matches||!fine.matches)return;
    const b=stage.getBoundingClientRect();
    targetX=((e.clientY-b.top)/b.height-.5)*.025;
    targetY=((e.clientX-b.left)/b.width-.5)*.035;start();
  },{passive:true});
  stage.addEventListener('pointerleave',()=>{targetX=targetY=0;start()},{passive:true});
  const observer=new IntersectionObserver(([entry])=>{
    visible=entry.isIntersecting;
    if(visible&&!renderer){try{initialize()}catch(error){console.warn('Member table keeps its static appearance.',error);stage.classList.remove('table-three-ready')}}
    if(visible)start();else{cancelAnimationFrame(frame);frame=0}
  },{rootMargin:'100px'});observer.observe(stage);
  new ResizeObserver(resize).observe(stage);
  reduced.addEventListener('change',()=>{targetX=targetY=tiltX=tiltY=0;render()});
  document.addEventListener('visibilitychange',()=>{if(document.hidden){cancelAnimationFrame(frame);frame=0}else start()});
}
