"use client";

import { useActivationMutation } from "@/redux/features/authApiSlice";
import { useEffect, useRef } from "react";
import { useRouter, useParams } from "next/navigation";
import { toast } from "react-toastify";

export default function Page() {
    const router = useRouter();
    const params = useParams();  // Use useParams to fetch dynamic params
    const { uid, token } = params as { uid: string; token: string };
    const [activation] = useActivationMutation();
    const refRan = useRef(false);

    useEffect(() => {
        if (!refRan.current) {
            activation({ uid, token })
                .unwrap()
                .then(() => {
                    toast.success("Account activation successful!");
                })
                .catch(() => {
                    toast.error("Failed to activate your account");
                })
                .finally(() => router.replace("/auth/login"));
        }

        return () => {
            refRan.current = true;
        };
    }, [uid, token, activation, router]);

    return <div>Activating your account....</div>;
}
