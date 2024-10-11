"use client";

import LoginForm from "@/components/forms/auth/login-form";
import SocialButtons from "@/components/forms/auth/SocialButtons";
import { Divider } from "@nextui-org/divider";
import { useRouter } from "next/navigation";
import { Suspense } from "react";
import ClientSearchParamsHandler from "./client-searchparam-handler";

const Page = () => {
  const router = useRouter();
  return (
    <Suspense>
    <div className="w-full md:w-[50%] lg:w-[35%] mx-auto">
      <div>
        <h1 className="text-3xl font-bold">
          Sign in to <span className="text-blue-400">Echoease</span>
        </h1>
        <h1 className="text-center text-2xl py-4"></h1>
      </div>

      <ClientSearchParamsHandler />
      <Divider className="my-4 h-[0.5px]" />
      <small className="text-black/50 dark:text-white/50">
        OR SIGN IN WITH
      </small>
      <SocialButtons />
      <p className="text-gray-500 text-sm w-full text-center">
        Don't have an account yet?
        <span
          className="text-blue-400 cursor-pointer hover:font-bold"
          onClick={() => router.replace("/auth/register")}
        >
          Sign up here
        </span>
      </p>
    </div>
    </Suspense>
  );
};

export default Page;
