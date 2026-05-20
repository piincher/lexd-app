import React from "react";
import { View, Text } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { TrustProfile } from "../../api/trustProfileApi";

interface Props {
  profile: TrustProfile;
  colors: any;
}

export const TrustProfileHeader: React.FC<Props> = ({ profile, colors }) => (
  <View style={{ alignItems: "center", paddingVertical: 20 }}>
    <View
      style={{
        width: 72,
        height: 72,
        borderRadius: 36,
        backgroundColor: colors.primary.main + "15",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 12,
      }}
    >
      <MaterialIcons name="person" size={36} color={colors.primary.main} />
    </View>
    <Text style={{ fontSize: 22, fontWeight: "700", color: colors.text.primary }}>
      {profile.name}
    </Text>
    <Text style={{ fontSize: 13, color: colors.text.secondary, marginTop: 4 }}>
      Membre depuis {new Date(profile.memberSince).getFullYear()}
    </Text>
    <View style={{ flexDirection: "row", marginTop: 16, gap: 24 }}>
      <View style={{ alignItems: "center" }}>
        <Text style={{ fontSize: 20, fontWeight: "700", color: colors.primary.main }}>
          {profile.totalShipments}
        </Text>
        <Text style={{ fontSize: 11, color: colors.text.secondary, marginTop: 2 }}>Expéditions</Text>
      </View>
      <View style={{ alignItems: "center" }}>
        <Text style={{ fontSize: 20, fontWeight: "700", color: colors.primary.main }}>
          {profile.totalCBM}
        </Text>
        <Text style={{ fontSize: 11, color: colors.text.secondary, marginTop: 2 }}>CBM Total</Text>
      </View>
      <View style={{ alignItems: "center" }}>
        <Text style={{ fontSize: 20, fontWeight: "700", color: colors.primary.main }}>
          {profile.successfulRate}%
        </Text>
        <Text style={{ fontSize: 11, color: colors.text.secondary, marginTop: 2 }}>Réussite</Text>
      </View>
    </View>
  </View>
);
