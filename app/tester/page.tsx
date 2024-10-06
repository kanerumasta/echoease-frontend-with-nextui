"use client";

import EchoLoading from "@/components/echo-loading";
import FormSkeleton from "@/components/form-skeleton";
import RegisterForm from "@/components/forms/auth/register-form";
import DateTimePicking from "../[slug]/forms/datetime-picking";
import { useFetchDetailArtistBySlugQuery } from "@/redux/features/artistApiSlice";

export default function TesterPage() {
    const {data} = useFetchDetailArtistBySlugQuery('macrina-ibale')
  return (
    <div className="min-h-screen p-48 flex items-center justify-center">
      {data && <DateTimePicking artist={data}/>}
    </div>
  );
}
