-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Rooms table
CREATE TABLE IF NOT EXISTS rooms (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  name TEXT NOT NULL,
  room_number TEXT NOT NULL UNIQUE,
  description TEXT NOT NULL,
  price_per_night DECIMAL(10, 2) NOT NULL,
  max_guests INTEGER NOT NULL,
  size_sqm INTEGER NOT NULL,
  bed_type TEXT NOT NULL,
  amenities TEXT[] DEFAULT '{}',
  images TEXT[] DEFAULT '{}',
  is_available BOOLEAN DEFAULT true
);

-- Bookings table
CREATE TABLE IF NOT EXISTS bookings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  room_id UUID REFERENCES rooms(id) ON DELETE CASCADE,
  guest_name TEXT NOT NULL,
  guest_email TEXT NOT NULL,
  guest_phone TEXT NOT NULL,
  check_in DATE NOT NULL,
  check_out DATE NOT NULL,
  num_guests INTEGER NOT NULL,
  total_price DECIMAL(10, 2) NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed')),
  special_requests TEXT
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_bookings_room_id ON bookings(room_id);
CREATE INDEX IF NOT EXISTS idx_bookings_check_in ON bookings(check_in);
CREATE INDEX IF NOT EXISTS idx_bookings_check_out ON bookings(check_out);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status);

-- Enable Row Level Security
ALTER TABLE rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- Policies for rooms (public read access)
CREATE POLICY "Anyone can view available rooms" ON rooms
  FOR SELECT USING (is_available = true);

CREATE POLICY "Authenticated users can manage rooms" ON rooms
  FOR ALL USING (auth.role() = 'authenticated');

-- Policies for bookings
CREATE POLICY "Anyone can create bookings" ON bookings
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Authenticated users can view all bookings" ON bookings
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update bookings" ON bookings
  FOR UPDATE USING (auth.role() = 'authenticated');

-- Function to check room availability
CREATE OR REPLACE FUNCTION check_room_availability(
  p_room_id UUID,
  p_check_in DATE,
  p_check_out DATE
)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN NOT EXISTS (
    SELECT 1 FROM bookings
    WHERE room_id = p_room_id
      AND status NOT IN ('cancelled')
      AND (
        (check_in <= p_check_in AND check_out > p_check_in)
        OR (check_in < p_check_out AND check_out >= p_check_out)
        OR (check_in >= p_check_in AND check_out <= p_check_out)
      )
  );
END;
$$ LANGUAGE plpgsql;

-- Insert Signature Int'l Hotel Royal Ltd rooms
-- Signature Superior (₦20,000/night) - Rooms 101-108
INSERT INTO rooms (name, room_number, description, price_per_night, max_guests, size_sqm, bed_type, amenities, images) VALUES
('Signature Superior', '101', 'Comfortable and elegant room with modern amenities. Perfect for business travelers and couples seeking quality accommodation.', 20000.00, 2, 30, 'Queen Bed', ARRAY['WiFi', 'TV', 'Air Conditioning', 'Mini Bar', 'Work Desk', 'En-suite Bathroom'], ARRAY['/images/2026/01/room-1.webp']),
('Signature Superior', '102', 'Comfortable and elegant room with modern amenities. Perfect for business travelers and couples seeking quality accommodation.', 20000.00, 2, 30, 'Queen Bed', ARRAY['WiFi', 'TV', 'Air Conditioning', 'Mini Bar', 'Work Desk', 'En-suite Bathroom'], ARRAY['/images/2026/01/room-1.webp']),
('Signature Superior', '103', 'Comfortable and elegant room with modern amenities. Perfect for business travelers and couples seeking quality accommodation.', 20000.00, 2, 30, 'Queen Bed', ARRAY['WiFi', 'TV', 'Air Conditioning', 'Mini Bar', 'Work Desk', 'En-suite Bathroom'], ARRAY['/images/2026/01/room-1.webp']),
('Signature Superior', '104', 'Comfortable and elegant room with modern amenities. Perfect for business travelers and couples seeking quality accommodation.', 20000.00, 2, 30, 'Queen Bed', ARRAY['WiFi', 'TV', 'Air Conditioning', 'Mini Bar', 'Work Desk', 'En-suite Bathroom'], ARRAY['/images/2026/01/room-1.webp']),
('Signature Superior', '105', 'Comfortable and elegant room with modern amenities. Perfect for business travelers and couples seeking quality accommodation.', 20000.00, 2, 30, 'Queen Bed', ARRAY['WiFi', 'TV', 'Air Conditioning', 'Mini Bar', 'Work Desk', 'En-suite Bathroom'], ARRAY['/images/2026/01/room-1.webp']),
('Signature Superior', '106', 'Comfortable and elegant room with modern amenities. Perfect for business travelers and couples seeking quality accommodation.', 20000.00, 2, 30, 'Queen Bed', ARRAY['WiFi', 'TV', 'Air Conditioning', 'Mini Bar', 'Work Desk', 'En-suite Bathroom'], ARRAY['/images/2026/01/room-1.webp']),
('Signature Superior', '107', 'Comfortable and elegant room with modern amenities. Perfect for business travelers and couples seeking quality accommodation.', 20000.00, 2, 30, 'Queen Bed', ARRAY['WiFi', 'TV', 'Air Conditioning', 'Mini Bar', 'Work Desk', 'En-suite Bathroom'], ARRAY['/images/2026/01/room-1.webp']),
('Signature Superior', '108', 'Comfortable and elegant room with modern amenities. Perfect for business travelers and couples seeking quality accommodation.', 20000.00, 2, 30, 'Queen Bed', ARRAY['WiFi', 'TV', 'Air Conditioning', 'Mini Bar', 'Work Desk', 'En-suite Bathroom'], ARRAY['/images/2026/01/room-1.webp']),

