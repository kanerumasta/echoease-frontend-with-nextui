import { Spacer } from "@nextui-org/spacer";
import { Dispatch, SetStateAction } from "react";

import { cn } from "@/lib/utils";

type Props = {
  rolePicked: string;
  setRolePicked: Dispatch<SetStateAction<string>>;
  roles: string[];
};

export default function RolePickingForm({
  rolePicked,
  setRolePicked,
  roles,
}: Props) {
  return (
    <div className="flex items-center flex-col mt-8">
      <h1>Which best describes you?</h1>
      <Spacer y={6} />
      <div className="flex ">
        {roles.map((role) => (
          <div
            key={role}
            className={cn(
              "min-w-[150px] min-h-[150px] max-w-[150px] max-h-[150px] mx-4 flex items-center justify-center bg-slate-400 hover:cursor-pointer capitalize rounded-md",
              {
                "bg-blue-500": rolePicked === role,
              },
            )}
            onClick={() => setRolePicked(role)}
          >
            <p className="text-center">
              {`I am a${role === "event organizer" ? "n" : ""} ${role}`}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
