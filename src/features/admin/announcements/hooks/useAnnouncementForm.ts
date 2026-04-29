import { useState } from "react";
import type { Announcement, CreateAnnouncementInput } from "../types/announcement.types";

interface UseAnnouncementFormParams {
  onSubmit: (data: CreateAnnouncementInput) => void;
}

export const useAnnouncementForm = ({ onSubmit }: UseAnnouncementFormParams) => {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [type, setType] = useState<Announcement["type"]>("INFO");
  const [placement, setPlacement] = useState<Announcement["placement"]>("TOP_BANNER");
  const [audience, setAudience] = useState<Announcement["audience"]>("ALL");
  const [priority, setPriority] = useState("20");
  const [status, setStatus] = useState<Announcement["status"]>("PUBLISHED");
  const [dismissible, setDismissible] = useState(true);
  const [requiresAck, setRequiresAck] = useState(false);
  const [ctaLabel, setCtaLabel] = useState("");
  const [ctaUrl, setCtaUrl] = useState("");
  const [ctaScreen, setCtaScreen] = useState("");
  const [shippingModes, setShippingModes] = useState("");
  const [goodsStatuses, setGoodsStatuses] = useState("");
  const [destinationCountries, setDestinationCountries] = useState("");
  const [destinationCities, setDestinationCities] = useState("");
  const [hasExpiry, setHasExpiry] = useState(false);
  const [expiryDate, setExpiryDate] = useState<Date | undefined>(undefined);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const handleDismissDatePicker = () => setShowDatePicker(false);
  const handleConfirmDate = (params: { date: Date }) => {
    setExpiryDate(params.date);
    setShowDatePicker(false);
  };
  const handleSubmit = () => {
    const toList = (value: string) =>
      value.split(",").map((item) => item.trim()).filter(Boolean);
    onSubmit({
      title: title.trim(),
      message: message.trim(),
      type,
      placement,
      audience,
      priority: Number(priority) || 0,
      status,
      startAt: new Date().toISOString(),
      endAt: hasExpiry && expiryDate ? expiryDate.toISOString() : null,
      dismissible: requiresAck ? false : dismissible,
      requiresAcknowledgement: requiresAck,
      ctaLabel: ctaLabel.trim() || null,
      ctaUrl: ctaUrl.trim() || null,
      ctaScreen: ctaScreen.trim() || null,
      targeting: {
        shippingModes: toList(shippingModes),
        goodsStatuses: toList(goodsStatuses),
        destinationCountries: toList(destinationCountries).map((item) => item.toUpperCase()),
        destinationCities: toList(destinationCities),
      },
    });
  };
  const isValid = title.trim().length > 0 && message.trim().length > 0;
  return {
    title, setTitle, message, setMessage,
    type, setType, placement, setPlacement,
    audience, setAudience, priority, setPriority,
    status, setStatus, dismissible, setDismissible,
    requiresAck, setRequiresAck, ctaLabel, setCtaLabel,
    ctaUrl, setCtaUrl, ctaScreen, setCtaScreen,
    shippingModes, setShippingModes, goodsStatuses, setGoodsStatuses,
    destinationCountries, setDestinationCountries,
    destinationCities, setDestinationCities,
    hasExpiry, setHasExpiry, expiryDate, setExpiryDate,
    showDatePicker, setShowDatePicker,
    handleDismissDatePicker, handleConfirmDate,
    handleSubmit, isValid,
  };
};
