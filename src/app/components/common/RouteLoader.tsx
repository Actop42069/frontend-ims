'use client';

import React, { useEffect, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import Loader from './Loader';

const RouteLoader: React.FC = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Create a function to handle route change start
    const handleStart = () => {
      setLoading(true);
    };

    // Create a function to handle route change complete
    const handleComplete = () => {
      setLoading(false);
    };

    // Show loading indicator on first render
    handleStart();

    // Set a timer to hide the loading indicator after the component mounts
    const timer = setTimeout(() => {
      handleComplete();
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [pathname, searchParams]);

  return loading ? <Loader fullPage /> : null;
};

export default RouteLoader; 