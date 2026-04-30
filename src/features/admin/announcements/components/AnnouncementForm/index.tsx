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

interface AnnouncementFormProps {
  onSubmit: (data: CreateAnnouncementInput) => void;
  initialValues?: Announcement;
  isLoading?: boolean;
  submitLabel?: string;
}

export const AnnouncementForm: React.FC<AnnouncementFormProps> = ({
  onSubmit,
  initialValues,
  isLoading = false,
  submitLabel = "Publier l'annonce",
}) => {
  const form = useAnnouncementForm({ onSubmit, initialValues });

  return (
    <View style={styles.container}>
      <Input
        label="Titre *"
        value={form.title}
        onChangeText={form.setTitle}
        fullWidth
      />

      <Input
        label="Message *"
        value={form.message}
        onChangeText={form.setMessage}
        multiline
        numberOfLines={4}
        fullWidth
        inputStyle={styles.messageInput}
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
          title={submitLabel}
          variant="primary"
          onPress={form.handleSubmit}
          loading={isLoading}
          disabled={!form.isValid || isLoading}
          fullWidth
        />
      </View>
    </View>
  );
};
