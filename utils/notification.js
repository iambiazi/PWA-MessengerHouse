export default function () {
  if (!('Notification' in window)) {
    console.log('Notifications not supported in this browser');
  } else {
    Notification.requestPermission(status => {
      console.log('Notification permission status:', status);
    })

  }
}

export const messageAlert = (msgBody, sender = 'MessengerHouse App') => {
  if ('Notification' in window) {
    if (Notification.permission === 'granted') {
        navigator.serviceWorker.getRegistration().then(reg => {
          const options = {
            body: msgBody,
            icon: 'static/img/icon-128x128.png',
            vibrate: [100, 50, 100],
            data: {
              dateOfArrival: Date.now(),
              primaryKey: 1,
              sender: sender,
            },
            actions: [
              {action: 'explore', title: 'Go to the site',
                icon: 'static/img/icon-128x128.png'
              },
              {action: 'close', title: 'Close the notification',
                icon: 'static/img/icon-128x128.png'
              },
            ]
          };
          reg.showNotification(`New message from ${sender}`, options)

          }).catch(err => console.error(err));
    }
  }
};

