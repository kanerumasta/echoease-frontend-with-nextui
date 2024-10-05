"use client";

import EchoLoading from "@/components/echo-loading";
import FormSkeleton from "@/components/form-skeleton";
import RegisterForm from "@/components/forms/auth/register-form";
import DateTimePicking from "../[slug]/forms/datetime-picking";

export default function TesterPage() {
  return (
    <div className="h-screen flex items-center justify-center">
      <DateTimePicking />
    </div>
  );
}
