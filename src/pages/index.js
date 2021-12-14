import React from 'react';
import IndexView from 'views/IndexView';

import Page from 'components/Page';
import Seo from 'components/seo';

const IndexPage = () => {
  return (
    <>
      <Seo />
      <Page>
        <IndexView />
      </Page>
    </>
  );
};

export default IndexPage;
