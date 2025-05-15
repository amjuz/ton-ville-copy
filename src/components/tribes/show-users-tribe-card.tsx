import ProfileTribeCard from '../Cards/tribes/ProfileTribeCard'

export default function ShowUsersTribeCard() {
  return (
    <div>
      <ProfileTribeCard
        tribeName="Hard Apes"
        tribePoints={5.1}
        eventCount={20}
        questCount={20}
        tgGroupCount={20}
      />
    </div>
  )
}
