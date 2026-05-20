import React from "react";
import { View, Text } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { MotiView } from "moti";
import { TrustBadge } from "../../api/trustProfileApi";

interface Props {
  earned: TrustBadge[];
  locked: TrustBadge[];
  colors: any;
}

const BADGE_ICONS: Record<string, any> = {
  rocket: "rocket",
  cube: "view-module",
  diamond: "diamond",
  time: "schedule",
  heart: "favorite",
  trophy: "emoji-events",
};

const BadgeItem: React.FC<{ badge: TrustBadge; earned: boolean; colors: any; index: number }> = ({
  badge,
  earned,
  colors,
  index,
}) => (
  <MotiView
    from={{ opacity: 0, translateY: 10 }}
    animate={{ opacity: 1, translateY: 0 }}
    transition={{ delay: index * 80, type: "timing", duration: 400 }}
    style={{
      alignItems: "center",
      width: 90,
      marginVertical: 8,
      opacity: earned ? 1 : 0.45,
    }}
  >
    <View
      style={{
        width: 52,
        height: 52,
        borderRadius: 26,
        backgroundColor: earned ? colors.primary.light + "30" : colors.background.tertiary,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 2,
        borderColor: earned ? colors.primary.main : colors.divider,
      }}
    >
      <MaterialIcons
        name={BADGE_ICONS[badge.icon] || "stars"}
        size={24}
        color={earned ? colors.primary.main : colors.text.disabled}
      />
    </View>
    <Text
      style={{
        fontSize: 11,
        fontWeight: earned ? "600" : "400",
        color: earned ? colors.text.primary : colors.text.disabled,
        textAlign: "center",
        marginTop: 6,
      }}
      numberOfLines={2}
    >
      {badge.label}
    </Text>
  </MotiView>
);

export const BadgeGrid: React.FC<Props> = ({ earned, locked, colors }) => {
  const all = [
    ...earned.map((b) => ({ ...b, earned: true })),
    ...locked.map((b) => ({ ...b, earned: false })),
  ];

  return (
    <View style={{ paddingHorizontal: 16, paddingVertical: 12 }}>
      <Text style={{ fontSize: 16, fontWeight: "700", color: colors.text.primary, marginBottom: 12 }}>
        Badges
      </Text>
      <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" }}>
        {all.map((badge, i) => (
          <BadgeItem key={badge.id} badge={badge} earned={badge.earned} colors={colors} index={i} />
        ))}
      </View>
    </View>
  );
};
