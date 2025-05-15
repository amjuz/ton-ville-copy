type Props = {
  className?: string
}

export default function Twitter({ className }: Props) {
  return (
    <svg viewBox="0 0 2500 2500" className={className}>
      <g>
        <g>
          <circle cx={1250} cy={1250} r={1250} />
          <path
            fill="#fff"
            fillRule="evenodd"
            d="M937.7,478.5H405.3l631.2,833.8-590.8,699.4h273l446.9-529,396.8,524.1h532.4l-649.6-858,1.2,1.5,559.3-662.1h-273l-415.3,491.7-379.6-501.4ZM699.1,624.5h165.7l936,1236.3h-165.7L699.1,624.5Z"
          />
        </g>
      </g>
    </svg>
  )
}
