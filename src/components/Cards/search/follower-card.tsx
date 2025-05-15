interface IFollowerCard {
  followers?: number
  following?: number
}

export default function FollowerCard({ followers, following }: IFollowerCard) {
  return (
    <p className="text-sm text-muted-foreground">
      <span>
        {followers} followers, {following} Following{' '}
      </span>
    </p>
  )
}
