import { LinearGradient } from "expo-linear-gradient";
import { MotiView, MotiText } from "moti";
import React, { useEffect, useState } from "react";
import {
   StyleSheet,
   View,
   Text,
   TextInput,
   TouchableOpacity,
   Image,
   ScrollView,
   KeyboardAvoidingView,
   Platform,
   Alert,
   ActivityIndicator,
} from "react-native";
import { BlurView } from "expo-blur";
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import Animated, {
   FadeIn,
   FadeOut,
   SlideInDown,
   SlideOutDown,
   useAnimatedStyle,
   withSpring,
   withTiming,
} from "react-native-reanimated";
import { useHeaderHeight } from "@react-navigation/elements";
import { COLORS } from "@src/constants/Colors";
import { Fonts } from "@src/constants/Fonts";
import axiosInstance from "@src/api/client";
import { useInitiateTopUp } from "../hooks/useProfile";
import { RootStackScreenProps } from "@src/navigations/type";
const PRESET_AMOUNTS = [5000, 10000, 20000, 50000];
const MIN_AMOUNT = 5000;
const MAX_AMOUNT = 500000;

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

const TopUpScreen = ({ navigation }: RootStackScreenProps<"TopUp">) => {
   const { mutate, isSuccess } = useInitiateTopUp();
   const headerHeight = useHeaderHeight();
   const [amount, setAmount] = useState("");
   const [selectedImage, setSelectedImage] = useState<string | null>(null);
   const [isSubmitting, setIsSubmitting] = useState(false);
   const [uploadProgress, setUploadProgress] = useState(0);
   const [isImageLoading, setIsImageLoading] = useState(false);

   const pickImage = async () => {
      let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (!permissionResult.granted) {
         Alert.alert("Permission required", "Gallery access is required to select an image");
         return;
      }

      let pickerResult = await ImagePicker.launchImageLibraryAsync({
         allowsEditing: true,
         quality: 0.5,
         allowsMultipleSelection: false,
         base64: true,
      });

      if (pickerResult.canceled || !pickerResult.assets[0]) return;

      const image = pickerResult.assets[0];
      setSelectedImage(image.uri);
      setIsImageLoading(true);

      try {
         const base64Image = `data:image/jpg;base64,${image.base64}`;
         const { data } = await axiosInstance.post<{ url: string }>(
            "/order/upload",
            { image: base64Image },
            {
               onUploadProgress: (progressEvent) => {
                  const progress = Math.round(
                     (progressEvent.loaded / (progressEvent.total || 1)) * 100
                  );
                  setUploadProgress(progress);
               },
            }
         );
         console.log("Upload response:", data);
         setSelectedImage(data.url);
      } catch (error) {
         Alert.alert("Upload Failed", "Couldn't upload image. Please try again.");
         setSelectedImage(null);
      } finally {
         setIsImageLoading(false);
         setUploadProgress(0);
      }
   };

   const handlePresetSelect = (preset: number) => {
      setAmount(preset.toString());
   };

   console.log("Selected Image:", selectedImage);
   const validateAmount = () => {
      const numericAmount = Number(amount.replace(/[^0-9]/g, ""));
      if (numericAmount < MIN_AMOUNT) {
         Alert.alert(
            "Minimum Amount",
            `Top up amount must be at least ${MIN_AMOUNT.toLocaleString()} FCFA`
         );
         return false;
      }
      if (numericAmount > MAX_AMOUNT) {
         Alert.alert(
            "Maximum Amount",
            `Top up amount cannot exceed ${MAX_AMOUNT.toLocaleString()} FCFA`
         );
         return false;
      }
      return true;
   };

   useEffect(() => {
      if (isSuccess) {
         Alert.alert("Success", "Votre demande de recharge a été envoyée avec succès");
         setAmount("");
         navigation.goBack();
      }
   }, [isSuccess]);

   const handleSubmit = async () => {
      if (!validateAmount()) return;
      if (!selectedImage) {
         Alert.alert("Proof Required", "Please upload your payment proof");
         return;
      }

      try {
         setIsSubmitting(true);
         mutate({
            amount: Number(amount.replace(/[^0-9]/g, "")),
            proofImage: selectedImage,
         });
      } catch (error) {
         Alert.alert("Error", "Failed to submit request. Please try again.");
      } finally {
         setIsSubmitting(false);
      }
   };

   const amountInputAnimation = useAnimatedStyle(() => ({
      transform: [
         {
            scale: withSpring(amount ? 1 : 0.95, { damping: 10 }),
         },
      ],
      opacity: withTiming(amount ? 1 : 0.8),
   }));

   return (
      <LinearGradient colors={["#1a237e", "#4a148c"]} style={styles.container}>
         <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
            keyboardVerticalOffset={headerHeight}
         >
            <ScrollView contentContainerStyle={styles.content}>
               <MotiView
                  from={{ opacity: 0, translateY: -20 }}
                  animate={{ opacity: 1, translateY: 0 }}
                  transition={{ type: "timing", duration: 500 }}
                  style={styles.header}
               >
                  <Text style={styles.title}>Recharger le portefeuille</Text>
                  <Text style={styles.subtitle}>Alimentez votre compte en toute sécurité</Text>
                  <View style={{ marginTop: 18, alignItems: "flex-start", width: "100%" }}>
                     <Text style={[styles.subtitle, { marginBottom: 6 }]}>
                        Étapes pour recharger :
                     </Text>
                     <Text style={styles.subtitle}>
                        1. Sélectionnez ou saisissez le montant à recharger.
                     </Text>
                     <Text style={styles.subtitle}>
                        2. Déposez le montant via Orange Money :{" "}
                        <Text style={{ fontWeight: "bold" }}>76696177</Text>
                     </Text>
                     <Text style={styles.subtitle}>
                        3. Téléchargez la preuve de paiement en photo ci dessous.
                     </Text>
                     <Text style={styles.subtitle}>
                        4. L’administrateur vérifiera et approuvera votre recharge.
                     </Text>
                  </View>
               </MotiView>

               <Animated.View
                  entering={FadeIn.delay(200)}
                  style={[styles.card, amountInputAnimation]}
               >
                  <Text style={styles.cardTitle}>Enter Amount (FCFA)</Text>

                  <View style={styles.presetContainer}>
                     {PRESET_AMOUNTS.map((preset, index) => (
                        <AnimatedTouchable
                           key={preset}
                           entering={FadeIn.delay(300 + index * 100)}
                           onPress={() => handlePresetSelect(preset)}
                           style={[
                              styles.presetButton,
                              amount === preset.toString() && styles.selectedPreset,
                           ]}
                        >
                           <Text style={styles.presetText}>{preset.toLocaleString()}</Text>
                        </AnimatedTouchable>
                     ))}
                  </View>

                  <View style={styles.inputContainer}>
                     <Text style={styles.currency}>FCFA</Text>
                     <TextInput
                        style={styles.input}
                        keyboardType="numeric"
                        value={amount}
                        onChangeText={setAmount}
                        placeholder="0"
                        placeholderTextColor={COLORS.white}
                        selectionColor={COLORS.white}
                     />
                  </View>

                  <MotiView
                     animate={{
                        opacity: amount ? 1 : 0.5,
                        translateY: amount ? 0 : 4,
                     }}
                     transition={{ type: "timing" }}
                     style={styles.amountHint}
                  >
                     <Text style={styles.hintText}>
                        {amount
                           ? `${Number(amount).toLocaleString()} FCFA`
                           : "Entrez un montant entre 5 000 et 500 000 FCFA"}
                     </Text>
                  </MotiView>
               </Animated.View>

               <Animated.View entering={SlideInDown.delay(400)} style={styles.uploadSection}>
                  <Text style={styles.uploadTitle}>Preuve de paiement</Text>
                  <Text style={styles.uploadSubtitle}>
                     Téléchargez la capture d’écran de votre transaction Orange Money
                  </Text>

                  <TouchableOpacity
                     style={styles.uploadButton}
                     onPress={pickImage}
                     disabled={isImageLoading}
                  >
                     {selectedImage ? (
                        <>
                           <Image source={{ uri: selectedImage }} style={styles.uploadPreview} />
                           {isImageLoading && (
                              <View style={styles.uploadOverlay}>
                                 <ActivityIndicator size="large" color="#FFF" />
                                 <Text style={styles.progressText}>{uploadProgress}%</Text>
                              </View>
                           )}
                        </>
                     ) : (
                        <View style={styles.uploadPlaceholder}>
                           <FontAwesome
                              name="cloud-upload"
                              size={40}
                              color="rgba(255,255,255,0.5)"
                           />
                           <Text style={styles.uploadText}>
                              {isImageLoading
                                 ? "Téléchargement..."
                                 : "Appuyez pour télécharger la preuve"}
                           </Text>
                        </View>
                     )}
                  </TouchableOpacity>
               </Animated.View>
            </ScrollView>

            <Animated.View
               entering={SlideInDown.delay(600)}
               exiting={SlideOutDown}
               style={styles.footer}
            >
               <BlurView intensity={30} style={styles.blurContainer}>
                  <TouchableOpacity
                     style={[
                        styles.submitButton,
                        (!amount || !selectedImage || isSubmitting) && styles.disabledButton,
                     ]}
                     onPress={handleSubmit}
                     disabled={!amount || !selectedImage || isSubmitting}
                  >
                     <MotiText
                        animate={{ opacity: isSubmitting ? 0.7 : 1 }}
                        style={styles.buttonText}
                     >
                        {isSubmitting ? "Traitement..." : "Envoyer la demande"}
                     </MotiText>
                     <MaterialIcons
                        name="arrow-forward"
                        size={24}
                        color={COLORS.white}
                        style={styles.arrowIcon}
                     />
                  </TouchableOpacity>
               </BlurView>
            </Animated.View>
         </KeyboardAvoidingView>
      </LinearGradient>
   );
};

