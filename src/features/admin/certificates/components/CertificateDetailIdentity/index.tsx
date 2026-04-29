import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Theme } from "@src/constants/Theme";
import { styles } from "./CertificateDetailIdentity.styles";

interface CertificateDetailIdentityProps {
  certificateId: string;
  onCopyCode: () => void;
}

export const CertificateDetailIdentity: React.FC<
  CertificateDetailIdentityProps
> = ({ certificateId, onCopyCode }) => {
  return (
    <View style={styles.idContainer}>
      <MaterialIcons name="verified" size={28} color="#d4a843" />
      <Text style={styles.certificateIdText}>{certificateId}</Text>
      <TouchableOpacity onPress={onCopyCode} style={styles.copyButton}>
        <Ionicons
          name="copy-outline"
          size={20}
          color={Theme.colors.text.secondary}
        />
      </TouchableOpacity>
    </View>
  );
};
