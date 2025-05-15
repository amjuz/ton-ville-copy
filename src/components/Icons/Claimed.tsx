import React, { FC } from 'react'

interface Props {
  className?: string
}

export const Claimed: FC<Props> = ({ className }) => {
  return (
    <React.Fragment>
      <svg
        width="8"
        height="8"
        viewBox="0 0 8 8"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        <g clipPath="url(#clip0_7589_18088)">
          <path
            d="M2.58306 6.88738C2.35598 6.88748 2.13819 6.79722 1.97775 6.63651L0.147687 4.80713C-0.049229 4.61015 -0.049229 4.29084 0.147687 4.09387C0.344666 3.89695 0.663969 3.89695 0.860947 4.09387L2.58306 5.81598L7.13905 1.25999C7.33603 1.06308 7.65533 1.06308 7.85231 1.25999C8.04923 1.45697 8.04923 1.77627 7.85231 1.97325L3.18838 6.63651C3.02794 6.79722 2.81015 6.88748 2.58306 6.88738Z"
            fill="white"
          />
        </g>
        <defs>
          <clipPath id="clip0_7589_18088">
            <rect width="8" height="8" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </React.Fragment>
  )
}
