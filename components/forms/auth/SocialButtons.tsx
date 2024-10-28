import { continueWithGoogle, continueWithFacebook } from "@/utils";

import SocialButton from "./SocialButton";

export default function SocialButtons() {
  return (
    <div className="flex items-center my-4 gap-2 justify-between ">
      <SocialButton
        callBack={continueWithGoogle}
        icon={<img alt="G" src="/media/google.png" width={20} />}
        text="Google"
      />
      <SocialButton
        callBack={continueWithFacebook}
        icon={<img alt="F" src="/media/facebook.png" width={25} />}
        text="Facebook"
      />
    </div>
  );
}
