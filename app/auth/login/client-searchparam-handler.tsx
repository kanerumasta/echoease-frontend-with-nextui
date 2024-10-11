'use client';

import LoginForm from '@/components/forms/auth/login-form';
import { useSearchParams } from 'next/navigation';


const ClientSearchParamsHandler = () => {
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect') || '/';

  return <LoginForm redirect={redirect} />;
};

export default ClientSearchParamsHandler;
