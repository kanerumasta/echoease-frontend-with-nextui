"use client";
import { useRolePickMutation } from "@/redux/features/accountApiSlice";
import { RolePickingSchema } from "@/schemas/user-schemas";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function useRolePicking() {
  const [rolePick, { isLoading, isError, isSuccess }] = useRolePickMutation();
  const form = useForm<z.infer<typeof RolePickingSchema>>();

  const onsubmit = async (data: z.infer<typeof RolePickingSchema>) => {
    console.log(data);

    const formData = new FormData();

    //role

    data.category &&
      formData.append(
        "category",
        data.category === "event organizer"
          ? "event_organizer"
          : data.category === "bar owner"
            ? "bar_owner"
            : data.category
      );

    //organizer ?
    data.production_page &&
      formData.append("production_page", data.production_page);
    data.organizer_images &&
      data.organizer_images.map((d, index) => {
        formData.append(`doc_image${index + 1}`, d);
      });

      data.businessName && formData.append("business_name", data.businessName);
      data.businessImage &&
      formData.append("business_image", data.businessImage);

    //bar owner
    data.business_permit &&
      formData.append("business_permit", data.business_permit);

    //general
    data.government_id_type &&
      formData.append("government_id_type", data.government_id_type);
    data.government_id && formData.append("government_id", data.government_id);

    rolePick(formData)
      .unwrap()
      .then(() => {})
      .catch((e) => {});
  };

  return {
    form,
    onsubmit,
    isLoading,
    isError,
    isSuccess,
  };
}
