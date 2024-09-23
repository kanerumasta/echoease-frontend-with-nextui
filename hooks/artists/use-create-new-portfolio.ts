import { useCreateNewPortfolioMutation } from "@/redux/features/artistApiSlice";
import { CreatePortfolioItemSchema } from "@/schemas/artist-schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { date, z } from "zod";

export const useCreateNewPortfolio = () => {
  const form = useForm<z.infer<typeof CreatePortfolioItemSchema>>({
    resolver: zodResolver(CreatePortfolioItemSchema),
  });
  const [createNewPortfolio, { isLoading, isError, isSuccess }] =
    useCreateNewPortfolioMutation();

  const onSubmit = (data: z.infer<typeof CreatePortfolioItemSchema>) => {
    if (data.portfolio) {
      const formData = new FormData();
      data.videos &&
        data.videos.map((vid, index) => {
          formData.append(`video${index + 1}`, vid);
        });
      data.images &&
        data.images.map((img, index) => {
          formData.append(`image${index + 1}`, img);
        });
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("portfolio", data.portfolio);
      createNewPortfolio(formData);
    }
  };

  return {
    form,
    onSubmit,
    isLoading,
    isError,
    isSuccess,
  };
};
