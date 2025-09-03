import { COLORS } from "@src/constants/Colors";
import { Fonts } from "@src/constants/Fonts";
import { useFormikContext } from "formik";
import React, { Dispatch, FC, useEffect } from "react";
import {
   Pressable,
   StyleProp,
   StyleSheet,
   Text,
   TextInputProps,
   View,
   ViewStyle,
} from "react-native";
import Animated, {
   useAnimatedStyle,
   useSharedValue,
   withSequence,
   withSpring,
   withTiming,
} from "react-native-reanimated";
import AppInput from "../AppInput/AppInput";
interface Props {
   placeholder?: string;
   label: string;
   keyboardType?: TextInputProps["keyboardType"];
   autoCapitalize?: TextInputProps["autoCapitalize"];
   secureTextEntry?: boolean;
   containerStyle?: StyleProp<ViewStyle>;
   name: string;
   rightIcon?: React.ReactNode;
   maxLength?: number;
   onRightIconPress?: () => void;
   code?: [{ label: string; value: string }];
   selectedCode?: string;
   setSelectedCode?: Dispatch<string>;
   phone?: boolean;
   descriptionDown?: string;
   editable?: boolean;
}

const AuthInputField: FC<Props> = (props) => {
   const inputTransformValue = useSharedValue(0);
   const {
      onRightIconPress,
      rightIcon,
      placeholder,
      label,
      keyboardType,
      secureTextEntry,
      containerStyle,
      name,
   } = props;
   const { handleChange, values, errors, touched, handleBlur, handleSubmit } = useFormikContext<{
      [key: string]: string;
   }>();

   const shakeUI = () => {
      inputTransformValue.value = withSequence(
         withTiming(-10, { duration: 100 }),
         withSpring(0, { damping: 8, mass: 0.5, stiffness: 1000, restDisplacementThreshold: 0.1 })
      );
   };
   const errorMsg = touched[name] && errors[name] ? errors[name] : "";
   const inputStyle = useAnimatedStyle(() => {
      return {
         transform: [{ translateX: inputTransformValue.value }],
      };
   });

   useEffect(() => {
      if (errorMsg) {
         shakeUI();
      }
   }, [errorMsg]);

   const handleRight = () => {
      handleSubmit();
   };

   return (
      <Animated.View style={[containerStyle, inputStyle]}>
         <View style={styles.headerContainer}>
            <Text style={styles.label}>{label}</Text>
            <Text style={[styles.label, { color: "red" }]}>{errorMsg}</Text>
         </View>
         <View
            style={{
               borderColor: errorMsg ? COLORS.redShade : COLORS.grey,
               borderWidth: 0.5,
            }}
         >
            <AppInput
               placeholder={placeholder}
               style={!props.phone ? styles.defaultInput : {}}
               keyboardType={keyboardType}
               secureTextEntry={secureTextEntry}
               onChangeText={handleChange(name)}
               value={
                  values[name] !== undefined && values[name] !== null ? String(values[name]) : ""
               }
               onBlur={handleBlur(name)}
               maxLength={props.maxLength}
               code={props.code}
               selectedCode={props.selectedCode}
               setSelectedCode={props.setSelectedCode}
               phone={props.phone}
            />
            {rightIcon ? (
               <Pressable onPress={handleRight} style={styles.rightIcon}>
                  {rightIcon}
               </Pressable>
            ) : null}
         </View>
         <Text style={styles.descriptionText}>{props.descriptionDown}</Text>
      </Animated.View>
   );
};

const styles = StyleSheet.create({
   defaultInput: {
      borderWidth: 0.5,
      width: "70%",
      height: 40,
      borderColor: COLORS.grey,
   },
   headerContainer: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
   label: {
      color: COLORS.black,
      padding: 5,
      fontSize: 16,
      fontFamily: Fonts.meduim,
   },
   rightIcon: {
      width: 40,
      height: 40,
      position: "absolute",
      top: 0,
      right: 0,
      justifyContent: "center",
   },
   descriptionText: {
      color: COLORS.blue,
      fontSize: 12,
      fontFamily: Fonts.regular,
      marginVertical: 5,
   },
});

export default AuthInputField;
