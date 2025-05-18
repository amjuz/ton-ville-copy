import ProfilePicture from '@/assets/images/mock/Animi_Profile_Icon.jpeg'
import Avatar from '@/components/Elements/avatar'
import PolygonStar from '@/components/Icons/polygonStar'
import VerifiedIcon from '@/components/Icons/VerifiedIcon'
import CreateTribeWrapper from '@/components/tribes/create-tribe-wrapper'
import ShowUsersTribeCard from '@/components/tribes/show-users-tribe-card'
import ProfileButtonWrapper from '@/containers/wrappers/buttons/profile-button-wrapper'
import ProfileButtonWrapperThirdParty from '@/containers/wrappers/buttons/profile-button-wrapper-third-party'
import FollowGemWrapper from '@/containers/wrappers/profile/follow-gem-wrapper'
import { getUserSession } from '@/data/dto/user'
import { getServerClient } from '@/lib/supabase/server'
import SetUsername from './components/set-username'

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const userId = (await params).id
  const isAuth = true
  const client = await getServerClient()

  const { user, error } = await getUserSession(client)
  if (!user) {
    console.log(error, 'USER NOT FOUND')
    return <></>
  }
  const { data, error: profileError } = await client
    .from('profile')
    .select(`*`)
    .eq('id', user.id)
    .single()

  const { data: skills, error: skillErr } = await client
    .from('skills')
    .select('*')
    .eq('user_id', user.id)

  if (skillErr) {
    console.log('failed to fetch skills data')
  }

  if (profileError) {
    console.log(profileError, 'PROFILE ERROR')
    return <></>
  }

  const { bio, follower_count, following_count, gems, id, name, profile_photo, username } = data

  const hasTribe = true
  return (
    <main className="mb-12 px-2 sm:px-4">
      <div className="flex items-center justify-center px-12 pt-12">
        <div className="relative h-32 w-32">
          <Avatar src={ProfilePicture.src} AvtImageClassName="w-full h-full" />
          <div className="absolute -right-2 top-[10%] flex items-center justify-center rounded-full bg-[linear-gradient(180deg,_#F5A243_0%,_#FF6200_100%)]">
            <div className="flex items-center justify-center gap-1 px-1 py-1">
              <PolygonStar />
              <p className="text-sm font-medium leading-none">34</p>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="flex flex-col items-center justify-center">
          <div className="flex items-center justify-center gap-1">
            <h3 className="text-xl font-bold tracking-tight">{name ?? '-'}</h3>
            <VerifiedIcon />
          </div>
          <div className="m-1 flex items-center gap-1 text-sm text-muted-foreground">
            @
            {username ? (
              <p className="text-sm text-muted-foreground">{username}</p>
            ) : (
              <SetUsername />
            )}
          </div>
          <div className="mt-2">
            <p className="max-w-sm text-center text-sm sm:max-w-md sm:text-base">{bio}</p>
          </div>
          <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
            {skills
              ? skills.map((item, i) => (
                  <div key={`${item.id}-${i}-tag-mock`} className="rounded-2xl bg-muted px-3 py-1">
                    <p className="text-sm text-muted-foreground">{item.skill}</p>
                  </div>
                ))
              : null}
          </div>
        </div>
        <FollowGemWrapper
          gems={gems ?? 0}
          followers={follower_count ?? 0}
          following={following_count ?? 0}
        />
        {isAuth ? <ProfileButtonWrapper userId={userId} /> : <ProfileButtonWrapperThirdParty />}
        {hasTribe ? <ShowUsersTribeCard /> : <CreateTribeWrapper />}
      </div>
    </main>
  )
}
