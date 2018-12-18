//Displays pop up message from the browser to request permission to allow notifications
//response is stored along with the app (calling again returns user's last choice)

//check if supported by browser
export default function () {
  if (!('Notification' in window)) {
    console.log('Notifications not supported in this browser');
  } else {
    Notification.requestPermission(status => {
      console.log('Notification permission status:', status);
    })

  }
}

export const testNotification = () => {
  if ('Notification' in window) {
    if (Notification.permission === 'granted') {
        navigator.serviceWorker.getRegistration().then(reg => {
          const options = {
            body: 'First notification!',
            tag: 'id1',
            icon: 'static/img/apple-touch-icon-120x120.png',
            vibrate: [100, 50, 100],
            data: {
              dateOfArrival: Date.now(),
              primaryKey: 1
            },
            actions: [
              {action: 'explore', title: 'Go to the site',
                icon: 'static/img/apple-touch-icon-120x120.png'
              },
              {action: 'close', title: 'Close the notification',
                icon: 'static/img/apple-touch-icon-120x120.png'
              },
            ]
          };
          reg.showNotification('Hello world!', options)

          }).catch(err => console.error(err));
    }
  }
};

