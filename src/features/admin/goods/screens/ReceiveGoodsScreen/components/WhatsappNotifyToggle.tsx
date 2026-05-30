/**
 * WhatsappNotifyToggle — per-receipt WhatsApp opt-out switch.
 *
 * Operators flip this off when the client has asked not to receive a WhatsApp
 * message on intake. Default ON so existing behavior is unchanged. Only the
 * WhatsApp message is skipped — push and in-app notifications still fire so
 * the client can still find the parcel inside the app.
 *
 * Mirrors the layout/voice of UnknownClientToggle so the receive form reads
 * as one cohesive surface, not a patchwork of one-off widgets.
 */

import React from "react";
import { View } from "react-native";
import { Switch, Text } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { createWhatsappNotifyStyles } from "./WhatsappNotifyToggle.styles";

interface WhatsappNotifyToggleProps {
  value: boolean;
  onChange: (value: boolean) => void;
}

export const WhatsappNotifyToggle: React.FC<WhatsappNotifyToggleProps> = ({ value, onChange }) => {
  const { colors } = useAppTheme();
  const styles = createWhatsappNotifyStyles(colors);

  // The icon + accent shifts when off — small but unambiguous: amber + muted
  // icon when the operator has chosen to NOT notify, brand-green check when
  // the default behavior holds. No celebratory toasts; this is a quiet flip.
  const iconColor = value ? colors.status.success : colors.text.disabled;
  const subtitle = value
    ? "Le client recevra un message à la réception."
    : "Aucun message WhatsApp ne sera envoyé pour ce colis.";

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.iconWrap}>
          <Ionicons
            name={value ? "logo-whatsapp" : "notifications-off-outline"}
            size={20}
            color={iconColor}
          />
        </View>
        <View style={styles.textWrap}>
          <Text style={styles.title}>Notifier par WhatsApp</Text>
          <Text style={styles.subtitle}>{subtitle}</Text>
        </View>
        <Switch value={value} onValueChange={onChange} />
      </View>
    </View>
  );
};

export default WhatsappNotifyToggle;
