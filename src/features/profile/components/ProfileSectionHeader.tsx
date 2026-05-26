import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Fonts } from '@src/constants/Fonts';
import type { ThemeContextType } from '@src/constants/Theme';
import { useAppTheme } from '@src/providers/ThemeProvider';

type AppColors = ThemeContextType['colors'];
type MaterialIconName = React.ComponentProps<typeof MaterialCommunityIcons>['name'];

interface ProfileSectionHeaderProps {
  icon: MaterialIconName;
  title: string;
  subtitle?: string;
}

export const ProfileSectionHeader: React.FC<ProfileSectionHeaderProps> = ({
  icon,
  title,
  subtitle,
}) => {
  const { colors } = useAppTheme();
  const styles = createStyles(colors);

  return (
    <View style={styles.header}>
      <View style={styles.iconBox}>
        <MaterialCommunityIcons name={icon} size={18} color={colors.primary.main} />
      </View>
      <View style={styles.copy}>
        <Text style={styles.title}>{title}</Text>
        {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      </View>
    </View>
  );
};

const createStyles = (colors: AppColors) =>
  StyleSheet.create({
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
      paddingHorizontal: 16,
      marginTop: 24,
      marginBottom: 10,
    },
    iconBox: {
      width: 36,
      height: 36,
      borderRadius: 12,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.primary[50],
      borderWidth: 1,
      borderColor: colors.primary[100],
    },
    copy: {
      flex: 1,
      minWidth: 0,
    },
    title: {
      fontSize: 16,
      fontFamily: Fonts.bold,
      color: colors.text.primary,
      letterSpacing: 0,
    },
    subtitle: {
      marginTop: 1,
      fontSize: 12,
      fontFamily: Fonts.medium,
      color: colors.text.secondary,
      letterSpacing: 0,
    },
  });

export default ProfileSectionHeader;
