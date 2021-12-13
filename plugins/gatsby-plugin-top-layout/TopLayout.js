import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

import Page from '../../src/components/Page';

import 'react-lazy-load-image-component/src/effects/blur.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'react-image-lightbox/style.css';
import 'aos/dist/aos.css';

import catlight from '/src/images/cat light.svg';
import preview from '/src/images/preview.png';

export default function TopLayout(props) {
  return (
    <React.Fragment>
      <Helmet>
        <meta charSet="utf-8" />
        <link
          rel="shortcut icon"
          href="https://raw.githubusercontent.com/ericfzhu/website/37cccccc2f36a1409a288059060739163e91936e/src/images/cat%20light.svg"
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <title>Eric Zhu | Personal website</title>
        <meta name="theme-color" content="#ffffff" />
        <meta
          name="description"
          content="Eric is a software engineer and data scientist based in Sydney"
        />
        <meta
          name="robots"
          content="max-snippet:-1, max-image-preview:large, max-video-preview:-1"
        />
        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content="https://raw.githubusercontent.com/ericfzhu/website/master/src/images/preview.png"
        />
        <meta property="og:image:width" content='1280'/>
        <meta property="og:image:height" content="720"/>
        <meta
          property="og:title"
          content="Eric Zhu | Personal website"
        />
        <meta
          property="og:description"
          content="Eric is a software engineer and data scientist based in Sydney"
        />
        <meta
          property="og:url"
          content="https://www.ericfzhu.com/"
        />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap" rel="stylesheet" />
      </Helmet>
      <Page>
        {props.children}
      </Page>
    </React.Fragment>
  );
}

TopLayout.propTypes = {
  children: PropTypes.node,
};
