"use client";

import { useFetchListArtistsQuery } from "@/redux/features/artistApiSlice";
import EchoeeCard from "./components/echoee-card";
import EchoeeGroup from "./components/echoee-group";

export default function EchoeesPage() {
  const { data, isLoading } = useFetchListArtistsQuery();
  return <div>{data && <EchoeeGroup echoeeList={data} />}</div>;
}
