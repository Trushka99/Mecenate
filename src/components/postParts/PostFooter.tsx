import { tokens } from "@/src/theme/tokens";
import { Post } from "@/src/types/post";
import { StyleSheet, View } from "react-native";
import CommButt from "../ui/commButt";
import LikeButt from "../ui/likeButt";
const styles = StyleSheet.create({
  footer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: tokens.spacing.lg,
    paddingBottom: tokens.spacing.md,
    gap: tokens.spacing.sm,
  },
});

const PostFooter = ({
  post,
  onLike,
}: {
  post: Post;
  onLike: (postId: string) => Promise<void>;
}) => {
  return (
    <View style={styles.footer}>
      <LikeButt onLike={onLike} post={post} />
      <CommButt post={post} />
    </View>
  );
};

export default PostFooter;
