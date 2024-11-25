"use client";

import { useSearchParams } from "next/navigation";

import LoginForm from "@/components/forms/auth/login-form";

const ClientSearchParamsHandler = () => {
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/";

  return <LoginForm redirect={redirect} />;
};

export default ClientSearchParamsHandler;
