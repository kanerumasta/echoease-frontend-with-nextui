"use client";
import { useDisclosure } from "@nextui-org/modal";
import { BsGenderFemale, BsGenderMale } from "react-icons/bs";
import { FaPhone } from "react-icons/fa";
import { ImLocation } from "react-icons/im";
import { IoPerson } from "react-icons/io5";
import { LiaBirthdayCakeSolid } from "react-icons/lia";
import { MdEmail } from "react-icons/md";
import { z } from "zod";
import { Button } from "@nextui-org/button";
import { Spacer } from "@nextui-org/spacer";
import { useParams } from "next/navigation";

import { cn } from "@/lib/utils";
import { UserSchema } from "@/schemas/user-schemas";
import { useFetchCurrentUserQuery } from "@/redux/features/authApiSlice";
import { EditIcon } from "@/components/icons/edit";
import { useFetchUserDetailByIdQuery } from "@/redux/features/accountApiSlice";

import ChangeProfileImage from "../forms/change-profile-image";
import { ChangePassword } from "../forms/change-password";
import { ChangeName } from "../forms/change-name";
import { ChangeAddress } from "../forms/change-address";
import { ChangePhone } from "../forms/change-phone";
import { ChangeDob } from "../forms/change-dob";
import { ChangeGender } from "../forms/change-gender";

import { ProfileImage } from "./components/profile-image";

export default function ProfileDetailPage() {
  const { data: currentUser, isLoading } = useFetchCurrentUserQuery();
  const params = useParams<{ id: string }>();
  const { onOpen, isOpen, onOpenChange } = useDisclosure();
  const { data: user } = useFetchUserDetailByIdQuery(params.id);

  console.log(user)

  return (
    <>
      <div className="w-full md:px-[100px] ">
        <div className="flex mb-20 relative gap-2 bg-white/10 h-[200px] rounded-lg md:justify-start p-4 justify-center">
          <h1 className="text-4xl  w-full font-black tracking-wide text-white/25">
            PROFILE
          </h1>
          <div className=" absolute bottom-2 right-2 gap-2 flex items-center">
            {currentUser && user && currentUser.id === user.id && (
              <Button
                className="text-white"
                color="danger"
                radius="sm"
                variant="ghost"
              >
                Deactivate
              </Button>
            )}
            {currentUser && user && currentUser.id === user.id && (
              <ChangePassword />
            )}
          </div>

          {currentUser && user && currentUser.id === user.id ? (
            <ChangeProfileImage currentUser={currentUser} />
          ) : (
            <div className="absolute bottom-[-30%]">
              <ProfileImage
                imageSrc={`${user?.profile?.profile_image}`}
              />
            </div>
          )}
        </div>
        <Spacer y={40} />
        <div className="w-full">
          {currentUser && user && (
            <PersonalInfo currentUser={currentUser} user={user} />
          )}
        </div>
      </div>
    </>
  );
}

type PersonalInfoProps = {
  user: z.infer<typeof UserSchema>;
  currentUser: z.infer<typeof UserSchema>;
};
const PersonalInfo = ({ user, currentUser }: PersonalInfoProps) => {
  const { isOpen, onOpenChange, onOpen, onClose } = useDisclosure();
  const Line = ({
    title,
    value,
    icon,
    isEditable,
    valueClassName,
  }: {
    title: string;
    value: string;
    icon: any;
    isEditable?: boolean;
    valueClassName?: string;
  }) => {
    return (
      <div className="flex px-1 items-center justify-between text-white/80">
        <div className="flex items-center gap-2">
          {icon}
          <p className="flex tracking-wide items-center gap-2 font-bold">
            {" "}
            {title}:
            <span
              className={cn(
                "md:text-lg tracking-wide font-normal",
                valueClassName,
              )}
            >
              {value}
            </span>
          </p>
        </div>
        {isEditable && <EditIcon />}
      </div>
    );
  };

  return (
    <div className="p-4 rounded-md w-full  bg-white/10 min-h-[300px]">
      <p className="text-sm text-white/20 mb-3">Personal Details</p>
      {user.profile && (
        <div className="space-y-3 capitalize">
          <div className="flex items-center justify-between">
            <Line
              icon={<IoPerson color="#757777" />}
              title="Name"
              value={user.fullname}
            />
            {currentUser.id === user.id && <ChangeName user={user} />}
          </div>
          <Line
            icon={<MdEmail color="#757777" />}
            title="Email"
            value={user.email.toLowerCase()}
            valueClassName="lowercase"
          />
          <div className="flex items-center justify-between">
            <Line
              icon={<ImLocation color="#757777" />}
              title="Address"
              value={user.profile?.complete_address}
            />
            {currentUser.id === user.id && <ChangeAddress />}
          </div>
          <div className="flex items-center justify-between">
            <Line
              icon={<FaPhone color="#757777" />}
              title="Phone Number"
              value={user.profile.phone}
            />
            {currentUser.id === user.id && <ChangePhone />}
          </div>
          <div className="flex items-center justify-between">
            <Line
              icon={<LiaBirthdayCakeSolid color="#757777" />}
              title="Date of Birth"
              value={user.profile.dob}
            />
            {currentUser.id === user.id && <ChangeDob />}
          </div>
          <div className="flex items-center justify-between">
            {currentUser.id === user.id && <ChangeGender user={user} />}
            <Line
              icon={
                user.profile.gender === "male" ? (
                  <BsGenderMale color="#757777" />
                ) : (
                  <BsGenderFemale color="#757777" />
                )
              }
              title="Gender"
              value={user.profile.gender}
            />
          </div>
        </div>
      )}
    </div>
  );
};
