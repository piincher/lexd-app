import React from "react";
import { Input } from "@src/shared/ui/Input";

interface Props {
  ctaLabel: string;
  ctaUrl: string;
  ctaScreen: string;
  onCtaLabelChange: (value: string) => void;
  onCtaUrlChange: (value: string) => void;
  onCtaScreenChange: (value: string) => void;
}

export const AnnouncementCTAFields: React.FC<Props> = ({
  ctaLabel,
  ctaUrl,
  ctaScreen,
  onCtaLabelChange,
  onCtaUrlChange,
  onCtaScreenChange,
}) => (
  <>
    <Input
      label="Bouton CTA (optionnel)"
      value={ctaLabel}
      onChangeText={onCtaLabelChange}
      fullWidth
    />
    <Input
      label="URL CTA (optionnel)"
      value={ctaUrl}
      onChangeText={onCtaUrlChange}
      autoCapitalize="none"
      keyboardType="url"
      fullWidth
    />
    <Input
      label="Écran app CTA (optionnel)"
      value={ctaScreen}
      onChangeText={onCtaScreenChange}
      autoCapitalize="none"
      fullWidth
    />
  </>
);
