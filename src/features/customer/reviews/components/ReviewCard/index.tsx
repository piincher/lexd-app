import React from "react";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import type { Review } from "../../api";
import { StarRating } from "../StarRating";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { createStyles } from "./ReviewCard.styles";

const formatDate = (dateString: string): string => {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  } catch {
    return dateString;
  }
};

interface ReviewCardProps {
  review: Review;
}

export const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  const goods = typeof review.goodsId === "object" ? review.goodsId : null;
  const isMaritime = goods?.shippingMode === "sea";
  const { colors, isDark } = useAppTheme();
  const styles = createStyles(colors, isDark);

  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.goodsId}>{goods ? goods.goodsId : "—"}</Text>
        {goods && (
          <View
            style={[
              styles.badge,
              isMaritime ? styles.badgeMaritime : styles.badgeAerien,
            ]}
          >
            <Text
              style={[
                styles.badgeText,
                isMaritime
                  ? styles.badgeMaritimeText
                  : styles.badgeAerienText,
              ]}
            >
              {isMaritime ? "Maritime" : "Aérien"}
            </Text>
          </View>
        )}
      </View>

      <StarRating rating={review.rating} />

      {review.comment ? (
        <Text style={styles.commentText}>{review.comment}</Text>
      ) : null}

      <View style={styles.dateRow}>
        <Ionicons
          name="calendar-outline"
          size={14}
          color={colors.text.secondary}
        />
        <Text style={styles.dateText}>{formatDate(review.createdAt)}</Text>
      </View>

      {review.adminResponse ? (
        <View style={styles.responseContainer}>
          <Text style={styles.responseLabel}>
            Réponse de l'équipe ChinaLink :
          </Text>
          <Text style={styles.responseText}>{review.adminResponse}</Text>
        </View>
      ) : null}
    </View>
  );
};
