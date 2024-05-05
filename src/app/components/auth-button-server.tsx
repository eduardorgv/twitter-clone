import { AuthButton } from "./auth-button-client";
import { cookies } from "next/headers";
import { createBrowserClient } from "@supabase/ssr";

export const AuthButtonServer = async () => {
  const cookieStore = cookies();

  const supabase = createBrowserClient(
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

  return <AuthButton session={session} />;
};
