import { tokens } from "@/src/theme/tokens";
import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";
const MainButton: React.FC<{ text: string; onPress?: () => void }> = ({
  text,
  onPress,
}) => {
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{text}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 239,
    height: 42,
    borderRadius: 14,
    backgroundColor: "rgba(78, 17, 164, 1)",
    paddingVertical: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: tokens.colors.text.white,
    fontSize: tokens.typography.fontSize.md,
    fontFamily: tokens.typography.fontFamily.semiBold,
  },
});

export default MainButton;
