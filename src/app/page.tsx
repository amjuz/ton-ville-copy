import { redirect } from 'next/navigation'

/**
 * Redirect to `/auth` is set in {@link redirects}
 * */
export default function Page() {
  redirect('/protected/core')
  return null
}
