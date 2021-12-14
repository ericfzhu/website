import React from 'react';
import Box from '@mui/material/Box';
import Main from 'layouts/Main';
import Container from 'components/Container';
import { Welcome } from './components';

const IndexView = () => {
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
