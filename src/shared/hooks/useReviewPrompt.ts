import { useState, useEffect } from "react";
import { showMessage } from "react-native-flash-message";
import { useGoodsReview, useSubmitReview } from "./useReviews";

interface UseReviewPromptProps {
  goodsId: string;
  onReviewSubmitted?: () => void;
}

export const useReviewPrompt = ({ goodsId, onReviewSubmitted }: UseReviewPromptProps) => {
  const { data: existingReview, isLoading: isLoadingReview } = useGoodsReview(goodsId);
  const submitMutation = useSubmitReview();

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (existingReview) {
      setRating(existingReview.rating);
      if (existingReview.comment) {
        setComment(existingReview.comment);
      }
    }
  }, [existingReview]);

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

  return {
    rating,
    comment,
    submitted,
    hasExistingReview: !!existingReview,
    isLoadingReview,
    submitMutation,
    setRating,
    setComment,
    handleSubmit,
  };
};
