/*
  # Maria Badari Haute Couture Database Schema

  1. New Tables
    - `profiles` - User profiles with role-based access
    - `dresses` - Dress catalog with detailed specifications
    - `dress_images` - Multiple images per dress
    - `categories` - Dress categories (wedding, evening, etc.)
    - `colors` - Available dress colors
    - `sizes` - Available dress sizes
    - `bookings` - Dress rental bookings
    - `custom_requests` - Custom dress requests from clients
    - `request_images` - Images uploaded with custom requests
    - `messages` - Messaging system between clients and owner
    - `appointments` - Appointment scheduling
    - `rental_history` - Track dress rental status and returns

  2. Security
    - Enable RLS on all tables
    - Add policies for role-based access control
    - Secure file upload handling
*/

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create enum types
CREATE TYPE user_role AS ENUM ('client', 'owner', 'admin');
CREATE TYPE dress_category AS ENUM ('wedding', 'evening', 'cocktail', 'formal');
CREATE TYPE booking_status AS ENUM ('pending', 'confirmed', 'completed', 'cancelled');
CREATE TYPE request_status AS ENUM ('pending', 'in_progress', 'completed', 'cancelled');
CREATE TYPE rental_status AS ENUM ('rented', 'returned', 'overdue');

-- Profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text UNIQUE NOT NULL,
  full_name text NOT NULL,
  phone text,
  role user_role DEFAULT 'client',
  avatar_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Categories table
CREATE TABLE IF NOT EXISTS categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  description text,
  created_at timestamptz DEFAULT now()
);

-- Colors table
CREATE TABLE IF NOT EXISTS colors (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  hex_code text,
  created_at timestamptz DEFAULT now()
);

-- Sizes table
CREATE TABLE IF NOT EXISTS sizes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  measurements jsonb,
  created_at timestamptz DEFAULT now()
);

-- Dresses table
CREATE TABLE IF NOT EXISTS dresses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  category_id uuid REFERENCES categories(id),
  price_per_day decimal(10,2) NOT NULL,
  available boolean DEFAULT true,
  style text,
  occasion text,
  fabric text,
  designer_notes text,
  care_instructions text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Dress images table
CREATE TABLE IF NOT EXISTS dress_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  dress_id uuid REFERENCES dresses(id) ON DELETE CASCADE,
  image_url text NOT NULL,
  alt_text text,
  is_primary boolean DEFAULT false,
  display_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Dress colors junction table
CREATE TABLE IF NOT EXISTS dress_colors (
  dress_id uuid REFERENCES dresses(id) ON DELETE CASCADE,
  color_id uuid REFERENCES colors(id) ON DELETE CASCADE,
  PRIMARY KEY (dress_id, color_id)
);

-- Dress sizes junction table
CREATE TABLE IF NOT EXISTS dress_sizes (
  dress_id uuid REFERENCES dresses(id) ON DELETE CASCADE,
  size_id uuid REFERENCES sizes(id) ON DELETE CASCADE,
  PRIMARY KEY (dress_id, size_id)
);

-- Bookings table
CREATE TABLE IF NOT EXISTS bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id uuid REFERENCES profiles(id),
  dress_id uuid REFERENCES dresses(id),
  start_date date NOT NULL,
  end_date date NOT NULL,
  total_amount decimal(10,2) NOT NULL,
  status booking_status DEFAULT 'pending',
  special_requests text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Custom requests table
CREATE TABLE IF NOT EXISTS custom_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id uuid REFERENCES profiles(id),
  title text NOT NULL,
  description text NOT NULL,
  occasion text,
  preferred_colors text[],
  size_requirements text,
  budget_range text,
  deadline date,
  status request_status DEFAULT 'pending',
  measurements jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Request images table
CREATE TABLE IF NOT EXISTS request_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  request_id uuid REFERENCES custom_requests(id) ON DELETE CASCADE,
  image_url text NOT NULL,
  filename text,
  file_size integer,
  created_at timestamptz DEFAULT now()
);

-- Messages table
CREATE TABLE IF NOT EXISTS messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  sender_id uuid REFERENCES profiles(id),
  recipient_id uuid REFERENCES profiles(id),
  subject text,
  content text NOT NULL,
  attachment_url text,
  read boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Appointments table
CREATE TABLE IF NOT EXISTS appointments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id uuid REFERENCES profiles(id),
  owner_id uuid REFERENCES profiles(id),
  title text NOT NULL,
  description text,
  appointment_date timestamptz NOT NULL,
  duration_minutes integer DEFAULT 60,
  status text DEFAULT 'scheduled',
  location text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Rental history table
