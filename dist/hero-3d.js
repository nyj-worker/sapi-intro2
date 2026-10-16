// Local Three.js modules keep this scene independent of third-party CDNs.
import { polygons } from './namyangju-map.js';
import { createMemberTable } from './members-3d.js';

const host = document.querySelector('.city-3d');
if (host) {
  import('./vendor/three.module.js').then(THREE => {
    createMemberTable(THREE);
    createCity(THREE, host);
  }).catch(error => {
    console.warn('3D city unavailable; showing the illustrated map.', error);
    host.classList.remove('three-ready');
  });
}

function createCity(T, host) {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const scene = new T.Scene();
  const camera = new T.OrthographicCamera(-7, 7, 6, -6, .1, 100);
  const restingZoom = 1.3;
  const openingZoom = restingZoom * 1.3;
  const introDuration = 5.5;
  camera.zoom = reduced.matches ? restingZoom : openingZoom;
  const renderer = new T.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'low-power' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
  renderer.setClearColor(0x000000, 0);
  renderer.outputColorSpace = T.SRGBColorSpace;
  renderer.toneMapping = T.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.12;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = T.PCFSoftShadowMap;
  renderer.domElement.setAttribute('aria-hidden', 'true');
  host.append(renderer.domElement);

  const root = new T.Group();
  scene.add(root);
  scene.add(new T.AmbientLight(0xffffff, .85));
  scene.add(new T.HemisphereLight(0xf8f5e9, 0x9aa78b, 1.5));
  const sun = new T.DirectionalLight(0xfff5e4, 2.5);
  sun.position.set(-5, 12, 7);
  sun.castShadow = true;
  sun.shadow.mapSize.set(1024, 1024);
  Object.assign(sun.shadow.camera, { left: -9, right: 9, top: 9, bottom: -9, near: .5, far: 30 });
  sun.shadow.normalBias = .035;
  sun.shadow.bias = -.0003;
  sun.shadow.radius = 4;
  scene.add(sun);

  const mat = (color, other = {}) => new T.MeshStandardMaterial({ color, roughness: .82, metalness: .02, ...other });
  const ivory = mat('#e9ecdf'), sage = mat('#bac9ab'), darkSage = mat('#9dad90');
  const glass = mat('#718d85', { roughness: .28, metalness: .25 });
  const orange = mat('#ed6545', { emissive: '#ed6545', emissiveIntensity: .2 });
  const trunk = mat('#8d9780');
  const lineMaterial = new T.LineBasicMaterial({ color: '#7d8e72', transparent: true, opacity: .28 });
  const unit = new T.BoxGeometry(1, 1, 1);
  function box(parent, size, pos, material = ivory, edges = false) {
    const mesh = new T.Mesh(unit, material);
    mesh.scale.set(...size); mesh.position.set(...pos);
    mesh.castShadow = true; mesh.receiveShadow = true; parent.add(mesh);
    if (edges) {
      const outline = new T.LineSegments(new T.EdgesGeometry(unit), lineMaterial);
      mesh.add(outline);
    }
    return mesh;
  }
  function tube(parent, points, radius, material) {
    const curve = new T.CatmullRomCurve3(points.map(p => new T.Vector3(...p)));
    const mesh = new T.Mesh(new T.TubeGeometry(curve, 48, radius, 5, false), material);
    parent.add(mesh); return curve;
  }
  function loop(points, y, color, opacity, scale = 1) {
    const vertices = points.map(([x, north]) => new T.Vector3(x * scale, y, -north * scale));
    const line = new T.LineLoop(new T.BufferGeometry().setFromPoints(vertices), new T.LineBasicMaterial({color, transparent: true, opacity}));
    root.add(line); return line;
  }

  // Three separate, extruded layers retain the real municipal outline.
  const layers = [{y:-.57, color:'#b0bda3',depth:.16},{y:-.19,color:'#c9d4ba',depth:.13},{y:.16,color:'#e0e7d2',depth:.17}];
  polygons.forEach(polygon => {
    const shape = new T.Shape(polygon[0].map(p => new T.Vector2(...p)));
    polygon.slice(1).forEach(ring => shape.holes.push(new T.Path(ring.map(p => new T.Vector2(...p)))));
    layers.forEach(({y,color,depth}) => {
      const geometry = new T.ExtrudeGeometry(shape, {depth, bevelEnabled:true, bevelSegments:1, steps:1, bevelSize:.025, bevelThickness:.025, curveSegments:1});
      geometry.rotateX(-Math.PI / 2);
      const slab = new T.Mesh(geometry, mat(color));
      slab.position.y = y; slab.castShadow = true; slab.receiveShadow = true; root.add(slab);
      loop(polygon[0], y + depth + .028, '#718966', .42);
    });
    loop(polygon[0], -.76, '#9cad91', .3, 1.08);
  });

  const ground = new T.Mesh(new T.PlaneGeometry(30, 30), new T.ShadowMaterial({opacity:.18}));
  ground.rotation.x = -Math.PI/2; ground.position.y = -.82; ground.receiveShadow = true; scene.add(ground);

  // A symbolic civic campus on the map: not a model of a particular facility.
  const campus = new T.Group();
  campus.position.set(-.2, .38, .9); campus.scale.setScalar(.67); root.add(campus);
  box(campus, [5.9,.13,4.2], [0,.04,0], ivory, true);
  const towers = [[-.95,1.95,-.65,1.65,3.8,1.65],[1.03,1.5,-.7,1.65,2.9,1.7],[-2,1.15,.2,1.2,2.2,1.55]];
  const windowTransforms = [];
  towers.forEach(([x,y,z,w,h,d]) => {
    box(campus,[w,h,d],[x,y,z],ivory,true);
    box(campus,[w+.13,.1,d+.13],[x,y+h/2+.06,z],sage,true);
    box(campus,[w-.25,.035,d-.25],[x,y+h/2+.13,z],darkSage);
    for(let floor=.42;floor<h-.2;floor+=.52){
      for(let col=-w/2+.28;col<w/2-.1;col+=.44){
        windowTransforms.push({p:[x+col,y-h/2+floor,z+d/2+.014],s:[.21,.31,.035]});
      }
      for(let col=-d/2+.3;col<d/2-.1;col+=.44){
        windowTransforms.push({p:[x+w/2+.014,y-h/2+floor,z+col],s:[.035,.31,.21]});
      }
    }
    // Light vertical facade fins catch the directional light.
    for(let fin=-w/2;fin<=w/2;fin+=w/3) box(campus,[.045,h+.1,.08],[x+fin,y,z+d/2+.045],sage);
  });
  const panes = new T.InstancedMesh(unit,glass,windowTransforms.length);
  const transform = new T.Object3D();
  windowTransforms.forEach(({p,s},i)=>{transform.position.set(...p);transform.scale.set(...s);transform.updateMatrix();panes.setMatrixAt(i,transform.matrix)});
  panes.instanceMatrix.needsUpdate = true; campus.add(panes);
  box(campus,[3.5,1.1,1.55],[.25,.66,1],ivory,true);
  box(campus,[3.85,.14,1.95],[.25,1.3,1.03],sage,true);
  for(let x=-1.15;x<=1.65;x+=.45) box(campus,[.34,.72,.025],[x,.65,1.79],glass);
  for(let step=0;step<4;step++) box(campus,[2.1,.12,(4-step)*.19],[.25,.12+step*.12,2.02],ivory,true);
  box(campus,[.08,1.12,.08],[-.95,4.47,-.65],darkSage);
  const beacon = new T.Mesh(new T.SphereGeometry(.1,12,8),orange);
  beacon.position.set(-.95,5.09,-.65); campus.add(beacon);

  // Low polygon foliage keeps the tactile architectural-model look.
  function tree(x,z,size=1,parent=root,y=.4) {
    const group = new T.Group(); group.position.set(x,y,z);group.scale.setScalar(size);parent.add(group);
    const stem = new T.Mesh(new T.CylinderGeometry(.025,.04,.72,6),trunk);stem.position.y=.36;stem.castShadow=true;group.add(stem);
    const foliage = new T.Mesh(new T.IcosahedronGeometry(.37,1),sage);
    foliage.position.y=.88;foliage.scale.set(.85,1.3,.85);foliage.castShadow=true;group.add(foliage);
  }
  [[-2.4,-1.2,1],[-2.7,.1,.8],[2.2,-.2,.95],[1.7,1.7,.85],[-1.5,2.3,.75],[-.6,-2.9,.7],[1,-2.6,.65]].forEach(p=>tree(...p));
  const hills = [[-.7,-2.9,.95],[.25,-2.65,.65],[.65,-3.3,.55]];
  hills.forEach(([x,z,s]) => {
    const mountain = new T.Mesh(new T.ConeGeometry(s,s*.85,5),mat('#b4c6a2',{flatShading:true}));
    mountain.position.set(x,.42+s*.42,z);mountain.rotation.y=.3;mountain.castShadow=true;root.add(mountain);
  });

  // A river-inspired ribbon and connected civic nodes provide symbolic detail.
  const water = mat('#89b6bc',{roughness:.45,metalness:.1});
  tube(root,[[2.55,.39,-2.15],[2.3,.39,-1.2],[2.65,.39,-.25],[2.3,.39,.8],[1.55,.39,2.1],[.8,.39,2.8]],.07,water);
  const routes = [
    [[-2.1,.48,1.5],[-1.5,1.6,.9],[.2,1.3,1.2],[1.7,.5,1.5]],
    [[-.7,.48,-2.4],[.1,1.7,-1.8],[1.6,1.3,-.8],[2.3,.48,.3]],
    [[-2.1,.48,1.5],[-2.5,1,-.3],[-1.6,.9,-1.5],[-.7,.48,-2.4]]
  ];
  const particles=[];
  routes.forEach((points,index)=>{
    const curve=tube(root,points,.012,mat('#d5a48a',{transparent:true,opacity:.55}));
    const dot=new T.Mesh(new T.SphereGeometry(.045,8,6),orange);root.add(dot);particles.push({dot,curve,offset:index/3});
    [points[0],points.at(-1)].forEach(p=>{
      const node=new T.Mesh(new T.CylinderGeometry(.08,.08,.035,12),orange);node.position.set(...p);root.add(node);
      const ring=new T.Mesh(new T.RingGeometry(.13,.145,24),new T.MeshBasicMaterial({color:'#ed6545',side:T.DoubleSide,transparent:true,opacity:.45}));
      ring.rotation.x=-Math.PI/2;ring.position.set(p[0],p[1]+.024,p[2]);root.add(ring);
    });
  });

  // The opening move also plays on touch screens; reduced-motion skips it.
  // Time pauses when the hero or browser tab is hidden.
  let frame=0, visible=true, lost=false, time=0, previous=0;
  const pointer={x:0,y:0},current={x:0,y:0};
  const finePointer=matchMedia('(pointer:fine)');
  function resize(){
    const {width,height}=host.getBoundingClientRect();
    if(!width||!height)return;
    const aspect=width/height,vertical=Math.max(11.5,12.1/aspect);
    camera.left=-vertical*aspect/2;camera.right=vertical*aspect/2;camera.top=vertical/2;camera.bottom=-vertical/2;camera.updateProjectionMatrix();
    renderer.setSize(width,height,false);draw();
  }
  function draw(){
    const azimuth = Math.atan2(10, 12) + current.x * .24;
    const elevation = .6 + current.y * .13;
    const distance = 19;
    camera.position.set(
      Math.sin(azimuth) * Math.cos(elevation) * distance,
      1.05 + Math.sin(elevation) * distance,
      Math.cos(azimuth) * Math.cos(elevation) * distance
    );
    // Moving the key light makes the shadows respond as well as the camera.
    sun.position.set(-5 + current.x * 4, 12 + current.y * 2, 7 - current.x * 3);
    camera.lookAt(0,1.05,0);renderer.render(scene,camera);
  }
  function animate(now){
    frame=0;if(!visible||document.hidden||lost)return;
    const dt=previous?Math.min((now-previous)/1000,.05):0;previous=now;time+=dt;
    const moving=!reduced.matches;
    const interactive=moving&&finePointer.matches;
    const progress=moving?Math.min(time/introDuration,1):1;
    const eased=1-Math.pow(1-progress,3);
    const smoothing=1-Math.exp(-dt*5);
    current.x+=((interactive?pointer.x:0)-current.x)*smoothing;
    current.y+=((interactive?pointer.y:0)-current.y)*smoothing;
    const zoom=openingZoom+(restingZoom-openingZoom)*eased;
    if(Math.abs(camera.zoom-zoom)>.00001){camera.zoom=zoom;camera.updateProjectionMatrix()}
    // One clockwise turn every two minutes around the map's fixed center.
    root.rotation.y=moving?-.32-time*(Math.PI*2/120)+current.x*.13:0;
    root.rotation.x=interactive?current.y*.035:0;
    particles.forEach(({dot,curve,offset})=>dot.position.copy(curve.getPointAt(moving?(time*.055+offset)%1:offset)));
    beacon.material.emissiveIntensity=moving?.28+Math.sin(time*1.8)*.13:.2;
    host.dataset.motion=progress<1?'intro':moving?'idle':'still';
    draw();host.classList.add('three-ready');
    if(moving)frame=requestAnimationFrame(animate);
  }
  function start(){if(!frame&&visible&&!document.hidden&&!lost){previous=0;frame=requestAnimationFrame(animate)}}
  function stop(){cancelAnimationFrame(frame);frame=0;previous=0}
  const boundsElement=host.closest('.hero-visual');
  boundsElement.addEventListener('pointermove',e=>{
    if(reduced.matches||!finePointer.matches)return;
    const bounds=boundsElement.getBoundingClientRect();
    pointer.x=(e.clientX-bounds.left)/bounds.width*2-1;pointer.y=(e.clientY-bounds.top)/bounds.height*2-1;start();
  },{passive:true});
  boundsElement.addEventListener('pointerleave',()=>{pointer.x=pointer.y=0;start()},{passive:true});
  document.addEventListener('visibilitychange',()=>document.hidden?stop():start());
  const observer=new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;visible?start():stop()},{rootMargin:'60px'});observer.observe(host);
  reduced.addEventListener('change',()=>{current.x=current.y=pointer.x=pointer.y=0;stop();start()});
  finePointer.addEventListener('change',()=>{stop();start()});
  const sizeObserver=new ResizeObserver(resize);sizeObserver.observe(host);
  renderer.domElement.addEventListener('webglcontextlost',e=>{e.preventDefault();lost=true;stop();host.classList.remove('three-ready')});
  renderer.domElement.addEventListener('webglcontextrestored',()=>{lost=false;start()});
  window.addEventListener('pagehide',stop);
  window.addEventListener('pageshow',start);
  resize();start();
}
