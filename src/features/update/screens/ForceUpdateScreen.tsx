import React from 'react';
import { View, Text, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { Button } from '@src/shared/ui/Button';
import { styles } from './ForceUpdateScreen.styles';

export interface ForceUpdateScreenProps {
  message: string;
  storeUrl: string;
  currentVersion?: string;
  minVersion?: string;
}

export const ForceUpdateScreen: React.FC<ForceUpdateScreenProps> = ({
  message,
  storeUrl,
  currentVersion,
  minVersion,
}) => {
  const { colors, isDark } = useAppTheme();

  const handleUpdate = () => {
    if (storeUrl) {
      Linking.openURL(storeUrl);
    }
  };

  return (
    <>
      <StatusBar
        style={isDark ? 'light' : 'dark'}
      />
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background.default }]}>
        <View style={styles.content}>
          <MaterialCommunityIcons
            name="update"
            size={80}
            color={colors.status.warning}
            style={styles.icon}
          />

          <Text style={[styles.title, { color: colors.text.primary }]}>
            Update Required
          </Text>

          <Text style={[styles.message, { color: colors.text.secondary }]}>
            {message}
          </Text>

          {(currentVersion || minVersion) && (
            <View style={styles.versionContainer}>
              {currentVersion && (
                <Text style={[styles.versionText, { color: colors.text.muted }]}>
                  Current: {currentVersion}
                </Text>
              )}
              {minVersion && (
                <Text style={[styles.versionText, { color: colors.text.muted }]}>
                  Required: {minVersion}
                </Text>
              )}
            </View>
          )}

          <Button
            title="Update Now"
            onPress={handleUpdate}
            variant="primary"
            size="large"
            fullWidth
            icon="open-outline"
            iconPosition="right"
            style={styles.button}
          />
        </View>
      </SafeAreaView>
    </>
  );
};
