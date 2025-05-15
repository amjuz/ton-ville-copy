import CopyReferralLinkButton from './copy-referral-link-button'

export default function ReferAndEarnCard({ referralLink }: { referralLink: string }) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-between py-4">
      <div>
        <h1 className="xs:text-xl text-lg font-bold">Refer & Earn</h1>
      </div>
      <div className="w-full">
        <div className="flex w-full justify-between px-4">
          <p className="xs:text-base text-sm text-muted-foreground">Referrals</p>
          <p className="xs:text-base text-sm font-medium">10</p>
        </div>
        <div className="flex w-full justify-between px-4">
          <p className="xs:text-base text-sm text-muted-foreground">Earnings</p>
          <p className="xs:text-base text-sm font-medium">4000</p>
        </div>
      </div>
      <div className="w-full px-3">
        <CopyReferralLinkButton referralLink={referralLink} />
      </div>
    </div>
  )
}
