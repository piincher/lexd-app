import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity } from "react-native";
import { QueuedAction } from "../lib/offlineQueue";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { createStyles } from "./ConflictResolver.styles";
import { VersionCard } from "./VersionCard";

export interface ConflictData {
  action: QueuedAction;
  serverData: any;
  clientData: any;
  fieldName?: string;
}

interface ConflictResolverProps {
  visible: boolean;
  conflict?: ConflictData;
  onResolve: (resolution: "server" | "client" | "merge", mergedData?: any) => void;
  onDismiss: () => void;
}

export const ConflictResolver: React.FC<ConflictResolverProps> = ({
  visible, conflict, onResolve, onDismiss,
}) => {
  const [selectedOption, setSelectedOption] = useState<"server" | "client" | null>(null);
  const { colors } = useAppTheme();
  const styles = createStyles(colors);

  if (!conflict) return null;
  const { action, serverData, clientData } = conflict;

  const formatDate = (timestamp: number) =>
    new Date(timestamp).toLocaleString("fr-FR", { day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" });

  const handleResolve = () => {
    if (selectedOption) { onResolve(selectedOption); setSelectedOption(null); }
  };

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onDismiss}>
      <View style={styles.overlay}>
        <View style={styles.container}>
          <View style={styles.header}>
            <MaterialCommunityIcons name="alert-decagram" size={32} color="#FF9800" />
            <Text style={styles.title}>Conflit de synchronisation</Text>
            <Text style={styles.subtitle}>Les données ont été modifiées sur le serveur pendant que vous étiez hors ligne</Text>
          </View>

          <View style={styles.actionInfo}>
            <Text style={styles.actionLabel}>Action</Text>
            <Text style={styles.actionValue}>
              {action.type === "CREATE" && "Création"}
              {action.type === "UPDATE" && "Modification"}
              {action.type === "DELETE" && "Suppression"}
              {action.type === "CUSTOM" && "Action personnalisée"}
            </Text>
            <Text style={styles.actionTime}>Modifié le {formatDate(action.timestamp)}</Text>
          </View>

          <View style={styles.comparisonContainer}>
            <VersionCard title="Version serveur" icon="cloud" iconColor="#2196F3" data={serverData} isSelected={selectedOption === "server"} onPress={() => setSelectedOption("server")} styles={styles} />
            <VersionCard title="Votre version" icon="cellphone" iconColor="#FF9800" data={clientData} isSelected={selectedOption === "client"} onPress={() => setSelectedOption("client")} styles={styles} />
          </View>

          <View style={styles.actions}>
            <TouchableOpacity style={styles.cancelButton} onPress={onDismiss}>
              <Text style={styles.cancelButtonText}>Annuler</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.resolveButton, !selectedOption && styles.resolveButtonDisabled]} onPress={handleResolve} disabled={!selectedOption}>
              <Text style={styles.resolveButtonText}>Résoudre</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.helpText}>Sélectionnez la version à conserver. L'autre version sera perdue.</Text>
        </View>
      </View>
    </Modal>
  );
};

export default ConflictResolver;
