import { useCallback } from "react";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

export const useGlobalSearchNavigation = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const handleItemPress = useCallback((item: any, entity: string) => {
    switch (entity) {
      case "goods":
        navigation.navigate("AdminGoodsDetail", { goodsId: item._id });
        break;
      case "container":
        navigation.navigate("ContainerDetail", { containerId: item._id });
        break;
      case "client":
        navigation.navigate("ClientDetails", { id: item._id });
        break;
    }
  }, [navigation]);

  return { handleItemPress };
};
