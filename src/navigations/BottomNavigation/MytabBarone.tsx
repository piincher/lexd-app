import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { COLORS } from "@src/constants/Colors";
import { HEIGHTTODP } from "@src/constants/Dimensions";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import BottomNavigation from "./BottomNavigation";

export const MytabBarone = ({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) => {
  return (
    <View
      style={{
        height: HEIGHTTODP(52),
        backgroundColor: COLORS.white,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",

        // borderTopRightRadius: 16,
        // borderTopLeftRadius: 16,
      }}
    >
      {state.routes.map((route, index) => {
        const isFocused = state.index === index;
        const { options } = descriptors[route.key];

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TouchableOpacity onPress={() => onPress()} key={index.toString()}>
            {index === 0 && (
              <View style={styles.normalicon}>
                {isFocused ? (
                  <BottomNavigation
                    active={isFocused}
                    name={"Home"}
                    index={0}
                  />
                ) : (
                  <BottomNavigation
                    name={"Home"}
                    active={isFocused}
                    index={1}
                  />
                )}
              </View>
            )}
            {index === 1 && (
              <View style={styles.normalicon}>
                {isFocused ? (
                  <BottomNavigation
                    active={isFocused}
                    index={2}
                    name={"Save"}
                  />
                ) : (
                  <BottomNavigation
                    active={isFocused}
                    name={"Save"}
                    index={3}
                  />
                )}
              </View>
            )}
            {index === 2 && (
              <View style={styles.middleicon}>
                {isFocused ? (
                  <BottomNavigation index={4} />
                ) : (
                  <BottomNavigation index={4} />
                )}
              </View>
            )}
            {index === 3 && (
              <View style={styles.normalicon}>
                {isFocused ? (
                  <BottomNavigation
                    active={isFocused}
                    index={5}
                    name={"Reservation"}
                  />
                ) : (
                  <BottomNavigation
                    active={isFocused}
                    index={6}
                    name={"Reservation"}
                  />
                )}
              </View>
            )}
            {index === 4 && (
              <View style={styles.normalicon}>
                {isFocused ? (
                  <BottomNavigation
                    active={isFocused}
                    index={7}
                    name={"Profile"}
                  />
                ) : (
                  <BottomNavigation
                    active={isFocused}
                    name={"Profile"}
                    index={8}
                  />
                )}
              </View>
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  middleicon: {
    width: 40,
    height: 40,

    justifyContent: "center",
    alignItems: "center",
    elevation: 30,
    backgroundColor: COLORS.DarkGrey,
  },
  normalicon: {
    width: 56,
    height: 42,
    alignItems: "center",
  },
});
