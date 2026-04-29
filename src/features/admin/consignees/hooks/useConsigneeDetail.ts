import { useMemo } from "react";
import { Linking, Alert } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import type { RouteProp } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useGetConsigneeById, useDeleteConsignee } from "./useConsignees";
import { useAppTheme } from "@src/providers/ThemeProvider";

type ConsigneeStackParamList = {
   ConsigneeList: undefined;
   ConsigneeDetail: { id: string };
   EditConsignee: { id: string };
};

type ConsigneeDetailRouteProp = RouteProp<ConsigneeStackParamList, "ConsigneeDetail">;
type NavigationProp = NativeStackNavigationProp<ConsigneeStackParamList>;

export const useConsigneeDetail = () => {
   const route = useRoute<ConsigneeDetailRouteProp>();
   const navigation = useNavigation<NavigationProp>();
   const { id } = route.params;
   const { colors } = useAppTheme();

   const { data: consignee, isLoading, error } = useGetConsigneeById(id);
   const { mutate: deleteConsignee, isPending: isDeleting } = useDeleteConsignee();

   const handlers = useMemo(
      () => ({
         goBack: () => navigation.goBack(),
         edit: () => navigation.navigate("EditConsignee", { id }),
         call: () => {
            if (consignee?.phone) {
               Linking.openURL(`tel:${consignee.phone}`);
            }
         },
         whatsapp: () => {
            if (consignee?.phone) {
               const whatsappUrl = `https://wa.me/${consignee.phone.replace(/\D/g, "")}`;
               Linking.openURL(whatsappUrl);
            }
         },
         delete: () => {
            Alert.alert(
               "Supprimer le destinataire",
               `Êtes-vous sûr de vouloir supprimer ${consignee?.name} ?`,
               [
                  { text: "Annuler", style: "cancel" },
                  {
                     text: "Supprimer",
                     style: "destructive",
                     onPress: () => {
                        deleteConsignee(id, {
                           onSuccess: () => {
                              navigation.goBack();
                           },
                        });
                     },
                  },
               ]
            );
         },
      }),
      [consignee, deleteConsignee, id, navigation]
   );

   return {
      consignee,
      isLoading,
      error,
      isDeleting,
      handlers,
      colors,
   };
};
