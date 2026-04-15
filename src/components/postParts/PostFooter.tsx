import { Post } from "@/src/types/post";
import { StyleSheet, View } from "react-native";
import CommButt from "../ui/commButt";
import LikeButt from "../ui/likeButt";
const styles = StyleSheet.create({
  footer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingBottom: 12,
    gap: 8,
  },
});

const PostFooter = ({ post }: { post: Post }) => {
  return (
    <View style={styles.footer}>
      <LikeButt post={post} />
      <CommButt post={post} />
    </View>
  );
};

export default PostFooter;
