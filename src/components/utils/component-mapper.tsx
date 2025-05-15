import { ReactNode } from 'react'
import TribeSearchCardWrapper from '@/containers/wrappers/search/tribes/tribe-search-card-wrapper'
import SkillsSearchCardWrapper from '@/containers/wrappers/search/skills/skills-search-card-wrapper'
import EventsSearchCardWrapper from '@/containers/wrappers/search/events/event-search-card-wrapper'
import QuestSearchCardWrapper from '@/containers/wrappers/search/quests/quest-search-card-wrapper'
import { TSearchTitleState } from './mini-tablet-data'
import ChiefSearchCardWrapper from '@/containers/wrappers/search/chiefs/chief-search-card-wrapper'

type TComponentMapper = {
  [Key in TSearchTitleState]: ReactNode
}

export const ComponentMapper: TComponentMapper = {
  Chiefs: <ChiefSearchCardWrapper />,
  Tribes: <TribeSearchCardWrapper />,
  Skills: <SkillsSearchCardWrapper />,
  Events: <EventsSearchCardWrapper />,
  Quests: <QuestSearchCardWrapper />,
}
