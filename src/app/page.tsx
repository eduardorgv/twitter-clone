import { AuthButtonServer } from "./components/auth-button-server";
import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import { redirect } from "next/navigation";
import PostList from "./components/post-list";

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

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session === null) {
    redirect("/login");
  }

  const { data: posts } = await supabase
    .from("posts")
    .select("*, users(name, avatar_url, user_name)");

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <section className="w-[600px] mx-auto border-l border-r border-white/30 min-h-screen">
        <AuthButtonServer />
        <PostList posts={posts} />
      </section>
    </main>
  );
}
