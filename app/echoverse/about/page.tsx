"use client";

import { useFetchDetailCurrentArtistQuery } from "@/redux/features/artistApiSlice";
import { Image } from "@nextui-org/image";
import { Input } from "@nextui-org/input";
import { Spinner } from "@nextui-org/spinner";

export default function AboutPage() {
  const {
    data: currentArtist,
    isLoading: isCurrentArtistLoading,
    isError: isCurrentArtistError,
  } = useFetchDetailCurrentArtistQuery();

  if (isCurrentArtistLoading) return <Spinner size="lg" />;
  console.log(currentArtist);
  return (
    <div className="flex gap-2 p-4 dark:bg-white/5 rounded-lg">
      <Image
        width={200}
        src={`${process.env.NEXT_PUBLIC_HOST}${currentArtist?.user.profile?.profile_image}`}
      />
      <div className="space-y-4">
        <Input
          className="capitalize"
          label={<p className="w-[100px]">Description</p>}
          defaultValue={currentArtist?.bio ? currentArtist.bio : ""}
          isReadOnly
          size="lg"
          radius="sm"
          labelPlacement="outside-left"
        />
        <Input
          className="capitalize"
          label={<p className="w-[100px]">Name</p>}
          defaultValue={`${currentArtist?.user.first_name} ${currentArtist?.user.last_name}`}
          isReadOnly
          size="lg"
          radius="sm"
          labelPlacement="outside-left"
        />
        <Input
        size="lg"
          label={<p className="w-[100px]">Birth Date</p>}
          radius="sm"
          isReadOnly
          labelPlacement="outside-left"
        />
        <Input
         size="lg"
          label={<p className="w-[100px]">Gender</p>}
          radius="sm"
          isReadOnly
          labelPlacement="outside-left"
        />
        <Input
         size="lg"
          label={<p className="w-[100px]">Contact No.</p>}
          radius="sm"
          isReadOnly
          labelPlacement="outside-left"
        />
      </div>
    </div>
  );
}
