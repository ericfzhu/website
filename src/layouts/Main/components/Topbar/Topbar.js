import React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import { alpha, useTheme } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import CardMedia from '@mui/material/CardMedia';
import { Link, Button } from 'gatsby-theme-material-ui';

import { ThemeModeToggler } from '../index';
import catlight from '/src/images/cat light.png';
import catdark from '/src/images/cat dark.png';
import namelight from '/src/images/name light.png';
import namedark from '/src/images/name dark.png';
import logo from '/src/images/logo.png';

const Topbar = ({ onSidebarOpen, colorInvert = false }) => {
  const theme = useTheme();
  const { mode } = theme.palette;

  return (
    <Box
      display={'flex'}
      justifyContent={'space-between'}
      alignItems={'center'}
      width={1}
    >
      <Link display={'flex'} to="/" width={{ xs: 100, md: 120 }}>
        <CardMedia
          image={logo}
          component="img"
          sx={{ height: 0.6, width: 0.6 }}
        />
      </Link>
      <Box sx={{ display: { xs: 'none', md: 'flex' } }} alignItems={'right'}>
        <Box marginRight={6}>
          <Link
            underline="none"
            to="/software"
            color="text.primary"
            sx={{
              ':hover': {
                color: 'primary.main',
              },
            }}
            variant={'h6'}
          >
            software
          </Link>
        </Box>
        <Box marginRight={6}>
          <Link
            underline="none"
            to="/library"
            color="text.primary"
            sx={{
              ':hover': {
                color: 'primary.main',
              },
            }}
            variant={'h6'}
          >
            library
          </Link>
        </Box>
        <Box marginRight={6}>
          <Link
            underline="none"
            to="/photo"
            color="text.primary"
            sx={{
              ':hover': {
                color: 'primary.main',
              },
            }}
            variant={'h6'}
          >
            photography
          </Link>
        </Box>
      </Box>
      {/*<Box sx={{ display: { xs: 'none', md: 'flex' } }} alignItems={'center'}>*/}
      {/*  <ThemeModeToggler />*/}
      {/*</Box>*/}
      {/*<Box sx={{ display: { xs: 'flex', md: 'none' } }} alignItems={'center'}>*/}
      {/*  <Box>*/}
      {/*    <ThemeModeToggler />*/}
      {/*  </Box>*/}
      {/*  <Box marginLeft={4}>*/}
      {/*    <Button*/}
      {/*      onClick={() => onSidebarOpen()}*/}
      {/*      aria-label="Menu"*/}
      {/*      variant={'icon'}*/}
      {/*      sx={{*/}
      {/*        borderRadius: 2,*/}
      {/*        minWidth: 'auto',*/}
      {/*        padding: 1,*/}
      {/*        borderColor: alpha(theme.palette.divider, 0.2),*/}
      {/*      }}*/}
      {/*    >*/}
      {/*      <MenuIcon color="primary" />*/}
      {/*    </Button>*/}
      {/*  </Box>*/}
      {/*</Box>*/}
    </Box>
  );
};

Topbar.propTypes = {
  onSidebarOpen: PropTypes.func,
  colorInvert: PropTypes.bool,
};

export default Topbar;
