import PostCard from "./post-card";

interface iProps {
  posts: any | null;
}

export default function PostList({ posts }: iProps) {
  return (
    <>
      {posts?.map((post: any) => {
        const {
          id,
          content,
          users: {
            name: userFullName,
            user_name: userName,
            avatar_url: avatarUrl,
          },
        } = post;

        return (
          <PostCard
            key={id}
            userFullName={userFullName}
            userName={userName}
            avatarUrl={avatarUrl}
            content={content}
          />
        );
      })}
    </>
  );
}