-- Signature Royale (₦25,000/night) - Rooms 201-208
('Signature Royale', '201', 'Spacious room with enhanced luxury and premium furnishings. Ideal for guests who appreciate refined comfort.', 25000.00, 2, 35, 'King Bed', ARRAY['WiFi', 'TV', 'Air Conditioning', 'Mini Bar', 'Coffee Maker', 'Safe', 'Work Desk', 'Premium Bedding'], ARRAY['/images/2026/01/room-2.webp']),
('Signature Royale', '202', 'Spacious room with enhanced luxury and premium furnishings. Ideal for guests who appreciate refined comfort.', 25000.00, 2, 35, 'King Bed', ARRAY['WiFi', 'TV', 'Air Conditioning', 'Mini Bar', 'Coffee Maker', 'Safe', 'Work Desk', 'Premium Bedding'], ARRAY['/images/2026/01/room-2.webp']),
('Signature Royale', '203', 'Spacious room with enhanced luxury and premium furnishings. Ideal for guests who appreciate refined comfort.', 25000.00, 2, 35, 'King Bed', ARRAY['WiFi', 'TV', 'Air Conditioning', 'Mini Bar', 'Coffee Maker', 'Safe', 'Work Desk', 'Premium Bedding'], ARRAY['/images/2026/01/room-2.webp']),
('Signature Royale', '204', 'Spacious room with enhanced luxury and premium furnishings. Ideal for guests who appreciate refined comfort.', 25000.00, 2, 35, 'King Bed', ARRAY['WiFi', 'TV', 'Air Conditioning', 'Mini Bar', 'Coffee Maker', 'Safe', 'Work Desk', 'Premium Bedding'], ARRAY['/images/2026/01/room-2.webp']),
('Signature Royale', '205', 'Spacious room with enhanced luxury and premium furnishings. Ideal for guests who appreciate refined comfort.', 25000.00, 2, 35, 'King Bed', ARRAY['WiFi', 'TV', 'Air Conditioning', 'Mini Bar', 'Coffee Maker', 'Safe', 'Work Desk', 'Premium Bedding'], ARRAY['/images/2026/01/room-2.webp']),
('Signature Royale', '206', 'Spacious room with enhanced luxury and premium furnishings. Ideal for guests who appreciate refined comfort.', 25000.00, 2, 35, 'King Bed', ARRAY['WiFi', 'TV', 'Air Conditioning', 'Mini Bar', 'Coffee Maker', 'Safe', 'Work Desk', 'Premium Bedding'], ARRAY['/images/2026/01/room-2.webp']),
('Signature Royale', '207', 'Spacious room with enhanced luxury and premium furnishings. Ideal for guests who appreciate refined comfort.', 25000.00, 2, 35, 'King Bed', ARRAY['WiFi', 'TV', 'Air Conditioning', 'Mini Bar', 'Coffee Maker', 'Safe', 'Work Desk', 'Premium Bedding'], ARRAY['/images/2026/01/room-2.webp']),
('Signature Royale', '208', 'Spacious room with enhanced luxury and premium furnishings. Ideal for guests who appreciate refined comfort.', 25000.00, 2, 35, 'King Bed', ARRAY['WiFi', 'TV', 'Air Conditioning', 'Mini Bar', 'Coffee Maker', 'Safe', 'Work Desk', 'Premium Bedding'], ARRAY['/images/2026/01/room-2.webp']),

