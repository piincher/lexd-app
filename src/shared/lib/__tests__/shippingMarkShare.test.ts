import * as MediaLibrary from 'expo-media-library';
import { File } from 'expo-file-system';
import {
  MediaLibraryPermissionError,
  downloadShippingMarkToCache,
  saveImageToGallery,
} from '../shippingMarkShare';

jest.mock('expo-file-system', () => {
  class MockFile {
    uri: string;
    constructor(_directory: unknown, filename: string) {
      this.uri = `file:///cache/${filename}`;
    }
    static downloadFileAsync = jest.fn(async (_url: string, destination: MockFile) => destination);
  }
  return { File: MockFile, Paths: { cache: 'cache' } };
});

jest.mock('expo-media-library', () => ({
  isAvailableAsync: jest.fn(),
  requestPermissionsAsync: jest.fn(),
  saveToLibraryAsync: jest.fn(),
}));

jest.mock('react-native-share', () => ({ open: jest.fn() }));

const media = MediaLibrary as jest.Mocked<typeof MediaLibrary>;
const download = File.downloadFileAsync as jest.MockedFunction<typeof File.downloadFileAsync>;

describe('supplier image file actions', () => {
  beforeEach(() => {
    media.isAvailableAsync.mockResolvedValue(true);
    media.requestPermissionsAsync.mockResolvedValue({
      granted: true,
      canAskAgain: true,
      status: 'granted',
      expires: 'never',
    } as MediaLibrary.PermissionResponse);
  });

  it('downloads to a stable local file URI', async () => {
    const uri = await downloadShippingMarkToCache('https://cdn.test/sheet.png', 'sheet.png');
    expect(uri).toBe('file:///cache/sheet.png');
    expect(download).toHaveBeenCalledWith('https://cdn.test/sheet.png', expect.anything(), { idempotent: true });
  });

  it('requests write access before saving the image', async () => {
    await saveImageToGallery('https://cdn.test/sheet.png', 'sheet.png');
    expect(media.requestPermissionsAsync).toHaveBeenCalledWith(true, []);
    expect(media.saveToLibraryAsync).toHaveBeenCalledWith('file:///cache/sheet.png');
  });

  it('returns a recoverable permission error when gallery access is denied', async () => {
    media.requestPermissionsAsync.mockResolvedValue({
      granted: false,
      canAskAgain: false,
      status: 'denied',
      expires: 'never',
    } as MediaLibrary.PermissionResponse);
    await expect(saveImageToGallery('https://cdn.test/sheet.png', 'sheet.png')).rejects.toEqual(
      expect.objectContaining<Partial<MediaLibraryPermissionError>>({ canAskAgain: false }),
    );
    expect(media.saveToLibraryAsync).not.toHaveBeenCalled();
  });
});
