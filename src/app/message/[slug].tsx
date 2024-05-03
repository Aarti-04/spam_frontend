'use client';
import { useRouter } from 'next/router';
import React from 'react';

const DynamicPageComp = () => {
  const router = useRouter();
  const { slug } = router.query;
  console.log(slug);

  return <div>{slug}</div>;
};

export default DynamicPageComp;
