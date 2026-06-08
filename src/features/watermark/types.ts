/**
 * Watermark / Photo Attestation Types
 */

export interface PhotoAttestationResponse {
  photoId: string;
  watermarkedUrl: string;
  verificationUrl: string;
  imageHash: string;
  signature: string;
  processedAt: string;
}

export interface PhotoAttestationMetadata {
  trackingNumber?: string;
  orderId?: string;
  goodsId?: string;
  status?: string;
  latitude?: number;
  longitude?: number;
  locationName?: string;
  capturedAt?: string;
  platform?: 'ios' | 'android' | 'web';
  deviceModel?: string;
  deviceId?: string;
}

export interface PhotoAttestationVerifyResponse {
  photoId: string;
  isValid: boolean;
  trackingNumber: string | null;
  orderId: string | null;
  status: string | null;
  driver: {
    id: string;
    name: string;
  };
  location: {
    latitude: number | null;
    longitude: number | null;
    name: string;
  };
  timestamps: {
    capturedAt: string | null;
    processedAt: string;
  };
  device: {
    model: string;
    platform: string;
    deviceId: string;
  };
  imageHash: string;
  signature: string;
  verificationCount: number;
  lastVerifiedAt: string | null;
}


