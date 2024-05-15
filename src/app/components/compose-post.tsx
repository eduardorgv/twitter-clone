"use client";

import { Avatar } from "@nextui-org/react";
import { createPost } from "../actions/add-post-action";
import { SubmitButton } from "./compose-post-submit-button";
import { Textarea } from "@nextui-org/input";
import { useRef } from "react";

interface iProps {
  userName: string;
  userAvatarUrl: string;
}

export function ComposePost({ userName, userAvatarUrl }: iProps) {
  const ref = useRef<HTMLFormElement>(null);

  return (
    <form
      ref={ref}
      action={async (formData) => {
        await createPost(formData);
        ref.current?.reset();
      }}
      className="flex flex-row p-4 border-b border-white/20 gap-3"
    >
      <Avatar radius="full" size="md" src={userAvatarUrl} alt={userName} />
      <div className="flex flex-1 flex-col gap-y-4">
        <Textarea
          name="content"
          rows={4}
          className="w-full text-2xl bg-black placeholder-gray-500 p-2"
          placeholder="What's happening?"
        />
        <SubmitButton />
      </div>
    </form>
  );
}
