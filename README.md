## Getting Started

1. Clone the project from here 'https://github.com/EricYanNaing/slack'
2. npm install
3. for supabase setup, I didn't use template from supabase but I did create by myself. You can integrate the SQL quries from supabase folder. You can see how to integrate the files here 'https://supabase.com/docs/guides/cli/local-development#database-migrations'.
4. you can integrate tables by using the files from 'csv_files_for_tables' folder.
5. use these values for .env.local

NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_CURRENT_ORIGIN=http://localhost:3000
UPLOADTHING_SECRET=your_uploadthing_secret
UPLOADTHING_APP_ID=your_uploadthing_id
NEXT_PUBLIC_SITE_URL=http://localhost:3000

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
