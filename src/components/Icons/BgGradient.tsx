import { FC } from 'react'

interface Props {
  className?: string
}

export const BgGradient: FC<Props> = ({ className }) => {
  return (
    <svg width={391} height={374} viewBox="0 0 391 374" fill="none" className={className}>
      <rect width={391} height={374} fill="url(#paint0_radial_7372_11548)" />
      <defs>
        <radialGradient
          id="paint0_radial_7372_11548"
          cx={0}
          cy={0}
          r={1}
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(195.5 187) rotate(90) scale(187 195.5)"
        >
          <stop stopColor="#0057FF" />
          <stop offset="0.5" stopColor="#000041" stopOpacity="0.8" />
          <stop offset="0.98" stopOpacity={0} />
        </radialGradient>
      </defs>
    </svg>
  )
}
