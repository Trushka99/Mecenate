import { Post } from "@/src/types/post";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { tokens } from "../../theme/tokens";
import PaidPlaceholder from "../PaidPlaceholder";

const styles = StyleSheet.create({
  previewWrapper: {
    position: "relative",
  },

  preview: {
    fontSize: tokens.typography.fontSize.md,
    lineHeight: tokens.typography.lineHeight.md,
    fontFamily: tokens.typography.fontFamily.medium,
    color: tokens.colors.text.primary,
  },

  fade: {
    position: "absolute",
    right: 0,
    bottom: 0,
    height: 24,
    width: 120,
  },

  moreBtn: {
    position: "absolute",
    right: 0,
    bottom: 0,
    paddingLeft: tokens.spacing.xs,
  },

  more: {
    fontSize: tokens.typography.fontSize.md,
    fontFamily: tokens.typography.fontFamily.medium,
    color: tokens.colors.text.purple,
  },

  content: {
    paddingHorizontal: tokens.spacing.lg,
    paddingTop: tokens.spacing.sm,
    paddingBottom: tokens.spacing.lg,
  },

  title: {
    fontSize: tokens.typography.fontSize.lg,
    fontFamily: tokens.typography.fontFamily.bold,
    lineHeight: tokens.typography.lineHeight.lg,
    color: tokens.colors.text.primary,
    marginBottom: tokens.spacing.xs,
  },
});

const PostContent = ({ post }: { post: Post }) => {
  const [full, setFull] = useState(false);

  if (post.tier === "paid") {
    return (
      <View style={styles.content}>
        <PaidPlaceholder />
      </View>
    );
  }

  return (
    <View style={styles.content}>
      <Text style={styles.title}>{post.title}</Text>

      <View style={styles.previewWrapper}>
        <Text style={styles.preview} numberOfLines={full ? 0 : 3}>
          {full ? post.body : post.preview}
        </Text>

        {!full && post.body !== "" && (
          <>
            <View style={styles.fade} />

            <Pressable onPress={() => setFull(true)} style={styles.moreBtn}>
              <Text style={styles.more}>Показать ещё</Text>
            </Pressable>
          </>
        )}
      </View>
    </View>
  );
};

export default PostContent;
