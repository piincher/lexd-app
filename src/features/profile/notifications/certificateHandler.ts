import { certificateApi } from "../api/certificateApi";
import { registerCustomHandler, getNavigationRef } from "@src/shared/notifications";
import type { NotificationData } from "@src/shared/services/notificationService";

const navigate = (screenName: string, params?: Record<string, any>): void => {
  const navigationRef = getNavigationRef();
  if (navigationRef?.isReady()) {
    navigationRef.navigate(screenName as never, params as never);
  } else {
    console.warn(
      "[CertificateHandler] Navigation not ready, queuing navigation to:",
      screenName
    );
    setTimeout(() => {
      if (navigationRef?.isReady()) {
        navigationRef.navigate(screenName as never, params as never);
      }
    }, 1000);
  }
};

const handleCertificateIssued = async (data: NotificationData) => {
  console.log("[CertificateHandler] Handling CERTIFICATE_ISSUED:", data);

  if (data.screen === "CertificateDetail" && data.params) {
    navigate("CertificateDetail", data.params);
    return;
  }

  try {
    const response = await certificateApi.getProgress();
    const progress = response.data.data;

    if (progress.isCertified && progress.certificate) {
      const cert = progress.certificate;
      navigate("CertificateDetail", {
        certificateId: cert.certificateId,
        verificationCode: cert.verificationCode,
        issuedAt: cert.issuedAt,
        certificateUrl: cert.certificateUrl || null,
        certificateMongoId: cert._id || data.certificateId,
      });
    } else {
      console.warn("[CertificateHandler] Certificate not found in progress, navigating to Profile");
      navigate("Profile");
    }
  } catch (error) {
    console.error("[CertificateHandler] Error fetching certificate progress:", error);
    navigate("Profile");
  }
};

export const registerCertificateNotificationHandler = () => {
  registerCustomHandler("CERTIFICATE_ISSUED", handleCertificateIssued);
};
