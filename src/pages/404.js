import React from 'react';
import NotFound from 'views/NotFound';

import Page from 'components/Page';
import Seo from 'components/seo';

const FourOFourPage = () => {
  return (
    <>
      <Seo />
      <Page>
        <NotFound />
      </Page>
    </>
  );
};

export default FourOFourPage;
