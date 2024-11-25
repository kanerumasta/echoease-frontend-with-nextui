"use client";

import { Image } from "@nextui-org/image";

import { useResendActivationMutation } from "@/redux/features/authApiSlice";

export default function CheckEmailPage() {
  const [resendActivation] = useResendActivationMutation();
  const email =
    typeof window !== "undefined" ? sessionStorage.getItem("email") : null;

  return (
    <div className="flex items-center justify-center h-screen">
      <div
        className=" w-full md:w-[50%] mx-auto bg-gray-400 rounded-2xl p-8
     text-gray-800 px-4"
      >
        <h1 className="text-3xl font-bold mb-6 text-gray-900">
          Welcome to EchoEase!
        </h1>

        <div className="mb-6 flex justify-center">
          <Image
            alt="Check Email"
            className="rounded-md shadow-md"
            src="/media/envelope.png"
            width={150}
          />
        </div>

        <div className="">
          <p className="text-lg mb-4">
            Thank you for signing up. To complete your registration, please
            check your email and follow the activation link we just sent you.
          </p>
          <p className="text-lg mb-6">
            Once your account is activated, you&apos;ll have full access to book
            singers and enjoy our platform!
          </p>
        </div>

        <p className="text-gray-500 mb-2">Didn&apos;t receive the email?</p>
        <div className="">
          <p className="mb-2">Check your spam or junk folder, just in case.</p>
          <p className="text-blue-500 cursor-pointer hover:underline">
            Still no luck?{" "}
            <span
              className="font-semibold"
              onClick={() => {
                resendActivation({
                  email: email,
                });
              }}
            >
              Click here to resend the activation link.
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
