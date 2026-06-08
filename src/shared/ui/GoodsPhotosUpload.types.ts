export interface GoodsPhotosUploadProps {
  photoUris: string[];
  /** `source` reports whether the photo came from the camera or the gallery. */
  onPhotoSelected: (uri: string, source?: 'camera' | 'gallery') => void;
  onPhotoRemoved: (uri: string) => void;
  maxPhotos?: number;
}
