if (
  process.env.NODE_ENV === 'production'
  && typeof window !== 'undefined'
  && 'serviceWorker' in navigator
) {
  navigator.serviceWorker
    .register('/sw.js')
    .then((reg) => {
      console.log('Service worker registered (0-0) ');
      // pushManger if needed
      // reg.pushManager.subscribe({userVisibleOnly: true}).then(() => {})
      //   .catch(e => console.error(e));
    })
    .catch((e) => {
      console.error('Error during service worker registration:', e);
    });
}
