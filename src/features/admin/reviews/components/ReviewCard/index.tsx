import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput, ActivityIndicator, Alert } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { StarRating } from "../StarRating";
import { formatDateLong } from "@src/shared/lib/formatters";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { getStyles } from "./ReviewCard.styles";
import type { AdminReview } from "../../api/reviewAdminApi";

interface ReviewCardProps {
  review: AdminReview;
  onRespond: (reviewId: string, response: string) => void;
  isResponding: boolean;
}

export const ReviewCard: React.FC<ReviewCardProps> = ({
  review,
  onRespond,
  isResponding,
}) => {
  const { colors } = useAppTheme();
  const styles = getStyles(colors);
  const [showResponseInput, setShowResponseInput] = useState(false);
  const [responseText, setResponseText] = useState("");

  const user = typeof review.userId === "object" ? review.userId : null;
  const goods = typeof review.goodsId === "object" ? review.goodsId : null;
  const isMaritime = goods?.shippingMode === "sea";

  const handleSubmitResponse = () => {
    if (!responseText.trim()) {
      Alert.alert("Erreur", "Veuillez saisir une réponse.");
      return;
    }
    onRespond(review._id, responseText.trim());
    setShowResponseInput(false);
    setResponseText("");
  };

  return (
    <View style={styles.card}>
      {user && (
        <View style={styles.clientRow}>
          <Ionicons name="person-outline" size={16} color={colors.text.secondary} />
          <Text style={styles.clientName}>
            {user.firstName} {user.lastName}
          </Text>
          <Text style={styles.clientPhone}>{user.phoneNumber}</Text>
        </View>
      )}

      <View style={styles.cardHeader}>
        <Text style={styles.goodsId}>{goods ? goods.goodsId : "—"}</Text>
        {goods && (
          <View style={[styles.badge, isMaritime ? styles.badgeMaritime : styles.badgeAerien]}>
            <Text style={[styles.badgeText, isMaritime ? styles.badgeMaritimeText : styles.badgeAerienText]}>
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
        <Ionicons name="calendar-outline" size={14} color={colors.text.secondary} />
        <Text style={styles.dateText}>{formatDateLong(review.createdAt)}</Text>
      </View>

      {review.adminResponse ? (
        <View style={styles.responseContainer}>
          <Text style={styles.responseLabel}>Réponse de l'équipe :</Text>
          <Text style={styles.responseText}>{review.adminResponse}</Text>
          {review.respondedAt && (
            <Text style={styles.responseDate}>
              {formatDateLong(review.respondedAt)}
            </Text>
          )}
        </View>
      ) : (
        <>
          {!showResponseInput ? (
            <TouchableOpacity
              style={styles.respondButton}
              onPress={() => setShowResponseInput(true)}
              activeOpacity={0.7}
            >
              <MaterialIcons name="reply" size={18} color={styles.respondButtonText.color} />
              <Text style={styles.respondButtonText}>Répondre</Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.responseInputContainer}>
              <TextInput
                style={styles.responseInput}
                placeholder="Votre réponse..."
                placeholderTextColor={colors.text.muted}
                value={responseText}
                onChangeText={setResponseText}
                multiline
                numberOfLines={3}
                maxLength={500}
              />
              <View style={styles.responseActions}>
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={() => {
                    setShowResponseInput(false);
                    setResponseText("");
                  }}
                  activeOpacity={0.7}
                >
                  <Text style={styles.cancelButtonText}>Annuler</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.submitButton, isResponding && styles.submitButtonDisabled]}
                  onPress={handleSubmitResponse}
                  disabled={isResponding}
                  activeOpacity={0.7}
                >
                  {isResponding ? (
                    <ActivityIndicator size="small" color={styles.submitButtonText.color} />
                  ) : (
                    <Text style={styles.submitButtonText}>Envoyer</Text>
                  )}
                </TouchableOpacity>
              </View>
            </View>
          )}
        </>
      )}
    </View>
  );
};
