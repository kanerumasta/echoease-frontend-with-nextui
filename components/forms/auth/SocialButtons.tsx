import SocialButton from "./SocialButton";
import { continueWithGoogle, continueWithFacebook } from "@/utils";
import { ImGoogle, ImFacebook } from "react-icons/im";

export default function SocialButtons() {
  return (
    <div className="flex items-center my-4 gap-2 justify-between ">
      <SocialButton
        callBack={continueWithGoogle}
        text="Google"
        icon={<img alt="G" width={20} src="/media/google.png" />}

      />
      <SocialButton
        callBack={continueWithFacebook}
        text="Facebook"
        icon={<img alt="F" width={25} src="/media/facebook.png" />}


      />
    </div>
  );
}
