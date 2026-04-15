import { tokens } from "@/src/theme/tokens";
import { VideoView, useVideoPlayer } from "expo-video";
import { useEffect } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { Post } from "../../types/post";
const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    padding: 16,
  },
  avatarWrapper: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: "hidden",
    marginRight: 12,
  },

  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: "hidden",
  },

  headerText: {
    flex: 1,
  },
  name: {
    fontSize: tokens.typography.fontSize.md,
    lineHeight: tokens.typography.lineHeight.md,
    fontFamily: tokens.typography.fontFamily.bold,
    color: tokens.colors.text.primary,
  },
});

const PostHeader = ({ post }: { post: Post }) => {
  const isVideo = post.author.avatarUrl.endsWith(".webm");
  const player = useVideoPlayer(post.author.avatarUrl);
  useEffect(() => {
    player.loop = true;
    player.muted = true;

    const start = async () => {
      try {
        await player.play();
      } catch (e) {
        console.log("play error", e);
      }
    };

    start();
  }, [player]);

  return (
    <View style={styles.header}>
      <View style={styles.avatarWrapper}>
        {isVideo ? (
          <VideoView
            style={styles.avatar}
            player={player}
            nativeControls={false}
            allowsFullscreen={false}
            allowsPictureInPicture={false}
          />
        ) : (
          <Image
            source={{ uri: post.author.avatarUrl }}
            style={styles.avatar}
          />
        )}
        <VideoView
          style={styles.avatar}
          player={player}
          nativeControls={false}
          allowsFullscreen={false}
          allowsPictureInPicture={false}
        />
      </View>
      <View style={styles.headerText}>
        <Text style={styles.name}>{post.author.displayName}</Text>
      </View>
    </View>
  );
};
export default PostHeader;
