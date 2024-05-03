import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { AuthButtonServer } from "./components/auth-button-server";

export default async function Home() {
  const cookieStore = cookies();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
      },
    }
  );

  const { data: posts } = await supabase.from("posts").select();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <AuthButtonServer />
      <pre>{JSON.stringify(posts, null, 2)}</pre>
    </main>
  );
}
