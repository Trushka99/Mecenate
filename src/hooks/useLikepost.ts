import { togglePostLike } from "@/src/api/client";
import { useQueryClient } from "@tanstack/react-query";

export const useLikePost = () => {
  const queryClient = useQueryClient();

  return async (postId: string) => {
    queryClient.setQueryData(["posts"], (old: any) => {
      if (!old) return old;

      return {
        ...old,
        pages: old.pages.map((page: any) => ({
          ...page,
          data: {
            ...page.data,
            posts: page.data.posts.map((p: any) =>
              p.id === postId
                ? {
                    ...p,
                    isLiked: !p.isLiked,
                    likesCount: p.isLiked ? p.likesCount - 1 : p.likesCount + 1,
                  }
                : p,
            ),
          },
        })),
      };
    });

    queryClient.setQueryData(["post", postId], (old: any) => {
      if (!old) return old;

      return {
        ...old,
        isLiked: !old.isLiked,
        likesCount: old.isLiked ? old.likesCount - 1 : old.likesCount + 1,
      };
    });

    try {
      await togglePostLike(postId);
    } catch {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({ queryKey: ["post", postId] });
    }
  };
};
