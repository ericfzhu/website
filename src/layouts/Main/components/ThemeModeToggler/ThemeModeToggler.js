import React from 'react';
import Button from '@mui/material/Button';
import { alpha, useTheme } from '@mui/material/styles';
import { motion } from 'framer-motion';

const ThemeModeToggler = () => {
  const theme = useTheme();
  const { themeToggler } = theme;
  const { mode } = theme.palette;
  const transition = {
      type: "spring",
      stiffness: 200,
      damping: 10
  }
  const whileTap = {
      scale: 0.95,
      rotate: 15
  };
  const variants = {
      initial: { scale: 0.6, rotate: 90 },
      animate: { scale: 1, rotate: 0, transition },
      whileTap: whileTap
  }
const raysVariants = {
    initial: { rotate: 45 },
    animate: { rotate: 0, transition }
};

const coreVariants = {
    initial: { scale: 1.5 },
    animate: { scale: 1, transition }
};

  return (
    <Button
      variant={'outlined'}
      onClick={() => themeToggler()}
      aria-label="Dark mode toggler"
      color='primary'
      component={motion.div}
      sx={{
        borderRadius: 2,
        minWidth: 'auto',
        padding: 0.5,
        borderColor: alpha(theme.palette.divider, 0.2),
      }}
    >
      {mode === 'light' ? (
        <motion.svg
          width={20}
          height={20}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          whileTap={whileTap}
          style={{ originX: "50%", originY: "50%" }}
        >
            <motion.circle
                cx="11.9998"
                cy="11.9998"
                r="5.75375"
                fill="currentColor"
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
                    fill="currentColor"
                />
                <circle
                    cx="3.0903"
                    cy="17.1436"
                    r="1.5"
                    transform="rotate(-120 3.0903 17.1436)"
                    fill="currentColor"
                />
                <circle cx="12" cy="22.2881" r="1.5" fill="currentColor" />
                <circle
                    cx="20.9101"
                    cy="17.1436"
                    r="1.5"
                    transform="rotate(-60 20.9101 17.1436)"
                    fill="currentColor"
                />
                <circle
                    cx="20.9101"
                    cy="6.8555"
                    r="1.5"
                    transform="rotate(-120 20.9101 6.8555)"
                    fill="currentColor"
                />
                <circle cx="12" cy="1.71143" r="1.5" fill="currentColor" />
            </motion.g>
        </motion.svg>
      ) : (
        <motion.svg
          width={20}
          height={20}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
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
