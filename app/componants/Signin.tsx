import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button } from '@mui/material';
import axios from 'axios';
import { GoogleLogin, useGoogleLogin } from '@react-oauth/google';

const Signin = () => {
  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      console.log('Google login successful', tokenResponse);
      const { data } = await axios.post('https://oauth2.googleapis.com/token', {
        code: tokenResponse['code'],
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        redirect_uri: process.env.REDIRECT_URI,
        grant_type: 'authorization_code',
      });

      //   res.json(data);
      console.log(data);
      localStorage.setItem('my_token', JSON.stringify(data));
      // const res = await axios.post(
      //   'http://127.0.0.1:8000/api/google-auth-verify/',
      //   data
      // );
      // console.log(res);
    },
    onError: () => {
      console.error('Google login failed');
      // Handle login errors here
    },
    flow: 'auth-code', // Use 'auth-code' for the authorization code flow
  });
  const getdata = async () => {
    if (localStorage.getItem('my_token')) {
      const data = localStorage.getItem('my_token');
      console.log(data);
      // const res = await axios.post(
      //   'http://127.0.0.1:8000/api/google-auth-verify/',
      //   JSON.parse(data)
      // );
      // console.log(res);
    }
  };
  useEffect(() => {
    getdata();
  }, []);
  return (
    <>
      <div style={{ position: 'absolute', left: '28%', padding: '110px' }}>
        <div
          style={{
            border: '1px solid grey',
            padding: '20px',
            textAlign: 'center',
            borderRadius: '5px',
            minHeight: '310px',
            maxWidth: '350px',
          }}
        >
          <img style={{ width: '70px' }} src={social} />
          <h2 style={{ fontWeight: '200' }}>
            Create your google clone account
          </h2>
          <h3 style={{ fontWeight: '200' }}>Click the signin button</h3>
          <Button onClick={() => googleLogin()} variant="contained">
            Signin with google
          </Button>
        </div>
      </div>
    </>
  );
};

Signin.propTypes = {};

export default Signin;
