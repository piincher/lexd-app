import React from "react";
import { View, TextInput } from "react-native";
import { Card, Text, Button } from "react-native-paper";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { StarRating } from "./StarRating";
import { createStyles } from "../ReviewPrompt.styles";

interface ReviewFormProps {
   goodsLabel?: string;
   rating: number;
   comment: string;
   isPending: boolean;
   onRatingChange: (rating: number) => void;
   onCommentChange: (comment: string) => void;
   onSubmit: () => void;
}

export const ReviewForm: React.FC<ReviewFormProps> = ({
   goodsLabel,
   rating,
   comment,
   isPending,
   onRatingChange,
   onCommentChange,
   onSubmit,
}) => {
   const { colors, isDark } = useAppTheme();
  const styles = React.useMemo(() => createStyles(colors, isDark), [colors, isDark]);

   return (
      <Card style={styles.card} mode="elevated">
         <Card.Content style={styles.content}>
            <Text style={styles.title}>Donnez votre avis</Text>
            {goodsLabel ? <Text style={styles.goodsLabel}>{goodsLabel}</Text> : null}
            <Text style={styles.subtitle}>Comment évaluez-vous cette expédition ?</Text>

            <StarRating rating={rating} onRatingChange={onRatingChange} />

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
               onChangeText={onCommentChange}
               multiline
               maxLength={1000}
               textAlignVertical="top"
            />
            {comment.length > 0 ? (
               <Text style={styles.charCount}>{comment.length}/1000</Text>
            ) : null}

            <Button
               mode="contained"
               onPress={onSubmit}
               loading={isPending}
               disabled={rating === 0 || isPending}
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
