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

### Database setup

Before running the application you need to apply the SQL migrations in the
`supabase/migrations` directory to your Supabase project.

1. Install the [Supabase CLI](https://supabase.com/docs/guides/cli) if you don't
   already have it:

   ```bash
   npm install -g supabase
   ```

2. Authenticate the CLI and link it to your project:

   ```bash
   supabase login
   supabase link --project-ref <your-project-ref>
   ```

3. Push the migrations to create all required tables:

   ```bash
   supabase db push
   ```

The first user you create will have the `client` role. To promote a user to
`owner` or `admin`, update the `role` column in the `profiles` table using the
Supabase dashboard or SQL editor.

After the database is set up, run the development server:

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

## Linting

The project uses the built-in Next.js ESLint configuration. Before running the
lint command make sure dependencies are installed:

```bash
npm install
```

Then run:

```bash
npm run lint
```

