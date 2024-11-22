"use client";

import { useEffect, useState } from "react";

export default function TesterPage() {
  const [prop, setProps] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      if (prop < 100) setProps((prev) => prev + 5);
      else setProps(0);
    }, 100);
  }, [prop]);

  return <div>{/* <Step5 /> */}</div>;
}
