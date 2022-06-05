import React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import {useTheme} from '@mui/material/styles';
import CardMedia from '@mui/material/CardMedia';
import {Link} from 'gatsby-theme-material-ui';
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
    </Box>
  );
};

Topbar.propTypes = {
  onSidebarOpen: PropTypes.func,
  colorInvert: PropTypes.bool,
};

export default Topbar;
