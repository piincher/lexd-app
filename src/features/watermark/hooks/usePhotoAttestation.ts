import { useMutation } from '@tanstack/react-query';
import { attestPhoto, verifyPhotoAttestation } from '../api/photoAttestationApi';
import { prepImageForUpload, PrepImageOptions } from '../lib/prepImage';
import { PhotoAttestationMetadata, PhotoAttestationResponse } from '../types';

interface AttestPhotoInput {
  uri: string;
  metadata: PhotoAttestationMetadata;
  prepOptions?: PrepImageOptions;
  onProgress?: (progress: number) => void;
}

/**
 * Hook to upload a photo, apply server-side watermark, and receive
 * a cryptographically-signed attestation.
 */
export const useAttestPhoto = () => {
  return useMutation<PhotoAttestationResponse, Error, AttestPhotoInput>({
    mutationFn: async ({ uri, metadata, prepOptions, onProgress }) => {
      const processedUri = await prepImageForUpload(uri, prepOptions);
      const response = await attestPhoto(processedUri, metadata, onProgress);

      if (!response.success || !response.data) {
        throw new Error(response.message || 'Failed to attest photo');
      }

      return response.data;
    },
  });
};

/**
 * Hook to verify a photo attestation by its photo ID.
 */
export const useVerifyPhotoAttestation = () => {
  return useMutation({
    mutationFn: async (photoId: string) => {
      const response = await verifyPhotoAttestation(photoId);

      if (!response.success || !response.data) {
        throw new Error(response.message || 'Failed to verify photo');
      }

      return response.data;
    },
  });
};
