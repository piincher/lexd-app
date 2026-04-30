import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { HeaderConfig } from './Screen.types';
import { styles } from './Screen.styles';

interface ScreenHeaderProps {
  header: React.ReactNode | HeaderConfig;
  colors: any;
}

export const ScreenHeader: React.FC<ScreenHeaderProps> = ({ header, colors }) => {
  const navigation = useNavigation();

  if (!header) return null;
  if (React.isValidElement(header)) return header;

  const headerConfig = header as HeaderConfig;
  if (!headerConfig.title) return null;

  return (
    <View style={[styles.simpleHeader, {
      backgroundColor: colors.background.default,
      borderBottomColor: colors.border,
    }]}>
      {headerConfig.showBack && (
        <TouchableOpacity
          onPress={headerConfig.onBackPress}
          style={styles.backButton}
          testID="screen-back-button"
        >
          <Text style={[styles.backButtonText, { color: colors.primary.main }]}>←</Text>
        </TouchableOpacity>
      )}
      <Text style={[styles.headerTitle, { color: colors.text.primary }]}>
        {headerConfig.title}
      </Text>
      {headerConfig.showNotificationBell ? (
        <TouchableOpacity
          style={styles.rightAction}
          onPress={() => (navigation as any).navigate('Notifications')}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons name="notifications-outline" size={22} color={colors.text.primary} />
        </TouchableOpacity>
      ) : headerConfig.rightAction ? (
        <View style={styles.rightAction}>{headerConfig.rightAction}</View>
      ) : (
        <View style={styles.rightPlaceholder} />
      )}
    </View>
  );
};
