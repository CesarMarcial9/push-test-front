import OneSignal from 'react-onesignal';

export default async function runOneSignal() {
  await OneSignal.init({
    appId: process.env.NEXT_PUBLIC_APP_ID || '',
    allowLocalhostAsSecureOrigin: true,
  });
  OneSignal.showSlidedownPrompt();
}
