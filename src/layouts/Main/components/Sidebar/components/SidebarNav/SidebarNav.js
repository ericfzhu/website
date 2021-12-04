import React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import CardMedia from '@mui/material/CardMedia';

// import Link from "@mui/material/Link";
import { Link } from 'gatsby-theme-material-ui';
import catlight from '/src/images/cat light.svg';
import catdark from '/src/images/cat dark.svg';
import namelight from '/src/images/name light.svg';
import namedark from '/src/images/name dark.svg';

const SidebarNav = () => {
  const theme = useTheme();
  const { mode } = theme.palette;

  return (
    <Box>
      <Box width={1} paddingX={2} paddingY={1}>
        <Box
          display={'flex'}
          component="a"
          href="/"
          title="theFront"
          width={{ xs: 100, md: 120 }}
        >
          <CardMedia
            image={mode === 'light' ? catlight : catdark}
            component="img"
            sx={{ height: 0.3, width: 0.3 }}
          />
          <CardMedia
            image={mode === 'light' ? namelight : namedark}
            component="img"
            sx={{ height: 0.5, width: 1 }}
          />
        </Box>
      </Box>
      <Box paddingX={2} paddingY={2}>
        <Box marginRight={6}>
          <Link
            underline="none"
            component="a"
            href="/work"
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
            component="a"
            href="/reading"
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
        <Box>
          <Link
            underline="none"
            component="a"
            href="/blog"
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
    </Box>
  );
};

SidebarNav.propTypes = {
  pages: PropTypes.object.isRequired,
};

export default SidebarNav;
