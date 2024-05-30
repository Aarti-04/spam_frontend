// 'use client';
// import Image from 'next/image';
// import { getAuthCookies } from '../../lib/CookiStore';
// import { useRouter } from 'next/navigation';

// export default function Home() {
//   const route = useRouter();
//   route.push('mail/inbox');
//   return <></>;
// }
'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push('/mail/inbox');
  }, [router]);

  return null;
}
