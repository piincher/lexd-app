/**
 * WaypointManagementScreen - Full screen for managing container waypoints
 */
import React from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useWaypointManagementScreen } from './WaypointManagement/hooks';
import {
  Header,
  TabNavigation,
  FloatingActionButtons,
  AddWaypointDialog,
  ImportTemplateDialog,
  SaveChangesDialog,
} from './WaypointManagement/components';
import { WaypointUpdateModal } from '../components/WaypointUpdateModal';
import { WaypointTabContent } from '../components/WaypointTabContent';
import { createStyles } from './WaypointManagement/WaypointManagementScreen.styles';
import { useAppTheme } from '@src/providers/ThemeProvider';

export const WaypointManagementScreen: React.FC = () => {
  const { colors } = useAppTheme();
  const styles = createStyles(colors);
  const {
    containerNumber, waypoints, seaSegments, roadSegments, activeTab,
    currentWaypointIndex, updateModalVisible, selectedWaypointIndex,
    showAddWaypointDialog, showTemplateDialog, showSaveDialog,
    newWaypoint, routeTemplates, navigation, setActiveTab,
    setUpdateModalVisible, setShowAddWaypointDialog, setShowTemplateDialog,
    setShowSaveDialog, handleMarkArrived, handleMarkDeparted,
    handleUpdateInfo, handleSaveWaypointUpdate, handleAddWaypoint,
    handleImportTemplate, handleSaveChanges, updateNewWaypointField,
  } = useWaypointManagementScreen();

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <Header
        containerNumber={containerNumber}
        onBack={() => navigation.goBack()}
        onSave={() => setShowSaveDialog(true)}
      />
      <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
      <View style={styles.content}>
        <WaypointTabContent
          activeTab={activeTab}
          waypoints={waypoints}
          currentWaypointIndex={currentWaypointIndex}
          containerNumber={containerNumber}
          seaSegments={seaSegments}
          roadSegments={roadSegments}
          onMarkArrived={handleMarkArrived}
          onMarkDeparted={handleMarkDeparted}
          onUpdateInfo={handleUpdateInfo}
        />
      </View>
      <FloatingActionButtons
        onAddWaypoint={() => setShowAddWaypointDialog(true)}
        onImportTemplate={() => setShowTemplateDialog(true)}
      />
      <AddWaypointDialog
        visible={showAddWaypointDialog}
        newWaypoint={newWaypoint}
        onDismiss={() => setShowAddWaypointDialog(false)}
        onAdd={handleAddWaypoint}
        onUpdateField={updateNewWaypointField}
      />
      <ImportTemplateDialog
        visible={showTemplateDialog}
        templates={routeTemplates}
        onDismiss={() => setShowTemplateDialog(false)}
        onImport={handleImportTemplate}
      />
      <SaveChangesDialog
        visible={showSaveDialog}
        onDismiss={() => setShowSaveDialog(false)}
        onSave={handleSaveChanges}
      />
      <WaypointUpdateModal
        visible={updateModalVisible}
        waypoint={waypoints[selectedWaypointIndex] || null}
        waypointIndex={selectedWaypointIndex}
        onDismiss={() => setUpdateModalVisible(false)}
        onSave={handleSaveWaypointUpdate}
      />
    </SafeAreaView>
  );
};

export default WaypointManagementScreen;
