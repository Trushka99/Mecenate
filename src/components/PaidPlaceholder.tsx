import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet } from "react-native";
import { tokens } from "../theme/tokens";
const styles = StyleSheet.create({
  square: {
    height: tokens.sizes.xs,
    width: "40%",
    borderRadius: 22,
    marginBottom: tokens.spacing.sm,
  },
  bigSquare: { height: tokens.sizes.md, width: "100%", borderRadius: 22 },
});

const PaidPlaceholder = () => {
  return (
    <>
      <LinearGradient
        colors={["rgba(238, 239, 241, 0.8)", "rgba(238, 239, 241, 0.8)"]}
        style={styles.square}
      />
      <LinearGradient
        colors={["rgba(238, 239, 241, 0.8)", "rgba(238, 239, 241, 0.8)"]}
        style={styles.bigSquare}
      />
    </>
  );
};
export default PaidPlaceholder;
