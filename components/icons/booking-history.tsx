import { JSX, SVGProps } from "react";

export const BookingHistoryIcon = (
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
      d="M12 6V12L15 13.5"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    />
    <path
      d="M21 12A9 9 0 1 1 12 3v2a7 7 0 1 0 7 7h2z"
      fill="currentColor"
      opacity="0.5"
    />
  </svg>
);
