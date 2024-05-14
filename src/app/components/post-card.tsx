"use client";

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Avatar,
} from "@nextui-org/react";
import { IconHeart, IconMessageCircle, IconRepeat } from "@tabler/icons-react";

interface iProps {
  userFullName: string;
  userName: string;
  avatarUrl: string;
  content: string;
}

export default function PostCard({
  userFullName,
  userName,
  avatarUrl,
  content,
}: iProps) {
  return (
    <Card className="shadow-none bg-transparent hover:bg-slate-900 transition border-b rounded-none cursor-pointer border-white/20">
      <CardHeader className="justify-between">
        <div className="flex gap-5">
          <Avatar isBordered radius="full" size="md" src={avatarUrl} />
          <div className="flex flex-row gap-3 items-start justify-center text-center">
            <h4 className="text-small font-semibold  text-default-600">
              {userFullName}
            </h4>
            <h5 className="text-small text-default-400">@{userName}</h5>
          </div>
        </div>
      </CardHeader>
      <CardBody className="px-3 py-0 text-small text-white">
        <p>{content}</p>
      </CardBody>
      <CardFooter className="gap-3">
        <button>
          <IconMessageCircle />
        </button>
        <button>
          <IconRepeat />
        </button>
        <button>
          <IconHeart />
        </button>
      </CardFooter>
    </Card>
  );
}
