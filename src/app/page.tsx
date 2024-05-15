import { AuthButtonServer } from "./components/auth-button-server";
import { ComposePost } from "./components/compose-post";
import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import { Database } from "./types/database";
import { redirect } from "next/navigation";
import PostList from "./components/post-list";

export default async function Home() {
  const cookieStore = cookies();

  const supabase = createServerClient<Database>(
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

  const { data: { user } } = await supabase.auth.getUser();

  if (session === null) {
    redirect("/login");
  }

  const { data: posts } = await supabase
    .from("posts")
    .select("*, users(name, avatar_url, user_name)");

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <section className="max-w-[800px] w-full mx-auto border-l border-r border-white/30 min-h-screen">
        <ComposePost
          userName={user?.user_metadata?.user_name}
          userAvatarUrl={user?.user_metadata?.avatar_url}
        />
        <PostList posts={posts} />
      </section>
      <AuthButtonServer />
    </main>
  );
}
