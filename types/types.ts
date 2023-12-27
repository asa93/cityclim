//added for more convenient notation

import { Database } from "./supabase"

export type Account = Database["public"]["Tables"]["Accounts"]["Row"]

export type  Place = Database["public"]["Tables"]["Places"]["Row"] & { account: string}

export type Unit = Database["public"]["Tables"]["Units"]["Row"] & { account: string, place: string}

export type Maintenance = Database["public"]["Tables"]["Maintenances"]["Row"] & { account: string, place: string}

export type Reference = Database["public"]["Tables"]["References"]["Row"]  