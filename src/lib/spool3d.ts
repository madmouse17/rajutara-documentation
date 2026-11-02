// The 3D thread spool that feeds the scroll thread. Loaded lazily so three.js never blocks first paint.
import {
  CanvasTexture,
  CylinderGeometry,
  DirectionalLight,
  Group,
  HemisphereLight,
  Mesh,
  MeshStandardMaterial,
  PerspectiveCamera,
  RepeatWrapping,
  Scene,
  SRGBColorSpace,
  WebGLRenderer,
} from 'three';

export interface Spool {
  /** Pays out `distance` px of thread; `unwound` (0..1) shrinks the winding. */
  turn(distance: number, unwound: number): void;
  render(): void;
}

/** Cross-wound thread: diagonal strands make the rotation visible. */
function windingTexture(color: string): CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 128;
  const ctx = canvas.getContext('2d')!;
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, 128, 128);
  for (let y = -128; y < 256; y += 5) {
    ctx.strokeStyle = 'rgba(0,0,0,0.16)';
    ctx.lineWidth = 1.4;
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(128, y + 22);
    ctx.stroke();
    ctx.strokeStyle = 'rgba(255,255,255,0.12)';
    ctx.lineWidth = 0.8;
    ctx.beginPath();
    ctx.moveTo(0, y + 2);
    ctx.lineTo(128, y + 24);
    ctx.stroke();
  }
  const texture = new CanvasTexture(canvas);
  texture.colorSpace = SRGBColorSpace;
  texture.wrapS = RepeatWrapping;
  texture.wrapT = RepeatWrapping;
  texture.repeat.set(3, 2);
  return texture;
}

/** Flange face: wood with three bored holes, so the turning spool reads as turning. */
function flangeTexture(): CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 128;
  const ctx = canvas.getContext('2d')!;
  ctx.fillStyle = '#c9a27a';
  ctx.fillRect(0, 0, 128, 128);
  ctx.strokeStyle = 'rgba(120,80,40,0.18)';
  for (let r = 10; r < 64; r += 6) {
    ctx.beginPath();
    ctx.arc(64, 64, r, 0, Math.PI * 2);
    ctx.stroke();
  }
  ctx.fillStyle = '#6b4a2b';
  for (let i = 0; i < 3; i++) {
    const a = (i / 3) * Math.PI * 2;
    ctx.beginPath();
    ctx.arc(64 + Math.cos(a) * 36, 64 + Math.sin(a) * 36, 7, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.beginPath();
  ctx.arc(64, 64, 9, 0, Math.PI * 2);
  ctx.fill();
  const texture = new CanvasTexture(canvas);
  texture.colorSpace = SRGBColorSpace;
  return texture;
}

export function createSpool(canvas: HTMLCanvasElement, threadColor: string): Spool {
  const renderer = new WebGLRenderer({
    canvas,
    alpha: true,
    antialias: true,
    powerPreference: 'low-power',
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);

  const scene = new Scene();
  const camera = new PerspectiveCamera(28, canvas.clientWidth / canvas.clientHeight, 0.1, 20);
  camera.position.set(0, 0.4, 4.6);
  camera.lookAt(0, 0, 0);
  scene.add(new HemisphereLight(0xffffff, 0x6d7f99, 1.8));
  const key = new DirectionalLight(0xffffff, 1.5);
  key.position.set(2.5, 3, 4);
  scene.add(key);

  const wood = new MeshStandardMaterial({ color: 0xc9a27a, roughness: 0.6 });
  const face = new MeshStandardMaterial({ map: flangeTexture(), roughness: 0.6 });
  const thread = new MeshStandardMaterial({ map: windingTexture(threadColor), roughness: 0.8 });

  // Local Y is the spool axis; CylinderGeometry material groups are [side, top cap, bottom cap].
  const spool = new Group();
  const flangeGeo = new CylinderGeometry(0.66, 0.66, 0.1, 48);
  const top = new Mesh(flangeGeo, [wood, face, face]);
  top.position.y = 0.6;
  const bottom = new Mesh(flangeGeo, [wood, face, face]);
  bottom.position.y = -0.6;
  const wound = new Mesh(new CylinderGeometry(0.52, 0.52, 1.1, 64), thread);
  spool.add(top, bottom, wound);

  // Axis tipped towards the viewer so one flange face shows, like a spool lying on the cutting table.
  const holder = new Group();
  holder.rotation.set(0.35, -0.6, Math.PI / 2 - 0.2);
  holder.add(spool);
  scene.add(holder);

  let angle = 0;

  return {
    turn(distance, unwound) {
      angle += distance / 26; // 26 px ≈ the winding radius on screen
      spool.rotation.y = angle;
      const r = 1 - 0.45 * unwound;
      wound.scale.set(r, 1, r);
    },
    render: () => renderer.render(scene, camera),
  };
}
