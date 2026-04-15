import { StyleSheet, View } from "react-native";
import { tokens } from "../theme/tokens";
import { Post } from "../types/post";
import ErrorComp from "./ErrorComp";
import PostHeader from "./postParts/PostHeader";
const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    overflow: "hidden",
    paddingBottom: 12,
  },
  headerText: {
    flex: 1,
  },
  name: {
    fontSize: tokens.typography.fontSize.md,
    lineHeight: tokens.typography.lineHeight.md,
    fontFamily: tokens.typography.fontFamily.bold,
    color: "rgba(17, 20, 22, 1)",
  },
});

const PostNotFound = ({ post }: { post: Post }) => {
  return (
    <View style={styles.card}>
      <PostHeader post={post} />
      <ErrorComp
        text="Не удалось загрузить публикацию"
        buttonText="Повторить"
      />
    </View>
  );
};
export default PostNotFound;