const styles = StyleSheet.create({
   container: {
      flex: 1,
   },
   content: {
      padding: 20,
      paddingBottom: 100,
   },
   header: {
      alignItems: "center",
      marginBottom: 30,
   },
   title: {
      fontSize: 28,
      fontFamily: Fonts.bold,
      color: COLORS.white,
      marginBottom: 8,
   },
   subtitle: {
      fontSize: 16,
      fontFamily: Fonts.meduim,
      color: "rgba(255,255,255,0.8)",
   },
   card: {
      backgroundColor: "rgba(255,255,255,0.1)",
      borderRadius: 20,
      padding: 24,
      marginBottom: 30,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 10 },
      shadowOpacity: 0.1,
      shadowRadius: 20,
      elevation: 5,
   },
   cardTitle: {
      fontSize: 18,
      fontFamily: Fonts.bold,
      color: COLORS.white,
      marginBottom: 20,
   },
   presetContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 12,
      marginBottom: 20,
   },
   presetButton: {
      backgroundColor: "rgba(255,255,255,0.15)",
      borderRadius: 12,
      paddingVertical: 12,
      paddingHorizontal: 20,
      minWidth: 80,
   },
   selectedPreset: {
      backgroundColor: COLORS.Crimson,
   },
   presetText: {
      color: COLORS.white,
      fontFamily: Fonts.bold,
      textAlign: "center",
   },
   inputContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 15,
   },
   currency: {
      fontSize: 24,
      fontFamily: Fonts.bold,
      color: COLORS.white,
      marginRight: 10,
   },
   input: {
      flex: 1,
      fontSize: 40,
      fontFamily: Fonts.bold,
      color: COLORS.white,
      paddingVertical: 10,
   },
   amountHint: {
      borderLeftWidth: 2,
      borderLeftColor: COLORS.orange,
      paddingLeft: 12,
   },
   hintText: {
      color: "rgba(255,255,255,0.7)",
      fontFamily: Fonts.meduim,
      fontSize: 14,
   },
   uploadSection: {
      backgroundColor: "rgba(255,255,255,0.1)",
      borderRadius: 20,
      padding: 20,
   },
   uploadTitle: {
      fontSize: 18,
      fontFamily: Fonts.bold,
      color: COLORS.white,
      marginBottom: 8,
   },
   uploadSubtitle: {
      color: "rgba(255,255,255,0.7)",
      fontFamily: Fonts.meduim,
      fontSize: 14,
      marginBottom: 20,
   },
   uploadButton: {
      aspectRatio: 16 / 9,
      borderRadius: 15,
      overflow: "hidden",
      backgroundColor: "rgba(216, 191, 191, 0.05)",
      borderWidth: 2,
      borderColor: "rgba(255,255,255,0.1)",
   },
   uploadPreview: {
      width: "100%",
      height: "100%",
   },
   uploadOverlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: "rgba(0,0,0,0.5)",
      justifyContent: "center",
      alignItems: "center",
   },
   progressText: {
      color: COLORS.white,
      fontFamily: Fonts.boldItalic,
      marginTop: 8,
   },
   uploadPlaceholder: {
      ...StyleSheet.absoluteFillObject,
      alignItems: "center",
      justifyContent: "center",
   },
   uploadText: {
      color: "rgba(255,255,255,0.7)",
      fontFamily: Fonts.meduim,
      marginTop: 10,
   },
   footer: {
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      padding: 20,
   },
   blurContainer: {
      borderRadius: 15,
      overflow: "hidden",
   },
   submitButton: {
      backgroundColor: COLORS.blue,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: 18,
      borderRadius: 15,
   },
   disabledButton: {
      opacity: 0.6,
   },
   buttonText: {
      color: COLORS.white,
      fontFamily: Fonts.bold,
      fontSize: 16,
      marginRight: 10,
   },
   arrowIcon: {
      transform: [{ translateY: 1 }],
   },
});

export default TopUpScreen;
