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
      rooms: {
        Row: {
          id: string
          created_at: string
          name: string
          room_number: string
          description: string
          price_per_night: number
          max_guests: number
          size_sqm: number
          bed_type: string
          amenities: string[]
          images: string[]
          is_available: boolean
        }
        Insert: {
          id?: string
          created_at?: string
          name: string
          room_number: string
          description: string
          price_per_night: number
          max_guests: number
          size_sqm: number
          bed_type: string
          amenities?: string[]
          images?: string[]
          is_available?: boolean
        }
        Update: {
          id?: string
          created_at?: string
          name?: string
          room_number?: string
          description?: string
          price_per_night?: number
          max_guests?: number
          size_sqm?: number
          bed_type?: string
          amenities?: string[]
          images?: string[]
          is_available?: boolean
        }
      }
      bookings: {
        Row: {
          id: string
          created_at: string
          room_id: string
          guest_name: string
          guest_email: string
          guest_phone: string
          check_in: string
          check_out: string
          num_guests: number
          total_price: number
          status: 'pending' | 'confirmed' | 'cancelled' | 'completed'
          special_requests: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          room_id: string
          guest_name: string
          guest_email: string
          guest_phone: string
          check_in: string
          check_out: string
          num_guests: number
          total_price: number
          status?: 'pending' | 'confirmed' | 'cancelled' | 'completed'
          special_requests?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          room_id?: string
          guest_name?: string
          guest_email?: string
          guest_phone?: string
          check_in?: string
          check_out?: string
          num_guests?: number
          total_price?: number
          status?: 'pending' | 'confirmed' | 'cancelled' | 'completed'
          special_requests?: string | null
        }
      }
    }
  }
}
