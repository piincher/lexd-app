import React from "react";
import { Card, Text } from "react-native-paper";
import { StarRating } from "./StarRating";
import { styles } from "../ReviewPrompt.styles";

interface ReviewSuccessProps {
   rating: number;
   comment: string;
}

export const ReviewSuccess: React.FC<ReviewSuccessProps> = ({ rating, comment }) => {
   return (
      <Card style={styles.card} mode="elevated">
         <Card.Content style={styles.content}>
            <Text style={styles.successIcon}>✓</Text>
            <Text style={styles.successText}>Merci pour votre avis !</Text>
            <StarRating rating={rating} onRatingChange={() => {}} disabled />
            {comment.trim() ? (
               <Text style={styles.commentPreview}>{comment.trim()}</Text>
            ) : null}
         </Card.Content>
      </Card>
   );
};
