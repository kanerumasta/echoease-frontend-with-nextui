import ConfirmPasswordResetForm from "@/components/forms/auth/confirm-reset";
import { Spacer } from "@nextui-org/spacer";

export default function Page() {
  return (
    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <h2 className="text-2xl font-bold">Create A New Password</h2>
      <small className="text-black/50 dark:text-white/50 ">
        Please enter and confirm your new password to complete the reset
        process.
      </small>
      <Spacer y={4} />
      <ConfirmPasswordResetForm />
    </div>
  );
}
