import { JSX, SVGProps } from "react";

export const CompletedBookingIcon = (
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
      r="9"
      stroke="currentColor"
      strokeWidth="2"
    />
    <circle
      cx="12"
      cy="12"
      fill="none"
      opacity="0.5"
      r="10.5"
      stroke="currentColor"
      strokeWidth="1"
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
