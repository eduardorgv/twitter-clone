"use client";

import { createBrowserClient } from "@supabase/ssr";
import { GitHubIcon } from "./icons";
import { Session } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";

interface iProps {
  session: Session | null;
}

export const AuthButton = ({ session }: iProps) => {
  const router = useRouter();

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  async function handleSignIn() {
    await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: `http://localhost:3000/auth/callback`,
      },
    });
  }

  async function handleSignOut() {
    await supabase.auth.signOut();
    router.refresh();
  }

  return (
    <header>
      {session === null ? (
        <button
          onClick={handleSignIn}
          type="button"
          className="text-white bg-[#24292F] hover:bg-[#24292F]/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 dark:hover:bg-[#050708]/30 me-2 mb-2"
        >
          <GitHubIcon />
          Sign in with Github
        </button>
      ) : (
        <button onClick={handleSignOut}>Sign Out</button>
      )}
    </header>
  );
};
