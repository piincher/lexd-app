import { act, renderHook } from '@testing-library/react-native';
import * as Sharing from 'expo-sharing';
import { showMessage } from 'react-native-flash-message';
import { fetchSupplierSheetUrl } from '../../api/warehouseAddressApi';
import { downloadShippingMarkToCache, saveLocalImageToGallery } from '@src/shared/lib/shippingMarkShare';
import { useSupplierSheetShare } from '../useSupplierSheetShare';

jest.mock('expo-sharing', () => ({ isAvailableAsync: jest.fn(), shareAsync: jest.fn() }));
jest.mock('react-native-flash-message', () => ({ showMessage: jest.fn() }));
jest.mock('../../api/warehouseAddressApi', () => ({ fetchSupplierSheetUrl: jest.fn() }));
jest.mock('@src/shared/lib/shippingMarkShare', () => ({
  MediaLibraryPermissionError: class MediaLibraryPermissionError extends Error {},
  downloadShippingMarkToCache: jest.fn(),
  saveLocalImageToGallery: jest.fn(),
}));

const fetchUrl = fetchSupplierSheetUrl as jest.MockedFunction<typeof fetchSupplierSheetUrl>;
const download = downloadShippingMarkToCache as jest.MockedFunction<typeof downloadShippingMarkToCache>;
const captureLocal = jest.fn<Promise<string>, ['AIR' | 'SEA']>();

describe('useSupplierSheetShare', () => {
  beforeEach(() => {
    fetchUrl.mockResolvedValue('https://cdn.test/supplier.png');
    download.mockResolvedValue('file:///cache/supplier.png');
    captureLocal.mockResolvedValue('file:///cache/local-sheet.png');
    (Sharing.isAvailableAsync as jest.Mock).mockResolvedValue(true);
  });

  it('prepares the image and opens the native supplier share sheet', async () => {
    const { result } = renderHook(() => useSupplierSheetShare(captureLocal));
    await act(async () => result.current.share('SEA'));
    expect(Sharing.shareAsync).toHaveBeenCalledWith('file:///cache/supplier.png', expect.objectContaining({ mimeType: 'image/png' }));
  });

  it('saves the generated image and confirms success', async () => {
    const { result } = renderHook(() => useSupplierSheetShare(captureLocal));
    await act(async () => result.current.save('AIR'));
    expect(saveLocalImageToGallery).toHaveBeenCalledWith('file:///cache/supplier.png');
    expect(showMessage).toHaveBeenCalledWith(expect.objectContaining({ type: 'success' }));
  });

  it('captures a local supplier image when the server route is unavailable', async () => {
    fetchUrl.mockRejectedValue(new Error('404'));
    const { result } = renderHook(() => useSupplierSheetShare(captureLocal));
    await act(async () => result.current.share('SEA'));
    expect(captureLocal).toHaveBeenCalledWith('SEA');
    expect(Sharing.shareAsync).toHaveBeenCalledWith('file:///cache/local-sheet.png', expect.any(Object));
  });

  it('ignores duplicate share taps while an image is being prepared', async () => {
    let resolveUrl: (url: string) => void = () => undefined;
    fetchUrl.mockReturnValue(new Promise((resolve) => { resolveUrl = resolve; }));
    const { result } = renderHook(() => useSupplierSheetShare(captureLocal));

    let firstShare: Promise<void> | undefined;
    await act(async () => {
      firstShare = result.current.share('SEA');
      await result.current.share('SEA');
    });
    expect(fetchUrl).toHaveBeenCalledTimes(1);

    resolveUrl('https://cdn.test/supplier.png');
    await act(async () => firstShare);
  });
});
