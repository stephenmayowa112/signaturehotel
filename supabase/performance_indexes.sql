-- Performance Optimization: Add Database Indexes
-- Run this in Supabase SQL Editor to speed up queries

-- Index for filtering rooms by name (category)
CREATE INDEX IF NOT EXISTS idx_rooms_name ON rooms(name);

-- Index for filtering available rooms
CREATE INDEX IF NOT EXISTS idx_rooms_is_available ON rooms(is_available);

-- Composite index for common room queries (name + availability)
CREATE INDEX IF NOT EXISTS idx_rooms_name_available ON rooms(name, is_available);

-- Index for room number lookups
CREATE INDEX IF NOT EXISTS idx_rooms_room_number ON rooms(room_number);

-- Index for booking date range queries
CREATE INDEX IF NOT EXISTS idx_bookings_dates ON bookings(check_in, check_out);

-- Index for booking status queries
CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status);

-- Composite index for availability checks (room + dates + status)
CREATE INDEX IF NOT EXISTS idx_bookings_availability 
ON bookings(room_id, check_in, check_out, status);

-- Index for guest email lookups
CREATE INDEX IF NOT EXISTS idx_bookings_guest_email ON bookings(guest_email);

-- Verify indexes were created
SELECT 
    tablename,
    indexname,
    indexdef
FROM pg_indexes
WHERE schemaname = 'public'
  AND tablename IN ('rooms', 'bookings')
ORDER BY tablename, indexname;
