/**
 * ReviewPrompt Component
 * Reusable review prompt with star rating and optional comment
 */

import React, { useState, useEffect } from "react";
import { View, StyleSheet, TextInput } from "react-native";
import { Card, Text, IconButton, Button } from "react-native-paper";
import { showMessage } from "react-native-flash-message";
import { Fonts } from "@src/constants/Fonts";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { useGoodsReview, useSubmitReview } from "../../hooks/useReviews";
import { Theme } from "@src/constants/Theme";

// ------------------------------------
// Star Rating sub-component
// ------------------------------------

interface StarRatingProps {
   rating: number;
   onRatingChange: (rating: number) => void;
   disabled?: boolean;
   size?: number;
}

const StarRating: React.FC<StarRatingProps> = ({ rating, onRatingChange, disabled, size = 36 }) => {
   const { colors } = useAppTheme();

   return (
      <View style={styles.starContainer}>
         {[1, 2, 3, 4, 5].map((star) => (
            <IconButton
               key={star}
               icon={star <= rating ? "star" : "star-outline"}
               size={size}
               iconColor={star <= rating ? "#FFB800" : colors.text.disabled}
               onPress={() => !disabled && onRatingChange(star)}
               disabled={disabled}
               style={styles.starButton}
            />
         ))}
      </View>
   );
};

// ------------------------------------
// ReviewPrompt
// ------------------------------------

interface ReviewPromptProps {
   goodsId: string;
   goodsLabel?: string;
   onReviewSubmitted?: () => void;
}

export const ReviewPrompt: React.FC<ReviewPromptProps> = ({
   goodsId,
   goodsLabel,
   onReviewSubmitted,
}) => {
   const { colors } = useAppTheme();
   const { data: existingReview, isLoading: isLoadingReview } = useGoodsReview(goodsId);
   const submitMutation = useSubmitReview();

   const [rating, setRating] = useState(0);
   const [comment, setComment] = useState("");
   const [submitted, setSubmitted] = useState(false);

   // Sync state when existing review loads
   useEffect(() => {
      if (existingReview) {
         setRating(existingReview.rating);
         if (existingReview.comment) {
            setComment(existingReview.comment);
         }
      }
   }, [existingReview]);

   const hasExistingReview = !!existingReview;

   const handleSubmit = async () => {
      if (rating === 0) return;

      try {
         await submitMutation.mutateAsync({
            goodsId,
            rating,
            comment: comment.trim() || undefined,
         });
         setSubmitted(true);
         showMessage({
            message: "Merci !",
            description: "Votre avis a été enregistré avec succès.",
            type: "success",
         });
         onReviewSubmitted?.();
      } catch {
         showMessage({
            message: "Erreur",
            description: "Impossible d'envoyer votre avis. Veuillez réessayer.",
            type: "danger",
         });
      }
   };

   // Loading state
   if (isLoadingReview) {
      return null;
   }

   // Success state after submission
   if (submitted) {
      return (
         <Card style={styles.card} mode="elevated">
            <Card.Content style={styles.content}>
               <Text style={styles.successIcon}>✓</Text>
               <Text style={styles.successText}>Merci pour votre avis !</Text>
               <StarRating rating={rating} onRatingChange={() => {}} disabled />
               {comment.trim() ? <Text style={styles.commentPreview}>{comment.trim()}</Text> : null}
            </Card.Content>
         </Card>
      );
   }

   // Already reviewed — read-only display
   if (hasExistingReview) {
      return (
         <Card style={styles.card} mode="elevated">
            <Card.Content style={styles.content}>
               <Text style={styles.title}>Votre avis</Text>
               {goodsLabel ? <Text style={styles.goodsLabel}>{goodsLabel}</Text> : null}
               <StarRating rating={rating} onRatingChange={() => {}} disabled />
               {existingReview.comment ? (
                  <Text style={styles.commentPreview}>{existingReview.comment}</Text>
               ) : null}
               <Text style={styles.thanksText}>Merci pour votre retour !</Text>
            </Card.Content>
         </Card>
      );
   }

   // New review form
   return (
      <Card style={styles.card} mode="elevated">
         <Card.Content style={styles.content}>
            <Text style={styles.title}>Donnez votre avis</Text>
            {goodsLabel ? <Text style={styles.goodsLabel}>{goodsLabel}</Text> : null}
            <Text style={styles.subtitle}>Comment évaluez-vous cette expédition ?</Text>

            <StarRating rating={rating} onRatingChange={setRating} />

            <TextInput
               style={[
                  styles.commentInput,
                  {
                     borderColor: colors.border,
                     color: colors.text.primary,
                     backgroundColor: colors.background.card,
                  },
               ]}
               placeholder="Ajoutez un commentaire (facultatif)"
               placeholderTextColor={colors.text.disabled}
               value={comment}
               onChangeText={setComment}
               multiline
               maxLength={1000}
               textAlignVertical="top"
            />
            {comment.length > 0 ? (
               <Text style={styles.charCount}>{comment.length}/1000</Text>
            ) : null}

            <Button
               mode="contained"
               onPress={handleSubmit}
               loading={submitMutation.isPending}
               disabled={rating === 0 || submitMutation.isPending}
               style={styles.submitButton}
               labelStyle={styles.submitButtonLabel}
               buttonColor={colors.primary.main}
            >
               Envoyer mon avis
            </Button>
         </Card.Content>
      </Card>
   );
};

