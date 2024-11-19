'use client';
import EchoLoading from "@/components/echo-loading";
import { useActivateUserMutation, useFetchCurrentUserQuery } from "@/redux/features/authApiSlice";
import { Button } from "@nextui-org/button";
import { Young_Serif } from "next/font/google";
import Image from "next/image";
import { notFound, useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function AccountDeactivated() {
  const { data: user, isLoading } = useFetchCurrentUserQuery();
  const [activateUser,{isLoading:isActivating}] = useActivateUserMutation()
  const router = useRouter()

  const handleActivate= async()=>{
    await activateUser().unwrap().then(()=>{
        toast.success('Account activated!');
        router.back()
    }).catch(()=>{
        toast.error('Failed to activate account. Please try again.')
    });
  }

  if (!user && !isLoading) return notFound();
  if (isLoading) return <EchoLoading />;

  if(user && !user.is_deactivated)return notFound()


if(user && user.is_deactivated){
    return(
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <div className="bg-white/5 shadow-lg rounded-lg p-6 md:p-8 max-w-md w-full text-center">
      <div className="flex justify-center">
        <Image width={200} height={200} alt="" src={"/media/echo-sad.png"}/>
        </div>
        <h1 className="text-2xl font-semibold text-[#f31260] mb-4">
          Your Account is Deactivated
        </h1>
        <p className="text-gray-600 mb-6">
          Your account is currently inactive. While deactivated, your profile is
          hidden, and you cannot access the platform's features or interact
          with other users. If you'd like to regain access, simply click the
          button below to activate your account.
        </p>
        <Button
        onPress={handleActivate}
        isDisabled={isActivating}
        isLoading={isActivating}
        size="lg"
          className="w-full text-blue-400 hover:text-white hover:bg-blue-600  font-semibold py-2 px-4 rounded transition-all"
        >
            {isActivating ? 'Activating' :
          'Activate Account'}
        </Button>
      </div>
    </div>
  );
}
return <h1>{JSON.stringify(user)}</h1>
}
