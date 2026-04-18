import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import axiosInstance from "@src/api/client";
import { imagesType } from "@src/api/order";
import AuthInputField from "@src/components/AuthInput/AuthInput";
import Form from "@src/components/Form/Form";
import SubmitBtn from "@src/components/SubmitBtn/SubmitBtn";
import { COLORS } from "@src/constants/Colors";
import { SCREEN_WIDTH } from "@src/constants/Dimensions";
import { Fonts } from "@src/constants/Fonts";
import { RootStackScreenProps } from "@src/navigations/type";
import * as ImagePicker from "expo-image-picker";
import React, { useEffect, useState } from "react";
import {
   Image,
   KeyboardAvoidingView,
   Platform,
   Pressable,
   ScrollView,
   StyleSheet,
   View,
} from "react-native";
import { ActivityIndicator, Avatar, Button, Snackbar, Text } from "react-native-paper";
import * as yup from "yup";
import { DatePickerModal } from "react-native-paper-dates";
import { CustomModal } from "@src/components/Modal/Modal";
import { useShippingMode } from "@src/store/shippingMode";
import AutoCalculateTotal from "../../orders/components/AutoCalculateTotal";
import { SafeAreaView } from "react-native-safe-area-context";
import { sendPushNotification } from "@src/shared/lib/pushNotification";
import { usePlaceOrder, useDeleteImage } from "../hooks/useOrderManagement";
import { useGetCategory } from "../../hooks/useCategory";

const signupSchema = yup.object({
   clientName: yup.string().required("Nom du client est requis"),
   clientPhone: yup.string().required("Numero de telephone est requis"),
   packageWeight: yup.number(),
   priceTotal: yup.number(),
   quantity: yup.number().required("Nombre de colis est requis"),
   packageCBM: yup.string(),
   contenairNumber: yup.string(),
   unitPrice: yup.number(),
});

interface Order {
   clientName: string;
   clientPhone: string;
   packageWeight?: number;
   priceTotal?: number;
   partenaire: string;
   images?: imagesType;
   status?: string;
   quantity?: number;
   shippingMode?: string;
   createdAt?: string;
   typeOfPackage?: string;
   currentPosition?: {
      id: string;
      title: string;
   };
   orderId?: string;
   packageCBM?: string;
   contenairNumber?: string;
   unitPrice: number;
}