// ------------------------------------
// Styles
// ------------------------------------

const styles = StyleSheet.create({
   card: {
      marginVertical: 12,
      borderRadius: 12,
      elevation: 3,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
   },
   content: {
      alignItems: "center",
      paddingVertical: 16,
   },
   title: {
      fontFamily: Fonts.meduim,
      fontSize: 16,
      color: Theme.colors.text.primary,
      textAlign: "center",
   },
   goodsLabel: {
      fontFamily: Fonts.regular,
      fontSize: 13,
      color: Theme.colors.text.secondary,
      textAlign: "center",
      marginTop: 4,
   },
   subtitle: {
      fontFamily: Fonts.regular,
      fontSize: 13,
      color: Theme.colors.text.secondary,
      textAlign: "center",
      marginTop: 4,
      marginBottom: 4,
   },
   starContainer: {
      flexDirection: "row",
      justifyContent: "center",
      marginVertical: 8,
   },
   starButton: {
      margin: 0,
   },
   commentInput: {
      width: "100%",
      minHeight: 80,
      maxHeight: 150,
      borderWidth: 1,
      borderRadius: 8,
      padding: 12,
      marginTop: 8,
      fontFamily: Fonts.regular,
      fontSize: 14,
   },
   charCount: {
      fontFamily: Fonts.regular,
      fontSize: 11,
      color: Theme.colors.text.muted,
      alignSelf: "flex-end",
      marginTop: 4,
   },
   submitButton: {
      marginTop: 12,
      borderRadius: 8,
      width: "100%",
   },
   submitButtonLabel: {
      fontFamily: Fonts.meduim,
      fontSize: 14,
   },
   successIcon: {
      fontSize: 32,
      color: "#22C55E",
      marginBottom: 8,
   },
   successText: {
      fontFamily: Fonts.meduim,
      fontSize: 16,
      color: "#22C55E",
      textAlign: "center",
      marginBottom: 4,
   },
   commentPreview: {
      fontFamily: Fonts.regular,
      fontSize: 13,
      color: Theme.colors.text.secondary,
      textAlign: "center",
      marginTop: 4,
      fontStyle: "italic",
   },
   thanksText: {
      fontFamily: Fonts.meduim,
      fontSize: 14,
      color: "#22C55E",
      textAlign: "center",
      marginTop: 8,
   },
});
