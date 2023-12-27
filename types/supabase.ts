export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      Accounts: {
        Row: {
          address: string | null
          created_at: string
          id: number
          name: string | null
        }
        Insert: {
          address?: string | null
          created_at?: string
          id?: number
          name?: string | null
        }
        Update: {
          address?: string | null
          created_at?: string
          id?: number
          name?: string | null
        }
        Relationships: []
      }
      Maintenances: {
        Row: {
          created_at: string
          done_at: string | null
          id: number
          observations: string | null
          problem: boolean | null
          state: Database["public"]["Enums"]["MAINTENANCE_STATE"] | null
          unit: number | null
        }
        Insert: {
          created_at?: string
          done_at?: string | null
          id?: number
          observations?: string | null
          problem?: boolean | null
          state?: Database["public"]["Enums"]["MAINTENANCE_STATE"] | null
          unit?: number | null
        }
        Update: {
          created_at?: string
          done_at?: string | null
          id?: number
          observations?: string | null
          problem?: boolean | null
          state?: Database["public"]["Enums"]["MAINTENANCE_STATE"] | null
          unit?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "Maintenances_unit_fkey"
            columns: ["unit"]
            isOneToOne: false
            referencedRelation: "Units"
            referencedColumns: ["id"]
          }
        ]
      }
      Places: {
        Row: {
          account_id: number | null
          created_at: string
          id: number
          name: string | null
        }
        Insert: {
          account_id?: number | null
          created_at?: string
          id?: number
          name?: string | null
        }
        Update: {
          account_id?: number | null
          created_at?: string
          id?: number
          name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "Places_account_id_fkey"
            columns: ["account_id"]
            isOneToOne: false
            referencedRelation: "Accounts"
            referencedColumns: ["id"]
          }
        ]
      }
      References: {
        Row: {
          checkpoints: Json | null
          created_at: string
          doc: string | null
          id: number
          name: string | null
        }
        Insert: {
          checkpoints?: Json | null
          created_at?: string
          doc?: string | null
          id?: number
          name?: string | null
        }
        Update: {
          checkpoints?: Json | null
          created_at?: string
          doc?: string | null
          id?: number
          name?: string | null
        }
        Relationships: []
      }
      Units: {
        Row: {
          created_at: string
          frequency: number | null
          id: number
          last_maintenance: string | null
          name: string | null
          place_id: number | null
          serial: string | null
        }
        Insert: {
          created_at?: string
          frequency?: number | null
          id?: number
          last_maintenance?: string | null
          name?: string | null
          place_id?: number | null
          serial?: string | null
        }
        Update: {
          created_at?: string
          frequency?: number | null
          id?: number
          last_maintenance?: string | null
          name?: string | null
          place_id?: number | null
          serial?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "Units_place_id_fkey"
            columns: ["place_id"]
            isOneToOne: false
            referencedRelation: "Places"
            referencedColumns: ["id"]
          }
        ]
      }
      Users: {
        Row: {
          created_at: string
          email: string
          id: number
          password: string | null
          role: Database["public"]["Enums"]["ROLE"]
        }
        Insert: {
          created_at?: string
          email: string
          id?: number
          password?: string | null
          role?: Database["public"]["Enums"]["ROLE"]
        }
        Update: {
          created_at?: string
          email?: string
          id?: number
          password?: string | null
          role?: Database["public"]["Enums"]["ROLE"]
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      MAINTENANCE_STATE: "FAIT" | "A FAIRE"
      ROLE: "ADMIN" | "TECHNICIEN" | "CLIENT"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never
