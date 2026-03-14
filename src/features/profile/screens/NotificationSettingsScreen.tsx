import React from 'react';
import { ScrollView, SafeAreaView } from 'react-native';
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
        onDismiss={() => setShowQuietHoursDialog(false)}
        onSave={() => setShowQuietHoursDialog(false)}
      />
    </SafeAreaView>
  );
};

export default NotificationSettingsScreen;
