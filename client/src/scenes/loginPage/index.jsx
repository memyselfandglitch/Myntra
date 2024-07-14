import React from 'react';
import { Box, Typography, useTheme, useMediaQuery } from '@mui/material';
import { ReactComponent as MyntraIcon } from './../../myntra.svg'; // Update the path to your icon
import Form from './Form';

const LoginPage = () => {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery('(min-width: 1000px)');

  return (
    <Box>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        width="100%"
        backgroundColor={theme.palette.background.alt}
        p="1rem 6%"
      >
        <Box display="flex" alignItems="center">
          <MyntraIcon style={{ marginRight: '8px', width: '130px', height: '40px' }} />
        </Box>
      </Box>

      <Box
        width={isNonMobileScreens ? '50%' : '93%'}
        p="2rem"
        m="2rem auto"
        borderRadius="1.5rem"
        backgroundColor={theme.palette.background.alt}
      >
        <Typography fontWeight="500" variant="h5" sx={{ mb: '1.5rem' }}>
          Login Page
        </Typography>
        <Form />
      </Box>
    </Box>
  );
};

export default LoginPage;
