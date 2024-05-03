'use client';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMessages } from '../reduxToolKit/messageSlice';
import Middle from '../components/Middle';

const page = () => {
  const dispatch: any = useDispatch();
  const { messages, messageStatus, messageError } = useSelector(
    (state: any) => state.message
  );
  const { user_cred, userStatus, userError } = useSelector(
    (state: any) => state.user
  );

  useEffect(() => {
    dispatch(fetchMessages(user_cred));
  }, [dispatch]);
  return (
    <div>
      <Middle message_data={messages || []}></Middle>
    </div>
  );
};

export default page;
