'use client';
import React, { useEffect } from 'react';
import { UseDispatch, useDispatch, useSelector } from 'react-redux';
import { GetAccessTokenUsingRefreshToken } from '../../reduxToolKit/userSlice';
import logout from '../../reduxToolKit/userSlice';
const Logout = () => {
  const dispatch = useDispatch();
  const { user_cred, status, error } = useSelector((state: any) => state.user);
  console.log(user_cred);

  useEffect(() => {
    dispatch(GetAccessTokenUsingRefreshToken(user_cred['refresh_token']));
  }, []);
  return <div>page</div>;
};

export default Logout;
