import React, { useEffect, useState, useMemo } from "react";
import { Alert, Image, StyleSheet, Text, View } from "react-native";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { RadioButton } from "react-native-paper";
import { LoadingSpinner } from "@src/components/LoadingSpinner";

import { IMAGES } from "@src/constants/Images";
import type { RootStackScreenProps } from "@src/navigations/type";
import AuthFormContainer from "@src/components/AuthFormContainer/AuthFormContainer";
import AppInput from "@src/components/AppInput/AppInput";
import { Fonts } from "@src/constants/Fonts";
import AuthInputField from "@src/components/AuthInput/AuthInput";
import Form from "@src/components/Form/Form";
import * as yup from "yup";
import { SafeAreaView } from "react-native-safe-area-context";
import { Picker } from "@react-native-picker/picker";
import { useUpdateOrderStatus } from "../hooks/useOrderManagement";
import AppButton from "@src/components/AppButton/AppButton";
import SubmitBtn from "@src/components/SubmitBtn/SubmitBtn";
import { useGetSeaRoutes } from '@src/shared/hooks/useRoutes';

const batchUpdateSchema = yup.object({
   contenairNumber: yup.string(),
});

const steps = [
   {
      id: "0",
      title: "le client a passé une commande",
   },
   {
      id: "1",
      title: "les colis sont emballées",
   },
   {
      id: "2",
      title: "le conteneur est en route pour le Cameroun",
   },
   {
      id: "3",
      title: "Les marchandises sont arrivées et ont été stockées.(Kalaban-Coura pres de FEBAK +2237XXXXX/+223XXXXXXX)",
   },
];

const BatchUpdateDetail = ({ navigation, route }: RootStackScreenProps<"BatchUpdateDetail">) => {
   const { colors } = useAppTheme();
   const styles = useMemo(() => StyleSheet.create({
      containerStyle: {
         marginBottom: 20,
      },
      pickerStyle: { width: "100%", height: 50 },
   }), [colors]);
   const [pickerValue, setPickerValue] = useState<string | null>(null);
   const [category, setCategory] = useState<string | null>(steps[0].title);

   const { data: ids } = route.params;
   const { data } = useGetSeaRoutes();
   const { mutate, isPending } = useUpdateOrderStatus();

   const onSubmit = (data: { contenairNumber: string }) => {
      Alert.alert(
         'Confirmer la mise à jour',
         `Modifier le statut de ${ids.length} commande(s) vers "${pickerValue}" ?`,
         [
            { text: 'Annuler', style: 'cancel' },
            { text: 'Confirmer', onPress: () => mutate({ orders: ids, title: pickerValue! }) },
         ]
      );
   };

   const initialValues = {
      contenairNumber: "",
   };

   return (
      <Form initialValues={initialValues} validationSchema={batchUpdateSchema} onSubmit={onSubmit}>
         <SafeAreaView style={{ flex: 1, marginHorizontal: 20, justifyContent: "center" }}>
            <Image
               source={IMAGES.logo}
               style={{ height: 150, width: 200, alignSelf: "center", marginBottom: 20 }}
            />
            <Text style={{ textAlign: "center", fontFamily: Fonts.bold, fontSize: 18 }}>
               Quelle action souhaitez-vous faire ?
            </Text>

            <View style={{ borderColor: colors.border, borderWidth: 1 }}>
               <Picker
                  mode="dialog"
                  placeholder="Choisir Categorie"
                  style={styles.pickerStyle}
                  selectedValue={pickerValue}
                  onValueChange={(e) => [setPickerValue(e), setCategory(e!)]}
               >
                  {data?.map((c) => {
                     return <Picker.Item key={c.id} label={c.title} value={c.title} />;
                  })}
               </Picker>
            </View>
            <View style={{ marginTop: 18 }}>
               <SubmitBtn title="Continue" busy={isPending} />
            </View>
         </SafeAreaView>
      </Form>
   );
};

export default BatchUpdateDetail;

const styles = StyleSheet.create({
   containerStyle: {
      marginBottom: 20,
   },
   pickerStyle: { width: "100%", height: 50 },
});
