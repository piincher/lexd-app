import { useAppTheme } from '@src/providers/ThemeProvider';
import { useFormikContext } from 'formik';
import React, { useCallback, useEffect } from 'react';
import { Text, View } from 'react-native';
import type { StyleProp, TextInputProps, ViewStyle } from 'react-native';
import Animated, {
   useAnimatedStyle,
   useSharedValue,
   withSequence,
   withSpring,
   withTiming,
} from 'react-native-reanimated';
import AppInput from '../AppInput';
import { createStyles } from './AuthInput.styles';
import { AuthInputLabel } from './AuthInputLabel';
import { AuthInputRightIcon } from './AuthInputRightIcon';

interface Props {
   placeholder?: string;
   label: string;
   keyboardType?: TextInputProps['keyboardType'];
   autoCapitalize?: TextInputProps['autoCapitalize'];
   secureTextEntry?: boolean;
   containerStyle?: StyleProp<ViewStyle>;
   name: string;
   rightIcon?: React.ReactNode;
   maxLength?: number;
   onRightIconPress?: () => void;
   code?: { label: string; value: string }[];
   selectedCode?: string;
   setSelectedCode?: Dispatch<string>;
   phone?: boolean;
   descriptionDown?: string;
   editable?: boolean;
   onInputFocus?: () => void;
}

const AuthInputField: FC<Props> = (props) => {
   const { colors } = useAppTheme();
   const inputTransformValue = useSharedValue(0);
   const {
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

   const shakeUI = useCallback(() => {
      inputTransformValue.value = withSequence(
         withTiming(-10, { duration: 100 }),
         withSpring(0, { damping: 8, mass: 0.5, stiffness: 1000 })
      );
   }, [inputTransformValue]);
   const errorMsg = touched[name] && errors[name] ? errors[name] : '';
   const inputStyle = useAnimatedStyle(() => {
      return {
         transform: [{ translateX: inputTransformValue.value }],
      };
   });

   useEffect(() => {
      if (errorMsg) {
         shakeUI();
      }
   }, [errorMsg, shakeUI]);

   const handleRight = () => {
      handleSubmit();
   };

   const styles = createStyles(colors);

   return (
      <Animated.View style={[containerStyle, inputStyle]}>
         <AuthInputLabel label={label} errorMsg={errorMsg} />
         <View
            style={{
               borderColor: errorMsg ? colors.status.error : colors.border,
               borderWidth: 0.5,
               borderRadius: 8,
            }}
         >
            <AppInput
               placeholder={placeholder}
               style={!props.phone ? styles.defaultInput : {}}
               keyboardType={keyboardType}
               secureTextEntry={secureTextEntry}
               onChangeText={handleChange(name)}
               value={
                  values[name] !== undefined && values[name] !== null ? String(values[name]) : ''
               }
               onBlur={handleBlur(name)}
               maxLength={props.maxLength}
               code={props.code}
               selectedCode={props.selectedCode}
               setSelectedCode={props.setSelectedCode}
               phone={props.phone}
               onInputFocus={props.onInputFocus}
            />
            {rightIcon ? (
               <AuthInputRightIcon onPress={handleRight} icon={rightIcon} />
            ) : null}
         </View>
         <Text style={styles.descriptionText}>{props.descriptionDown}</Text>
      </Animated.View>
   );
};

export default AuthInputField;
