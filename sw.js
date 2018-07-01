const cacheVersion = '1.0';
const cacheName = 'currencyConverter.io';
const cachNameVersion= `${cacheName}-${cacheVersion}`;

const cachableAPI = [
  'https://free.currencyconverterapi.com/api/v5/currencies',
  'https://free.currencyconverterapi.com/api/v5/countries',
  'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css',
  'https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js',
  'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js'
];

const cachableFiles = [
  './',
  './index.html',
  './css/master.css',
  './js/api.js',
  './js/registerSW.js'
]

self.addEventListener('install', (event) => {
  event.waitUntil(
    //get cache first time
    caches.open(cachNameVersion)
    .then((cache) => {
      return cache.addAll(cachableFiles.concat(cachableAPI))
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    //activate new cache
    caches.keys()
    .then( (keys) => {
        return Promise.all(keys.map((key, i) => {
          if(key !== cachNameVersion){
            return caches.delete(keys[i]);
          }
      }))
    })
  )
});

self.addEventListener('fetch', (event) => {
  let url = event.request.clone();

  event.respondWith(
    caches.match(event.request)
    .then((res) => {
      if(res){
        return res;
      }
      return fetch(url)
      .then((res) => {
        if(!res || res.status !== 200 || res.type !== 'basic'){
          return res;
        }
        let response = res.clone();
        caches.open(cachNameVersion)
        .then((cache) => {
          cache.put(event.request, response);
        });
        return res;
      })
    })
  )
});

self.addEventListener('message', messageEvent => {
  if (messageEvent.data === 'skipWaiting') return skipWaiting();
});

self.addEventListener('controllerchange', () => {
  console.log('done')
    window.location.assign('./');
})
