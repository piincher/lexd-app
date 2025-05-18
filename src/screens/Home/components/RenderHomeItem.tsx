import { Pressable, StyleSheet, Text } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Fonts } from "@src/constants/Fonts";
import { COLORS } from "@src/constants/Colors";
import { useShippingMode } from "@src/store/shippingMode";
interface Item {
   item: { id: string; title: string; route: string; param: string };
   navigation: any;
}
export const RenderHomeItem = ({ item, navigation }: Item) => {
   const { setType } = useShippingMode((state) => state);

   const handleNavigation = () => {
      if (item.param) {
         setType(item.param as "air" | "sea");
         navigation.navigate(item.route, { param: item.param });
         return;
      }

      navigation.navigate(item.route, { param: item.param });
   };
   return (
      <>
         <Pressable key={item.id} style={styles.pressable} onPress={handleNavigation}>
            <Text style={styles.title}>{item.title}</Text>
            <MaterialIcons name="navigate-next" size={24} color={COLORS.blue} />
         </Pressable>
      </>
   );
};

const styles = StyleSheet.create({
   title: {
      fontFamily: Fonts.meduim,
   },
   pressable: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      borderColor: COLORS.blue,
      borderWidth: 0.2,
      padding: 12,
      margin: 20,
   },
});
