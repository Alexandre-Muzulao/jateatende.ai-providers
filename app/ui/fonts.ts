import localFont from 'next/font/local';

export const ampleSoft = localFont({
  variable: '--font-ample-soft',
  src: [
    {
      path: '../../public/fonts/AmpleSoftPro-Thin.ttf',
      weight: '100',
      style: 'normal',
    },
    {
      path: '../../public/fonts/AmpleSoftPro-ExtraLight.ttf',
      weight: '200',
      style: 'normal',
    },
    {
      path: '../../public/fonts/AmpleSoftPro-Light.ttf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../../public/fonts/AmpleSoftPro-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/AmpleSoftPro-Medium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../public/fonts/AmpleSoftPro-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
  ],
});
