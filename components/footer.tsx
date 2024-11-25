import {
  IoLogoFacebook,
  IoLogoInstagram,
  IoLogoTiktok,
  IoLogoYoutube,
} from "react-icons/io5";

export const Footer = () => {
  return (
    <div className="lg:p-32 p-10 bg-white/5">
      <div>
        <h1 className="text-3xl font-extrabold lg:mb-6 mb-4  text-blue-400">
          ECHOEASE
        </h1>
        <p className="mb-4">Connecting Talent with Opportunity</p>
        <div className="flex items-center gap-4">
          <IoLogoFacebook size={24} />
          <IoLogoYoutube size={24} />
          <IoLogoTiktok size={24} />
          <IoLogoInstagram size={24} />
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
