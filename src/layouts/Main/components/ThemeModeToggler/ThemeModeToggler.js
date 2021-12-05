import React from 'react';
// import Button from '@mui/material/Button';
import { alpha, useTheme } from '@mui/material/styles';
import { motion } from 'framer-motion';
import { Button } from 'gatsby-theme-material-ui';

const ThemeModeToggler = () => {
  const theme = useTheme();
  const { themeToggler } = theme;
  const { mode } = theme.palette;
  const transition = {
    type: 'spring',
    stiffness: 200,
    damping: 10,
  };
  const whileTap = {
    scale: 0.95,
    rotate: 15,
  };
  const variants = {
    initial: { scale: 0.6, rotate: 90 },
    animate: { scale: 1, rotate: 0, transition },
    whileTap: whileTap,
  };
  const raysVariants = {
    initial: { rotate: 45 },
    animate: { rotate: 0, transition },
  };

  const coreVariants = {
    initial: { scale: 1.5 },
    animate: { scale: 1, transition },
  };

  return (
    <Button
      variant={'icon'}
      onClick={() => themeToggler()}
      aria-label="Dark mode toggler"
      color="primary"
      component={motion.button}
      sx={{
        borderRadius: 2,
        minWidth: 'auto',
        padding: 0.5,
        borderColor: alpha(theme.palette.divider, 0.2),
        '& .motionSVG': {
          stroke: alpha(theme.palette.divider, 0.2),
        },
        '&:hover': {
          '& .motionSVG': {
            stroke: theme.palette.primary.main,
          },
        },
      }}
    >
      {mode === 'light' ? (
        <motion.svg
          className="motionSVG"
          width={28}
          height={28}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          whileTap={whileTap}
          style={{ originX: '50%', originY: '50%' }}
        >
          <motion.circle
            cx="11.9998"
            cy="11.9998"
            r="5.75375"
            fill="none"
            initial="initial"
            animate="animate"
            variants={coreVariants}
          />
          <motion.g initial="initial" animate="animate" variants={raysVariants}>
            <circle
              cx="3.08982"
              cy="6.85502"
              r="1.5"
              transform="rotate(-60 3.08982 6.85502)"
              fill="none"
            />
            <circle
              cx="3.0903"
              cy="17.1436"
              r="1.5"
              transform="rotate(-120 3.0903 17.1436)"
              fill="none"
            />
            <circle cx="12" cy="22.2881" r="1.5" fill="none" />
            <circle
              cx="20.9101"
              cy="17.1436"
              r="1.5"
              transform="rotate(-60 20.9101 17.1436)"
              fill="none"
            />
            <circle
              cx="20.9101"
              cy="6.8555"
              r="1.5"
              transform="rotate(-120 20.9101 6.8555)"
              fill="none"
            />
            <circle cx="12" cy="1.71143" r="1.5" fill="none" />
          </motion.g>
        </motion.svg>
      ) : (
        <motion.svg
          className="motionSVG"
          width={28}
          height={28}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          whileTap={whileTap}
          viewBox="0 0 24 24"
        >
          <motion.path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            initial="initial"
            animate="animate"
            whileTap="whileTap"
            variants={variants}
            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
          />
        </motion.svg>
      )}
    </Button>
  );
};

export default ThemeModeToggler;