CREATE TABLE IF NOT EXISTS rental_history (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id uuid REFERENCES bookings(id),
  dress_id uuid REFERENCES dresses(id),
  client_id uuid REFERENCES profiles(id),
  rented_date timestamptz,
  returned_date timestamptz,
  status rental_status DEFAULT 'rented',
  condition_notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Insert default categories
INSERT INTO categories (name, description) VALUES
  ('wedding', 'Wedding dresses and bridal gowns'),
  ('evening', 'Evening gowns and formal wear'),
  ('cocktail', 'Cocktail dresses and semi-formal wear'),
  ('formal', 'Formal occasion dresses');

-- Insert default colors
INSERT INTO colors (name, hex_code) VALUES
  ('White', '#FFFFFF'),
  ('Ivory', '#FFFFF0'),
  ('Champagne', '#F7E7CE'),
  ('Blush', '#DE5D83'),
  ('Black', '#000000'),
  ('Navy', '#000080'),
  ('Burgundy', '#800020'),
  ('Emerald', '#50C878'),
  ('Gold', '#FFD700'),
  ('Silver', '#C0C0C0');

-- Insert default sizes
INSERT INTO sizes (name, measurements) VALUES
  ('XS', '{"bust": 32, "waist": 24, "hips": 34}'),
  ('S', '{"bust": 34, "waist": 26, "hips": 36}'),
  ('M', '{"bust": 36, "waist": 28, "hips": 38}'),
  ('L', '{"bust": 38, "waist": 30, "hips": 40}'),
  ('XL', '{"bust": 40, "waist": 32, "hips": 42}'),
  ('XXL', '{"bust": 42, "waist": 34, "hips": 44}');

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE dresses ENABLE ROW LEVEL SECURITY;
ALTER TABLE dress_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE colors ENABLE ROW LEVEL SECURITY;
ALTER TABLE sizes ENABLE ROW LEVEL SECURITY;
ALTER TABLE dress_colors ENABLE ROW LEVEL SECURITY;
ALTER TABLE dress_sizes ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE custom_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE request_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE rental_history ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view all profiles" ON profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- Dresses policies (public read, owner/admin write)
CREATE POLICY "Anyone can view dresses" ON dresses FOR SELECT USING (true);
CREATE POLICY "Owners and admins can manage dresses" ON dresses FOR ALL USING (
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE profiles.id = auth.uid() 
    AND profiles.role IN ('owner', 'admin')
  )
);

-- Dress images policies
CREATE POLICY "Anyone can view dress images" ON dress_images FOR SELECT USING (true);
CREATE POLICY "Owners and admins can manage dress images" ON dress_images FOR ALL USING (
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE profiles.id = auth.uid() 
    AND profiles.role IN ('owner', 'admin')
  )
);

-- Categories, colors, sizes policies (public read, owner/admin write)
CREATE POLICY "Anyone can view categories" ON categories FOR SELECT USING (true);
CREATE POLICY "Owners and admins can manage categories" ON categories FOR ALL USING (
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE profiles.id = auth.uid() 
    AND profiles.role IN ('owner', 'admin')
  )
);

CREATE POLICY "Anyone can view colors" ON colors FOR SELECT USING (true);
CREATE POLICY "Owners and admins can manage colors" ON colors FOR ALL USING (
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE profiles.id = auth.uid() 
    AND profiles.role IN ('owner', 'admin')
  )
);

CREATE POLICY "Anyone can view sizes" ON sizes FOR SELECT USING (true);
CREATE POLICY "Owners and admins can manage sizes" ON sizes FOR ALL USING (
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE profiles.id = auth.uid() 
    AND profiles.role IN ('owner', 'admin')
  )
);

-- Junction table policies
CREATE POLICY "Anyone can view dress colors" ON dress_colors FOR SELECT USING (true);
CREATE POLICY "Owners and admins can manage dress colors" ON dress_colors FOR ALL USING (
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE profiles.id = auth.uid() 
    AND profiles.role IN ('owner', 'admin')
  )
);

CREATE POLICY "Anyone can view dress sizes" ON dress_sizes FOR SELECT USING (true);
CREATE POLICY "Owners and admins can manage dress sizes" ON dress_sizes FOR ALL USING (
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE profiles.id = auth.uid() 
    AND profiles.role IN ('owner', 'admin')
  )
);