-- Signature Executive (₦30,000/night) - Rooms 209, 210, 302, 303
('Signature Executive', '209', 'Premium executive room designed for business professionals. Features dedicated workspace and executive amenities.', 30000.00, 2, 40, 'King Bed', ARRAY['WiFi', 'TV', 'Air Conditioning', 'Mini Bar', 'Coffee Maker', 'Safe', 'Executive Work Desk', 'Lounge Access', 'Premium Toiletries'], ARRAY['/images/2026/01/room-3.webp']),
('Signature Executive', '210', 'Premium executive room designed for business professionals. Features dedicated workspace and executive amenities.', 30000.00, 2, 40, 'King Bed', ARRAY['WiFi', 'TV', 'Air Conditioning', 'Mini Bar', 'Coffee Maker', 'Safe', 'Executive Work Desk', 'Lounge Access', 'Premium Toiletries'], ARRAY['/images/2026/01/room-3.webp']),
('Signature Executive', '302', 'Premium executive room designed for business professionals. Features dedicated workspace and executive amenities.', 30000.00, 2, 40, 'King Bed', ARRAY['WiFi', 'TV', 'Air Conditioning', 'Mini Bar', 'Coffee Maker', 'Safe', 'Executive Work Desk', 'Lounge Access', 'Premium Toiletries'], ARRAY['/images/2026/01/room-3.webp']),
('Signature Executive', '303', 'Premium executive room designed for business professionals. Features dedicated workspace and executive amenities.', 30000.00, 2, 40, 'King Bed', ARRAY['WiFi', 'TV', 'Air Conditioning', 'Mini Bar', 'Coffee Maker', 'Safe', 'Executive Work Desk', 'Lounge Access', 'Premium Toiletries'], ARRAY['/images/2026/01/room-3.webp']),

-- Signature Business Class (₦35,000/night) - Rooms 301, 304, 305, 306
('Signature Business Class', '301', 'Top-tier accommodation with exclusive business facilities and luxury amenities. Perfect for executives and VIP guests.', 35000.00, 2, 45, 'King Bed', ARRAY['WiFi', 'TV', 'Air Conditioning', 'Mini Bar', 'Coffee Maker', 'Safe', 'Executive Work Station', 'Lounge Access', 'Premium Toiletries', 'Butler Service'], ARRAY['/images/2026/01/room-4.webp']),
('Signature Business Class', '304', 'Top-tier accommodation with exclusive business facilities and luxury amenities. Perfect for executives and VIP guests.', 35000.00, 2, 45, 'King Bed', ARRAY['WiFi', 'TV', 'Air Conditioning', 'Mini Bar', 'Coffee Maker', 'Safe', 'Executive Work Station', 'Lounge Access', 'Premium Toiletries', 'Butler Service'], ARRAY['/images/2026/01/room-4.webp']),
('Signature Business Class', '305', 'Top-tier accommodation with exclusive business facilities and luxury amenities. Perfect for executives and VIP guests.', 35000.00, 2, 45, 'King Bed', ARRAY['WiFi', 'TV', 'Air Conditioning', 'Mini Bar', 'Coffee Maker', 'Safe', 'Executive Work Station', 'Lounge Access', 'Premium Toiletries', 'Butler Service'], ARRAY['/images/2026/01/room-4.webp']),
('Signature Business Class', '306', 'Top-tier accommodation with exclusive business facilities and luxury amenities. Perfect for executives and VIP guests.', 35000.00, 2, 45, 'King Bed', ARRAY['WiFi', 'TV', 'Air Conditioning', 'Mini Bar', 'Coffee Maker', 'Safe', 'Executive Work Station', 'Lounge Access', 'Premium Toiletries', 'Butler Service'], ARRAY['/images/2026/01/room-4.webp']);
