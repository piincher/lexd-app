import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { NotificationBell } from '@src/shared/ui/NotificationBell';
import { Theme } from "@src/constants/Theme";
import { useUnassignedGoods } from "../hooks/useUnassignedGoods";
import { UnassignedGoodsHeader } from "../components/UnassignedGoodsHeader";
import { UnassignedGoodsList } from "../components/UnassignedGoodsList";
import { styles } from "./UnassignedGoodsScreen.styles";

export const UnassignedGoodsScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const { sortedGoods, isLoading, handleRefresh } = useUnassignedGoods();

  return (
    <SafeAreaView style={styles.container}>
      <UnassignedGoodsHeader
        onBack={() => navigation.goBack()}
        rightElement={
          <NotificationBell
            onPress={() => navigation.navigate('Notifications' as never)}
            size={24}
            color={Theme.colors.text.primary}
          />
        }
      />
      <UnassignedGoodsList
        data={sortedGoods}
        isLoading={isLoading}
        onRefresh={handleRefresh}
        onItemPress={(goodsId) => navigation.navigate("GoodsDetail", { goodsId })}
      />
    </SafeAreaView>
  );
};

export default UnassignedGoodsScreen;
