export interface GoodsPhotosUploadProps {
  photoUris: string[];
  onPhotoSelected: (uri: string) => void;
  onPhotoRemoved: (uri: string) => void;
  maxPhotos?: number;
}
