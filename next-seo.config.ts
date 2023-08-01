import { DefaultSeoProps } from 'next-seo';
import { DOMAIN } from './src/util/constants';

const config: DefaultSeoProps = {
  title: 'Drew I. Suh',
  description: 'Personal website and blog',
  canonical: DOMAIN,
  openGraph: {
    title: 'Drew I. Suh',
    description: 'Personal website and blog',
    type: 'website',
    locale: 'en_US',
    url: DOMAIN,
    images: [
      {
        url: `${DOMAIN}/assets/content/lego-workers.jpg`,
        alt: 'Drew I. Suh',
      },
    ],
  },
  twitter: {
    handle: '@andrewisuh',
    cardType: 'summary_large_image',
  },
};

export default config;
