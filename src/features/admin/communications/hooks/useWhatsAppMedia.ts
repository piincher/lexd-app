import { useCallback, useMemo, useRef, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { showMessage } from "react-native-flash-message";
import {
  uploadWhatsAppMedia,
  type UploadedWhatsAppMedia,
  type WhatsAppBroadcastMediaType,
  type WhatsAppLocalMedia,
} from "../api/whatsappApi";

/** Max attachments per send — mirrors the backend MAX_BULK_MEDIA cap. */
export const MAX_WHATSAPP_MEDIA = 10;
/** WhatsApp-safe ceiling; matches the 16 MB server-side multer limit. */
export const MAX_WHATSAPP_MEDIA_BYTES = 16 * 1024 * 1024;

export type WhatsAppMediaStatus = "uploading" | "uploaded" | "error";

export interface WhatsAppMediaItem {
  id: string;
  local: WhatsAppLocalMedia;
  status: WhatsAppMediaStatus;
  progress: number;
  uploaded?: UploadedWhatsAppMedia;
  error?: string;
}

let mediaIdCounter = 0;
const nextMediaId = () => `wa-media-${Date.now()}-${(mediaIdCounter += 1)}`;

const extensionFromUri = (uri: string): string => {
  const clean = uri.split("?")[0];
  const dot = clean.lastIndexOf(".");
  return dot >= 0 ? clean.slice(dot + 1).toLowerCase() : "";
};

const deriveFileName = (asset: ImagePicker.ImagePickerAsset, kind: WhatsAppBroadcastMediaType): string => {
  if (asset.fileName) return asset.fileName;
  const ext = extensionFromUri(asset.uri) || (kind === "video" ? "mp4" : "jpg");
  return `${kind}-${Date.now()}.${ext}`;
};

const deriveMimeType = (asset: ImagePicker.ImagePickerAsset, kind: WhatsAppBroadcastMediaType): string => {
  if (asset.mimeType) return asset.mimeType;
  const ext = extensionFromUri(asset.uri);
  if (kind === "video") {
    if (ext === "mov") return "video/quicktime";
    if (ext === "3gp") return "video/3gpp";
    if (ext === "webm") return "video/webm";
    return "video/mp4";
  }
  if (ext === "png") return "image/png";
  if (ext === "gif") return "image/gif";
  if (ext === "webp") return "image/webp";
  return "image/jpeg";
};

const toLocalMedia = (
  asset: ImagePicker.ImagePickerAsset,
  kind: WhatsAppBroadcastMediaType
): WhatsAppLocalMedia => ({
  uri: asset.uri,
  type: kind,
  fileName: deriveFileName(asset, kind),
  mimeType: deriveMimeType(asset, kind),
  size: asset.fileSize,
  duration: asset.duration ?? null,
  width: asset.width,
  height: asset.height,
});

/**
 * Owns gallery media selection + per-asset upload for the WhatsApp broadcast.
 *
 * Each picked asset is validated (count + size), uploaded immediately to Spaces
 * with progress, and tracked with its own status so the UI can show spinners,
 * retry failures, and only enable "send" once every attachment is uploaded.
 */
export const useWhatsAppMedia = () => {
  const [items, setItems] = useState<WhatsAppMediaItem[]>([]);
  // Mirror of `items` for synchronous reads (capacity checks) without stale closures.
  const itemsRef = useRef<WhatsAppMediaItem[]>([]);
  itemsRef.current = items;

  const patchItem = useCallback((id: string, patch: Partial<WhatsAppMediaItem>) => {
    setItems((prev) => prev.map((it) => (it.id === id ? { ...it, ...patch } : it)));
  }, []);

  const uploadItem = useCallback(
    async (id: string, local: WhatsAppLocalMedia) => {
      try {
        const uploaded = await uploadWhatsAppMedia(local, (percent) =>
          patchItem(id, { progress: percent })
        );
        patchItem(id, { status: "uploaded", progress: 100, uploaded, error: undefined });
      } catch (error) {
        const message = error instanceof Error ? error.message : "Échec du téléversement";
        patchItem(id, { status: "error", error: message });
      }
    },
    [patchItem]
  );

  const addAssets = useCallback(
    (assets: ImagePicker.ImagePickerAsset[], kind: WhatsAppBroadcastMediaType) => {
      // Read current count from a ref so the state updater below stays pure
      // (no side effects) and uploads fire exactly once, even under StrictMode.
      const remaining = MAX_WHATSAPP_MEDIA - itemsRef.current.length;
      if (remaining <= 0) {
        showMessage({ message: `Maximum ${MAX_WHATSAPP_MEDIA} fichiers`, type: "warning" });
        return;
      }

      const accepted: WhatsAppMediaItem[] = [];
      let oversize = 0;
      for (const asset of assets) {
        if (accepted.length >= remaining) break;
        if (asset.fileSize && asset.fileSize > MAX_WHATSAPP_MEDIA_BYTES) {
          oversize += 1;
          continue;
        }
        accepted.push({
          id: nextMediaId(),
          local: toLocalMedia(asset, kind),
          status: "uploading",
          progress: 0,
        });
      }

      if (oversize > 0) {
        showMessage({
          message: oversize === 1 ? "Fichier trop volumineux" : `${oversize} fichiers trop volumineux`,
          description: "Taille maximale 16 Mo par fichier.",
          type: "warning",
        });
      }
      if (assets.length > remaining) {
        showMessage({ message: `Maximum ${MAX_WHATSAPP_MEDIA} fichiers`, type: "warning" });
      }

      if (accepted.length === 0) return;

      setItems((prev) => [...prev, ...accepted]);
      accepted.forEach((it) => {
        void uploadItem(it.id, it.local);
      });
    },
    [uploadItem]
  );

  const pickImages = useCallback(async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      showMessage({ message: "Accès à la galerie requis", type: "warning" });
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsMultipleSelection: true,
      selectionLimit: MAX_WHATSAPP_MEDIA,
      quality: 0.7,
    });
    if (result.canceled || !result.assets?.length) return;
    addAssets(result.assets, "image");
  }, [addAssets]);

  const pickVideos = useCallback(async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      showMessage({ message: "Accès à la galerie requis", type: "warning" });
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["videos"],
      allowsMultipleSelection: true,
      selectionLimit: MAX_WHATSAPP_MEDIA,
      quality: 0.7,
    });
    if (result.canceled || !result.assets?.length) return;
    addAssets(result.assets, "video");
  }, [addAssets]);

  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((it) => it.id !== id));
  }, []);

  const retryItem = useCallback(
    (id: string) => {
      const target = itemsRef.current.find((it) => it.id === id);
      if (!target) return;
      setItems((prev) =>
        prev.map((it) => (it.id === id ? { ...it, status: "uploading", progress: 0, error: undefined } : it))
      );
      void uploadItem(id, target.local);
    },
    [uploadItem]
  );

  const reset = useCallback(() => setItems([]), []);

  const isUploading = useMemo(() => items.some((it) => it.status === "uploading"), [items]);
  const hasErrors = useMemo(() => items.some((it) => it.status === "error"), [items]);

  /** Uploaded attachments in selection order, ready for the send payload. */
  const uploadedMedia = useMemo(
    () =>
      items
        .filter((it): it is WhatsAppMediaItem & { uploaded: UploadedWhatsAppMedia } => !!it.uploaded)
        .map((it) => ({ url: it.uploaded.url, type: it.uploaded.mediaType })),
    [items]
  );

  return {
    items,
    pickImages,
    pickVideos,
    removeItem,
    retryItem,
    reset,
    isUploading,
    hasErrors,
    uploadedMedia,
    count: items.length,
    canAddMore: items.length < MAX_WHATSAPP_MEDIA,
  };
};
