function ServiceWorker() {
  if (!navigator.serviceWorker) return toast('Service Worker not supported');
  navigator.serviceWorker.register('sw.js').then(function() {
    console.log("Reg worked!")
  }).catch(function() {
    console.log("failed!")
  });
}
/*  .then((registration) => {
  console.log('sw process');
      // checking if controller is true/false
      if (!navigator.serviceWorker.controller) return;

      if(registration.waiting){
        toast('New Version Available', 'updateServiceWorker');
        registration.waiting.postMessage('skipWaiting');
        return;
      }

      if (registration.installing){
        serviceWorkerInstallation(registration.installing) ;
        return;
      }

      registration.addEventListener('updatefound', () => {
        serviceWorkerInstallation(registration.installing);
        return;
      });
  })
  .catch((err) => {
    console.log(`Error: SR2312, ${err}`)
  })
}
const serviceWorkerInstallation = (status) =>{
  status.addEventListener('statechange', () => {
    if (status.state == 'installed'){
      toast('Latest version installed');
    }
  })
}
*/
