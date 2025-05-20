import { useParams } from 'next/navigation'
import TribePage from '@/components/tribes/tribe-page'

export default function Page() {
  // Get the tribeId from URL params using the useParams hook

  return <TribePage />
}
