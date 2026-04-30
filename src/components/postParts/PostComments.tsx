import { getPostsComments } from "@/src/api/client";
import { useWebSocket } from "@/src/hooks/useWebSocket";
import { tokens } from "@/src/theme/tokens";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Platform,
  StyleSheet,
  Text,
  View,
} from "react-native";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "92.6%",
    margin: "auto",
  },

  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: tokens.spacing.lg,
    marginBottom: tokens.spacing.sm,
  },

  commentRow: {
    flexDirection: "row",
    paddingVertical: tokens.spacing.sm,
    alignItems: "center",
    gap: tokens.spacing.md,
    height: tokens.sizes.lg,
  },

  avatar: {
    width: tokens.sizes.md,
    height: tokens.sizes.md,
    borderRadius: 9999,
  },

  author: {
    fontFamily: tokens.typography.fontFamily.bold,
    fontSize: tokens.typography.fontSize.md,
    lineHeight: tokens.typography.lineHeight.md,
    color: tokens.colors.text.primary,
  },
  text: {
    lineHeight: tokens.typography.lineHeight.md,
    color: tokens.colors.text.primary,
    fontFamily: tokens.typography.fontFamily.medium,
    fontSize: tokens.typography.fontSize.sm,
  },
  headerGrey: {
    lineHeight: tokens.typography.lineHeight.md,
    color: tokens.colors.text.grey,
    fontFamily: tokens.typography.fontFamily.semiBold,
    fontSize: tokens.typography.fontSize.md,
  },
  headerPurple: {
    lineHeight: tokens.typography.lineHeight.md,
    color: tokens.colors.text.purple,
    fontFamily: tokens.typography.fontFamily.medium,
    fontSize: tokens.typography.fontSize.md,
  },
  footerLoader: {
    marginVertical: tokens.spacing.md,
  },

  listContent: {
    paddingBottom: tokens.spacing.xl,
  },
});

export default function PostComments({ postId }: { postId: string }) {
  const queryClient = useQueryClient();

  useWebSocket((data) => {
    if (data.type === "comment_added" && data.postId === postId) {
      queryClient.setQueryData(["comments", postId], (oldData: any) => {
        if (!oldData) return oldData;

        const newComment = data.comment;

        return {
          ...oldData,
          pages: oldData.pages.map((page: any, index: number) => {
            if (index === 0) {
              const exists = page.comments.some(
                (c: any) => c.id === newComment.id,
              );

              if (exists) return page;

              return {
                ...page,
                comments: [newComment, ...page.comments],
              };
            }

            return page;
          }),
        };
      });
    }
  });

  const { data, fetchNextPage, isFetchingNextPage, refetch } = useInfiniteQuery(
    {
      queryKey: ["comments", postId],
      queryFn: ({ pageParam }) => getPostsComments(postId, pageParam),
      initialPageParam: null,
      getNextPageParam: (lastPage) =>
        lastPage.hasMore ? lastPage.nextCursor : null,
    },
  );

  const comments = data?.pages.flatMap((page) => page.comments) ?? [];

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.headerGrey}>{comments.length} комментария</Text>
        <Text style={styles.headerPurple}>Сначала новые</Text>
      </View>

      <FlatList
        data={comments}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.commentRow}>
            <Image
              source={{ uri: item.author.avatarUrl }}
              style={styles.avatar}
            />

            <View>
              <Text style={styles.author}>{item.author.displayName}</Text>
              <Text style={styles.text}>{item.text}</Text>
            </View>
          </View>
        )}
        refreshing={isFetchingNextPage}
        onRefresh={refetch}
        onEndReached={() => fetchNextPage()}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          isFetchingNextPage ? (
            <ActivityIndicator style={styles.footerLoader} />
          ) : null
        }
        contentContainerStyle={styles.listContent}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode={Platform.OS === "ios" ? "interactive" : "on-drag"}
      />
    </View>
  );
}
