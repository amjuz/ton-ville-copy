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
      activity_gems: {
        Row: {
          activity: Database['public']['Enums']['gem_activity']
          gems: number
          max_usage: number | null
        }
        Insert: {
          activity: Database['public']['Enums']['gem_activity']
          gems: number
          max_usage?: number | null
        }
        Update: {
          activity?: Database['public']['Enums']['gem_activity']
          gems?: number
          max_usage?: number | null
        }
        Relationships: []
      }
      bases: {
        Row: {
          created_at: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      gem_transactions: {
        Row: {
          activity: Database['public']['Enums']['gem_activity']
          created_at: string
          gems: number
          id: number
          updated_at: string
          user_id: string
        }
        Insert: {
          activity: Database['public']['Enums']['gem_activity']
          created_at?: string
          gems: number
          id?: number
          updated_at?: string
          user_id: string
        }
        Update: {
          activity?: Database['public']['Enums']['gem_activity']
          created_at?: string
          gems?: number
          id?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'gem_transactions_user_id_fkey'
            columns: ['user_id']
            isOneToOne: false
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
        ]
      }
      profiles: {
        Row: {
          bio: string | null
          created_at: string
          gems: number
          id: string
          image_id: string | null
          my_referral: string | null
          name: string | null
          referrer_id: string | null
          updated_at: string
        }
        Insert: {
          bio?: string | null
          created_at?: string
          gems?: number
          id: string
          image_id?: string | null
          my_referral?: string | null
          name?: string | null
          referrer_id?: string | null
          updated_at?: string
        }
        Update: {
          bio?: string | null
          created_at?: string
          gems?: number
          id?: string
          image_id?: string | null
          my_referral?: string | null
          name?: string | null
          referrer_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: 'profiles_referrer_id_fkey'
            columns: ['referrer_id']
            isOneToOne: false
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
        ]
      }
      referrals: {
        Row: {
          created_at: string
          id: string
          referred_id: string
          referrer_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          referred_id: string
          referrer_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          referred_id?: string
          referrer_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: 'referrals_referred_id_fkey'
            columns: ['referred_id']
            isOneToOne: false
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'referrals_referrer_id_fkey'
            columns: ['referrer_id']
            isOneToOne: false
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
        ]
      }
      skills: {
        Row: {
          created_at: string
          id: number
          skill: string
          sub_skills: string[] | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          skill: string
          sub_skills?: string[] | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          skill?: string
          sub_skills?: string[] | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'skills_user_id_fkey'
            columns: ['user_id']
            isOneToOne: false
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'skills_user_id_fkey1'
            columns: ['user_id']
            isOneToOne: false
            referencedRelation: 'telegrams'
            referencedColumns: ['user_id']
          },
        ]
      }
      telegrams: {
        Row: {
          created_at: string
          first_name: string | null
          id: number
          last_name: string | null
          photo_url: string | null
          updated_at: string
          user_id: string
          username: string | null
        }
        Insert: {
          created_at?: string
          first_name?: string | null
          id: number
          last_name?: string | null
          photo_url?: string | null
          updated_at?: string
          user_id: string
          username?: string | null
        }
        Update: {
          created_at?: string
          first_name?: string | null
          id?: number
          last_name?: string | null
          photo_url?: string | null
          updated_at?: string
          user_id?: string
          username?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'telegrams_user_id_fkey'
            columns: ['user_id']
            isOneToOne: true
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      __plpgsql_show_dependency_tb:
        | {
            Args: {
              funcoid: unknown
              relid?: unknown
              anyelememttype?: unknown
              anyenumtype?: unknown
              anyrangetype?: unknown
              anycompatibletype?: unknown
              anycompatiblerangetype?: unknown
            }
            Returns: {
              type: string
              oid: unknown
              schema: string
              name: string
              params: string
            }[]
          }
        | {
            Args: {
              name: string
              relid?: unknown
              anyelememttype?: unknown
              anyenumtype?: unknown
              anyrangetype?: unknown
              anycompatibletype?: unknown
              anycompatiblerangetype?: unknown
            }
            Returns: {
              type: string
              oid: unknown
              schema: string
              name: string
              params: string
            }[]
          }
      _allocate_gems: {
        Args: {
          p_user_id: string
          p_activity: Database['public']['Enums']['gem_activity']
        }
        Returns: undefined
      }
      _generate_referral_code: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      _get_referrer_uuid: {
        Args: {
          referral_code: string
        }
        Returns: string
      }
      _is_valid_referral_code: {
        Args: {
          code: string
        }
        Returns: boolean
      }
      claim_active_daily_task: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      claim_connect_twitter: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      claim_easter_egg: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      claim_follow_twitter: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      claim_join_channel: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      claim_join_group: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      get_active_daily_task: {
        Args: Record<PropertyKey, never>
        Returns: {
          task: Database['public']['Enums']['gem_activity']
          is_available: boolean
          available_at: string
          gems_reward: number
          expires_at: string
        }[]
      }
      get_gem_leaderboard: {
        Args: {
          p_offset?: number
          p_limit?: number
        }
        Returns: {
          user_id: string
          rank: number
          total_gems: number
          name: string
          image_url: string
        }[]
      }
      plpgsql_check_function:
        | {
            Args: {
              funcoid: unknown
              relid?: unknown
              format?: string
              fatal_errors?: boolean
              other_warnings?: boolean
              performance_warnings?: boolean
              extra_warnings?: boolean
              security_warnings?: boolean
              compatibility_warnings?: boolean
              oldtable?: unknown
              newtable?: unknown
              anyelememttype?: unknown
              anyenumtype?: unknown
              anyrangetype?: unknown
              anycompatibletype?: unknown
              anycompatiblerangetype?: unknown
              without_warnings?: boolean
              all_warnings?: boolean
              use_incomment_options?: boolean
              incomment_options_usage_warning?: boolean
              constant_tracing?: boolean
            }
            Returns: string[]
          }
        | {
            Args: {
              name: string
              relid?: unknown
              format?: string
              fatal_errors?: boolean
              other_warnings?: boolean
              performance_warnings?: boolean
              extra_warnings?: boolean
              security_warnings?: boolean
              compatibility_warnings?: boolean
              oldtable?: unknown
              newtable?: unknown
              anyelememttype?: unknown
              anyenumtype?: unknown
              anyrangetype?: unknown
              anycompatibletype?: unknown
              anycompatiblerangetype?: unknown
              without_warnings?: boolean
              all_warnings?: boolean
              use_incomment_options?: boolean
              incomment_options_usage_warning?: boolean
              constant_tracing?: boolean
            }
            Returns: string[]
          }
      plpgsql_check_function_tb:
        | {
            Args: {
              funcoid: unknown
              relid?: unknown
              fatal_errors?: boolean
              other_warnings?: boolean
              performance_warnings?: boolean
              extra_warnings?: boolean
              security_warnings?: boolean
              compatibility_warnings?: boolean
              oldtable?: unknown
              newtable?: unknown
              anyelememttype?: unknown
              anyenumtype?: unknown
              anyrangetype?: unknown
              anycompatibletype?: unknown
              anycompatiblerangetype?: unknown
              without_warnings?: boolean
              all_warnings?: boolean
              use_incomment_options?: boolean
              incomment_options_usage_warning?: boolean
              constant_tracing?: boolean
            }
            Returns: {
              functionid: unknown
              lineno: number
              statement: string
              sqlstate: string
              message: string
              detail: string
              hint: string
              level: string
              position: number
              query: string
              context: string
            }[]
          }
        | {
            Args: {
              name: string
              relid?: unknown
              fatal_errors?: boolean
              other_warnings?: boolean
              performance_warnings?: boolean
              extra_warnings?: boolean
              security_warnings?: boolean
              compatibility_warnings?: boolean
              oldtable?: unknown
              newtable?: unknown
              anyelememttype?: unknown
              anyenumtype?: unknown
              anyrangetype?: unknown
              anycompatibletype?: unknown
              anycompatiblerangetype?: unknown
              without_warnings?: boolean
              all_warnings?: boolean
              use_incomment_options?: boolean
              incomment_options_usage_warning?: boolean
              constant_tracing?: boolean
            }
            Returns: {
              functionid: unknown
              lineno: number
              statement: string
              sqlstate: string
              message: string
              detail: string
              hint: string
              level: string
              position: number
              query: string
              context: string
            }[]
          }
      plpgsql_check_pragma: {
        Args: Record<PropertyKey, never>
        Returns: number
      }
      plpgsql_check_profiler: {
        Args: {
          enable?: boolean
        }
        Returns: boolean
      }
      plpgsql_check_tracer: {
        Args: {
          enable?: boolean
          verbosity?: string
        }
        Returns: boolean
      }
      plpgsql_coverage_branches:
        | {
            Args: {
              funcoid: unknown
            }
            Returns: number
          }
        | {
            Args: {
              name: string
            }
            Returns: number
          }
      plpgsql_coverage_statements:
        | {
            Args: {
              funcoid: unknown
            }
            Returns: number
          }
        | {
            Args: {
              name: string
            }
            Returns: number
          }
      plpgsql_profiler_function_statements_tb:
        | {
            Args: {
              funcoid: unknown
            }
            Returns: {
              stmtid: number
              parent_stmtid: number
              parent_note: string
              block_num: number
              lineno: number
              queryid: number
              exec_stmts: number
              exec_stmts_err: number
              total_time: number
              avg_time: number
              max_time: number
              processed_rows: number
              stmtname: string
            }[]
          }
        | {
            Args: {
              name: string
            }
            Returns: {
              stmtid: number
              parent_stmtid: number
              parent_note: string
              block_num: number
              lineno: number
              queryid: number
              exec_stmts: number
              exec_stmts_err: number
              total_time: number
              avg_time: number
              max_time: number
              processed_rows: number
              stmtname: string
            }[]
          }
      plpgsql_profiler_function_tb:
        | {
            Args: {
              funcoid: unknown
            }
            Returns: {
              lineno: number
              stmt_lineno: number
              queryids: number[]
              cmds_on_row: number
              exec_stmts: number
              exec_stmts_err: number
              total_time: number
              avg_time: number
              max_time: number[]
              processed_rows: number[]
              source: string
            }[]
          }
        | {
            Args: {
              name: string
            }
            Returns: {
              lineno: number
              stmt_lineno: number
              queryids: number[]
              cmds_on_row: number
              exec_stmts: number
              exec_stmts_err: number
              total_time: number
              avg_time: number
              max_time: number[]
              processed_rows: number[]
              source: string
            }[]
          }
      plpgsql_profiler_functions_all: {
        Args: Record<PropertyKey, never>
        Returns: {
          funcoid: unknown
          exec_count: number
          exec_stmts_err: number
          total_time: number
          avg_time: number
          stddev_time: number
          min_time: number
          max_time: number
        }[]
      }
      plpgsql_profiler_install_fake_queryid_hook: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      plpgsql_profiler_remove_fake_queryid_hook: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      plpgsql_profiler_reset: {
        Args: {
          funcoid: unknown
        }
        Returns: undefined
      }
      plpgsql_profiler_reset_all: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      plpgsql_show_dependency_tb:
        | {
            Args: {
              fnname: string
              relid?: unknown
              anyelememttype?: unknown
              anyenumtype?: unknown
              anyrangetype?: unknown
              anycompatibletype?: unknown
              anycompatiblerangetype?: unknown
            }
            Returns: {
              type: string
              oid: unknown
              schema: string
              name: string
              params: string
            }[]
          }
        | {
            Args: {
              funcoid: unknown
              relid?: unknown
              anyelememttype?: unknown
              anyenumtype?: unknown
              anyrangetype?: unknown
              anycompatibletype?: unknown
              anycompatiblerangetype?: unknown
            }
            Returns: {
              type: string
              oid: unknown
              schema: string
              name: string
              params: string
            }[]
          }
      wake_up_profile: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
    }
    Enums: {
      gem_activity:
        | 'connect_twitter'
        | 'referral_generate'
        | 'referral_share_primary'
        | 'referral_share_secondary'
        | 'follow_twitter'
        | 'join_group'
        | 'join_channel'
        | 'easter_egg'
        | 'daily_task_1'
        | 'daily_task_2'
        | 'daily_task_3'
        | 'daily_task_4'
        | 'daily_task_5'
        | 'daily_task_6'
        | 'daily_task_7'
        | 'airdrop'
        | 'connect_wallet'
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
