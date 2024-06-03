'use client';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { logoutUser } from '@/app/redux/THUNK/USER-THUNK/userslicethunk';
import { useAppDispatch } from '@/app/redux/STORE/store';
import Loader from '@/components/Loader';
import { useDispatch } from 'react-redux';
const Logout = () => {
  const router = useRouter();
  const dispatch: any = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(logoutUser());
    })();
    console.log('logged out');

    router.push('/');
  }, [dispatch, router]);
  return (
    <div>
      {/* <Loader open={true}></Loader> */}
      {/* logout */}
    </div>
  );
};

export default Logout;
