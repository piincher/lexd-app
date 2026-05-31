import { useCallback, useMemo, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { showMessage } from "react-native-flash-message";
import * as Haptics from "expo-haptics";
import {
  getWhatsAppConfig,
  sendWhatsAppMediaMessage,
  sendWhatsAppMessage,
  type WhatsAppMediaType,
} from "../api/whatsappApi";

export type WhatsAppSendMode = "text" | "media";

const normalizePhone = (value: string) => value.replace(/[^\d+]/g, "");

export const useSendWhatsAppScreen = () => {
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [mode, setMode] = useState<WhatsAppSendMode>("text");
  const [mediaUrl, setMediaUrl] = useState("");
  const [mediaType, setMediaType] = useState<WhatsAppMediaType>("image");

  const configQuery = useQuery({
    queryKey: ["whatsapp", "config"],
    queryFn: getWhatsAppConfig,
  });

  const resetForm = () => {
    setPhone("");
    setMessage("");
    setMediaUrl("");
    setMode("text");
    setMediaType("image");
  };

  const mutation = useMutation({
    mutationFn: async () => {
      const cleanPhone = normalizePhone(phone);
      const cleanMessage = message.trim();
      if (mode === "media") {
        return sendWhatsAppMediaMessage({
          phone: cleanPhone,
          message: cleanMessage,
          mediaUrl: mediaUrl.trim(),
          mediaType,
        });
      }
      return sendWhatsAppMessage({ phone: cleanPhone, message: cleanMessage });
    },
    onSuccess: () => {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      showMessage({ message: "WhatsApp envoyé", type: "success" });
      resetForm();
    },
    onError: (error: Error) => {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      showMessage({
        message: "Échec WhatsApp",
        description: error.message || "Impossible d'envoyer le message.",
        type: "danger",
      });
    },
  });

  const canSend = useMemo(() => {
    if (!normalizePhone(phone) || !message.trim()) return false;
    if (mode === "media" && !mediaUrl.trim()) return false;
    return !mutation.isPending && configQuery.data?.enabled !== false;
  }, [phone, message, mode, mediaUrl, mutation.isPending, configQuery.data?.enabled]);

  const handleSend = useCallback(() => {
    if (!normalizePhone(phone)) return showMessage({ message: "Numéro requis", type: "warning" });
    if (!message.trim()) return showMessage({ message: "Message requis", type: "warning" });
    if (mode === "media" && !mediaUrl.trim()) return showMessage({ message: "Lien média requis", type: "warning" });
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    mutation.mutate();
  }, [phone, message, mode, mediaUrl, mutation]);

  return {
    phone,
    setPhone,
    message,
    setMessage,
    mode,
    setMode,
    mediaUrl,
    setMediaUrl,
    mediaType,
    setMediaType,
    canSend,
    isSending: mutation.isPending,
    config: configQuery.data,
    isConfigLoading: configQuery.isLoading,
    handleSend,
  };
};
