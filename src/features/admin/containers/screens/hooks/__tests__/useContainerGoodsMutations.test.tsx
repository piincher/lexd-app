import { Alert } from 'react-native';
import { act, renderHook } from '@testing-library/react-native';
import { useContainerGoodsMutations } from '../useContainerGoodsMutations';
import type { ContainerDialogsState } from '../useContainerDialogs';

jest.mock('@react-navigation/native', () => {
  const navigateMock = jest.fn();
  return {
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: () => ({ navigate: navigateMock, goBack: jest.fn() }),
    __navigateMock: navigateMock,
  };
});

jest.mock('../../../hooks', () => {
  const mutateAsyncMock = jest.fn();
  return {
    useRemoveGoodsFromContainer: () => ({
      mutateAsync: jest.fn(),
      isPending: false,
    }),
    useDeleteContainer: () => ({
      mutateAsync: mutateAsyncMock,
      isPending: false,
    }),
    useReconcileContainer: () => ({
      mutateAsync: jest.fn(),
      isPending: false,
    }),
    __deleteMutateAsyncMock: mutateAsyncMock,
  };
});

const mockNavigate = jest.requireMock('@react-navigation/native').__navigateMock;
const mockDeleteContainer = jest.requireMock('../../../hooks').__deleteMutateAsyncMock;

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
    jest.useFakeTimers();
    jest.clearAllMocks();
    jest.spyOn(Alert, 'alert').mockImplementation(jest.fn());
  });

  afterEach(() => {
    jest.useRealTimers();
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

    act(() => {
      jest.advanceTimersByTime(300);
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
