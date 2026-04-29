import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Theme } from "@src/constants/Theme";
import { ClientInfo } from "@src/shared/types/goods";
import { UnassignedGoodsItem } from "../../hooks/useUnassignedGoods";
import { styles } from "./UnassignedGoodsCard.styles";

const formatDate = (dateStr: string) => {
  return new Date(dateStr).toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "short",
  });
};

const getBadgeColor = (days: number) => {
  if (days >= 8) return "#EF4444";
  if (days >= 4) return "#F59E0B";
  return "#10B981";
};

const getClientInfo = (clientId: string | ClientInfo | undefined) => {
  if (!clientId || typeof clientId === "string") return { name: "Inconnu", phone: "" };
  return {
    name: `${clientId.firstName} ${clientId.lastName}`,
    phone: clientId.phoneNumber || "",
  };
};

interface UnassignedGoodsCardProps {
  item: UnassignedGoodsItem;
  onPress: () => void;
}

export const UnassignedGoodsCard: React.FC<UnassignedGoodsCardProps> = ({ item, onPress }) => {
  const { name, phone } = getClientInfo(item.clientId);
  const badgeColor = getBadgeColor(item.daysWaiting);

  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.75} onPress={onPress}>
      <View style={styles.row}>
        <View style={styles.iconContainer}>
          <Ionicons name="cube" size={22} color="#1a5f2a" />
        </View>
        <View style={styles.info}>
          <Text style={styles.goodsId}>{item.goodsId}</Text>
          <Text style={styles.description} numberOfLines={1}>
            {item.description || "Aucune description"}
          </Text>
          <Text style={styles.client}>{name}</Text>
          {phone ? <Text style={styles.phone}>{phone}</Text> : null}
        </View>
        <View style={styles.right}>
          <View style={[styles.badge, { borderColor: badgeColor }]}>
            <Text style={[styles.daysText, { color: badgeColor }]}>
              {item.daysWaiting}j
            </Text>
          </View>
          <Ionicons
            name="chevron-forward"
            size={18}
            color={Theme.colors.text.muted}
            style={styles.chevron}
          />
        </View>
      </View>
      <View style={styles.footer}>
        <Ionicons name="time-outline" size={13} color={Theme.colors.text.muted} />
        <Text style={styles.date}>
          {"  "}Reçu: {formatDate(item.receivedAt)}
        </Text>
        <View style={styles.modeBadge}>
          <Text style={styles.modeText}>{item.shippingMode || "—"}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
