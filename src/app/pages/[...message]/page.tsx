'use client';
import Middle from '@/app/components/Middle';
import { Box } from '@mui/system';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useSelector } from 'react-redux';

const Page = () => {
  const router = useRouter();
  const messagepage = usePathname();
  console.log(messagepage || 'none');
  console.log(messagepage.split('/')[2]);

  const { messages, messageStatus, messageError } = useSelector(
    (state: any) => state.message
  );
  // const { user_google_cred, userStatus, userError } = useSelector(
  //   (state: any) => state.user
  // );

  return (
    <Box
      sx={{
        backgroundColor:"gray",
        marginLeft: '4.2rem',
        marginTop: '2rem',
        width: '100%',

        // Responsive styles
        '@media (max-width: 600px)': {
          // Styles for small screens (e.g., phones)
          marginTop: '1rem',
        },
        '@media (min-width: 601px) and (max-width: 1024px)': {
          // Styles for medium screens (e.g., tablets)
          marginTop: '1rem',
        },
        '@media (min-width: 1025px)': {
          // Styles for large screens (e.g., desktops)
          marginTop: '1rem',
        },
      }}
      position="fixed"
    >
      <Middle message_data={messagepage.split('/')[2]}></Middle>
    </Box>
  );
};

export default Page;
