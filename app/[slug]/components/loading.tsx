import { Spinner } from "@nextui-org/spinner";

export const Loading = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Spinner size="lg" />
    </div>
  );
};
