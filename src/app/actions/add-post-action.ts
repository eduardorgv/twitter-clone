"use server";

import { cookies } from "next/headers";
import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { revalidatePath } from "next/cache";

export const createPost = async (formData: FormData) => {
  // Validate form, if it's null: return
  const content = formData.get("content");
  if (!content) return;

  const cookieStore = cookies();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          cookieStore.set({ name, value, ...options });
        },
        remove(name: string, options: CookieOptions) {
          cookieStore.set({ name, value: "", ...options });
        },
      },
    }
  );

  // Check session
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (user === null) return;

  const { data, error } = await supabase
    .from("posts")
    .insert({ content, user_id: user.id });

  revalidatePath("/");
};
