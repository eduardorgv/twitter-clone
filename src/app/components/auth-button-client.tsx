"use client";

import { createBrowserClient } from "@supabase/ssr";
import { GitHubIcon } from "./icons";
import { Session } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { Button } from "@nextui-org/react";

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
    <header className="flex justify-center">
      {session === null ? (
        <Button
          onClick={handleSignIn}
          type="button"
          className="text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 mb-2 mr-0"
        >
          <GitHubIcon />
          Sign in with Github
        </Button>
      ) : (
        <Button onClick={handleSignOut}>Sign Out</Button>
      )}
    </header>
  );
};
