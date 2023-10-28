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
