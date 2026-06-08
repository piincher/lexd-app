import { useCallback, useMemo, useRef, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { showMessage } from "react-native-flash-message";
import * as Haptics from "expo-haptics";
import { useCalendar } from "@src/components/Calendar/Calendar";
import { fetchAllUsersForSms, getOrdersByDepartureDate } from "../api/smsApi";
import {
  getWhatsAppConfig,
  sendWhatsAppBulkMessage,
  type WhatsAppBulkRecipient,
  type WhatsAppBulkSummary,
} from "../api/whatsappApi";
import type { Recipient } from "../components/RecipientSelector";
import type { PersonalizationToken } from "../components/WhatsAppMessageComposer";
import { useWhatsAppMedia } from "./useWhatsAppMedia";

export type WhatsAppSourceMode = "all" | "date";

/** Full recipient record kept alongside the lightweight selector list. */
interface RichRecipient extends Recipient {
  firstName?: string;
  lastName?: string;
}

/** Strip to a comparable digits-only key so DB numbers and manual entries dedupe. */
const toDigitsKey = (value: string) => {
  let digits = (value || "").replace(/\D/g, "");
  if (digits.startsWith("00")) digits = digits.slice(2);
  if (digits.length === 8) digits = `223${digits}`; // local Mali fallback (mirrors backend)
  return digits;
};

const normalizePhoneInput = (value: string) => value.replace(/[^\d+]/g, "");

const isValidPhone = (value: string) => {
  const digits = toDigitsKey(value);
  return digits.length >= 8 && digits.length <= 15;
};

const splitName = (full: string): { firstName: string; lastName: string } => {
  const trimmed = (full || "").trim();
  if (!trimmed) return { firstName: "", lastName: "" };
  const [first, ...rest] = trimmed.split(/\s+/);
  return { firstName: first, lastName: rest.join(" ") };
};

export const useSendWhatsAppScreen = () => {
  const [mode, setMode] = useState<WhatsAppSourceMode>("all");
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState("");
  const [manualNumbers, setManualNumbers] = useState<string[]>([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const sentCountRef = useRef(0);

  const media = useWhatsAppMedia();
  const calendar = useCalendar();
  const date = calendar.date as Date | undefined;

  const configQuery = useQuery({ queryKey: ["whatsapp", "config"], queryFn: getWhatsAppConfig });
  const { data: usersData, isLoading: isLoadingUsers } = useQuery({
    queryKey: ["users"],
    queryFn: fetchAllUsersForSms,
  });
  const {
    mutate: fetchByDate,
    data: dateData,
    isPending: isFetchingByDate,
    reset: resetDateData,
  } = useMutation({ mutationFn: getOrdersByDepartureDate });

  // Rich recipient list for the current source — drives both the selector UI
  // (id/name/phone) and the personalized send payload (first/last name).
  const richRecipients = useMemo<RichRecipient[]>(() => {
    if (mode === "date") {
      return (dateData ?? [])
        .filter((item: any) => item?.clientPhone)
        .map((item: any) => {
          const { firstName, lastName } = splitName(item.clientName || "");
          return {
            id: String(item.clientPhone),
            name: (item.clientName || item.clientPhone).trim(),
            phone: String(item.clientPhone),
            firstName,
            lastName,
          };
        });
    }
    return (usersData ?? [])
      .filter((u: any) => u?.phoneNumber && !u?.blocked?.isBlocked)
      .map((u: any) => ({
        id: String(u.phoneNumber),
        name: `${u.firstName ?? ""} ${u.lastName ?? ""}`.trim() || String(u.phoneNumber),
        phone: String(u.phoneNumber),
        firstName: u.firstName,
        lastName: u.lastName,
      }));
  }, [mode, usersData, dateData]);

  const recipientMap = useMemo(() => {
    const map = new Map<string, RichRecipient>();
    richRecipients.forEach((r) => map.set(r.id, r));
    return map;
  }, [richRecipients]);

  const allRecipients = useMemo<Recipient[]>(
    () => richRecipients.map(({ id, name, phone }) => ({ id, name, phone })),
    [richRecipients]
  );

  const dateLabel =
    date instanceof Date
      ? date.toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })
      : "";

  // Final, deduped recipient payload: selected users + manual numbers.
  const payloadRecipients = useMemo<WhatsAppBulkRecipient[]>(() => {
    const seen = new Set<string>();
    const out: WhatsAppBulkRecipient[] = [];

    const push = (rec: WhatsAppBulkRecipient) => {
      const key = toDigitsKey(rec.phone);
      if (!key || seen.has(key)) return;
      seen.add(key);
      out.push(rec);
    };

    selectedIds.forEach((id) => {
      const r = recipientMap.get(id);
      if (r) push({ phone: r.phone, name: r.name, firstName: r.firstName, lastName: r.lastName });
    });
    manualNumbers.forEach((phone) => push({ phone }));

    return out;
  }, [selectedIds, recipientMap, manualNumbers]);

  const recipientCount = payloadRecipients.length;
  const mediaBlocked = media.items.length > 0 && (media.isUploading || media.hasErrors);

  const handleModeChange = useCallback((next: WhatsAppSourceMode) => {
    setMode(next);
    setSelectedIds(new Set());
    setSearch("");
  }, []);

  const handleToggle = useCallback((id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const handleSelectAll = useCallback(() => {
    const filtered = allRecipients.filter(
      (r) => r.name.toLowerCase().includes(search.toLowerCase()) || r.phone.includes(search)
    );
    setSelectedIds(new Set(filtered.map((r) => r.id)));
  }, [allRecipients, search]);

  const handleDeselectAll = useCallback(() => setSelectedIds(new Set()), []);

  const handleOpenCalendar = useCallback(() => {
    resetDateData();
    calendar.setOpen(true);
  }, [resetDateData, calendar]);

  const handleFetchByDate = useCallback(() => {
    if (!(date instanceof Date)) return;
    const departureDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1);
    fetchByDate({ departureDate });
  }, [date, fetchByDate]);

  const addManualNumber = useCallback(
    (raw: string): boolean => {
      const cleaned = normalizePhoneInput(raw);
      if (!isValidPhone(cleaned)) {
        showMessage({ message: "Numéro invalide", type: "warning" });
        return false;
      }
      const key = toDigitsKey(cleaned);
      const existsManual = manualNumbers.some((n) => toDigitsKey(n) === key);
      const existsSelected = Array.from(selectedIds).some((id) => toDigitsKey(id) === key);
      if (existsManual || existsSelected) {
        showMessage({ message: "Numéro déjà ajouté", type: "warning" });
        return false;
      }
      setManualNumbers((prev) => [...prev, cleaned]);
      return true;
    },
    [manualNumbers, selectedIds]
  );

  const removeManualNumber = useCallback((value: string) => {
    setManualNumbers((prev) => prev.filter((n) => n !== value));
  }, []);

  const insertToken = useCallback((token: PersonalizationToken) => {
    setMessage((prev) => {
      if (!prev) return token;
      return /\s$/.test(prev) ? `${prev}${token}` : `${prev} ${token}`;
    });
  }, []);

  const resetForm = useCallback(() => {
    setSelectedIds(new Set());
    setManualNumbers([]);
    setMessage("");
    setSearch("");
    media.reset();
  }, [media]);

  const mutation = useMutation({
    mutationFn: () =>
      sendWhatsAppBulkMessage({
        recipients: payloadRecipients,
        message: message.trim(),
        media: media.uploadedMedia,
      }),
    onSuccess: (summary: WhatsAppBulkSummary) => {
      setShowConfirmation(false);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      sentCountRef.current = summary.sent;
      if (summary.failed > 0 || summary.skipped > 0) {
        showMessage({
          message: `Envoyé à ${summary.sent}/${summary.total}`,
          description: `${summary.failed} échec(s)${summary.skipped ? `, ${summary.skipped} ignoré(s)` : ""}.`,
          type: summary.sent > 0 ? "warning" : "danger",
        });
      }
      if (summary.sent > 0) {
        setShowSuccess(true);
        setTimeout(() => {
          setShowSuccess(false);
          resetForm();
        }, 2500);
      }
    },
    onError: (error: Error) => {
      setShowConfirmation(false);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      showMessage({
        message: "Échec de l'envoi",
        description: error.message || "Impossible d'envoyer le message.",
        type: "danger",
      });
    },
  });

  const canSend = useMemo(() => {
    if (recipientCount === 0) return false;
    if (!message.trim() && media.uploadedMedia.length === 0) return false;
    if (mediaBlocked) return false;
    if (mutation.isPending) return false;
    return configQuery.data?.enabled !== false;
  }, [recipientCount, message, media.uploadedMedia.length, mediaBlocked, mutation.isPending, configQuery.data?.enabled]);

  const handleSendPress = useCallback(() => {
    if (recipientCount === 0) {
      return showMessage({ message: "Sélectionnez au moins un destinataire", type: "warning" });
    }
    if (!message.trim() && media.uploadedMedia.length === 0) {
      return showMessage({ message: "Ajoutez un message ou un média", type: "warning" });
    }
    if (media.isUploading) {
      return showMessage({ message: "Téléversement en cours…", type: "warning" });
    }
    if (media.hasErrors) {
      return showMessage({ message: "Retirez les médias en échec", type: "warning" });
    }
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setShowConfirmation(true);
  }, [recipientCount, message, media.uploadedMedia.length, media.isUploading, media.hasErrors]);

  const handleConfirmSend = useCallback(() => {
    if (mutation.isPending) return;
    mutation.mutate();
  }, [mutation]);

  return {
    // recipients
    mode,
    setMode: handleModeChange,
    allRecipients,
    selectedIds,
    handleToggle,
    handleSelectAll,
    handleDeselectAll,
    search,
    setSearch,
    isLoadingUsers,
    isFetchingByDate,
    dateLabel,
    handleOpenCalendar,
    handleFetchByDate,
    // manual numbers
    manualNumbers,
    addManualNumber,
    removeManualNumber,
    // media
    media,
    // message
    message,
    setMessage,
    insertToken,
    // sending
    recipientCount,
    canSend,
    isSending: mutation.isPending,
    handleSendPress,
    handleConfirmSend,
    showConfirmation,
    setShowConfirmation,
    showSuccess,
    sentCount: sentCountRef.current,
    // config
    config: configQuery.data,
    isConfigLoading: configQuery.isLoading,
    // calendar
    calendar: {
      open: calendar.open,
      date: calendar.date,
      onConfirmSingle: calendar.onConfirmSingle,
      onDismissSingle: calendar.onDismissSingle,
    },
  };
};
