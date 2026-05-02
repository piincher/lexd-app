import React from "react";
import { View, Text, Image, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Theme } from "@src/constants/Theme";
import { normalizePhotos } from "@src/shared/lib";
import type { Goods } from "../../../goods/types";

interface PackingListRowProps {
  item: Goods;
  index: number;
  showPhotos?: boolean;
  isLast: boolean;
}

export const PackingListRow: React.FC<PackingListRowProps> = ({ item, index, showPhotos = false, isLast }) => {
  const photoUrls = normalizePhotos(item);
  return (
    <View style={[
      { flexDirection: "row", paddingVertical: Theme.spacing.md, paddingHorizontal: Theme.spacing.md, borderBottomWidth: 1, borderBottomColor: Theme.neutral[100], alignItems: "center" },
      index % 2 === 0 ? { backgroundColor: Theme.colors.background.card } : { backgroundColor: Theme.neutral[50] },
      isLast && { borderBottomWidth: 0 },
    ]}>
      <Text style={[{ flex: 0.5, fontSize: 12, fontWeight: "700", color: Theme.primary[600], paddingHorizontal: 4 }]}>{index}</Text>
      <Text style={[{ flex: 1.2, fontSize: 12, fontWeight: "500", color: Theme.neutral[700], paddingHorizontal: 4, fontFamily: Platform.OS === "ios" ? "Courier" : "monospace" }]}>{item.goodsId}</Text>
      <Text style={[{ flex: 2, fontSize: 12, fontWeight: "500", color: Theme.neutral[700], paddingHorizontal: 4 }]} numberOfLines={2} ellipsizeMode="tail">{item.description || "-"}</Text>
      {showPhotos && (
        <View style={[{ flex: 0.6, justifyContent: "center", alignItems: "center", paddingHorizontal: 4 }]}>
          {photoUrls.length > 0 ? (
            <Image source={{ uri: photoUrls[0] }} style={{ width: 32, height: 32, borderRadius: Theme.radius.sm, backgroundColor: Theme.neutral[200] }} />
          ) : (
            <View style={{ width: 32, height: 32, borderRadius: Theme.radius.sm, backgroundColor: Theme.neutral[100], justifyContent: "center", alignItems: "center" }}>
              <Ionicons name="image-outline" size={16} color={Theme.neutral[400]} />
            </View>
          )}
        </View>
      )}
      <Text style={[{ flex: 0.8, fontSize: 12, fontWeight: "600", color: Theme.neutral[700], textAlign: "right", paddingHorizontal: 4 }]}>{item.actualCBM.toFixed(2)}</Text>
      <Text style={[{ flex: 0.8, fontSize: 12, fontWeight: "600", color: Theme.neutral[700], textAlign: "right", paddingHorizontal: 4 }]}>{item.weight.toFixed(0)}</Text>
      <Text style={[{ flex: 0.6, fontSize: 12, fontWeight: "600", color: Theme.neutral[700], textAlign: "right", paddingHorizontal: 4 }]}>{item.quantity || 1}</Text>
    </View>
  );
};
