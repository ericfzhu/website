import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import Main from 'layouts/Main';
import Container from 'components/Container';
import { Welcome } from './components';

const IndexView = () => {
  useEffect(() => {
    const jarallaxInit = async () => {
      const jarallaxElems = document.querySelectorAll('.jarallax');
      if (!jarallaxElems || (jarallaxElems && jarallaxElems.length === 0)) {
        return;
      }

      const { jarallax } = await import('jarallax');
      jarallax(jarallaxElems, { speed: 0.2 });
    };

    jarallaxInit();
  });

  return (
    <Box sx={{ overflowX: 'hidden' }}>
      <Main bgcolor={'transparent'}>
        <Box
          minHeight={'100vh'}
          display={'flex'}
          alignItems={'center'}
          bgcolor={'transparent'}
          marginTop={-13}
          paddingTop={13}
        >
          <Container>
            <Box
              display={'flex'}
              flexDirection={'column'}
              alignItems={'center'}
            >
              <Welcome />
            </Box>
          </Container>
        </Box>
      </Main>
    </Box>
  );
};

export default IndexView;
