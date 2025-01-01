import { MaterialCommunityIcons } from "@expo/vector-icons";
import AuthInputField from "@src/components/AuthInput/AuthInput";
import Form from "@src/components/Form/Form";
import { Notification } from "@src/components/Notification/Notification";
import SocialMedia from "@src/components/SocialMedia/SocialMedia";
import SubmitBtn from "@src/components/SubmitBtn/SubmitBtn";
import { initMixpanel } from "@src/config/Analytic";
import { COLORS } from "@src/constants/Colors";
import { Fonts } from "@src/constants/Fonts";
import { RootStackScreenProps } from "@src/navigations/type";
import React, { useEffect, useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import * as yup from "yup";
import Banner from "./components/Banner";
import { useLogin, useLoginApple } from "./hook/useLogin";
import { useSignupStore } from "./hook/useSignInData";
interface newUser {
   phone: string;
}

const signupSchema = yup.object({
   // phone number should require and should not exceed 8 digit
   phone: yup
      .string()
      .required("Numero de telephone est requis")
      .max(8, "Numero de telephone doit etre de 8 chiffres"),
});
const initialValues = {
   phone: "",
};

//Todo: properly type the navigation prop
const Login = ({ navigation }: RootStackScreenProps<"Login">) => {
   const [visible, setVisible] = React.useState(false);
   const [selectedCode, setSelectedCode] = useState<string>("ML  +223");
   const [phone, setPhone] = React.useState("");
   const { mutate, isSuccess, isPending } = useLogin();
   const { mutate: appleLogin, isPending: ApplePending, error } = useLoginApple();

   const mixpanel = initMixpanel();
   const SignUpData = useSignupStore((state) => state.updateCode);

   useEffect(() => {
      SignUpData(selectedCode.split("+")[1]);
   }, [selectedCode, setSelectedCode]);
   const handleSubmit = async (values: newUser) => {
      mixpanel.track("Login", { phone: values.phone });
      const phone = selectedCode.split("+")[1] + values.phone;

      if (phone === "22376696177") {
         console.log("apple login");
         appleLogin({
            phone: phone,
         });
         return;
      } else if (phone === "22317865673") {
         appleLogin({
            phone: phone,
         });
         return;
      } else {
         setPhone(phone);
         mutate(phone);
      }
      // setEmail(values.email);
   };

   useEffect(() => {
      if (isSuccess) {
         setVisible(true);
         setTimeout(() => {
            setVisible(false);
            navigation.navigate("Verification", { phoneNumber: phone });
         }, 1000);
      }
   }, [isSuccess]);
   const onDismissSnackBar = () => setVisible(false);

   return (
      <Form initialValues={initialValues} onSubmit={handleSubmit} validationSchema={signupSchema}>
         <SafeAreaView style={styles.formContainer}>
            <ScrollView keyboardShouldPersistTaps="always">
               <KeyboardAvoidingView
                  style={{
                     flex: 1,
                     justifyContent: "center",
                  }}
                  behavior={Platform.OS === "ios" ? "height" : undefined}
               >
                  <Notification
                     message="Un code de vérification a été envoyé à votre numéro de téléphone"
                     type="success"
                     visible={visible}
                     onDismissSnackBar={onDismissSnackBar}
                     Icon={MaterialCommunityIcons}
                  />
                  <Banner />
                  <View style={{ padding: 20 }}>
                     <AuthInputField
                        label="Numero de téléphone"
                        placeholder="Entrez votre numéro de téléphone"
                        autoCapitalize="none"
                        containerStyle={styles.containerStyle}
                        name="phone"
                        selectedCode={selectedCode}
                        setSelectedCode={setSelectedCode}
                        code={SignUpData.code}
                        maxLength={8}
                        keyboardType="number-pad"
                        phone={true}
                        descriptionDown="Entrez le numéro sur l'étiquette d'expédition"
                     />
                     <View style={styles.ButtonContainer}>
                        <SubmitBtn title="Continue" busy={isPending || ApplePending} />
                     </View>
                  </View>
                  <View style={styles.socialMedia}>
                     <SocialMedia color={COLORS.grey} _handlePressButtonAsync={() => {}} />
                  </View>
                  <Text style={styles.chinalinkExpressTextStyle}>CHINALINK EXPRESS</Text>
               </KeyboardAvoidingView>
            </ScrollView>
         </SafeAreaView>
      </Form>
   );
};
const styles = StyleSheet.create({
   formContainer: {
      flex: 1,
      backgroundColor: COLORS.white,
   },

   containerStyle: {
      width: "100%",
   },
   link: {
      marginTop: 20,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
   },
   socialMedia: {
      padding: 40,
   },
   ButtonContainer: {
      marginTop: 50,
   },
   chinalinkExpressTextStyle: {
      textAlign: "center",
      color: COLORS.blue,
      fontFamily: Fonts.bold,
      fontSize: 20,
   },
});

export default Login;
