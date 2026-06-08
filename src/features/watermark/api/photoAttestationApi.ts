import { apiClientV2, uploadFile } from '@src/api/client';
import { ApiResponse } from '@src/shared/api/types';
import {
  PhotoAttestationResponse,
  PhotoAttestationMetadata,
  PhotoAttestationVerifyResponse,
} from '../types';

type ReactNativeFilePart = {
  uri: string;
  name: string;
  type: string;
};

const ENDPOINTS = {
  ATTEST: '/photos/attest',
  VERIFY: '/photos/verify',
  GET: (photoId: string) => `/photos/${photoId}`,
} as const;

/**
 * Upload an image and create a watermarked, cryptographically-signed attestation.
 */
export async function attestPhoto(
  uri: string,
  metadata: PhotoAttestationMetadata,
  onProgress?: (progress: number) => void
): Promise<ApiResponse<PhotoAttestationResponse>> {
  const formData = new FormData();

  formData.append('image', {
    uri,
    name: `attestation_${Date.now()}.jpg`,
    type: 'image/jpeg',
  } as ReactNativeFilePart as unknown as Blob);

  if (metadata.trackingNumber) {
    formData.append('trackingNumber', metadata.trackingNumber);
  }
  if (metadata.orderId) {
    formData.append('orderId', metadata.orderId);
  }
  if (metadata.goodsId) {
    formData.append('goodsId', metadata.goodsId);
  }
  if (metadata.status) {
    formData.append('status', metadata.status);
  }
  if (metadata.latitude != null) {
    formData.append('latitude', String(metadata.latitude));
  }
  if (metadata.longitude != null) {
    formData.append('longitude', String(metadata.longitude));
  }
  if (metadata.locationName) {
    formData.append('locationName', metadata.locationName);
  }
  if (metadata.capturedAt) {
    formData.append('capturedAt', metadata.capturedAt);
  }
  if (metadata.platform) {
    formData.append('platform', metadata.platform);
  }
  if (metadata.deviceModel) {
    formData.append('deviceModel', metadata.deviceModel);
  }
  if (metadata.deviceId) {
    formData.append('deviceId', metadata.deviceId);
  }

  return uploadFile<PhotoAttestationResponse>(
    apiClientV2,
    ENDPOINTS.ATTEST,
    formData,
    onProgress
  );
}

/**
 * Verify a photo attestation by its photo ID.
 */
export async function verifyPhotoAttestation(
  photoId: string
): Promise<ApiResponse<PhotoAttestationVerifyResponse>> {
  return apiClientV2.get<ApiResponse<PhotoAttestationVerifyResponse>>(
    `${ENDPOINTS.VERIFY}?id=${encodeURIComponent(photoId)}`
  ).then(res => res.data);
}

/**
 * Get a single photo attestation by ID.
 */
export async function getPhotoAttestation(
  photoId: string
): Promise<ApiResponse<PhotoAttestationResponse>> {
  return apiClientV2.get<ApiResponse<PhotoAttestationResponse>>(
    ENDPOINTS.GET(photoId)
  ).then(res => res.data);
}
