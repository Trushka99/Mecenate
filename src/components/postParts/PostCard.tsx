import { feedStore } from "@/src/store/feedstore";
import { tokens } from "@/src/theme/tokens";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Post } from "../../types/post";
import PostContent from "./PostContent";
import PostFooter from "./PostFooter";
import PostHeader from "./PostHeader";
import PostImage from "./PostImage";
const styles = StyleSheet.create({
  card: {
    backgroundColor: tokens.colors.background.primary,
    overflow: "hidden",
  },
});

export default function PostCard({ post }: { post: Post }) {
  return (
    <TouchableOpacity
      onPress={() => {
        feedStore.selectPost(post.id);
        console.log(feedStore.selectedPostId);
      }}
    >
      <View style={styles.card}>
        <PostHeader post={post} />
        {post.coverUrl && <PostImage post={post} />}
        <PostContent post={post} />
        {post.tier === "free" && <PostFooter post={post} />}
      </View>
    </TouchableOpacity>
  );
}
