import { tokens } from "@/src/theme/tokens";
import { Post } from "@/src/types/post";
import * as Haptics from "expo-haptics";
import { Pressable, StyleSheet, Text } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import Svg, { Path } from "react-native-svg";

const AnimatedText = Animated.createAnimatedComponent(Text);

const styles = StyleSheet.create({
  footerItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: tokens.colors.background.button,
    justifyContent: "center",
    borderRadius: 999,
    width: 63,
    height: 36,
    gap: 4,
  },
  liked: {
    backgroundColor: tokens.colors.background.liked,
  },
  footerText: {
    fontFamily: tokens.typography.fontFamily.bold,
    fontSize: tokens.typography.fontSize.xs,
    color: tokens.colors.text.secondary,
  },
  likedText: {
    color: tokens.colors.text.white,
  },
  iconCont: {
    height: 24,
    width: 24,
    justifyContent: "center",
    alignItems: "center",
  },
});

const LikeButt = ({
  post,
  onLike,
}: {
  post: Post;
  onLike: (postId: string) => Promise<void>;
}) => {
  const scale = useSharedValue(1);
  const countScale = useSharedValue(1);

  const handlePress = () => {
    onLike(post.id);

    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

    scale.value = 1.3;
    scale.value = withSpring(1);

    countScale.value = 1.4;
    countScale.value = withSpring(1);
  };

  const iconStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const countStyle = useAnimatedStyle(() => ({
    transform: [{ scale: countScale.value }],
  }));

  return (
    <Pressable
      onPress={handlePress}
      style={[styles.footerItem, post.isLiked && styles.liked]}
    >
      <Animated.View style={[styles.iconCont, iconStyle]}>
        {post.isLiked ? (
          <Svg width={17} height={15} viewBox="0 0 17 15">
            <Path
              d="M8.17439 15L6.9891 13.921C2.77929 10.1035 0 7.57766 0 4.49591C0 1.97003 1.9782 0 4.49591 0C5.91826 0 7.28338 0.662125 8.17439 1.70027C9.0654 0.662125 10.4305 0 11.8529 0C14.3706 0 16.3488 1.97003 16.3488 4.49591C16.3488 7.57766 13.5695 10.1035 9.35967 13.921L8.17439 15Z"
              fill="#FFEAF1"
            />
          </Svg>
        ) : (
          <Svg width={17} height={15} viewBox="0 0 17 15">
            <Path
              d="M8.25613 12.7112L8.17439 12.7929L8.08447 12.7112C4.20164 9.18801 1.63488 6.85831 1.63488 4.49591C1.63488 2.86104 2.86104 1.63488 4.49591 1.63488C5.75477 1.63488 6.98093 2.45232 7.41417 3.56403H8.93461C9.36785 2.45232 10.594 1.63488 11.8529 1.63488C13.4877 1.63488 14.7139 2.86104 14.7139 4.49591C14.7139 6.85831 12.1471 9.18801 8.25613 12.7112ZM11.8529 0C10.4305 0 9.0654 0.662125 8.17439 1.70027C7.28338 0.662125 5.91826 0 4.49591 0C1.9782 0 0 1.97003 0 4.49591C0 7.57766 2.77929 10.1035 6.9891 13.921L8.17439 15L9.35967 13.921C13.5695 10.1035 16.3488 7.57766 16.3488 4.49591C16.3488 1.97003 14.3706 0 11.8529 0Z"
              fill="#57626F"
            />
          </Svg>
        )}
      </Animated.View>

      <AnimatedText
        style={[
          styles.footerText,
          post.isLiked && styles.likedText,
          countStyle,
        ]}
      >
        {post.likesCount}
      </AnimatedText>
    </Pressable>
  );
};

export default LikeButt;
