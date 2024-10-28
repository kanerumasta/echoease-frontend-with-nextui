import React from "react";

export const AboutIcon = (
  props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>,
) => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    height="24"
    role="presentation"
    viewBox="0 0 24 24"
    width="24"
    {...props}
  >
    <circle
      cx="12"
      cy="8"
      fill="none"
      r="4"
      stroke="currentColor"
      strokeWidth="2"
    />
    <path
      d="M4 20C4 16.6863 7.68629 14 12 14C16.3137 14 20 16.6863 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    />
  </svg>
);
