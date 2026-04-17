-- Migration: Add room_number field and create individual rooms
-- This script is safe to run multiple times

-- Step 1: Add room_number column if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'rooms' AND column_name = 'room_number'
  ) THEN
    ALTER TABLE rooms ADD COLUMN room_number TEXT;
  END IF;
END $$;

-- Step 2: Delete existing room category entries (we'll replace with individual rooms)
DELETE FROM rooms WHERE room_number IS NULL;

-- Step 3: Insert all 26 individual rooms

-- Signature Superior Rooms (101-108) - ₦20,000/night
INSERT INTO rooms (name, room_number, description, price_per_night, max_guests, size_sqm, bed_type, amenities, images, is_available) VALUES
('Signature Superior', '101', 'Comfortable and elegant room with modern amenities. Perfect for business travelers and couples seeking quality accommodation.', 20000.00, 2, 30, 'Queen Bed', ARRAY['WiFi', 'TV', 'Air Conditioning', 'Mini Bar', 'Work Desk', 'En-suite Bathroom'], ARRAY['/images/2026/01/room-1.webp'], true),
('Signature Superior', '102', 'Comfortable and elegant room with modern amenities. Perfect for business travelers and couples seeking quality accommodation.', 20000.00, 2, 30, 'Queen Bed', ARRAY['WiFi', 'TV', 'Air Conditioning', 'Mini Bar', 'Work Desk', 'En-suite Bathroom'], ARRAY['/images/2026/01/room-1.webp'], true),
('Signature Superior', '103', 'Comfortable and elegant room with modern amenities. Perfect for business travelers and couples seeking quality accommodation.', 20000.00, 2, 30, 'Queen Bed', ARRAY['WiFi', 'TV', 'Air Conditioning', 'Mini Bar', 'Work Desk', 'En-suite Bathroom'], ARRAY['/images/2026/01/room-1.webp'], true),
('Signature Superior', '104', 'Comfortable and elegant room with modern amenities. Perfect for business travelers and couples seeking quality accommodation.', 20000.00, 2, 30, 'Queen Bed', ARRAY['WiFi', 'TV', 'Air Conditioning', 'Mini Bar', 'Work Desk', 'En-suite Bathroom'], ARRAY['/images/2026/01/room-1.webp'], true),
('Signature Superior', '105', 'Comfortable and elegant room with modern amenities. Perfect for business travelers and couples seeking quality accommodation.', 20000.00, 2, 30, 'Queen Bed', ARRAY['WiFi', 'TV', 'Air Conditioning', 'Mini Bar', 'Work Desk', 'En-suite Bathroom'], ARRAY['/images/2026/01/room-1.webp'], true),
('Signature Superior', '106', 'Comfortable and elegant room with modern amenities. Perfect for business travelers and couples seeking quality accommodation.', 20000.00, 2, 30, 'Queen Bed', ARRAY['WiFi', 'TV', 'Air Conditioning', 'Mini Bar', 'Work Desk', 'En-suite Bathroom'], ARRAY['/images/2026/01/room-1.webp'], true),
('Signature Superior', '107', 'Comfortable and elegant room with modern amenities. Perfect for business travelers and couples seeking quality accommodation.', 20000.00, 2, 30, 'Queen Bed', ARRAY['WiFi', 'TV', 'Air Conditioning', 'Mini Bar', 'Work Desk', 'En-suite Bathroom'], ARRAY['/images/2026/01/room-1.webp'], true),
('Signature Superior', '108', 'Comfortable and elegant room with modern amenities. Perfect for business travelers and couples seeking quality accommodation.', 20000.00, 2, 30, 'Queen Bed', ARRAY['WiFi', 'TV', 'Air Conditioning', 'Mini Bar', 'Work Desk', 'En-suite Bathroom'], ARRAY['/images/2026/01/room-1.webp'], true),

-- Signature Royale Rooms (201-208) - ₦25,000/night
('Signature Royale', '201', 'Spacious room with enhanced luxury and premium furnishings. Ideal for guests who appreciate refined comfort.', 25000.00, 2, 35, 'King Bed', ARRAY['WiFi', 'TV', 'Air Conditioning', 'Mini Bar', 'Coffee Maker', 'Safe', 'Work Desk', 'Premium Bedding'], ARRAY['/images/2026/01/room-2.webp'], true),
('Signature Royale', '202', 'Spacious room with enhanced luxury and premium furnishings. Ideal for guests who appreciate refined comfort.', 25000.00, 2, 35, 'King Bed', ARRAY['WiFi', 'TV', 'Air Conditioning', 'Mini Bar', 'Coffee Maker', 'Safe', 'Work Desk', 'Premium Bedding'], ARRAY['/images/2026/01/room-2.webp'], true),
('Signature Royale', '203', 'Spacious room with enhanced luxury and premium furnishings. Ideal for guests who appreciate refined comfort.', 25000.00, 2, 35, 'King Bed', ARRAY['WiFi', 'TV', 'Air Conditioning', 'Mini Bar', 'Coffee Maker', 'Safe', 'Work Desk', 'Premium Bedding'], ARRAY['/images/2026/01/room-2.webp'], true),
('Signature Royale', '204', 'Spacious room with enhanced luxury and premium furnishings. Ideal for guests who appreciate refined comfort.', 25000.00, 2, 35, 'King Bed', ARRAY['WiFi', 'TV', 'Air Conditioning', 'Mini Bar', 'Coffee Maker', 'Safe', 'Work Desk', 'Premium Bedding'], ARRAY['/images/2026/01/room-2.webp'], true),
('Signature Royale', '205', 'Spacious room with enhanced luxury and premium furnishings. Ideal for guests who appreciate refined comfort.', 25000.00, 2, 35, 'King Bed', ARRAY['WiFi', 'TV', 'Air Conditioning', 'Mini Bar', 'Coffee Maker', 'Safe', 'Work Desk', 'Premium Bedding'], ARRAY['/images/2026/01/room-2.webp'], true),
('Signature Royale', '206', 'Spacious room with enhanced luxury and premium furnishings. Ideal for guests who appreciate refined comfort.', 25000.00, 2, 35, 'King Bed', ARRAY['WiFi', 'TV', 'Air Conditioning', 'Mini Bar', 'Coffee Maker', 'Safe', 'Work Desk', 'Premium Bedding'], ARRAY['/images/2026/01/room-2.webp'], true),
('Signature Royale', '207', 'Spacious room with enhanced luxury and premium furnishings. Ideal for guests who appreciate refined comfort.', 25000.00, 2, 35, 'King Bed', ARRAY['WiFi', 'TV', 'Air Conditioning', 'Mini Bar', 'Coffee Maker', 'Safe', 'Work Desk', 'Premium Bedding'], ARRAY['/images/2026/01/room-2.webp'], true),
('Signature Royale', '208', 'Spacious room with enhanced luxury and premium furnishings. Ideal for guests who appreciate refined comfort.', 25000.00, 2, 35, 'King Bed', ARRAY['WiFi', 'TV', 'Air Conditioning', 'Mini Bar', 'Coffee Maker', 'Safe', 'Work Desk', 'Premium Bedding'], ARRAY['/images/2026/01/room-2.webp'], true),

-- Signature Executive Rooms (209, 210, 302, 303) - ₦30,000/night
('Signature Executive', '209', 'Premium executive room designed for business professionals. Features dedicated workspace and executive amenities.', 30000.00, 2, 40, 'King Bed', ARRAY['WiFi', 'TV', 'Air Conditioning', 'Mini Bar', 'Coffee Maker', 'Safe', 'Executive Work Desk', 'Lounge Access', 'Premium Toiletries'], ARRAY['/images/2026/01/room-3.webp'], true),
('Signature Executive', '210', 'Premium executive room designed for business professionals. Features dedicated workspace and executive amenities.', 30000.00, 2, 40, 'King Bed', ARRAY['WiFi', 'TV', 'Air Conditioning', 'Mini Bar', 'Coffee Maker', 'Safe', 'Executive Work Desk', 'Lounge Access', 'Premium Toiletries'], ARRAY['/images/2026/01/room-3.webp'], true),
('Signature Executive', '302', 'Premium executive room designed for business professionals. Features dedicated workspace and executive amenities.', 30000.00, 2, 40, 'King Bed', ARRAY['WiFi', 'TV', 'Air Conditioning', 'Mini Bar', 'Coffee Maker', 'Safe', 'Executive Work Desk', 'Lounge Access', 'Premium Toiletries'], ARRAY['/images/2026/01/room-3.webp'], true),
('Signature Executive', '303', 'Premium executive room designed for business professionals. Features dedicated workspace and executive amenities.', 30000.00, 2, 40, 'King Bed', ARRAY['WiFi', 'TV', 'Air Conditioning', 'Mini Bar', 'Coffee Maker', 'Safe', 'Executive Work Desk', 'Lounge Access', 'Premium Toiletries'], ARRAY['/images/2026/01/room-3.webp'], true),

-- Signature Business Class Rooms (301, 304, 305, 306) - ₦35,000/night
('Signature Business Class', '301', 'Top-tier accommodation with exclusive business facilities and luxury amenities. Perfect for executives and VIP guests.', 35000.00, 2, 45, 'King Bed', ARRAY['WiFi', 'TV', 'Air Conditioning', 'Mini Bar', 'Coffee Maker', 'Safe', 'Executive Work Station', 'Lounge Access', 'Premium Toiletries', 'Butler Service'], ARRAY['/images/2026/01/room-4.webp'], true),
('Signature Business Class', '304', 'Top-tier accommodation with exclusive business facilities and luxury amenities. Perfect for executives and VIP guests.', 35000.00, 2, 45, 'King Bed', ARRAY['WiFi', 'TV', 'Air Conditioning', 'Mini Bar', 'Coffee Maker', 'Safe', 'Executive Work Station', 'Lounge Access', 'Premium Toiletries', 'Butler Service'], ARRAY['/images/2026/01/room-4.webp'], true),
('Signature Business Class', '305', 'Top-tier accommodation with exclusive business facilities and luxury amenities. Perfect for executives and VIP guests.', 35000.00, 2, 45, 'King Bed', ARRAY['WiFi', 'TV', 'Air Conditioning', 'Mini Bar', 'Coffee Maker', 'Safe', 'Executive Work Station', 'Lounge Access', 'Premium Toiletries', 'Butler Service'], ARRAY['/images/2026/01/room-4.webp'], true),
('Signature Business Class', '306', 'Top-tier accommodation with exclusive business facilities and luxury amenities. Perfect for executives and VIP guests.', 35000.00, 2, 45, 'King Bed', ARRAY['WiFi', 'TV', 'Air Conditioning', 'Mini Bar', 'Coffee Maker', 'Safe', 'Executive Work Station', 'Lounge Access', 'Premium Toiletries', 'Butler Service'], ARRAY['/images/2026/01/room-4.webp'], true)

ON CONFLICT DO NOTHING;

-- Step 4: Make room_number NOT NULL and add unique constraint
ALTER TABLE rooms ALTER COLUMN room_number SET NOT NULL;
CREATE UNIQUE INDEX IF NOT EXISTS idx_rooms_room_number ON rooms(room_number);

-- Step 5: Update RLS policies (drop and recreate to avoid conflicts)
DROP POLICY IF EXISTS "Anyone can view available rooms" ON rooms;
DROP POLICY IF EXISTS "Authenticated users can manage rooms" ON rooms;
DROP POLICY IF EXISTS "Anyone can create bookings" ON bookings;
DROP POLICY IF EXISTS "Authenticated users can view all bookings" ON bookings;
DROP POLICY IF EXISTS "Authenticated users can update bookings" ON bookings;

-- Recreate policies
CREATE POLICY "Anyone can view available rooms" ON rooms
  FOR SELECT USING (is_available = true);

CREATE POLICY "Authenticated users can manage rooms" ON rooms
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Anyone can create bookings" ON bookings
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Authenticated users can view all bookings" ON bookings
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update bookings" ON bookings
  FOR UPDATE USING (auth.role() = 'authenticated');

-- Verification query (optional - run separately to check results)
-- SELECT room_number, name, price_per_night, is_available 
-- FROM rooms 
-- ORDER BY room_number;
