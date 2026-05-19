import { Alert } from 'react-native';
import { act, renderHook } from '@testing-library/react-native';
import { useContainerGoodsMutations } from '../useContainerGoodsMutations';
import type { ContainerDialogsState } from '../useContainerDialogs';

const mockNavigate = jest.fn();
const mockDeleteContainer = jest.fn();

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: mockNavigate,
  }),
}));

jest.mock('../../../hooks', () => ({
  useRemoveGoodsFromContainer: () => ({
    mutateAsync: jest.fn(),
    isPending: false,
  }),
  useDeleteContainer: () => ({
    mutateAsync: mockDeleteContainer,
    isPending: false,
  }),
  useReconcileContainer: () => ({
    mutateAsync: jest.fn(),
    isPending: false,
  }),
}));

const createDialogs = (): ContainerDialogsState => ({
  statusMenuVisible: false,
  setStatusMenuVisible: jest.fn(),
  showDeleteDialog: true,
  setShowDeleteDialog: jest.fn(),
  showRemoveGoodsDialog: false,
  setShowRemoveGoodsDialog: jest.fn(),
  showReadyForPickupDialog: false,
  setShowReadyForPickupDialog: jest.fn(),
  showDeliveredDialog: false,
  setShowDeliveredDialog: jest.fn(),
  showReconcileModal: false,
  setShowReconcileModal: jest.fn(),
  selectedGoodsId: null,
  setSelectedGoodsId: jest.fn(),
  handleRemoveGoods: jest.fn(),
  handleMarkReadyForPickup: jest.fn(),
  handleMarkDelivered: jest.fn(),
});

describe('useContainerGoodsMutations', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(Alert, 'alert').mockImplementation(jest.fn());
  });

  it('navigates back to ContainerList after successful delete and reports released goods', async () => {
    const dialogs = createDialogs();
    mockDeleteContainer.mockResolvedValue({
      data: {
        containerId: 'container-123',
        releasedGoodsCount: 2,
        deletedWaypointTrackingCount: 1,
      },
    });

    const { result } = renderHook(() =>
      useContainerGoodsMutations('container-123', dialogs)
    );

    await act(async () => {
      await result.current.confirmDeleteContainer();
    });

    expect(mockDeleteContainer).toHaveBeenCalledWith('container-123');
    expect(dialogs.setShowDeleteDialog).toHaveBeenCalledWith(false);
    expect(mockNavigate).toHaveBeenCalledWith('ContainerList');
    expect(Alert.alert).toHaveBeenCalledWith(
      'Succès',
      expect.stringContaining('2 marchandise(s) renvoyée(s) aux non assignées')
    );
  });
});
