import React from "react";
import { Input } from "@src/shared/ui/Input";

interface Props {
  ctaLabel: string;
  ctaUrl: string;
  ctaScreen: string;
  onCtaLabelChange: (value: string) => void;
  onCtaUrlChange: (value: string) => void;
  onCtaScreenChange: (value: string) => void;
  onInputFocus?: () => void;
}

export const AnnouncementCTAFields: React.FC<Props> = ({
  ctaLabel,
  ctaUrl,
  ctaScreen,
  onCtaLabelChange,
  onCtaUrlChange,
  onCtaScreenChange,
  onInputFocus,
}) => (
  <>
    <Input
      label="Bouton CTA (optionnel)"
      value={ctaLabel}
      onChangeText={onCtaLabelChange}
      fullWidth
      onFocus={onInputFocus}
    />
    <Input
      label="URL CTA (optionnel)"
      value={ctaUrl}
      onChangeText={onCtaUrlChange}
      autoCapitalize="none"
      keyboardType="url"
      fullWidth
      onFocus={onInputFocus}
    />
    <Input
      label="Écran app CTA (optionnel)"
      value={ctaScreen}
      onChangeText={onCtaScreenChange}
      autoCapitalize="none"
      fullWidth
      onFocus={onInputFocus}
    />
  </>
);
