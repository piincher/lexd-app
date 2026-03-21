import { useState, useCallback } from "react";
import { Alert, Linking } from "react-native";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  certificateAdminApi,
  getCertificateDownloadUrl,
  CertificateUser,
  SearchUsersResponse,
  IssueCertificateInput,
  CertificateRecord,
} from "../api";

const CERT_ADMIN_KEY = "admin_certificates";
const CERT_SEARCH_KEY = "admin_cert_search_users";

export const useSearchUsersForCertificate = (q: string, page = 1, enabled = true) => {
  return useQuery<SearchUsersResponse, Error>({
    queryKey: [CERT_SEARCH_KEY, q, page],
    queryFn: () =>
      certificateAdminApi.searchUsers(q, page).then((res) => res.data.data),
    enabled: enabled && q.length >= 2,
  });
};

export const useIssueCertificate = () => {
  const queryClient = useQueryClient();

  return useMutation<CertificateRecord, Error, IssueCertificateInput>({
    mutationFn: (data) =>
      certificateAdminApi.issueCertificate(data).then((res) => res.data.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [CERT_ADMIN_KEY] });
      queryClient.invalidateQueries({ queryKey: [CERT_SEARCH_KEY] });
    },
  });
};

export const useSendCertificateToClient = () => {
  return useMutation<CertificateRecord, Error, string>({
    mutationFn: (certificateId) =>
      certificateAdminApi.sendToClient(certificateId).then((res) => res.data.data),
  });
};

export const useListCertificates = (params?: {
  status?: string;
  type?: string;
  page?: number;
}) => {
  return useQuery({
    queryKey: [CERT_ADMIN_KEY, params],
    queryFn: () =>
      certificateAdminApi.listCertificates(params).then((res) => res.data.data),
  });
};

export const useRevokeCertificate = () => {
  const queryClient = useQueryClient();
  return useMutation<CertificateRecord, Error, string>({
    mutationFn: (certificateId) =>
      certificateAdminApi.revokeCertificate(certificateId).then((res) => res.data.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [CERT_ADMIN_KEY] });
    },
  });
};

export const useDownloadCertificate = () => {
  const [isDownloading, setIsDownloading] = useState(false);

  const download = useCallback(async (certificateId: string) => {
    try {
      setIsDownloading(true);
      const url = await getCertificateDownloadUrl(certificateId);
      await Linking.openURL(url);
    } catch (error) {
      Alert.alert("Erreur", "Impossible de télécharger le certificat.");
    } finally {
      setIsDownloading(false);
    }
  }, []);

  return { download, isDownloading };
};
