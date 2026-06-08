import * as ImageManipulator from 'expo-image-manipulator';

export interface PrepImageOptions {
  maxWidth?: number;
  maxHeight?: number;
  compress?: number;
}

/**
 * Resize and compress an image before upload.
 * Uses expo-image-manipulator for lightweight client-side prep.
 */
export async function prepImageForUpload(
  uri: string,
  options: PrepImageOptions = {}
): Promise<string> {
  const { maxWidth = 1600, maxHeight = 1600, compress = 0.85 } = options;

  const manipulated = await ImageManipulator.manipulateAsync(
    uri,
    [{ resize: { width: maxWidth, height: maxHeight } }],
    { compress, format: ImageManipulator.SaveFormat.JPEG }
  );

  return manipulated.uri;
}
