import { JSX, SVGProps } from "react";

export const PendingBookingIcon = (props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) => (
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
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none"/>
      <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M12 2V4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M12 20V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M20 12H22" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M2 12H4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M16.95 16.95L18.36 18.36" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M5.64 5.64L7.05 7.05" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M16.95 7.05L18.36 5.64" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M5.64 18.36L7.05 16.95" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
