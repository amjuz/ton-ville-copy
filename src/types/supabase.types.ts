export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      events: {
        Row: {
          created_at: string
          date: string | null
          eventPhoto: string | null
          genre: string | null
          id: string
          location: string | null
          summary: string | null
          title: string | null
        }
        Insert: {
          created_at?: string
          date?: string | null
          eventPhoto?: string | null
          genre?: string | null
          id?: string
          location?: string | null
          summary?: string | null
          title?: string | null
        }
        Update: {
          created_at?: string
          date?: string | null
          eventPhoto?: string | null
          genre?: string | null
          id?: string
          location?: string | null
          summary?: string | null
          title?: string | null
        }
        Relationships: []
      }
      profile: {
        Row: {
          bio: string | null
          created_at: string
          follower_count: number | null
          following_count: number | null
          gems: number | null
          id: string
          name: string | null
          profile_photo: string | null
          rank: number | null
          username: string | null
        }
        Insert: {
          bio?: string | null
          created_at?: string
          follower_count?: number | null
          following_count?: number | null
          gems?: number | null
          id?: string
          name?: string | null
          profile_photo?: string | null
          rank?: number | null
          username?: string | null
        }
        Update: {
          bio?: string | null
          created_at?: string
          follower_count?: number | null
          following_count?: number | null
          gems?: number | null
          id?: string
          name?: string | null
          profile_photo?: string | null
          rank?: number | null
          username?: string | null
        }
        Relationships: []
      }
      quests: {
        Row: {
          created_at: string
          description: string | null
          guidelines: string | null
          id: string
          questImage: string | null
          subTitle: string | null
          title: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          guidelines?: string | null
          id?: string
          questImage?: string | null
          subTitle?: string | null
          title?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          guidelines?: string | null
          id?: string
          questImage?: string | null
          subTitle?: string | null
          title?: string | null
        }
        Relationships: []
      }
      skills: {
        Row: {
          created_at: string
          id: string
          skill: string
          sub_skills: string[] | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id: string
          skill: string
          sub_skills?: string[] | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          skill?: string
          sub_skills?: string[] | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'skills_user_id_fkey'
            columns: ['user_id']
            isOneToOne: false
            referencedRelation: 'profile'
            referencedColumns: ['id']
          },
        ]
      }
      tribe_profiles: {
        Row: {
          created_at: string
          profile_id: string
          tribe_id: string
        }
        Insert: {
          created_at?: string
          profile_id?: string
          tribe_id: string
        }
        Update: {
          created_at?: string
          profile_id?: string
          tribe_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'tribe_profiles_profile_id_fkey'
            columns: ['profile_id']
            isOneToOne: false
            referencedRelation: 'profile'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'tribe_profiles_tribe_id_fkey'
            columns: ['tribe_id']
            isOneToOne: false
            referencedRelation: 'tribes'
            referencedColumns: ['id']
          },
        ]
      }
      tribes: {
        Row: {
          author: string | null
          author_id: string | null
          created_at: string
          description: string | null
          event_id: string | null
          gems: number | null
          id: string
          quest_id: number | null
          subscribers: number | null
          tribe_cover_photo: string | null
          tribe_name: string | null
          tribe_photo: string | null
          twitter_id: string | null
        }
        Insert: {
          author?: string | null
          author_id?: string | null
          created_at?: string
          description?: string | null
          event_id?: string | null
          gems?: number | null
          id?: string
          quest_id?: number | null
          subscribers?: number | null
          tribe_cover_photo?: string | null
          tribe_name?: string | null
          tribe_photo?: string | null
          twitter_id?: string | null
        }
        Update: {
          author?: string | null
          author_id?: string | null
          created_at?: string
          description?: string | null
          event_id?: string | null
          gems?: number | null
          id?: string
          quest_id?: number | null
          subscribers?: number | null
          tribe_cover_photo?: string | null
          tribe_name?: string | null
          tribe_photo?: string | null
          twitter_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'tribes_author_id_fkey'
            columns: ['author_id']
            isOneToOne: false
            referencedRelation: 'profile'
            referencedColumns: ['id']
          },
        ]
      }
      tribes_events: {
        Row: {
          created_at: string
          events_id: string
          tribe_id: string
        }
        Insert: {
          created_at?: string
          events_id: string
          tribe_id: string
        }
        Update: {
          created_at?: string
          events_id?: string
          tribe_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'tribes_events_events_id_fkey'
            columns: ['events_id']
            isOneToOne: false
            referencedRelation: 'events'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'tribes_events_tribe_id_fkey'
            columns: ['tribe_id']
            isOneToOne: false
            referencedRelation: 'tribes'
            referencedColumns: ['id']
          },
        ]
      }
      tribes_quests: {
        Row: {
          created_at: string
          quests_id: string
          tribes_id: string
        }
        Insert: {
          created_at?: string
          quests_id: string
          tribes_id: string
        }
        Update: {
          created_at?: string
          quests_id?: string
          tribes_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'tribes_quests_quests_id_fkey'
            columns: ['quests_id']
            isOneToOne: false
            referencedRelation: 'quests'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'tribes_quests_tribe_id_fkey'
            columns: ['tribes_id']
            isOneToOne: false
            referencedRelation: 'tribes'
            referencedColumns: ['id']
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, 'public'>]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema['Tables'] & PublicSchema['Views'])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
        Database[PublicTableNameOrOptions['schema']]['Views'])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
      Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema['Tables'] & PublicSchema['Views'])
    ? (PublicSchema['Tables'] & PublicSchema['Views'])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends keyof PublicSchema['Tables'] | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
    ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends keyof PublicSchema['Tables'] | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
    ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends keyof PublicSchema['Enums'] | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema['Enums']
    ? PublicSchema['Enums'][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema['CompositeTypes']
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes']
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes'][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema['CompositeTypes']
    ? PublicSchema['CompositeTypes'][PublicCompositeTypeNameOrOptions]
    : never
