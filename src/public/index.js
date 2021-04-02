const PUPBLIC_KEY= 'BMuE_8-9nYfTmBE0JwB5aRmqXHOl7JIvcAYejowhuVKNRy1PATzvn-vjA3wnrVrs63-emuH-SxGGdcfaTxFwXG4';

function subscribe() {
    if('serviceWorker' in navigator){
        send().catch(err=> console.log(err));
    }
}

async function send(){
    console.log('Registering serviceWorker ...');
    const registerWorker= await navigator.serviceWorker.register("/worker.js", {
        scope: '/'
    });
    console.log('serviceWorker registered ...');


    console.log('Registering web-push ...');
    const subscription= await registerWorker.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(PUPBLIC_KEY)
    });

    console.log('Push registerd ...');
    console.log(subscription);

    document.cookie= `subscription=${JSON.stringify(subscription)}`;
    document.cookie= `authorization=Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiNzI1NGE5ZTctMmUxYi00ZjgzLWFkNzMtNzhiOTBkZDNkZjc3IiwidXNlcm5hbWUiOiJtYW5hZ2VyT25lIiwiaWF0IjoxNjA5NzA1NDA4LCJleHAiOjE2MTAzMTAyMDh9.XPJX4ThWG_dho2pOD0seRypD5DhYfY0B2-5tZI57lTA`;


    await fetch('/api/v1/notification/subscribe', {
        method: 'POST',
        body: JSON.stringify(subscription),
        headers: {
            'content-type': 'application/json',
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiNzI1NGE5ZTctMmUxYi00ZjgzLWFkNzMtNzhiOTBkZDNkZjc3IiwidXNlcm5hbWUiOiJtYW5hZ2VyT25lIiwiaWF0IjoxNjA5NzA1NDA4LCJleHAiOjE2MTAzMTAyMDh9.XPJX4ThWG_dho2pOD0seRypD5DhYfY0B2-5tZI57lTA'
        }
    });

    // await fetch('/getNotification', {
    //     // method: 'POST',
    //     // body: JSON.stringify(subscription),
    //     headers: {
    //         'content-type': 'application/json'
    //     }
    // });


    console.log('Push sent...');

}

async function sendNotification() {
    await fetch('/api/v1/notification/sendNotification', {
        // method: 'POST',
        // body: JSON.stringify(subscription),
        headers: {
            'content-type': 'application/json'
        }
    });
}


function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/-/g, '+')
      .replace(/_/g, '/');
   
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
   
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }