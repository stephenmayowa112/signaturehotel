# Rivora Hotel Booking System

A modern hotel booking website built with Next.js 15, TypeScript, Tailwind CSS, and Supabase.

## Features

### Public Website
- 🏨 Beautiful hotel homepage with hero section
- 🛏️ Room listings with detailed information
- 📅 Real-time booking system with date selection
- 💳 Booking form with guest information
- 📱 Fully responsive design
- 🎨 Styled with Tailwind CSS matching the original Rivora theme

### Admin Dashboard
- 🔐 Secure authentication with Supabase Auth
- 📊 Dashboard with booking statistics
- 📋 Manage all bookings (view, confirm, cancel)
- 🏨 Room management
- 📈 Revenue tracking

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Icons**: Lucide React
- **Form Handling**: React Hook Form + Zod

## Getting Started

### Prerequisites

- Node.js 18+ installed
- A Supabase account (free tier works fine)

### 1. Clone and Install

```bash
cd hotel-booking
npm install
```

### 2. Set Up Supabase

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Wait for the database to be ready (takes ~2 minutes)
3. Go to **Project Settings** > **API** and copy:
   - Project URL
   - Anon/Public Key
   - Service Role Key (keep this secret!)

### 3. Configure Environment Variables

1. Rename `.env.example` to `.env.local`
2. Fill in your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 4. Set Up Database

1. In your Supabase project, go to **SQL Editor**
2. Copy the contents of `supabase/schema.sql`
3. Paste and run the SQL to create tables, policies, and sample data

### 5. Create Admin User

In Supabase Dashboard:
1. Go to **Authentication** > **Users**
2. Click **Add User** > **Create new user**
3. Enter email and password for your admin account
4. Click **Create user**

### 6. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
hotel-booking/
├── app/
│   ├── admin/              # Admin dashboard pages
│   ├── api/                # API routes
│   ├── login/              # Login page
│   ├── rooms/              # Room pages
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Homepage
│   └── globals.css         # Global styles
├── components/
│   ├── AdminHeader.tsx     # Admin navigation
│   ├── BookingForm.tsx     # Booking form component
│   ├── BookingsTable.tsx   # Admin bookings table
│   ├── Footer.tsx          # Site footer
│   ├── Header.tsx          # Site header
│   └── RoomCard.tsx        # Room card component
├── lib/
│   ├── supabase/           # Supabase clients
│   ├── types/              # TypeScript types
│   └── utils.ts            # Utility functions
├── supabase/
│   └── schema.sql          # Database schema
└── middleware.ts           # Auth middleware
```

## Usage

### Public Website

1. **Browse Rooms**: Visit `/rooms` to see all available rooms
2. **Book a Room**: Click on a room to see details and book
3. **Fill Booking Form**: Enter guest details and select dates
4. **Submit Booking**: Booking is created with "pending" status

### Admin Dashboard

1. **Login**: Go to `/login` and sign in with your admin credentials
2. **View Dashboard**: See booking statistics and recent bookings
3. **Manage Bookings**: 
   - Confirm pending bookings
   - Cancel bookings
   - View guest details
4. **Manage Rooms**: Add, edit, or disable rooms

## Database Schema

### Tables

**rooms**
- id (UUID, primary key)
- name (text)
- description (text)
- price_per_night (decimal)
- max_guests (integer)
- size_sqm (integer)
- bed_type (text)
- amenities (text array)
- images (text array)
- is_available (boolean)

**bookings**
- id (UUID, primary key)
- room_id (UUID, foreign key)
- guest_name (text)
- guest_email (text)
- guest_phone (text)
- check_in (date)
- check_out (date)
- num_guests (integer)
- total_price (decimal)
- status (enum: pending, confirmed, cancelled, completed)
- special_requests (text, nullable)

## Customization

### Colors

Edit the color scheme in `app/globals.css`:

```css
:root {
  --primary-color: #ab8965;
  --secondary-color: #fff5ed;
  /* ... more colors */
}
```

### Fonts

The project uses:
- **Jost** for body text
- **Gilda Display** for headings

Change fonts in `app/layout.tsx`.

### Sample Data

The `schema.sql` includes 6 sample rooms. Modify or add more rooms directly in Supabase or through the admin panel.

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Add environment variables from `.env.local`
5. Deploy!

### Update Environment Variables

Make sure to update `NEXT_PUBLIC_APP_URL` to your production URL.

## Security Notes

- ⚠️ Never commit `.env.local` to version control
- ⚠️ Keep your `SUPABASE_SERVICE_ROLE_KEY` secret
- ✅ Row Level Security (RLS) is enabled on all tables
- ✅ Admin routes are protected by middleware
- ✅ Authentication is handled by Supabase

## Future Enhancements

- [ ] Email notifications for bookings
- [ ] Payment integration (Stripe)
- [ ] Room availability calendar
- [ ] Guest reviews and ratings
- [ ] Multi-language support
- [ ] Image upload for rooms
- [ ] Advanced search and filters
- [ ] Booking cancellation by guests
- [ ] PDF invoice generation

## Support

For issues or questions:
1. Check the Supabase logs in your dashboard
2. Check browser console for errors
3. Verify environment variables are set correctly

## License

This project is open source and available under the MIT License.
