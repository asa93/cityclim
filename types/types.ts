//added for more convenient notation

import { Database } from "./supabase"

export type Account = Database["public"]["Tables"]["Accounts"]["Row"]

export type Place = Database["public"]["Tables"]["Places"]["Row"] & { account: string }

export type Unit = Database["public"]["Tables"]["Units"]["Row"] & { account: string, place: string }

export type Maintenance = Database["public"]["Tables"]["Maintenances"]["Row"] & { unit_name: string, account: string, place: string, reference: string, serial: string, checkpoints: object, checkpoints_ref: object }

export type Reference = Database["public"]["Tables"]["References"]["Row"]

export type Estimate = Database["public"]["Tables"]["Estimates"]["Row"] & { unit_name: string, account: string, place: string, reference: string, serial: string }

export type UserSession = {
    email: string,
    role: string,
    client_id: number,
    iat: number,
    exp: number
}