const AddOrder = ({ navigation, route }: RootStackScreenProps<"AddOrder">) => {
   const data = Math.random().toString(36).substring(7);
   const shippingWay = useShippingMode((state) => state.type);
   const { mutate: deleteMutation } = useDeleteImage();
   const [shippingMode, setShippingMode] = useState<"air" | "sea">(shippingWay);
   const [visible, setVisible] = useState(false);
   const { mutate, isSuccess, isPending, data: orderData } = usePlaceOrder();
   const [isLoading, setIsLoading] = useState(false);
   const { data: categories } = useGetCategory();
   const id = categories ? categories[0]?._id : "";
   const [category, setCategory] = useState<string>(id);
   const [pickerValue, setPickerValue] = useState<string | null>(id);
   const [selectedImages, setSelectedImages] = useState<
      { url: string; public_id: string }[]
   >([]);

   const [, setUploadProgress] = useState(0);
   const [showModal, setShowModal] = useState(false);

   const [date, setDate] = React.useState<Date | undefined>(undefined);
   const [open, setOpen] = React.useState(false);

   const onDismissSingle = () => {
      setOpen(false);
   };

   const onConfirmSingle = (params: { date: Date }) => {
      setOpen(false);
      setDate(params.date);
   };

   const deleteImage = (id: string) => {
      const img = selectedImages.find((image) => image.public_id === id)?.public_id;
      deleteMutation({ public_id: img! });
      setSelectedImages((prev) => prev.filter((image) => image.public_id !== id));
   };

   const renderAdditionalFields = () => {
      if (shippingMode === "air") {
         return (
            <AuthInputField
               label="Poids du Colis"
               autoCapitalize="none"
               containerStyle={styles.containerStyle}
               name="packageWeight"
            />
         );
      } else if (shippingMode === "sea") {
         return (
            <>
               <AuthInputField
                  label="Numero du conteneur"
                  autoCapitalize="none"
                  containerStyle={styles.containerStyle}
                  name="contenairNumber"
               />
               <AuthInputField
                  label="Volume du Colis (CBM)"
                  autoCapitalize="none"
                  containerStyle={styles.containerStyle}
                  name="packageCBM"
               />
               <AuthInputField
                  label="Prix unitaire"
                  autoCapitalize="none"
                  containerStyle={styles.containerStyle}
                  name="unitPrice"
                  keyboardType="numeric"
               />
               <AuthInputField
                  label="Prix Total"
                  autoCapitalize="none"
                  containerStyle={styles.containerStyle}
                  name="priceTotal"
                  keyboardType="numeric"
               />
            </>
         );
      }
      return null;
   };

   const startDate = new Date(
      date?.getFullYear() ?? 1970,
      date?.getMonth() ?? 0,
      (date?.getDate() ?? 0) + 1
   );
   const process = {
      id: data,
      title: "Le client a pass+¬ une commande",
      time: new Date().toISOString(),
   };

   const handleSubmit = async (values: Order) => {
      try {
         if (!date) return alert("Veuillez choisir une date de depart");
         mutate({
            ...values,
            images: selectedImages,
            currentPosition: shippingMode === "sea" ? process : [],
            partenaire: values.partenaire || "Chez Fode",
            userId: route.params.userId,
            departureDate: startDate as any,
            category: category as any,
            shippingMode: shippingMode,
            packageCBM: values.packageCBM || "0",
            dateOfReceipt: startDate as any,
            contenairNumber: values.contenairNumber || "0",
            priceTotal: values.priceTotal,
         } as any);
      } catch (error) {
         console.log(error);
      }
   };

   const pickImage = async () => {
      setShowModal(false);
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (permissionResult.granted === false) {
         alert("Gallery access is required to select an image");
         return;
      }

      const pickerResult = await ImagePicker.launchImageLibraryAsync({
         allowsMultipleSelection: true,
         base64: true,
         quality: 0.3,
      });

      if (pickerResult.canceled === true) {
         return;
      }

      const images = pickerResult.assets.map((data) => data.base64);
      setIsLoading(true);
      for (const image of images) {
         try {
            const base64Image = `data:image/jpg;base64,${image}`;
            const { data } = await axiosInstance.post(
               "/order/upload",
               { image: base64Image },
               {
                  onUploadProgress(progressEvent) {
                     const uploaded = mapRange({
                        inputMin: 0,
                        inputMax: progressEvent.total || 0,
                        outputMin: 0,
                        outputMax: 100,
                        inputValue: progressEvent.loaded,
                     });
                     if (uploaded >= 100) {
                        setIsLoading(false);
                     }
                     setUploadProgress(Math.floor(uploaded));
                  },
               }
            );
            setSelectedImages((prevImages) => [...prevImages, data]);
         } catch (error) {
            console.log("Upload error:", error);
         }
      }
      setIsLoading(false);
   };

   const takePhoto = async () => {
      setShowModal(false);
      const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

      if (permissionResult.granted === false) {
         alert("Camera access is required to take a photo");
         return;
      }

      const pickerResult = await ImagePicker.launchCameraAsync({
         allowsEditing: false,
         quality: 0.3,
         base64: true,
      });

      if (pickerResult.canceled === true) {
         return;
      }

      const images = pickerResult.assets.map((data) => data.base64);
      setIsLoading(true);
      for (const image of images) {
         try {
            const base64Image = `data:image/jpg;base64,${image}`;
            const { data } = await axiosInstance.post(
               "/order/upload",
               { image: base64Image },
               {
                  onUploadProgress(progressEvent) {
                     const uploaded = mapRange({
                        inputMin: 0,
                        inputMax: progressEvent.total || 0,
                        outputMin: 0,
                        outputMax: 100,
                        inputValue: progressEvent.loaded,
                     });
                     if (uploaded >= 100) {
                        setIsLoading(false);
                     }
                     setUploadProgress(Math.floor(uploaded));
                  },
               }
            );
            setSelectedImages((prevImages) => [...prevImages, data]);
         } catch (error) {
            console.log("Upload error:", error);
         }
      }
      setIsLoading(false);
   };

   useEffect(() => {
      if (isSuccess) {
         sendPushNotification(
            route.params.pushTokens,
            "Nouvelle Commande Ajout+¬e",
            "Votre commande a +¬t+¬ ajout+¬e avec succ+¿s !",
            orderData?.data._id || ""
         );
         setVisible(true);
         setTimeout(() => {
            navigation.navigate("HomeTab", { screen: "Home" });
         }, 900);
      }
   }, [isSuccess]);

   const onDismissSnackBar = () => setVisible(false);

   const initialValues = {
      clientName: route.params.clientName,
      clientPhone: route.params.phoneNumber,
      packageWeight: "0",
      partenaire: "",
      quantity: "1",
      priceTotal: "0",
      unitPrice: "0",
      shippingMode: shippingWay,
      typeOfPackage: category,
      category,
      currentPosition: {
         id: "",
         title: "",
         time: "",
      },
   };

   const handleShippingModeChange = (mode: "air" | "sea") => {
      setShippingMode(mode);
   };

   return (
      <Form initialValues={initialValues} onSubmit={handleSubmit} validationSchema={signupSchema}>
         <SafeAreaView>
            <AutoCalculateTotal shippingMode="sea" />
            <ScrollView
               contentContainerStyle={styles.container}
               keyboardShouldPersistTaps="always"
               showsVerticalScrollIndicator={false}
            >
               <KeyboardAvoidingView
                  style={{
                     flex: 1,
                     justifyContent: "center",
                     width: "100%",
                     alignItems: "center",
                  }}
                  behavior={Platform.OS === "ios" ? "padding" : "height"}
               >
                  <Snackbar
                     visible={visible}
                     onDismiss={onDismissSnackBar}
                     style={{
                        backgroundColor: COLORS.white,
                        top: -50,
                     }}
                     duration={3000}
                  >
                     <View
                        style={{
                           flexDirection: "row",
                           alignItems: "center",
                           justifyContent: "center",
                           alignContent: "center",
                        }}
                     >
                        <Text style={{ fontFamily: Fonts.black, marginRight: 10 }}>
                           Woah Product is Added !
                        </Text>
                        <AntDesign name="check" size={24} color="green" />
                     </View>
                  </Snackbar>
                  <View style={styles.imageContainer}>
                     <Image
                        style={styles.image}
                        source={{
                           uri:
                              selectedImages.length > 0
                                 ? selectedImages[0].url
                                 : "https://res.cloudinary.com/piincher/image/upload/v1676795950/s6mxvpjvd3ytguh7se8p.jpg",
                        }}
                     />
                  </View>
                  <View
                     style={{
                        flexDirection: "row",
                        justifyContent: "space-evenly",
                        marginTop: 10,
                        width: "100%",
                     }}
                  >
                     <Pressable onPress={() => takePhoto()} style={styles.imagePicker}>
                        <AntDesign name="camera" size={24} color="black" />
                     </Pressable>
                     <Pressable onPress={() => pickImage()} style={styles.imagePicker}>
                        <MaterialIcons name="perm-media" size={24} color="black" />
                     </Pressable>
                  </View>
                  <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                     {isLoading ? (
                        <ActivityIndicator size="large" color={COLORS.blue} />
                     ) : (
                        selectedImages?.map((image) => (
                           <Pressable
                              style={{
                                 alignContent: "center",
                                 marginHorizontal: SCREEN_WIDTH * 0.02,
                              }}
                              key={image.public_id}
                              onPress={() => deleteImage(image.public_id)}
                           >
                              <Avatar.Image
                                 size={SCREEN_WIDTH * 0.13}
                                 source={{
                                    uri: image.url
                                       ? image.url
                                       : "https://res.cloudinary.com/piincher/image/upload/v1676795950/s6mxvpjvd3ytguh7se8p.jpg",
                                 }}
                              />
                           </Pressable>
                        ))
                     )}
                  </ScrollView>
                  {/* Shipping Mode Selection */}
                  <View style={styles.shippingModeContainer}>
                     <Text>Mode d'exp+¬dition:</Text>
                     <Picker selectedValue={shippingMode} onValueChange={handleShippingModeChange}>
                        <Picker.Item label="Air" value="air" />
                        <Picker.Item label="Sea" value="sea" />
                     </Picker>
                  </View>

                  {/* Render additional fields based on the shipping mode */}
                  <View style={styles.formContainer}>
                     {renderAdditionalFields()}
                     <AuthInputField
                        label="Nom du Client"
                        containerStyle={styles.containerStyle}
                        name="clientName"
                     />
                     <AuthInputField
                        label="Numero de Telephone du Client"
                        containerStyle={styles.containerStyle}
                        name="clientPhone"
                        keyboardType="numeric"
                        maxLength={8}
                        phone={true}
                     />
                     <AuthInputField
                        label="nombre de colis"
                        autoCapitalize="none"
                        keyboardType="numeric"
                        containerStyle={styles.containerStyle}
                        name="quantity"
                     />

                     <View style={{ borderColor: COLORS.grey, borderWidth: 1 }}>
                        <Picker
                           mode="dropdown"
                           placeholder="Choisir Categorie"
                           style={styles.pickerStyle}
                           selectedValue={pickerValue}
                           onValueChange={(e) => [setPickerValue(e), setCategory(e!)]}
                        >
                           {categories?.map((c) => (
                              <Picker.Item key={c._id} label={c.name} value={c._id} />
                           ))}
                        </Picker>
                     </View>

                     <Button
                        style={{ marginVertical: 50 }}
                        onPress={() => setOpen(true)}
                        uppercase={false}
                        mode="outlined"
                     >
                        Choisir la date de departure
                     </Button>
                     <DatePickerModal
                        locale="en"
                        mode="single"
                        visible={open}
                        onDismiss={onDismissSingle}
                        date={date}
                        onConfirm={onConfirmSingle as any}
                        saveLabel="Save"
                        label="Select Date"
                        animationType="slide"
                        presentationStyle="overFullScreen"
                     />

                     <Text style={{ marginBottom: 50 }}>
                        {date
                           ? `Date de depart : ${date.toLocaleDateString()}`
                           : "Pas de date de depart selectionn+¬"}
                     </Text>

                     <SubmitBtn title="Add" busy={isPending} />
                  </View>
               </KeyboardAvoidingView>
            </ScrollView>
         </SafeAreaView>
      </Form>
   );
};

