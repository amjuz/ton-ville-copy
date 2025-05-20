import ProfilePage from './components/profile-page'

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const userId = (await params).id

  return <ProfilePage userId={userId} />
}
