"use client";

import { Progress } from "@nextui-org/progress";
import { useEffect, useState } from "react";

export default function TesterPage() {
  const [prop, setProps] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      if (prop < 100) setProps((prev) => prev + 5);
      else setProps(0);
    }, 100);
  }, [prop]);

  return (
    <div className="w-1/4 m-auto pt-20">
      <Progress
        showValueLabel
        classNames={{
          base: "rounded-lg bg-white/10 p-3",
          indicator: "bg-gradient-to-r from-blue-500 to-purple-500",
          track: " rounded-lg bg-white/60 h-[200px]",
          label: "text-white/50",
        }}
        label="Uploading..."
        radius="none"
        value={prop}
      />
    </div>
  );
}
