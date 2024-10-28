"use client";

import useCompleteProfile from "@/hooks/use-complete-profile";
import EchoLoading from "@/components/echo-loading";

import MainForm from "./forms/main-form";

export default function Page() {
  const { isError, profileChecked } = useCompleteProfile(
    "/become-an-echoee/application",
  );

  if (!profileChecked) {
    return <EchoLoading />;
  }
  if (isError) {
    return <div>Error</div>;
  }

  return (
    <div className="mx-auto w-full p-4 rounded-lg md:w-4/6 lg:w-2/4 ">
      <MainForm />
    </div>
  );
}
