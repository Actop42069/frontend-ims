'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import Link from "next/link";

import { LatestPost } from "start/app/_components/post";
import { api, HydrateClient } from "start/trpc/server";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to login page
    router.push('/auth/login');
  }, [router]);

  return null; // No need to render anything as we're redirecting
}
