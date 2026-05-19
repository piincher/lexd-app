import { useQuery } from '@tanstack/react-query';
import { apiClientV2 } from '@src/api/client';

export interface CertificateRecord {
  _id: string;
  userId: { firstName: string; lastName: string; phoneNumber: string };
  status: 'ACTIVE' | 'REVOKED' | 'EXPIRED';
  type: string;
  issuedAt: string;
  expiresAt?: string;
}

interface ListCertificatesResponse {
  certificates: CertificateRecord[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export const clientCertificatesKeys = {
  all: (userId: string) => ['clientCertificates', userId] as const,
};

export const useClientCertificates = (userId: string) =>
  useQuery<ListCertificatesResponse, Error>({
    queryKey: clientCertificatesKeys.all(userId),
    queryFn: async () => {
      const response = await apiClientV2.get('/customer/certificate/admin/list', {
        params: { userId, limit: 10 },
      });
      return response.data.data;
    },
    enabled: !!userId,
    staleTime: 60 * 1000,
  });
