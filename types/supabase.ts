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
            referencedRelation: "Units"
            referencedColumns: ["id"]
          }
        ]
      }
      Places: {
        Row: {
          account_id: number | null
          account_name: string | null
          created_at: string
          id: number
          name: string | null
        }
        Insert: {
          account_id?: number | null
          account_name?: string | null
          created_at?: string
          id?: number
          name?: string | null
        }
        Update: {
          account_id?: number | null
          account_name?: string | null
          created_at?: string
          id?: number
          name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "Places_account_id_fkey"
            columns: ["account_id"]
            referencedRelation: "Accounts"
            referencedColumns: ["id"]
          }
        ]
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

