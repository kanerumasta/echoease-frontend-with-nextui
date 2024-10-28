import {
  IoLogoFacebook,
  IoLogoInstagram,
  IoLogoTiktok,
  IoLogoYoutube,
} from "react-icons/io5";

export const Footer = () => {
  return (
    <div className="p-32 bg-white/5">
      <div>
        <h1 className="text-3xl font-extrabold mb-6  text-blue-400">
          ECHOEASE
        </h1>
        <p className="mb-4">Connecting Talent with Opportunity</p>
        <div className="flex items-center gap-4">
          <IoLogoFacebook size={30} />
          <IoLogoYoutube size={30} />
          <IoLogoTiktok size={30} />
          <IoLogoInstagram size={30} />
        </div>
        <div className="flex gap-3 mt-4">
          <div className="border-[1px] rounded-md border-white/10 flex items-center justify-center">
            <img src="/media/GCash-Logo.png" width={80} />
          </div>
          <div className="border-[1px] rounded-md border-white/10 flex items-center justify-center">
            <img src="/media/paymaya.png" width={80} />
          </div>
        </div>
      </div>
    </div>
  );
};
