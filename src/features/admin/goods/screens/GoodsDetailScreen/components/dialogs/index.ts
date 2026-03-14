/**
 * Dialog exports for GoodsDetailScreen
 */

export { showDeleteConfirmDialog, showNoContainersAlert } from './DeleteConfirmDialog';
export { showContainerAssignmentDialog } from './ContainerAssignmentDialog';
export { showStatusUpdateDialog, showStatusUpdateError, showStatusUpdateSuccess } from './StatusUpdateDialog';

// Helper exports for assignment
export const showAssignError = (message: string): void => {
  // Show assignment error dialog
  console.error('Assignment error:', message);
  // TODO: Replace with actual dialog implementation (e.g., Alert.alert)
};

export const showAssignSuccess = (onConfirm: () => void): void => {
  // Show assignment success dialog
  console.log('Assignment successful');
  onConfirm();
  // TODO: Replace with actual dialog implementation (e.g., Alert.alert with callback)
};
