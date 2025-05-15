import CheifMuted from '@/components/Icons/CheifMuted'
import EventsMuted from '@/components/Icons/eventsMuted'
import SkillMuted from '@/components/Icons/skillMuted'
import TribeMuted from '@/components/Icons/TribeMuted'

export const SearchMiniTabletData = [
  {
    title: 'Chiefs',
    icon: (isDark: boolean) => <CheifMuted isDark={isDark} />,
  },
  {
    title: 'Tribes',
    icon: (isDark: boolean) => <TribeMuted isDark={isDark} />,
  },
  {
    title: 'Skills',
    icon: (isDark: boolean) => <SkillMuted isDark={isDark} />,
  },
  {
    title: 'Events',
    icon: (isDark: boolean) => <EventsMuted isDark={isDark} />,
  },
  {
    title: 'Quests',
    icon: (isDark: boolean) => <EventsMuted isDark={isDark} />,
  },
] as const

export type TSearchTitleState = (typeof SearchMiniTabletData)[number]['title']
