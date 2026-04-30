import { feedStore } from "@/src/store/feedstore";
import { tokens } from "@/src/theme/tokens";
import { router } from "expo-router";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Post } from "../../types/post";
import PostContent from "./PostContent";
import PostFooter from "./PostFooter";
import PostHeader from "./PostHeader";
import PostImage from "./PostImage";
const styles = StyleSheet.create({
  card: {
    backgroundColor: tokens.colors.background.primary,
  },
});

export default function PostCard({
  post,
  onLike,
}: {
  post: Post;
  onLike: (postId: string) => Promise<void>;
}) {
  return (
    <TouchableOpacity
      disabled={post.tier === "paid"}
      activeOpacity={1}
      onPress={() => {
        feedStore.selectPost(post);
        router.push({
          pathname: "/post/[id]",
          params: { id: post.id },
        });
      }}
    >
      <View style={styles.card}>
        <PostHeader post={post} />
        {post.coverUrl && <PostImage post={post} />}
        <PostContent post={post} />
        {post.tier === "free" && <PostFooter post={post} onLike={onLike} />}
      </View>
    </TouchableOpacity>
  );
}
