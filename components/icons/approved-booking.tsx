import { JSX, SVGProps } from "react";

export const ApprovedBookingIcon = (
  props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>,
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
      cy="12"
      fill="none"
      r="10"
      stroke="currentColor"
      strokeWidth="2"
    />
    <path
      d="M9 12.5L11 14.5L15 10"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    />
  </svg>
);
