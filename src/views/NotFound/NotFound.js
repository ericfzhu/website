import React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
import { Button } from 'gatsby-theme-material-ui';
import useMediaQuery from '@mui/material/useMediaQuery';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import CardMedia from '@mui/material/CardMedia';

import Main from 'layouts/Main';
import Container from 'components/Container';
import cat from '/src/images/404_cat.svg';
import cat_dark from '/src/images/404_cat_dark.svg';

const NotFound = () => {
  const theme = useTheme();
  const { mode } = theme.palette;
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });

  return (
    <Main>
      <Box
        bgcolor={theme.palette.alternate.main}
        position={'relative'}
        minHeight={'calc(100vh - 247px)'}
        display={'flex'}
        alignItems={'center'}
        justifyContent={'center'}
        height={1}
        marginTop={-12}
        paddingTop={12}
      >
        <Container>
          <Grid container>
            <Grid
              item
              container
              alignItems={'center'}
              justifyContent={'center'}
              xs={12}
              md={6}
            >
              <Box>
                <Typography
                  variant="h1"
                  component={'h1'}
                  align={isMd ? 'left' : 'center'}
                  sx={{ fontWeight: 700 }}
                >
                  404
                </Typography>
                <Typography
                  variant="h6"
                  component="p"
                  color="text.secondary"
                  align={isMd ? 'left' : 'center'}
                >
                  Oops! Looks like you followed a bad link. (Or the page
                  doesn&apos;t exist yet!)
                </Typography>
                <Box
                  marginTop={4}
                  display={'flex'}
                  justifyContent={{ xs: 'center', md: 'flex-start' }}
                >
                  <Button
                    // component={Link}
                    variant="contained"
                    color="primary"
                    size="large"
                    to={'/'}
                  >
                    Back home
                  </Button>
                </Box>
              </Box>
            </Grid>
            <Grid item container justifyContent={'center'} xs={12} md={6}>
              <Box height={1} width={1} maxWidth={500}>
                <CardMedia
                  component="img"
                  image={mode === 'light' ? cat : cat_dark}
                />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Main>
  );
};

export default NotFound;
