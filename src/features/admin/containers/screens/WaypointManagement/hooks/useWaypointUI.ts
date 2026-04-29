import { useState, useCallback } from 'react';
import { Alert } from 'react-native';
import type { NewWaypointForm, TabType } from './types';

export const useWaypointUI = () => {
  const [activeTab, setActiveTab] = useState<TabType>('waypoints');
  const [updateModalVisible, setUpdateModalVisible] = useState(false);
  const [selectedWaypointIndex, setSelectedWaypointIndex] = useState<number>(0);
  const [showAddWaypointDialog, setShowAddWaypointDialog] = useState(false);
  const [showTemplateDialog, setShowTemplateDialog] = useState(false);
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [newWaypoint, setNewWaypoint] = useState<NewWaypointForm>({ segmentType: 'SEA', status: 'PENDING' });
  const handleUpdateInfo = useCallback((index: number) => {
    setSelectedWaypointIndex(index);
    setUpdateModalVisible(true);
  }, []);
  const handleSaveChanges = useCallback(() => {
    setTimeout(() => {
      setShowSaveDialog(false);
      Alert.alert('Succès', 'Modifications enregistrées');
    }, 500);
  }, []);
  const updateNewWaypointField = useCallback(<K extends keyof NewWaypointForm>(field: K, value: NewWaypointForm[K]) => {
    setNewWaypoint((prev) => ({ ...prev, [field]: value }));
  }, []);
  return {
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
  };
};
