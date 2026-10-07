const CACHE='face-att-febdccf843';
const ASSETS=["./","./index.html","./face-api.js","./manifest.webmanifest","./icon-192.png","./icon-512.png","./icon-180.png","./models/ssd_mobilenetv1_model-weights_manifest.json","./models/ssd_mobilenetv1_model.bin","./models/face_landmark_68_model-weights_manifest.json","./models/face_landmark_68_model.bin","./models/face_recognition_model-weights_manifest.json","./models/face_recognition_model.bin","./tfjs-backend-wasm-simd.wasm","./tfjs-backend-wasm.wasm"];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k.startsWith('face-att-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET'||new URL(e.request.url).origin!==location.origin) return;
  e.respondWith(caches.match(e.request,{ignoreSearch:true}).then(r=>r||fetch(e.request).catch(()=>e.request.mode==='navigate'?caches.match('./index.html'):Response.error())));
});
