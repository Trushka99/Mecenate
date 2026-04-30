import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  LayoutChangeEvent,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { tokens } from "../theme/tokens";
import { TabValue } from "../types/post";
const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    backgroundColor: tokens.colors.background.primary,
    borderRadius: 999,
    padding: 4,
    margin: 16,
    position: "relative",
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    fontFamily: tokens.typography.fontFamily.bold,
    fontSize: tokens.typography.fontSize.xs,
  },
  text: {
    fontSize: tokens.typography.fontSize.xs,
    color: tokens.colors.text.primary,
    fontFamily: tokens.typography.fontFamily.medium,
  },
  activeText: {
    fontFamily: tokens.typography.fontFamily.bold,
    color: tokens.colors.text.white,
  },
  activeBackground: {
    position: "absolute",
    top: 4,
    bottom: 4,
    left: 4,
    backgroundColor: tokens.colors.background.purple,
    borderRadius: 999,
  },
});

const TABS: { key: TabValue; label: string }[] = [
  { key: "all", label: "Все" },
  { key: "free", label: "Бесплатные" },
  { key: "paid", label: "Платные" },
];

const TierTabs = ({
  value,
  onChange,
}: {
  value: TabValue;
  onChange: React.Dispatch<React.SetStateAction<"all" | "free" | "paid">>;
}) => {
  const translateX = useRef(new Animated.Value(0)).current;
  const [tabWidth, setTabWidth] = useState(0);
  const activeIndex = TABS.findIndex((t) => t.key === value);

  useEffect(() => {
    if (tabWidth === 0) return;

    Animated.spring(translateX, {
      toValue: activeIndex * tabWidth,
      useNativeDriver: true,
      speed: 20,
      bounciness: 6,
    }).start();
  }, [activeIndex]);

  const onLayout = (e: LayoutChangeEvent) => {
    setTabWidth(e.nativeEvent.layout.width / TABS.length);
  };

  return (
    <View style={styles.wrapper} onLayout={onLayout}>
      {tabWidth > 0 && (
        <Animated.View
          style={[
            styles.activeBackground,
            {
              width: tabWidth,
              transform: [{ translateX }],
            },
          ]}
        />
      )}

      {TABS.map((tab) => {
        const isActive = tab.key === value;

        return (
          <TouchableOpacity
            key={tab.key}
            style={styles.tab}
            activeOpacity={0.7}
            onPress={() => onChange(tab.key)}
          >
            <Text style={[styles.text, isActive && styles.activeText]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};
export default TierTabs;
