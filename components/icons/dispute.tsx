import React from "react";

export const DisputeIcon = (
  props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>,
) => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    height="1em"
    role="presentation"
    viewBox="0 0 24 24"
    width="1em"
    {...props}
  >
    <path d="M12 2L1 21h22L12 2z" fill="currentColor" />
    <path
      d="M12 9.5a1 1 0 0 1 1 1v3a1 1 0 1 1-2 0v-3a1 1 0 0 1 1-1z"
      fill="white"
    />
    <circle cx="12" cy="16" fill="white" r="1" />
  </svg>
);

export default DisputeIcon;
