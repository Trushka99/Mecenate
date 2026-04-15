import { Post } from "@/src/types/post";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { tokens } from "../../theme/tokens";
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
    paddingLeft: 6,
  },

  more: {
    fontSize: tokens.typography.fontSize.md,
    fontFamily: tokens.typography.fontFamily.medium,
    color: tokens.colors.text.purple,
  },

  content: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 16,
  },
  square: {
    height: 26,
    width: "40%",
    borderRadius: 22,
    marginBottom: 8,
  },
  bigSquare: { height: 40, width: "100%", borderRadius: 22 },
  title: {
    fontSize: tokens.typography.fontSize.lg,
    fontFamily: tokens.typography.fontFamily.bold,
    lineHeight: tokens.typography.lineHeight.lg,
    color: tokens.colors.text.primary,
    marginBottom: 8,
  },
});

const PostContent = ({ post }: { post: Post }) => {
  const [full, setFull] = useState<boolean>(false);

  return (
    <View style={styles.content}>
      {post.tier === "free" ? (
        <Text style={styles.title}>{post.title}</Text>
      ) : (
        <LinearGradient
          colors={["rgba(238, 239, 241, 0.8)", "rgba(238, 239, 241, 0.8)"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.square}
        />
      )}
      <View style={styles.previewWrapper}>
        {post.tier === "free" ? (
          <Text style={styles.preview} numberOfLines={full ? 0 : 3}>
            {full ? post.body : post.preview}
          </Text>
        ) : (
          <LinearGradient
            colors={["rgba(238, 239, 241, 0.8)", "rgba(238, 239, 241, 0.8)"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.bigSquare}
          />
        )}

        {!full && post.body !== "" && (
          <>
            <LinearGradient
              colors={["rgba(255,255,255,0)", "rgba(255,255,255,0.85)", "#fff"]}
              style={styles.fade}
              pointerEvents="none"
            />

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
