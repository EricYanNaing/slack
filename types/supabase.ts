export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      channels: {
        Row: {
          id: string
          members: string[] | null
          name: string
          regulator: string[] | null
          user_id: string
          workplace_id: string
        }
        Insert: {
          id?: string
          members?: string[] | null
          name: string
          regulator?: string[] | null
          user_id: string
          workplace_id: string
        }
        Update: {
          id?: string
          members?: string[] | null
          name?: string
          regulator?: string[] | null
          user_id?: string
          workplace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "channels_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "channels_workplace_id_fkey"
            columns: ["workplace_id"]
            isOneToOne: false
            referencedRelation: "workplaces"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          avatar_url: string
          channels: string[] | null
          created_at: string | null
          email: string
          id: string
          is_away: boolean
          name: string | null
          phone: string | null
          type: string | null
          workplaces: string[] | null
        }
        Insert: {
          avatar_url: string
          channels?: string[] | null
          created_at?: string | null
          email: string
          id: string
          is_away?: boolean
          name?: string | null
          phone?: string | null
          type?: string | null
          workplaces?: string[] | null
        }
        Update: {
          avatar_url?: string
          channels?: string[] | null
          created_at?: string | null
          email?: string
          id?: string
          is_away?: boolean
          name?: string | null
          phone?: string | null
          type?: string | null
          workplaces?: string[] | null
        }
        Relationships: [
          {
            foreignKeyName: "users_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      workplaces: {
        Row: {
          channels: string[] | null
          created_at: string
          id: string
          image_url: string | null
          invite_code: string
          members: string[] | null
          name: string
          regulator: string[] | null
          slug: string
          super_admin: string
        }
        Insert: {
          channels?: string[] | null
          created_at?: string
          id?: string
          image_url?: string | null
          invite_code: string
          members?: string[] | null
          name: string
          regulator?: string[] | null
          slug: string
          super_admin?: string
        }
        Update: {
          channels?: string[] | null
          created_at?: string
          id?: string
          image_url?: string | null
          invite_code?: string
          members?: string[] | null
          name?: string
          regulator?: string[] | null
          slug?: string
          super_admin?: string
        }
        Relationships: [
          {
            foreignKeyName: "workplaces_super_admin_fkey"
            columns: ["super_admin"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      add_channels_to_workplace: {
        Args: {
          channel_id: string
          workplace_id: string
        }
        Returns: undefined
      }
      add_user_to_workplace: {
        Args: {
          user_id: string
          workplace_id: string
        }
        Returns: undefined
      }
      add_workplace_to_user: {
        Args: {
          user_id: string
          new_workplace: string
        }
        Returns: undefined
      }
      update_channels_members: {
        Args: {
          new_member: string
          channel_id: string
        }
        Returns: undefined
      }
      update_user_channels: {
        Args: {
          user_id: string
          channel_id: string
        }
        Returns: undefined
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
