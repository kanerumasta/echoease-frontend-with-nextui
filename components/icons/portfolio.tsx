import React from "react";

export const PortfolioIcon = (props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>) => (
  <svg
    aria-hidden="true"
    focusable="false"
    height="24"
    role="presentation"
    viewBox="0 0 24 24"
    width="24"
    fill="none"
    {...props}
  >
    <rect x="4" y="7" width="16" height="12" rx="2" stroke="currentColor" strokeWidth="2" fill="none" />
    <path d="M8 7V5C8 3.89543 8.89543 3 10 3H14C15.1046 3 16 3.89543 16 5V7" stroke="currentColor" strokeWidth="2" fill="none" />
  </svg>
);
