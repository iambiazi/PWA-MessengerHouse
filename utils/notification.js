//Displays pop up message from the browser to request permission to allow notifications
//response is stored along with the app (calling again returns user's last choice)

//check if supported by browser
if (!('Notification' in window)) {
  console.log('Notifications not supported in this browser');
} else {
  Notification.requestPermission(status => {
    console.log('Notification permission status:', status);
  });

  if (Notification.permission === 'granted') {
    navigator.serviceWorker.getRegistration().then(reg => {
      const options = {
        body: 'First notification!',
        tag: 'id1',
        // icon: 'images/notification-flat.png',
        vibrate: [100, 50, 100],
        data: {
          dateOfArrival: Date.now(),
          primaryKey: 1
        },
        actions: [
          {action: 'explore', title: 'Go to the site',
            // icon: 'images/checkmark.png'
          },
          {action: 'close', title: 'Close the notification',
            // icon: 'images/xmark.png'
          },
        ]
      };
      reg.showNotification('Hello world!', options);
    });
  }
}

