import React from 'react'

export default function CopyBox({ className }: { className?: string }) {
  return (
    <svg
      width="11"
      height="12"
      viewBox="0 0 11 12"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10.125 11H4C3.79289 11 3.625 10.8321 3.625 10.625V4.5C3.625 4.29289 3.79289 4.125 4 4.125H10.125C10.3321 4.125 10.5 4.29289 10.5 4.5V10.625C10.5 10.8321 10.3321 11 10.125 11Z"
        stroke="white"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.37502 4.125V1.375C7.37502 1.16789 7.20715 1 7.00002 1H0.875001C0.667894 1 0.5 1.16789 0.5 1.375V7.5C0.5 7.70712 0.667894 7.875 0.875001 7.875H3.62501"
        stroke="white"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
