"use client";

import { Button } from "@nextui-org/react";
import { useFormStatus } from "react-dom";

export function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      className="bg-sky-500 font-bold rounded-full px-5 py-2 self-end"
      isLoading={pending}
    >
      Post
    </Button>
  );
}
