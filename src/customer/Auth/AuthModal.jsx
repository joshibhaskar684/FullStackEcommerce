import React from 'react';
import { Box, Modal } from '@mui/material';
import Registerform from './Registerform';
import { CssBaseline } from '@mui/material';
import { useLocation } from 'react-router-dom';
import LoginForm from './LoginForm';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
  outline: 'none',
};

function AuthModal({ open, handleClose }) {
    const location=useLocation();
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="auth-modal-title"
      aria-describedby="auth-modal-description"
    >
      <Box sx={style}>
          {location.pathname==="/login" ? <LoginForm />:<Registerform />}

      </Box>
    </Modal>
  );
}

export default AuthModal;
