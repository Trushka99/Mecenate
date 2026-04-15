import { tokens } from "@/src/theme/tokens";
import { Post } from "@/src/types/post";
import { StyleSheet, Text, View } from "react-native";
import Svg, { Path } from "react-native-svg";
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
    color: tokens.colors.text.white,
  },
  footerText: {
    fontFamily: tokens.typography.fontFamily.bold,
    lineHeight: tokens.typography.lineHeight.lg,
    fontSize: tokens.typography.fontSize.sm,
    color: tokens.colors.text.secondary,
  },
  iconCont: {
    height: 24,
    width: 24,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});
const LikeButt = ({ post }: { post: Post }) => {
  return (
    <View style={[styles.footerItem, post.isLiked && styles.liked]}>
      <View style={styles.iconCont}>
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
      </View>
      <Text style={[styles.footerText, post.isLiked && styles.liked]}>
        {post.likesCount}
      </Text>
    </View>
  );
};
export default LikeButt;
