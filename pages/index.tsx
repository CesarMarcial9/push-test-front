import { NextPage } from 'next';
import React, { useEffect, useState } from 'react';
import OneSignalReact from 'react-onesignal';

const Homepage: NextPage = () => {
  const [initialized, setInitialized] = useState<boolean>(false);
  const [isSubscribed, setIsSubscribed] = useState<boolean>(false);
  
  useEffect(() => {
    OneSignalReact.init({
      appId: '781727fc-d36e-4468-9c98-40478ae77364',
      serviceWorkerPath: '../OneSignalSDKWorker.js',
      welcomeNotification: {
        title: 'Welcome to Suma Wealth!',
        messaage: "It's great to see you here. Leave your finances to us!",
      },
      persistNotification: false,
      autoResubscribe: true,
    }).then(async () => {
      setInitialized(true);

      try {
        await OneSignalReact.setExternalUserId("abc-123-abcd").then(() => console.log("success")).catch(err => console.error(err))

        const status = await OneSignalReact.getNotificationPermission();

        switch (status) {
          case 'default':
            OneSignalReact.showSlidedownPrompt();
            break;

          case 'granted':
            setIsSubscribed(true);
            break;

          case 'denied':
            setIsSubscribed(false);
            break;

          default:
            break;
        }
      } catch (err) {
        console.error(err);
      }
    }).catch((err) => {
      console.error(err)
    })
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-3 p-4 text-center text-white bg-gradient from-zinc-700 to-zinc-900 bg-zinc-900">
      <h1 className="text-5xl font-medium">Suma push notifs testing</h1>

      {`${initialized ? 'Initialized.' : 'Not initialized.'} ${
        isSubscribed
          ? "You are subscribed and can receive notifications. Lmk if you want to receive one to see how it looks like, it' still pretty manual just for testing purposes."
          : "You are not subscribed and can't receive notifications."
      }`}
    </div>
  );
};

export default Homepage;