export interface MapRangeOptions {
   inputValue: number;
   outputMin: number;
   outputMax: number;
   inputMax: number;
   inputMin: number;
}

export function mapRange(options: MapRangeOptions) {
   const { inputValue, outputMax, outputMin, inputMax, inputMin } = options;
   const result =
      ((inputValue - inputMin) / (inputMax - inputMin)) * (outputMax - outputMin) + outputMin;
   if (result === Infinity) return 0;
   return result;
}

const styles = StyleSheet.create({
   formContainer: { width: "100%" },
   containerStyle: {
      marginBottom: 20,
   },
   container: {
      alignItems: "center",
      paddingHorizontal: 15,
      backgroundColor: COLORS.white,
   },
   imageContainer: {
      width: 200,
      height: 200,
      borderStyle: "solid",
      borderWidth: 8,
      padding: 0,
      justifyContent: "center",
      borderRadius: 100,
      borderColor: "#E0E0E0",
      elevation: 10,
   },
   image: {
      width: "100%",
      height: "100%",
      borderRadius: 100,
   },
   imagePicker: {
      backgroundColor: "grey",
      padding: 8,
      borderRadius: 100,
      elevation: 20,
   },
   pickerStyle: { width: "100%", height: 50 },
   shippingModeContainer: {
      width: "100%",
      marginVertical: 20,
      borderColor: COLORS.grey,
      borderWidth: 1,
   },
});

export default AddOrder;
