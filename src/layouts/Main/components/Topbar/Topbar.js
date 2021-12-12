import React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import { alpha, useTheme } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import CardMedia from '@mui/material/CardMedia';
import { Link, Button } from 'gatsby-theme-material-ui';

import { ThemeModeToggler } from '../index';
import catlight from '/src/images/cat light.svg';
import catdark from '/src/images/cat dark.svg';
import namelight from '/src/images/name light.svg';
import namedark from '/src/images/name dark.svg';

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
          image={mode === 'light' && !colorInvert ? catlight : catdark}
          component="img"
          sx={{ height: 0.3, width: 0.3 }}
        />
        <CardMedia
          image={mode === 'light' && !colorInvert ? namelight : namedark}
          component="img"
          sx={{ height: 0.5, width: 1 }}
        />
      </Link>
      <Box sx={{ display: { xs: 'none', md: 'flex' } }} alignItems={'center'}>
        <Box marginRight={6}>
          <Link
            underline="none"
            to="/work"
            color="text.primary"
            sx={{
              ':hover': {
                color: 'primary.main',
              },
            }}
            variant={'h4'}
          >
            my work
          </Link>
        </Box>
        <Box marginRight={6}>
          <Link
            underline="none"
            to="/reading"
            color="text.primary"
            sx={{
              ':hover': {
                color: 'primary.main',
              },
            }}
            variant={'h4'}
          >
            reading list
          </Link>
        </Box>
        <Box marginRight={6}>
          <Link
            underline="none"
            to="/blog"
            color="text.primary"
            sx={{
              ':hover': {
                color: 'primary.main',
              },
            }}
            variant={'h4'}
          >
            blog
          </Link>
        </Box>
      </Box>
      <Box sx={{ display: { xs: 'none', md: 'flex' } }} alignItems={'center'}>
        <ThemeModeToggler />
      </Box>
      <Box sx={{ display: { xs: 'flex', md: 'none' } }} alignItems={'center'}>
        <Box>
          <ThemeModeToggler />
        </Box>
        <Box marginLeft={4}>
          <Button
            onClick={() => onSidebarOpen()}
            aria-label="Menu"
            variant={'icon'}
            sx={{
              borderRadius: 2,
              minWidth: 'auto',
              padding: 1,
              borderColor: alpha(theme.palette.divider, 0.2),
            }}
          >
            <MenuIcon color="primary" />
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

Topbar.propTypes = {
  onSidebarOpen: PropTypes.func,
  colorInvert: PropTypes.bool,
};

export default Topbar;
