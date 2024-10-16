import { JSX, SVGProps } from "react";

export const CompletedBookingIcon = (props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) => (
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
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" fill="none"/>
      <circle cx="12" cy="12" r="10.5" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.5"/>
      <path
        d="M9 12.5L11 14.5L15 10"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
