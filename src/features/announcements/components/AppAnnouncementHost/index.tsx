import React from "react";
import { AnnouncementBanner } from "../AnnouncementBanner";
import { AnnouncementModal } from "../AnnouncementModal";
import { useAnnouncementHost } from "../../hooks/useAnnouncementHost";

export const AppAnnouncementHost: React.FC = () => {
  const {
    banner,
    selected,
    isAcknowledging,
    handleOpen,
    handleDismiss,
    handleAction,
    closeModal,
    acknowledgeSelected,
  } = useAnnouncementHost();

  return (
    <>
      {banner && (
        <AnnouncementBanner
          announcement={banner}
          onPress={() => handleOpen(banner)}
          onDismiss={() => handleDismiss(banner)}
        />
      )}
      <AnnouncementModal
        announcement={selected}
        visible={!!selected}
        onClose={closeModal}
        onAcknowledge={acknowledgeSelected}
        onAction={handleAction}
        isAcknowledging={isAcknowledging}
      />
    </>
  );
};
