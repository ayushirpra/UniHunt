# Changelog

All notable changes to UniHunt AI will be documented in this file.

## [0.1.0] - 2026-02-03
### Added
- Initial project setup from Figma AI export
- React 18 + TypeScript + Vite configuration
- Tailwind CSS v4 styling
- 20+ pages created
- React Router v7 with protected routes
- shadcn/ui component library
- Supabase client configuration
- Dark mode system with ThemeContext
- Navbar and Footer components
- UniversityCard reusable component

## [0.2.0] - 2026-02-10
### Added
- Connected Login page to Supabase Auth
- Connected Signup page to Supabase Auth
- Updated App.tsx to handle real Supabase auth state
- Created AuthContext for authentication management
- Created profiles table with auto-creation trigger
- Added Row Level Security policies for profiles table
- Error messages and loading states on Login/Signup pages
- Password validation on Signup page

### Fixed
- App now persists login state after page refresh
- Proper logout functionality calling Supabase signOut

## [0.3.0] - 2026-02-14
### Added
- Connected University Search page to real Supabase database
- Created universities table in Supabase with RLS policies
- Added 10 initial universities to database
- Created AI Tools dedicated page (/ai-tools)
- Added AI Tools dropdown to navbar

### Fixed
- Dark mode fixed across all 20+ pages
- Input field text visibility in dark mode
- Placeholder text updated to be more user-friendly

## [0.4.0] - 2026-02-17
### Added
- Added 50+ universities to Supabase database (60+ total)
- Universities from USA, UK, Canada, Australia, Asia, and Europe