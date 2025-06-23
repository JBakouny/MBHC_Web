# MBHC Web

This repository contains the web frontend for the Maria Badari Haute Couture website built with Next.js and Supabase.

## Local development

Install dependencies:

```bash
npm install
```

Create an `.env.local` file in the project root with your Supabase credentials:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://zrjthioylovvarhpelym.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpyanRoaW95bG92dmFyaHBlbHltIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA2NTY1MjcsImV4cCI6MjA2NjIzMjUyN30.JitnJ3eTGX_fSffXHTNZ76mc6AorOuJI-Tcq3stMzdU
```

If your application needs to perform privileged server-side actions, additional
environment variables can be defined:

```bash
# Optional server-side credentials
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
SUPABASE_JWT_SECRET=your-jwt-secret
DATABASE_URL=postgresql://postgres:your-password@db.zrjthioylovvarhpelym.supabase.co:5432/postgres
```

These values should **not** be committed to version control. They are only
required for features that access the database directly or run migrations.

Then run the development server:

```bash
npm run dev
```

## Building

To generate a production build (static export):

```bash
npm run build
```

The output is written to the `out` directory. To preview the static build locally you can use any static file server, for example:

```bash
npx serve -s out -l 3000
```

