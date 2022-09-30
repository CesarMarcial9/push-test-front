import { NextPage } from 'next';
import path from 'path';
import React, { useState } from 'react';
import OneSignalReact from 'react-onesignal';

const Homepage: NextPage = () => {
  const [initialized, setInitialized] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState<boolean>(false)

  OneSignalReact.init({
    appId: 'c89716aa-7ed9-4402-83ba-7ff80bca219a',
    serviceWorkerPath: '/OneSignalSDKWorker.js',
    autoResubscribe: true,
  }).then(async () => {
    setInitialized(true)

    const status = await OneSignalReact.getNotificationPermission()
    
    // maybe should be a switch case...
    if (status == 'default') {
      OneSignalReact.showSlidedownPrompt()
    }

    if (status == "granted") {
      setIsSubscribed(true)
    }

    if (status == "denied") {
      setIsSubscribed(false)
    }
  });

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-3 p-4 text-center text-white bg-zinc-900">
      <h1 className="text-5xl font-medium">Suma push notifs testing</h1>

      {`${initialized ? 'Initialized.': 'Not initialized.'} ${isSubscribed ? 'You are subscribed and can receive notifications' : 'You are not subscribed and can\'t receive notifications.'}`}
    </div>
  );
};

export default Homepage;
