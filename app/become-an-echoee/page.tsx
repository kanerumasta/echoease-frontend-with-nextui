"use client";

import FormSkeleton from "@/components/form-skeleton";
import { UserRoles } from "@/config/constants";
import useCompleteProfile from "@/hooks/use-complete-profile";
import { useFetchCurrentUserQuery } from "@/redux/features/authApiSlice";
import {
    useEffect
} from "react";
import MainForm from "./forms/main-form";
import { useHasArtistApplicationQuery } from "@/redux/features/artistApiSlice";
import { toast } from "react-toastify";

export default function BecomeEchoeePage(){
    const {isError,profileChecked} = useCompleteProfile("/become-an-echoee");
    const {data:user,isLoading:isUserLoading} = useFetchCurrentUserQuery()
    const {isSuccess:noApplicationYet, isError:hasAlreadyApplied} = useHasArtistApplicationQuery()

    useEffect(()=>{
       if (user){
        if(user.role === UserRoles.artist){
              window.location.href = '/'
        }
        if(hasAlreadyApplied){
            toast.error("You already has a pending application. Please can wait for echo team admin approval.")
            setTimeout(() => {
                window.location.href = '/'
            }, 1000);
        }
       }
    },[user, hasAlreadyApplied, noApplicationYet])

    if(!profileChecked || isUserLoading){
        return <div className="flex items-center justify-center">
                <FormSkeleton />
        </div>
    }
    if(isError){
        return <div>Error</div>
    }

    return (
    <div className="h-full flex items-center justify-center ">
        <div className="max-auto w-full p-4 rounded-lg bg-white/10 md:w-4/6 lg:w-2/4 ">
            <p></p>
            <MainForm />
        </div>
    </div>)

}
