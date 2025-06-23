export interface Profile {
  id: string
  email: string
  full_name: string
  phone?: string
  role: 'client' | 'owner' | 'admin'
  avatar_url?: string
  created_at: string
  updated_at: string
}

export interface Category {
  id: string
  name: string
  description?: string
  created_at: string
}

export interface Color {
  id: string
  name: string
  hex_code?: string
  created_at: string
}

export interface Size {
  id: string
  name: string
  measurements?: Record<string, number>
  created_at: string
}

export interface Dress {
  id: string
  name: string
  description?: string
  category_id?: string
  price_per_day: number
  available: boolean
  style?: string
  occasion?: string
  fabric?: string
  designer_notes?: string
  care_instructions?: string
  created_at: string
  updated_at: string
  category?: Category
  images?: DressImage[]
  colors?: Color[]
  sizes?: Size[]
}

export interface DressImage {
  id: string
  dress_id: string
  image_url: string
  alt_text?: string
  is_primary: boolean
  display_order: number
  created_at: string
}

export interface Booking {
  id: string
  client_id: string
  dress_id: string
  start_date: string
  end_date: string
  total_amount: number
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled'
  special_requests?: string
  created_at: string
  updated_at: string
  dress?: Dress
  client?: Profile
}

export interface CustomRequest {
  id: string
  client_id: string
  title: string
  description: string
  occasion?: string
  preferred_colors?: string[]
  size_requirements?: string
  budget_range?: string
  deadline?: string
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled'
  measurements?: Record<string, any>
  created_at: string
  updated_at: string
  client?: Profile
  images?: RequestImage[]
}

export interface RequestImage {
  id: string
  request_id: string
  image_url: string
  filename?: string
  file_size?: number
  created_at: string
}

export interface Message {
  id: string
  sender_id: string
  recipient_id: string
  subject?: string
  content: string
  attachment_url?: string
  read: boolean
  created_at: string
  sender?: Profile
  recipient?: Profile
}

export interface Appointment {
  id: string
  client_id: string
  owner_id: string
  title: string
  description?: string
  appointment_date: string
  duration_minutes: number
  status: string
  location?: string
  created_at: string
  updated_at: string
  client?: Profile
  owner?: Profile
}

export interface RentalHistory {
  id: string
  booking_id: string
  dress_id: string
  client_id: string
  rented_date?: string
  returned_date?: string
  status: 'rented' | 'returned' | 'overdue'
  condition_notes?: string
  created_at: string
  updated_at: string
  booking?: Booking
  dress?: Dress
  client?: Profile
}

export interface Comment {
  id: string
  client_id: string | null
  rating: number
  content: string
  approved: boolean
  created_at: string
  client?: Profile | null
}

export interface DressFilters {
  category?: string
  minPrice?: number
  maxPrice?: number
  colors?: string[]
  sizes?: string[]
  available?: boolean
  search?: string
}