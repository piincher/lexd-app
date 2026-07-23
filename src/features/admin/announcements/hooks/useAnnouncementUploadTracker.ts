import { useCallback, useState } from 'react';

export const useAnnouncementUploadTracker = () => {
  const [pendingUploads, setPendingUploads] = useState(0);
  const setUploading = useCallback((uploading: boolean) => {
    setPendingUploads((count) => Math.max(0, count + (uploading ? 1 : -1)));
  }, []);

  return { isUploading: pendingUploads > 0, setUploading };
};
