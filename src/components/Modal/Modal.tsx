import { Fonts } from "@src/constants/Fonts";
import { useAppTheme } from "@src/providers/ThemeProvider";
import React, { useMemo } from "react";
import {
   Modal,
   Pressable,
   StyleProp,
   StyleSheet,
   Text,
   TextStyle,
   View,
   ViewStyle,
} from "react-native";

interface CustomModalProps {
   visible: boolean;
   onClose: () => void;
   onConfirm: () => void;
   title?: string;
   message?: string;
   confirmText?: string;
   cancelText?: string;
   styles?: {
      centeredView?: StyleProp<ViewStyle>;
      modalView?: StyleProp<ViewStyle>;
      modalText?: StyleProp<TextStyle>;
      messageText?: StyleProp<TextStyle>;
      buttonContainer?: StyleProp<ViewStyle>;
      cancelText?: StyleProp<TextStyle>;
      confirmText?: StyleProp<TextStyle>;
   };
   children?: React.JSX.Element;
   icon?: string;
}

export const CustomModal = ({
   visible,
   onClose,
   onConfirm,
   title = "Colis recu?",
   message = "Êtes-vous sûr(e) de vouloir confirmer la reception du colis?",
   confirmText = "Confirmer",
   cancelText = "Annuler",
   styles: customStyles = {},
   children,
}: CustomModalProps) => {
   const { colors } = useAppTheme();

   const styles = useMemo(
      () =>
         StyleSheet.create({
            centeredView: {
               flex: 1,
               justifyContent: "center",
               alignItems: "center",
               backgroundColor: "transparent",
            },
            modalView: {
               margin: 20,
               backgroundColor: colors.background.card,
               borderRadius: 20,
               padding: 35,
               alignItems: "center",
               shadowColor: "#000",
               shadowOffset: { width: 0, height: 2 },
               shadowOpacity: 0.25,
               shadowRadius: 4,
               elevation: 5,
               zIndex: 2,
            },
            backdrop: {
               ...StyleSheet.absoluteFillObject,
               backgroundColor: colors.background.overlay,
               zIndex: 1,
            },
            modalText: {
               marginBottom: 15,
               textAlign: "center",
               fontSize: 20,
               fontFamily: Fonts.bold,
               color: colors.text.primary,
            },
            messageText: {
               fontFamily: Fonts.regular,
               textAlign: "center",
               fontSize: 20,
               color: colors.text.secondary,
            },
            buttonContainer: {
               flexDirection: "row",
               justifyContent: "space-between",
               marginTop: 16,
               width: "100%",
            },
            modal: {
               width: "90%",
               maxHeight: "50%",
               borderRadius: 10,
               padding: 10,
               backgroundColor: colors.background.paper,
            },
            cancelText: {
               color: colors.accent.red,
               textAlign: "center",
               marginRight: 10,
               fontFamily: Fonts.black,
               fontSize: 20,
            },
            confirmText: {
               color: colors.status.success,
               textAlign: "center",
               fontFamily: Fonts.black,
               fontSize: 20,
            },
         }),
      [colors]
   );

   return (
      <Modal animationType="fade" transparent={true} visible={visible} onRequestClose={onClose}>
         <View style={[styles.centeredView, customStyles.centeredView]}>
            <Pressable onPress={onClose} style={styles.backdrop} />

            <View style={[styles.modalView, customStyles.modalView]}>
               <Text style={[styles.modalText, customStyles.modalText]}>{title}</Text>
               <Text style={[styles.messageText, customStyles.messageText]}>{message}</Text>
               <View style={styles.modal}>{children}</View>

               <View style={[styles.buttonContainer, customStyles.buttonContainer]}>
                  {onClose && (
                     <Pressable onPress={onClose}>
                        <Text style={[styles.cancelText, customStyles.cancelText]}>
                           {cancelText}
                        </Text>
                     </Pressable>
                  )}
                  {onConfirm && (
                     <Pressable onPress={onConfirm}>
                        <Text style={[styles.confirmText, customStyles.confirmText]}>
                           {confirmText}
                        </Text>
                     </Pressable>
                  )}
               </View>
            </View>
         </View>
      </Modal>
   );
};
