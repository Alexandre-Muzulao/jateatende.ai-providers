import localFont from 'next/font/local';

export const ampleSoft = localFont(
  {
    variable: '--font-ample-soft',
    src: [
      {
        path: '../../public/fonts/AmpleSoftProRegular.ttf',
        weight: '400',
        style: 'normal',
      },
      {
        path: '../../public/fonts/AmpleSoftProMedium.ttf',
        weight: '700',
        style: 'normal',
      },
    ],
  }
);
