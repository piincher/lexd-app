import { useState } from "react";
import type {
  Announcement,
  AnnouncementBlockInput,
  CreateAnnouncementInput,
} from "../types/announcement.types";

interface UseAnnouncementFormParams {
  onSubmit: (data: CreateAnnouncementInput) => void;
  initialValues?: Announcement;
}

const joinList = (items?: string[]) => items?.join(", ") || "";

export const useAnnouncementForm = ({ onSubmit, initialValues }: UseAnnouncementFormParams) => {
  const [title, setTitle] = useState(initialValues?.title || "");
  const [message, setMessage] = useState(initialValues?.message || "");
  const [imageUrl, setImageUrl] = useState<string | null>(initialValues?.imageUrl ?? null);
  const [blocks, setBlocks] = useState<AnnouncementBlockInput[]>(initialValues?.blocks ?? []);
  const [type, setType] = useState<Announcement["type"]>(initialValues?.type || "INFO");
  const [placement, setPlacement] = useState<Announcement["placement"]>(
    initialValues?.placement || "TOP_BANNER"
  );
  const [audience, setAudience] = useState<Announcement["audience"]>(initialValues?.audience || "ALL");
  const [priority, setPriority] = useState(String(initialValues?.priority ?? 20));
  const [status, setStatus] = useState<Announcement["status"]>(initialValues?.status || "PUBLISHED");
  const [dismissible, setDismissible] = useState(initialValues?.dismissible ?? true);
  const [requiresAck, setRequiresAck] = useState(initialValues?.requiresAcknowledgement ?? false);
  const [ctaLabel, setCtaLabel] = useState(initialValues?.ctaLabel || "");
  const [ctaUrl, setCtaUrl] = useState(initialValues?.ctaUrl || "");
  const [ctaScreen, setCtaScreen] = useState(initialValues?.ctaScreen || "");
  const [shippingModes, setShippingModes] = useState(joinList(initialValues?.targeting?.shippingModes));
  const [goodsStatuses, setGoodsStatuses] = useState(joinList(initialValues?.targeting?.goodsStatuses));
  const [destinationCountries, setDestinationCountries] = useState(
    joinList(initialValues?.targeting?.destinationCountries)
  );
  const [destinationCities, setDestinationCities] = useState(
    joinList(initialValues?.targeting?.destinationCities)
  );
  const [hasExpiry, setHasExpiry] = useState(Boolean(initialValues?.endAt));
  const [expiryDate, setExpiryDate] = useState<Date | undefined>(
    initialValues?.endAt ? new Date(initialValues.endAt) : undefined
  );
  const [showDatePicker, setShowDatePicker] = useState(false);
  const handleDismissDatePicker = () => setShowDatePicker(false);
  const handleConfirmDate = (params: { date: Date }) => {
    setExpiryDate(params.date);
    setShowDatePicker(false);
  };
  const handleSubmit = () => {
    const toList = (value: string) =>
      value.split(",").map((item) => item.trim()).filter(Boolean);
    const cleanBlocks = blocks
      .map((block) => ({
        heading: (block.heading ?? "").trim(),
        body: (block.body ?? "").trim(),
        imageUrl: block.imageUrl ?? null,
      }))
      .filter((block) => block.heading || block.body || block.imageUrl);
    onSubmit({
      title: title.trim(),
      message: message.trim(),
      imageUrl: imageUrl || null,
      blocks: cleanBlocks,
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
    imageUrl, setImageUrl, blocks, setBlocks,
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
