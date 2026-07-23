import React from "react";
import { View } from "react-native";
import { Input } from "@src/shared/ui/Input";
import { Button } from "@src/shared/ui/Button";
import { useAnnouncementForm } from "../../hooks/useAnnouncementForm";
import type { Announcement, CreateAnnouncementInput } from "../../types/announcement.types";
import { styles } from "./AnnouncementForm.styles";
import { AnnouncementSelectFields } from "./AnnouncementSelectFields";
import { AnnouncementTargetingFields } from "./AnnouncementTargetingFields";
import { AnnouncementStatusToggle } from "./components/AnnouncementStatusToggle";
import { AnnouncementCTAFields } from "./components/AnnouncementCTAFields";
import { AnnouncementFormToggles } from "./components/AnnouncementFormToggles";
import { AnnouncementExpiryPicker } from "./components/AnnouncementExpiryPicker";
import { AnnouncementImagePicker } from "./components/AnnouncementImagePicker";
import { AnnouncementBlocksEditor } from "./components/AnnouncementBlocksEditor";
import { useAnnouncementUploadTracker } from "../../hooks/useAnnouncementUploadTracker";

interface AnnouncementFormProps {
  onSubmit: (data: CreateAnnouncementInput) => void;
  initialValues?: Announcement;
  isLoading?: boolean;
  submitLabel?: string;
  onInputFocus?: () => void;
}

export const AnnouncementForm: React.FC<AnnouncementFormProps> = ({
  onSubmit,
  initialValues,
  isLoading = false,
  submitLabel = "Publier l'annonce",
  onInputFocus,
}) => {
  const form = useAnnouncementForm({ onSubmit, initialValues });
  const uploads = useAnnouncementUploadTracker();

  return (
    <View style={styles.container}>
      <Input
        label="Titre *"
        value={form.title}
        onChangeText={form.setTitle}
        fullWidth
        onFocus={onInputFocus}
      />

      <Input
        label="Message *"
        value={form.message}
        onChangeText={form.setMessage}
        multiline
        numberOfLines={4}
        fullWidth
        inputStyle={styles.messageInput}
        onFocus={onInputFocus}
      />

      <AnnouncementImagePicker
        label="Image principale (optionnel)"
        value={form.imageUrl}
        onChange={form.setImageUrl}
        onClear={() => form.setImageUrl(null)}
        onUploadingChange={uploads.setUploading}
      />

      <AnnouncementBlocksEditor
        blocks={form.blocks}
        onChange={form.setBlocks}
        onInputFocus={onInputFocus}
        onUploadingChange={uploads.setUploading}
      />

      <AnnouncementSelectFields
        type={form.type}
        placement={form.placement}
        audience={form.audience}
        priority={form.priority}
        onTypeChange={form.setType}
        onPlacementChange={form.setPlacement}
        onAudienceChange={form.setAudience}
        onPriorityChange={form.setPriority}
      />

      <AnnouncementStatusToggle
        status={form.status}
        onStatusChange={form.setStatus}
      />

      <AnnouncementCTAFields
        ctaLabel={form.ctaLabel}
        ctaUrl={form.ctaUrl}
        ctaScreen={form.ctaScreen}
        onCtaLabelChange={form.setCtaLabel}
        onCtaUrlChange={form.setCtaUrl}
        onCtaScreenChange={form.setCtaScreen}
        onInputFocus={onInputFocus}
      />

      <AnnouncementTargetingFields
        shippingModes={form.shippingModes}
        goodsStatuses={form.goodsStatuses}
        destinationCountries={form.destinationCountries}
        destinationCities={form.destinationCities}
        onShippingModesChange={form.setShippingModes}
        onGoodsStatusesChange={form.setGoodsStatuses}
        onDestinationCountriesChange={form.setDestinationCountries}
        onDestinationCitiesChange={form.setDestinationCities}
      />

      <AnnouncementFormToggles
        dismissible={form.dismissible}
        requiresAck={form.requiresAck}
        hasExpiry={form.hasExpiry}
        onDismissibleChange={form.setDismissible}
        onRequiresAckChange={form.setRequiresAck}
        onHasExpiryChange={form.setHasExpiry}
      />

      <AnnouncementExpiryPicker
        hasExpiry={form.hasExpiry}
        expiryDate={form.expiryDate}
        showDatePicker={form.showDatePicker}
        onShowDatePicker={() => form.setShowDatePicker(true)}
        onDismissDatePicker={form.handleDismissDatePicker}
        onConfirmDate={form.handleConfirmDate}
      />

      <View style={styles.actions}>
        <Button
          title={uploads.isUploading ? "Envoi des images…" : submitLabel}
          variant="primary"
          onPress={form.handleSubmit}
          loading={isLoading || uploads.isUploading}
          disabled={!form.isValid || isLoading || uploads.isUploading}
          fullWidth
        />
      </View>
    </View>
  );
};
