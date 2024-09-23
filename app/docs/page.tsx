"use client";
import { title } from "@/components/primitives";

import { toast } from "react-toastify";

export default function DocsPage() {
  return (
    <div>
      <h1 className={title()}>Docs</h1>
      <button onClick={() => toast("dfo;dif")}>Toast</button>
    </div>
  );
}
