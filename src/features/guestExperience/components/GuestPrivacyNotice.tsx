import React, { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { FontAwesome6 } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { Fonts } from '@src/constants/Fonts';

export const GuestPrivacyNotice: React.FC = () => {
  const { colors } = useAppTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  return (
    <Animated.View
      entering={FadeInDown.delay(300)}
      style={[
        styles.container,
        {
          backgroundColor: colors.feedback.infoBg,
          borderColor: colors.status.info + '38',
        },
      ]}
    >
      <FontAwesome6 name="circle-info" size={16} color={colors.status.info} />
      <Text style={[styles.text, { color: colors.text.secondary }]}>
        Ceci est une démonstration. Les données ne sont pas réelles.
      </Text>
    </Animated.View>
  );
};

const createStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      marginHorizontal: 20,
      marginTop: 14,
      borderRadius: 8,
      paddingHorizontal: 14,
      paddingVertical: 10,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
      borderWidth: 1,
    },
    text: {
      flex: 1,
      fontFamily: Fonts.medium,
      fontSize: 12,
      lineHeight: 18,
    },
  });
