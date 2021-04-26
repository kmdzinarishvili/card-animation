import React, { useState, useEffect } from "react";
import { Dimensions, StyleSheet, View, Button  } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  useDerivedValue,
  withSpring,
} from "react-native-reanimated";
import { mix } from "react-native-redash";


const SPACING = 10;
const { width } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    flex: 1,

    justifyContent: "center",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    padding: SPACING* 4,
  },
});

const origin = { x: -(width / 2 - SPACING * 2), y: 0 };

const useSpringTransition = (state) => {
  const value = useSharedValue(0);
  useEffect(() => {
    // eslint-disable-next-line no-nested-ternary
    value.value = typeof state === "boolean" ? (state ? 1 : 0) : state;
  }, [state, value]);
  const transition = useDerivedValue(() => {
    return withSpring(value.value);
  });
  return transition;
};

const UseTransition = () => {
  const [toggled, setToggle] = useState(false);
  const transition = useSpringTransition(toggled);
  return (
    <View style={styles.container}>
      {[1,2,3].map((card, index) => {
        const style = useAnimatedStyle(() => {
          const rotate = (index - 1) * mix(transition.value, 0, Math.PI / 6);
          return {
            transform: [
              { translateX: origin.x },
              { rotate: `${rotate}rad` },
              { translateX: -origin.x },
            ],
          };
        });
        return (
          <Animated.View key={`card${card}`} style={[{width:200, height:100, marginBottom: index==0?-100:0,marginTop:index==2?-100:0, backgroundColor: index==0? 'red': index==1?"blue": "purple"}, style]}>
          </Animated.View>
        );
      })}
      <Button
        title={toggled ? "Reset" : "Start"}
        onPress={() => setToggle((prev) => !prev)}
        
      />
    </View>
  );
};

export default UseTransition;