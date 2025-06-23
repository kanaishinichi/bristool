# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Documentation

For detailed specifications and features, see [/docs/specification.md](/docs/specification.md)

## Development Commands

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start
```

## Architecture Overview

This is a **Bristol Stool Chart tracking application** built with Next.js App Router and Supabase.

### Tech Stack
- **Framework**: Next.js (App Router)
- **Database/Auth**: Supabase
- **UI Components**: shadcn/ui (New York style)
- **Styling**: TailwindCSS with CSS variables
- **Type Safety**: TypeScript with strict mode

### Key Directories
- `/app` - Next.js App Router pages and server actions
  - `(auth-pages)` - Authentication flows (sign-in, sign-up, forgot-password)
  - `actions.ts` - All server actions for auth and CRUD operations
  - `dashboard`, `new-stool`, `stools` - Routes requiring authentication
- `/components` - React components
  - `ui/` - shadcn/ui base components
  - Bristol scale and stool tracking components
- `/utils/supabase` - Supabase client configuration
  - `server.ts` - Server-side client (for Server Components)
  - `client.ts` - Client-side client (for Client Components)

### Database Schema

The app uses a `stool_records` table:
- `id`: Primary key
- `user_id`: References auth.users
- `date`: Timestamp of the record
- `scale`: Bristol scale rating (1-7)
- `volume`: Volume measurement (0-100)
- `color`: Color rating

### Authentication Pattern

All auth operations use Server Actions in `app/actions.ts`:
- `signUpAction`, `signInAction`, `signOutAction`
- `forgotPasswordAction`, `resetPasswordAction`
- Protected routes check auth status server-side
- Redirects to `/sign-in` if unauthenticated

### Data Operations Pattern

CRUD operations for stool records use Server Actions:
- `insertStoolAction` - Create new record
- `updateStoolAction` - Update existing record
- `deleteStoolAction` - Delete record
- All actions include `revalidatePath('/')` for cache invalidation
- User ID is fetched server-side for security

### Component Patterns

1. **Server Components by default** - Use Client Components only when needed
2. **Form handling** - Uses Server Actions with `useActionState` hook
3. **Data fetching** - Direct Supabase queries in Server Components
4. **UI components** - Follow shadcn/ui patterns and conventions

### Environment Variables

Required in `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

### Development Notes

- The UI is in Japanese (ブリストルスケール = Bristol Scale)
- Bristol Scale ranges from 1-7 with specific Japanese descriptions
- Uses placeholder images for scale visualization
- Date/time handling uses native Date objects with form inputs