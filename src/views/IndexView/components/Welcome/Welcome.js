/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import CardMedia from '@mui/material/CardMedia';

import github from '/src/images/github.svg';
import linkedin from '/src/images/linkedin.svg';
import goodreads from '/src/images/goodreads.svg';
import medium from '/src/images/medium.svg';

const Welcome = () => {
    const theme = useTheme();

    const MainText = () => (
        <Box>
            <Typography
                variant="h3"
                align={'center'}
                gutterBottom
                sx={{
                    fontWeight: 900,
                }}
            >
                Welcome to my space on the internet!
            </Typography>
        </Box>
    );

    const GridMediaIcons = () => (
        <Box display="flex" flexWrap="wrap" justifyContent={'center'}>
            <Box
                display={'flex'}
                component="a"
                width={80}
                href="https://medium.com/@ericfzhu"
                target='_blank'
            >
                <CardMedia
                    image={medium}
                    component='img'
                    sx={{ borderRadius: 2 }}
                />
            </Box>
            <Box
                display={'flex'}
                component="a"
                width={80}
                href="https://www.goodreads.com/ericfzhu"
                target='_blank'
                marginLeft={4}
            >
                <CardMedia
                    image={goodreads}
                    component='img'
                    sx={{ borderRadius: 2 }}
                />
            </Box>
            <Box
                display={'flex'}
                component="a"
                width={80}
                href="https://www.linkedin.com/in/ericfzhu/"
                target='_blank'
                marginLeft={4}
            >
                <CardMedia
                    image={linkedin}
                    component='img'
                    sx={{ borderRadius: 2 }}
                />
            </Box>
            <Box
                display={'flex'}
                component="a"
                width={80}
                href="https://github.com/ericfzhu"
                target='_blank'
                marginLeft={4}
            >
                <CardMedia
                    image={github}
                    component='img'
                    sx={{ borderRadius: 2 }}
                />
            </Box>
        </Box>
    );


    return (
        <Box>
            <Grid container spacing={4}>
                <Grid item xs={12}>
                    <Box
                        width="100%"
                        height="100%"
                        display="flex"
                        justifyContent={'center'}
                    >
                        <MainText />
                    </Box>
                </Grid>
                <Grid item xs={12}>
                    <Box
                        width="100%"
                        height="100%"
                        display="flex"
                        justifyContent={'center'}
                    >
                        <GridMediaIcons />
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Welcome;
