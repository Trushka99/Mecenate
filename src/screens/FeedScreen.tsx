import { useInfiniteQuery } from "@tanstack/react-query";
import { ActivityIndicator, FlatList, View } from "react-native";
import { getPosts } from "../api/client";
import ErrorComp from "../components/ErrorComp";
import PostNotFound from "../components/PostNotFound";
import PostCard from "../components/postParts/PostCard";
export default function FeedScreen() {
  const {
    data,
    fetchNextPage,
    refetch,
    isLoading,
    isError,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["posts"],
    queryFn: ({ pageParam }) => getPosts(pageParam),
    initialPageParam: null,
    getNextPageParam: (lastPage) => lastPage.data.nextCursor ?? null,
  });
  const posts = data?.pages.flatMap((p) => p.data.posts) ?? [];
  const isValidPost = (post: any) => {
    return post?.id;
  };
  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (isError) {
    return (
      <ErrorComp
        text="По вашему запросу ничего не найдено"
        buttonText="На главную"
      />
    );
  }

  return (
    <FlatList
      data={posts}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => {
        if (!isValidPost(item)) {
          return <PostNotFound post={item} />;
        }

        return <PostCard post={item} />;
      }}
      onEndReached={() => fetchNextPage()}
      onEndReachedThreshold={0.5}
      refreshing={false}
      onRefresh={refetch}
      ListFooterComponent={isFetchingNextPage ? <ActivityIndicator /> : null}
      ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
    />
  );
}
