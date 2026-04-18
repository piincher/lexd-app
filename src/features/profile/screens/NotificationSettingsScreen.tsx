import React from 'react';
import { ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useNotificationSettings } from './NotificationSettings/hooks/useNotificationSettings';
import {
  Header,
  MasterToggle,
  PermissionWarning,
  NotificationTypesList,
  QuietHoursCard,
  QuietHoursDialog,
  InfoSection,
} from './NotificationSettings/components';
import { styles } from './NotificationSettings/NotificationSettings.styles';

const NotificationSettingsScreen: React.FC = () => {
  const navigation = useNavigation();
  const {
    masterEnabled,
    preferences,
    permissionStatus,
    quietHours,
    showQuietHoursDialog,
    setShowQuietHoursDialog,
    handleMasterToggle,
    handlePreferenceToggle,
    handleQuietHoursToggle,
    handleQuietHoursSave,
    getIconForType,
    getColorForType,
  } = useNotificationSettings();

  return (
    <SafeAreaView style={styles.container}>
      <Header navigation={navigation} />

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
              onEditPress={() => setShowQuietHoursDialog(true)}
            />
          </>
        )}

        <InfoSection />
      </ScrollView>

      <QuietHoursDialog
        visible={showQuietHoursDialog}
        startTime={quietHours.startTime}
        endTime={quietHours.endTime}
        onDismiss={() => setShowQuietHoursDialog(false)}
        onSave={handleQuietHoursSave}
      />
    </SafeAreaView>
  );
};

export default NotificationSettingsScreen;
