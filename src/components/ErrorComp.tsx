import { Image, StyleSheet, Text, View } from "react-native";
import MainButton from "./ui/mainButton";
const styles = StyleSheet.create({
  outer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    gap: "16px",
    alignItems: "center",
  },
});
const ErrorComp = ({
  text,
  onPress,
  buttonText,
}: {
  text: string;
  buttonText: string;
  onPress?: () => void;
}) => {
  return (
    <View style={styles.outer}>
      <View style={styles.container}>
        <Image
          source={require("../../assets/images/illustration_sticker.png")}
        />
        <Text>{text}</Text>
        <MainButton onPress={onPress} text={buttonText} />
      </View>
    </View>
  );
};
export default ErrorComp;
