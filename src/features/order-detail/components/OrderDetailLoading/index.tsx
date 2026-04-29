import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Appbar } from "react-native-paper";
import { useAppTheme } from "@src/providers/ThemeProvider";
import type { RootStackScreenProps } from "@src/navigations/type";
import { OrderDetailSkeleton } from "../../screens/OrderDetailScreen/components/OrderDetailSkeleton";

interface OrderDetailLoadingProps {
   navigation: RootStackScreenProps<"OrderDetail">["navigation"];
}

export const OrderDetailLoading: React.FC<OrderDetailLoadingProps> = ({ navigation }) => {
   const { colors } = useAppTheme();

   return (
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.background.default }}>
         <Appbar.Header>
            <Appbar.BackAction onPress={() => navigation.goBack()} />
            <Appbar.Content title="Détails" />
         </Appbar.Header>
         <OrderDetailSkeleton />
      </SafeAreaView>
   );
};
