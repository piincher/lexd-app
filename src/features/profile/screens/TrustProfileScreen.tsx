import React, { useMemo } from "react";
import { ScrollView, View, Text, RefreshControl } from "react-native";
import { Screen } from "@src/shared/ui/Screen";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { Share } from "react-native";
import { useTrustProfile } from "../hooks/useTrustProfile";
import { useShareTrustProfile } from "../hooks/useShareTrustProfile";
import { TrustProfileHeader } from "../components/TrustProfile/TrustProfileHeader";
import { TrustScoreRing } from "../components/TrustProfile/TrustScoreRing";
import { BadgeGrid } from "../components/TrustProfile/BadgeGrid";
import { ShareButton } from "../components/TrustProfile/ShareButton";

export default function TrustProfileScreen() {
  const { colors, isDark } = useAppTheme();
  const { data: profile, isLoading, refetch } = useTrustProfile();
  const { mutate: shareProfile, isPending: isSharing } = useShareTrustProfile();

  const trackColor = useMemo(() => (isDark ? "#374151" : "#E5E7EB"), [isDark]);

  const handleShare = () => {
    shareProfile(undefined, {
      onSuccess: (data) => {
        Share.share({ message: `Mon profil marchand ChinaLink: ${data.shareUrl}`, title: "Profil Marchand" });
      },
    });
  };

  if (isLoading || !profile) {
    return (
      <Screen header={{ title: "Profil de Confiance" }}>
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
          <Text style={{ color: colors.text.secondary }}>Chargement...</Text>
        </View>
      </Screen>
    );
  }

  return (
    <Screen header={{ title: "Profil de Confiance" }}>
      <ScrollView
        refreshControl={<RefreshControl refreshing={isLoading} onRefresh={refetch} tintColor={colors.primary.main} />}
        showsVerticalScrollIndicator={false}
      >
        <TrustProfileHeader profile={profile} colors={colors} />
        <View style={{ alignItems: "center", marginVertical: 8 }}>
          <TrustScoreRing score={profile.trustScore} color={colors.primary.main} trackColor={trackColor} />
        </View>
        {profile.isCertified && (
          <View style={{ alignItems: "center", marginBottom: 8 }}>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 6, backgroundColor: colors.accent.gold + "15", paddingHorizontal: 14, paddingVertical: 6, borderRadius: 20 }}>
              <Text style={{ fontSize: 13, fontWeight: "700", color: colors.accent.gold }}>Certified Shipper</Text>
            </View>
          </View>
        )}
        <BadgeGrid earned={profile.badges.earned} locked={profile.badges.locked} colors={colors} />
        <ShareButton onShare={handleShare} isLoading={isSharing} colors={colors} />
      </ScrollView>
    </Screen>
  );
}
