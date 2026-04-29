import React from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAppTheme } from "@src/providers/ThemeProvider";
import type { TargetSegment } from "../../api/campaignApi";
import { createStyles } from "./CampaignRecipientSelector.styles";

const SEGMENT_OPTIONS: { label: string; sublabel: string; value: TargetSegment }[] = [
  { label: "Tous les clients", sublabel: "Envoyer à tous les utilisateurs actifs", value: "all" },
  { label: "Clients actifs", sublabel: "Connectés dans les 90 derniers jours", value: "active_customers" },
  { label: "Clients inactifs", sublabel: "Pas de connexion depuis plus de 90 jours", value: "inactive_customers" },
  { label: "Clients d'un conteneur", sublabel: "Envoyer aux clients avec marchandises dans un conteneur", value: "container_customers" },
];

interface CampaignRecipientSelectorProps {
  segment: TargetSegment;
  onSegmentChange: (segment: TargetSegment) => void;
  selectedContainerId: string | null;
  onSelectContainer: (id: string) => void;
  containersData: any;
  isLoadingContainers: boolean;
}

export const CampaignRecipientSelector: React.FC<CampaignRecipientSelectorProps> = ({
  segment,
  onSegmentChange,
  selectedContainerId,
  onSelectContainer,
  containersData,
  isLoadingContainers,
}) => {
  const { colors, isDark } = useAppTheme();
  const styles = createStyles(colors, isDark);

  const containers = containersData?.data?.containers || containersData?.data || [];

  return (
    <>
      <View style={styles.field}>
        <Text style={styles.label}>Destinataires</Text>
        {SEGMENT_OPTIONS.map((opt) => (
          <TouchableOpacity
            key={opt.value}
            style={[
              styles.segmentOption,
              segment === opt.value && styles.segmentOptionActive,
            ]}
            onPress={() => onSegmentChange(opt.value)}
          >
            <View style={styles.segmentRadio}>
              {segment === opt.value && <View style={styles.segmentRadioDot} />}
            </View>
            <View style={{ flex: 1 }}>
              <Text
                style={[
                  styles.segmentLabel,
                  segment === opt.value && styles.segmentLabelActive,
                ]}
              >
                {opt.label}
              </Text>
              <Text style={styles.segmentSublabel}>{opt.sublabel}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {segment === "container_customers" && (
        <View style={styles.field}>
          <Text style={styles.label}>Conteneur cible</Text>
          {isLoadingContainers ? (
            <ActivityIndicator size="small" color={colors.primary.main} />
          ) : (
            <View style={styles.containerList}>
              {containers.map((container: any) => {
                const isSelected = selectedContainerId === container._id;
                return (
                  <TouchableOpacity
                    key={container._id}
                    style={[
                      styles.containerItem,
                      isSelected && styles.containerItemActive,
                    ]}
                    onPress={() => onSelectContainer(container._id)}
                  >
                    <Ionicons
                      name={isSelected ? "radio-button-on" : "radio-button-off"}
                      size={18}
                      color={isSelected ? colors.primary.main : colors.text.disabled}
                    />
                    <View style={{ flex: 1 }}>
                      <Text
                        style={[
                          styles.containerItemText,
                          isSelected && styles.containerItemTextActive,
                        ]}
                      >
                        {container.virtualContainerNumber || container.containerNumber}
                      </Text>
                      <Text style={styles.containerItemSubtext}>
                        {container.shippingMode} · {container.status}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          )}
        </View>
      )}
    </>
  );
};
