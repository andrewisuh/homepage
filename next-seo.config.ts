import { DefaultSeoProps } from 'next-seo';
import { DOMAIN } from './src/util/constants';

const config: DefaultSeoProps = {
  title: 'drewisuh',
  description: 'Personal website and blog',
  canonical: DOMAIN,
  openGraph: {
    title: 'drewisuh',
    description: 'Personal website and blog',
    type: 'website',
    locale: 'en_US',
    url: DOMAIN,
    images: [
      {
        url: `${DOMAIN}/assets/content/lego-workers.jpg`,
        alt: 'drewisuh',
      },
    ],
  },
  twitter: {
    handle: '@andrewisuh',
    cardType: 'summary_large_image',
  },
};

export default config;
