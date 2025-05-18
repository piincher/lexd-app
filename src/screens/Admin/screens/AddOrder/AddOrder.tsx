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
import React, { useEffect, useId, useState } from "react";
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
import { useDeleteImage, usePlaceOrder } from "../../hooks/useOrder";
import { DatePickerModal } from "react-native-paper-dates";
import { useGetCategories } from "../../hooks/useCategory";
import { CustomModal } from "@src/components/Modal/Modal";
import { useShippingMode } from "@src/store/shippingMode";

const signupSchema = yup.object({
   clientName: yup.string().required("Nom du client est requis"),
   clientPhone: yup.string().required("Numero de telephone est requis"),
   packageWeight: yup.number(),
   priceTotal: yup.number(),
   quantity: yup.number().required("Nombre de colis est requis"),
   packageCBM: yup.string(),
   contenairNumber: yup.string(),
});

interface order {
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
}

// 'le client a passé une commande',
// 'les colis sont emballées',
// 'les Colis sont expédiées et transférées vers le port',
// "Colis transféré à l'entrepôt de Hong Kong",
// "Le colis a décollé pour L'Éthiopie",
// "Colis transféré vers l'aéroport d'Ethiopie",
// "Colis arrivé à l'aéroport du Mali et prêt pour dédouanement",
// 'marchandises sont arrivées au port et ont été stockées.(Kalaban-Coura pres de FEBAK +22376696177/+22350005142',

