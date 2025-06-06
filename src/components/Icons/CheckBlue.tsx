import { FC } from 'react'

interface Props {
  className?: string
}

export const CheckBlue: FC<Props> = ({ className }) => {
  return (
    <svg
      width={20}
      height={20}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16.1827 5.32544C16.6058 5.75935 16.6058 6.46287 16.1827 6.89679L8.59937 14.6746C8.1763 15.1085 7.49037 15.1085 7.0673 14.6746L3.8173 11.3412C3.39423 10.9073 3.39423 10.2038 3.8173 9.76988C4.24037 9.33597 4.9263 9.33597 5.34937 9.76988L7.83333 12.3175L14.6506 5.32544C15.0737 4.89152 15.7596 4.89152 16.1827 5.32544Z"
        fill="#007AFF"
      />
    </svg>
  )
}
