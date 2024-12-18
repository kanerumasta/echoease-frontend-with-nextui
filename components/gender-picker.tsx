import { IoFemale, IoMale } from "react-icons/io5";

import { cn } from "@/lib/utils";

type GenderPickerProps = {
  value: "male" | "female";
  onChange: (value: "male" | "female") => void;
};

const GenderPicker: React.FC<GenderPickerProps> = ({ value, onChange }) => {
  return (
    <div className="justify-center flex space-x-4">
      <div
        className={cn(
          "cursor-pointer  flex flex-col justify-center items-center w-full h-[80px]  rounded-lg  ",
          {
            "bg-[#2f9fe1] text-white": value === "male",
            "border-2 border-gray-300 dark:border-white/25": value !== "male",
          },
        )}
        onClick={() => onChange("male")}
      >
        <IoMale color={value === "male" ? "white" : "#2f9fe1"} size={24} />
        <span className="block text-center mt-1">Male</span>
      </div>
      <div
        className={cn(
          "cursor-pointer  flex flex-col justify-center items-center w-full h-[80px] rounded-lg ",
          {
            "bg-[#2f9fe1] text-white": value === "female",
            "border-2 border-gray-300  dark:border-white/25":
              value !== "female",
          },
        )}
        onClick={() => onChange("female")}
      >
        <IoFemale color={value === "female" ? "white" : "#2f9fe1"} size={24} />
        <span className="block text-center mt-1">Female</span>
      </div>
    </div>
  );
};

export default GenderPicker;