const AddOrder = ({ navigation, route }: RootStackScreenProps<"AddOrder">) => {
   const data = Math.random().toString(36).substring(7);
   const shippingWay = useShippingMode((state) => state.type);
   const { mutate: deleteMutation, data: deleteData } = useDeleteImage();
   const [shippingMode, setShippingMode] = useState<"air" | "sea">(shippingWay);
   const [visible, setVisible] = useState(false);
   const [pickerValue, setPickerValue] = useState<string | null>(null);
   const { mutate, isSuccess, isPending } = usePlaceOrder();
   const [isLoading, setIsLoading] = useState(false);
   const { data: categories } = useGetCategories();
   const id = categories ? categories[0]._id : "";
   const [category, setCategory] = useState<string>(id);
   const [selectedImages, setSelectedImages] = useState<
      {
         url: string;
         public_id: string;
      }[]
   >([]);
   const [uploadProgresus, setUploadProgress] = useState(0);
   const [showModal, setShowModal] = useState(false);

   const [date, setDate] = React.useState(undefined);
   const [open, setOpen] = React.useState(false);

   const onDismissSingle = React.useCallback(() => {
      setOpen(false);
   }, [setOpen]);

   const onConfirmSingle = React.useCallback(
      (params) => {
         setOpen(false);
         setDate(params.date);
      },
      [setOpen, setDate]
   );
   const deleteImage = (id: string) => {
      console.log("id", id);
      const img = selectedImages.find((image) => image.public_id === id)?.public_id;
      deleteMutation({
         public_id: img!,
      });
      setSelectedImages((prev) => prev.filter((image) => image.public_id !== id));
   };
   const renderAdditionalFields = () => {
      if (shippingMode === "air") {
         return (
            <>
               <AuthInputField
                  label="Poids du Colis"
                  autoCapitalize="none"
                  containerStyle={styles.containerStyle}
                  name="packageWeight"
               />
               {/* Additional fields for air shipping can be added here */}
            </>
         );
      } else if (shippingMode === "sea") {
         return (
            <>
               <AuthInputField
                  label="Volume du Colis (CBM)"
                  autoCapitalize="none"
                  containerStyle={styles.containerStyle}
                  name="packageCBM"
               />
               <AuthInputField
                  label="Numero du conteneur"
                  autoCapitalize="none"
                  containerStyle={styles.containerStyle}
                  name="contenairNumber"
               />
               <AuthInputField
                  label="Prix Total"
                  autoCapitalize="none"
                  containerStyle={styles.containerStyle}
                  name="priceTotal"
                  keyboardType="numeric"
               />
               {/* Additional fields for sea shipping can be added here */}
            </>
         );
      }
      return null;
   };

   const startDate = new Date(
      date?.getFullYear() ?? 1970,
      date?.getMonth() ?? 0,
      date?.getDate() + 1 ?? 1
   );
   const process = {
      id: data,
      title: "Le client a passé une commande",
      time: new Date().toISOString(),
   };
   const handleSubmit = async (values: order) => {
      try {
         if (!date) return alert("Veuillez choisir une date de depart");
         mutate({
            ...values,

            images: selectedImages,
            currentPosition: shippingMode === "sea" ? process : [],
            partenaire: values.partenaire || "Chez Fode",
            userId: route.params.userId,
            departureDate: startDate,
            category,
            shippingMode: shippingMode,
            packageCBM: values.packageCBM || "0",
            dateOfReceipt: startDate,
            contenairNumber: values.contenairNumber || "0",
            priceTotal: values.priceTotal,
         });
      } catch (error) {
         console.log(error);
      }
   };

   const pickImage = async () => {
      setShowModal(false);
      let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (permissionResult.granted === false) {
         alert("Gallery access is required to select an image");
         return;
      }

      let pickerResult = await ImagePicker.launchImageLibraryAsync({
         allowsMultipleSelection: true,
         // selectionLimit: 4 - selectedImages.length, // Limit based on already selected images
         base64: true,
         quality: 0.3,
      });

      if (pickerResult.canceled === true) {
         return;
      }

      const images = pickerResult.assets.map((data) => data.base64);
      setIsLoading(true);
      for (let image of images) {
         try {
            let base64Image = `data:image/jpg;base64,${image}`;

            // Perform your upload logic here
            // Replace the axiosInstance.post with your actual upload logic
            const { data } = await axiosInstance.post(
               "/order/upload",
               {
                  image: base64Image,
               },
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
      let permissionResult = await ImagePicker.requestCameraPermissionsAsync();

      if (permissionResult.granted === false) {
         alert("Camera access is required to take a photo");
         return;
      }

      let pickerResult = await ImagePicker.launchCameraAsync({
         allowsEditing: true,
         quality: 0.3,
         base64: true,
      });
      console.log("pickerResult", pickerResult);

      if (pickerResult.canceled === true) {
         return;
      }

      const images = pickerResult.assets.map((data) => data.base64);
      setIsLoading(true);
      for (let image of images) {
         try {
            let base64Image = `data:image/jpg;base64,${image}`;

            // Perform your upload logic here
            // Replace the axiosInstance.post with your actual upload logic
            const { data } = await axiosInstance.post(
               "/order/upload",
               {
                  image: base64Image,
               },
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
      priceTotal: 0,
      partenaire: "",
      quantity: "1",
      shippingMode: shippingWay,
      typeOfPackage: category,
      category: category,
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
         <>
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
                  behavior={Platform.OS === "ios" ? "height" : undefined}
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
                        <AntDesign name="checkcircle" size={24} color="green" />
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
                     <Text>Mode d'expédition:</Text>
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
                     {/* <AuthInputField label='Country' placeholder='Name' containerStyle={styles.containerStyle} name='country' /> */}

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
                           {categories?.map((c) => {
                              return <Picker.Item key={c._id} label={c.name} value={c._id} />;
                           })}
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
                        onConfirm={onConfirmSingle}
                        saveLabel="Save"
                        label="Select Date"
                        animationType="slide"
                        presentationStyle="overFullScreen"
                     />

                     <Text style={{ marginBottom: 50 }}>
                        {date
                           ? `Date de depart : ${date.toLocaleDateString()}`
                           : "Pas de date de depart selectionné"}
                     </Text>

                     <SubmitBtn title="Add" busy={isPending} />
                  </View>
               </KeyboardAvoidingView>
            </ScrollView>
         </>
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
   link: {
      marginTop: 20,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
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
   optionContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginVertical: 10,
   },
   optionLabel: {
      fontFamily: Fonts.regular,
      fontSize: 16,
      marginLeft: 10,
   },

   shippingModeContainer: {
      width: "100%",
      marginVertical: 20,
      borderColor: COLORS.grey,
      borderWidth: 1,
   },
});

export default AddOrder;
