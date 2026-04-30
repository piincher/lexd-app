import React from "react";
import { Card, Text } from "react-native-paper";
import { StarRating } from "./StarRating";
import { styles } from "../ReviewPrompt.styles";

interface ReviewDisplayProps {
   rating: number;
   comment: string;
   goodsLabel?: string;
}

export const ReviewDisplay: React.FC<ReviewDisplayProps> = ({ rating, comment, goodsLabel }) => {
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
