import React from "react";
import { Card, Text } from "react-native-paper";
import { StarRating } from "./StarRating";
import { createStyles } from "../ReviewPrompt.styles";
import { useAppTheme } from '@src/providers/ThemeProvider';

interface ReviewDisplayProps {
   rating: number;
   comment: string;
   goodsLabel?: string;
}

export const ReviewDisplay: React.FC<ReviewDisplayProps> = ({ rating, comment, goodsLabel }) => {
  const { colors, isDark } = useAppTheme();
  const styles = React.useMemo(() => createStyles(colors, isDark), [colors, isDark]);
   return (
      <Card style={styles.card} mode="elevated">
         <Card.Content style={styles.content}>
            <Text style={styles.title}>Votre avis</Text>
            {goodsLabel ? <Text style={styles.goodsLabel}>{goodsLabel}</Text> : null}
            <StarRating rating={rating} onRatingChange={() => {}} disabled />
            {comment.trim() ? (
               <Text style={styles.commentPreview}>{comment.trim()}</Text>
            ) : null}
            <Text style={styles.thanksText}>Merci pour votre retour !</Text>
         </Card.Content>
      </Card>
   );
};
