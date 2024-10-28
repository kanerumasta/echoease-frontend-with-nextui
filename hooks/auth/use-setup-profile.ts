import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

import { SetupProfileSchema } from "@/schemas/user-schemas";
import { useProfileSetupMutation } from "@/redux/features/accountApiSlice";

export default function useSetupProfile() {
  const form = useForm<z.infer<typeof SetupProfileSchema>>({
    resolver: zodResolver(SetupProfileSchema),
  });

  const [profileSetup, { isLoading, isError, isSuccess }] =
    useProfileSetupMutation();

  const onSubmit: SubmitHandler<z.infer<typeof SetupProfileSchema>> = (
    data: z.infer<typeof SetupProfileSchema>,
  ) => {
    const validatedData = SetupProfileSchema.safeParse(data);

    if (validatedData.success) {
      console.log("validated but not yet attached | profile part");
    }
    console.log(data);
    const formData = new FormData();

    formData.append("brgy", data.brgy);
    formData.append("dob", data.dob);
    formData.append("gender", data.gender);
    formData.append("municipality", data.municipality);
    formData.append("phone", data.phone);
    data.profile_image && formData.append("profile_image", data.profile_image);
    formData.append("province", data.province);
    formData.append("street", data.street);
    formData.append("zipcode", data.zipcode);

    profileSetup(formData).unwrap();
  };

  return {
    form,
    onSubmit,
    isLoading,
    isError,
    isSuccess,
  };
}
