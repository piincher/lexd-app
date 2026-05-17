import React from 'react';
import { ActivityIndicator, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppTheme } from '@src/providers/ThemeProvider';
import {
  Header,
  MasterToggle,
  PermissionWarning,
  NotificationTypesList,
  QuietHoursCard,
  QuietHoursDialog,
  InfoSection,
} from './NotificationSettings/components';
import { useNotificationSettingsScreen } from './hooks/useNotificationSettingsScreen';
import { styles } from './NotificationSettings/NotificationSettings.styles';

const NotificationSettingsScreen: React.FC = () => {
  const { colors } = useAppTheme();
  const {
    isLoading,
    masterEnabled,
    preferences,
    permissionStatus,
    quietHours,
    showQuietHoursDialog,
    handleMasterToggle,
    handlePreferenceToggle,
    handleQuietHoursToggle,
    handleQuietHoursSave,
    getIconForType,
    getColorForType,
    handlers,
  } = useNotificationSettingsScreen();

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <Header onBack={handlers.handleBack} />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary.main} />
          <Text style={[styles.loadingText, { color: colors.text.secondary }]}>
            Chargement des parametres...
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header onBack={handlers.handleBack} />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <MasterToggle enabled={masterEnabled} onToggle={handleMasterToggle} />

        <PermissionWarning
          visible={!masterEnabled && permissionStatus !== 'granted'}
        />

        {masterEnabled && (
          <>
            <NotificationTypesList
              preferences={preferences}
              onToggle={handlePreferenceToggle}
              getIconForType={getIconForType}
              getColorForType={getColorForType}
            />

            <QuietHoursCard
              quietHours={quietHours}
              onToggle={handleQuietHoursToggle}
              onEditPress={handlers.handleEditQuietHours}
            />
          </>
        )}

        <InfoSection />
      </ScrollView>

      <QuietHoursDialog
        visible={showQuietHoursDialog}
        startTime={quietHours.startTime}
        endTime={quietHours.endTime}
        onDismiss={handlers.handleDismissQuietHours}
        onSave={handleQuietHoursSave}
      />
    </SafeAreaView>
  );
};

export default NotificationSettingsScreen;
