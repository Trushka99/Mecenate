import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { ActivityIndicator, FlatList, StyleSheet, View } from "react-native";
import { getPosts } from "../api/client";
import ErrorComp from "../components/ErrorComp";
import PostNotFound from "../components/PostNotFound";
import PostCard from "../components/postParts/PostCard";
import TierTabs from "../components/TierTabs";
import { useLikePost } from "../hooks/useLikepost";
import { useWebSocket } from "../hooks/useWebSocket";
const styles = StyleSheet.create({
  wrapper: {
    paddingTop: 52,
  },
});
export default function FeedScreen() {
  const [tab, setTab] = useState<"all" | "free" | "paid">("all");
  const queryClient = useQueryClient();
  useWebSocket((data) => {
    if (data.type === "like_updated") {
      queryClient.setQueryData(["posts", tab], (oldData: any) => {
        if (!oldData) return oldData;

        return {
          ...oldData,
          pages: oldData.pages.map((page: any) => ({
            ...page,
            data: {
              ...page.data,
              posts: page.data.posts.map((post: any) =>
                post.id === data.postId
                  ? {
                      ...post,
                      likesCount: data.likesCount,
                      isLiked: data.isLiked,
                    }
                  : post,
              ),
            },
          })),
        };
      });
    }
  });
  const {
    data,
    fetchNextPage,
    refetch,
    isError,
    isFetching,
    isFetchingNextPage,
    isRefetching,
  } = useInfiniteQuery({
    queryKey: ["posts", tab],
    queryFn: ({ pageParam }) => getPosts(tab, pageParam),
    initialPageParam: null,
    getNextPageParam: (lastPage) => lastPage.data.nextCursor ?? null,
  });
  const posts = data?.pages.flatMap((p) => p.data.posts) ?? [];
  const isValidPost = (post: any) => {
    return post?.id;
  };
  const likePost = useLikePost();
  if (isError) {
    return (
      <ErrorComp
        text="По вашему запросу ничего не найдено"
        buttonText="На главную"
      />
    );
  }

  return (
    <View style={styles.wrapper}>
      <TierTabs value={tab} onChange={setTab} />

      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          if (!isValidPost(item)) {
            return <PostNotFound post={item} />;
          }

          return <PostCard post={item} onLike={likePost} />;
        }}
        onEndReached={() => fetchNextPage()}
        onEndReachedThreshold={0.5}
        refreshing={isRefetching}
        onRefresh={refetch}
        ListFooterComponent={isFetchingNextPage ? <ActivityIndicator /> : null}
        ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
      />
    </View>
  );
}
