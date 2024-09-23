"use client";

import RegisterForm from "@/components/forms/auth/register-form";
import SocialButtons from "@/components/forms/auth/SocialButtons";
import { Divider } from "@nextui-org/divider";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();
  return (
      <div className="w-full mx-auto md:w-[50%] lg:w-[40%] space-y-2">
        <h1 className="text-3xl">
          Sign up for <span className="text-blue-400 font-bold">Echoease</span>
        </h1>
        <p className="text-black/40 dark:text-white/40">
          Create your account and join a community that brings music and events
          together.
        </p>
        <RegisterForm />
        <Divider orientation="horizontal" />
        <p className="text-gray-400 uppercase text-xs text-center">
          OR SIGN UP WITH
        </p>

        <SocialButtons />

        <p className="text-gray-500 text-sm w-full text-center">
          Already have an account?
          <span
            className="text-blue-400 cursor-pointer hover:font-bold"
            onClick={() => router.replace("/auth/login")}
          >
            Login here
          </span>
        </p>
      </div>
  );
};

export default Page;
