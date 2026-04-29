import { useCallback } from 'react';
import { useWaypointRoute } from './useWaypointRoute';
import { useWaypointData } from './useWaypointData';
import { useWaypointUI } from './useWaypointUI';
import type { NewWaypointForm } from './types';
import type { RouteTemplate } from '../../../types';

export type { NewWaypointForm };

export const useWaypointManagementScreen = () => {
  const { containerId, containerNumber, navigation, routeTemplates } = useWaypointRoute();
  const {
    waypoints,
    seaSegments,
    roadSegments,
    isRefreshing,
    currentWaypointIndex,
    handleRefresh,
    handleMarkArrived,
    handleMarkDeparted,
    handleSaveWaypointUpdate,
    addWaypoint,
    handleImportTemplate: importTemplate,
    handleDeleteWaypoint,
  } = useWaypointData();
  const {
    activeTab,
    setActiveTab,
    updateModalVisible,
    setUpdateModalVisible,
    selectedWaypointIndex,
    setSelectedWaypointIndex,
    showAddWaypointDialog,
    setShowAddWaypointDialog,
    showTemplateDialog,
    setShowTemplateDialog,
    showSaveDialog,
    setShowSaveDialog,
    newWaypoint,
    setNewWaypoint,
    handleUpdateInfo,
    handleSaveChanges,
    updateNewWaypointField,
  } = useWaypointUI();

  const handleAddWaypoint = useCallback(() => {
    const success = addWaypoint(newWaypoint);
    if (success) {
      setShowAddWaypointDialog(false);
      setNewWaypoint({ segmentType: 'SEA', status: 'PENDING' });
    }
  }, [addWaypoint, newWaypoint, setShowAddWaypointDialog, setNewWaypoint]);

  const handleImportTemplate = useCallback((template: RouteTemplate) => {
    importTemplate(template);
    setShowTemplateDialog(false);
  }, [importTemplate, setShowTemplateDialog]);

  return {
    containerId,
    containerNumber,
    navigation,
    waypoints,
    seaSegments,
    roadSegments,
    isRefreshing,
    activeTab,
    setActiveTab,
    updateModalVisible,
    setUpdateModalVisible,
    selectedWaypointIndex,
    setSelectedWaypointIndex,
    showAddWaypointDialog,
    setShowAddWaypointDialog,
    showTemplateDialog,
    setShowTemplateDialog,
    showSaveDialog,
    setShowSaveDialog,
    newWaypoint,
    setNewWaypoint,
    currentWaypointIndex,
    handleRefresh,
    handleMarkArrived,
    handleMarkDeparted,
    handleUpdateInfo,
    handleSaveWaypointUpdate,
    handleAddWaypoint,
    handleImportTemplate,
    handleSaveChanges,
    handleDeleteWaypoint,
    updateNewWaypointField,
    routeTemplates,
  };
};