-- Bookings policies
CREATE POLICY "Users can view own bookings" ON bookings FOR SELECT USING (
  client_id = auth.uid() OR 
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE profiles.id = auth.uid() 
    AND profiles.role IN ('owner', 'admin')
  )
);
CREATE POLICY "Clients can create bookings" ON bookings FOR INSERT WITH CHECK (client_id = auth.uid());
CREATE POLICY "Clients can update own bookings" ON bookings FOR UPDATE USING (client_id = auth.uid());
CREATE POLICY "Owners and admins can manage all bookings" ON bookings FOR ALL USING (
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE profiles.id = auth.uid() 
    AND profiles.role IN ('owner', 'admin')
  )
);

-- Custom requests policies
CREATE POLICY "Users can view own requests" ON custom_requests FOR SELECT USING (
  client_id = auth.uid() OR 
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE profiles.id = auth.uid() 
    AND profiles.role IN ('owner', 'admin')
  )
);
CREATE POLICY "Clients can create requests" ON custom_requests FOR INSERT WITH CHECK (client_id = auth.uid());
CREATE POLICY "Clients can update own requests" ON custom_requests FOR UPDATE USING (client_id = auth.uid());
CREATE POLICY "Owners and admins can manage all requests" ON custom_requests FOR ALL USING (
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE profiles.id = auth.uid() 
    AND profiles.role IN ('owner', 'admin')
  )
);

-- Request images policies
CREATE POLICY "Users can view request images" ON request_images FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM custom_requests 
    WHERE custom_requests.id = request_images.request_id 
    AND (custom_requests.client_id = auth.uid() OR 
         EXISTS (
           SELECT 1 FROM profiles 
           WHERE profiles.id = auth.uid() 
           AND profiles.role IN ('owner', 'admin')
         ))
  )
);
CREATE POLICY "Users can manage own request images" ON request_images FOR ALL USING (
  EXISTS (
    SELECT 1 FROM custom_requests 
    WHERE custom_requests.id = request_images.request_id 
    AND (custom_requests.client_id = auth.uid() OR 
         EXISTS (
           SELECT 1 FROM profiles 
           WHERE profiles.id = auth.uid() 
           AND profiles.role IN ('owner', 'admin')
         ))
  )
);

-- Messages policies
CREATE POLICY "Users can view own messages" ON messages FOR SELECT USING (
  sender_id = auth.uid() OR recipient_id = auth.uid()
);
CREATE POLICY "Users can send messages" ON messages FOR INSERT WITH CHECK (sender_id = auth.uid());
CREATE POLICY "Users can update own messages" ON messages FOR UPDATE USING (sender_id = auth.uid() OR recipient_id = auth.uid());

-- Appointments policies
CREATE POLICY "Users can view own appointments" ON appointments FOR SELECT USING (
  client_id = auth.uid() OR owner_id = auth.uid() OR
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE profiles.id = auth.uid() 
    AND profiles.role = 'admin'
  )
);
CREATE POLICY "Clients can create appointments" ON appointments FOR INSERT WITH CHECK (client_id = auth.uid());
CREATE POLICY "Users can update own appointments" ON appointments FOR UPDATE USING (
  client_id = auth.uid() OR owner_id = auth.uid()
);
CREATE POLICY "Owners and admins can manage appointments" ON appointments FOR ALL USING (
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE profiles.id = auth.uid() 
    AND profiles.role IN ('owner', 'admin')
  )
);

-- Rental history policies
CREATE POLICY "Users can view relevant rental history" ON rental_history FOR SELECT USING (
  client_id = auth.uid() OR 
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE profiles.id = auth.uid() 
    AND profiles.role IN ('owner', 'admin')
  )
);
CREATE POLICY "Owners and admins can manage rental history" ON rental_history FOR ALL USING (
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE profiles.id = auth.uid() 
    AND profiles.role IN ('owner', 'admin')
  )
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_dresses_category ON dresses(category_id);
CREATE INDEX IF NOT EXISTS idx_dresses_available ON dresses(available);
CREATE INDEX IF NOT EXISTS idx_bookings_client ON bookings(client_id);
CREATE INDEX IF NOT EXISTS idx_bookings_dress ON bookings(dress_id);
CREATE INDEX IF NOT EXISTS idx_bookings_dates ON bookings(start_date, end_date);
CREATE INDEX IF NOT EXISTS idx_messages_sender ON messages(sender_id);
CREATE INDEX IF NOT EXISTS idx_messages_recipient ON messages(recipient_id);
CREATE INDEX IF NOT EXISTS idx_appointments_client ON appointments(client_id);
CREATE INDEX IF NOT EXISTS idx_appointments_date ON appointments(appointment_date);