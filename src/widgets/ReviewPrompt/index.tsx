/**
 * ReviewPrompt Component
 * Reusable review prompt with star rating and optional comment
 */

import React from "react";
import { useReviewPrompt } from "@src/shared/hooks/useReviewPrompt";
import { ReviewSuccess } from "./components/ReviewSuccess";
import { ReviewDisplay } from "./components/ReviewDisplay";
import { ReviewForm } from "./components/ReviewForm";

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
   const {
      rating,
      comment,
      submitted,
      hasExistingReview,
      isLoadingReview,
      submitMutation,
      setRating,
      setComment,
      handleSubmit,
   } = useReviewPrompt({ goodsId, onReviewSubmitted });

   if (isLoadingReview) {
      return null;
   }

   if (submitted) {
      return <ReviewSuccess rating={rating} comment={comment} />;
   }

   if (hasExistingReview) {
      return <ReviewDisplay rating={rating} comment={comment} goodsLabel={goodsLabel} />;
   }

   return (
      <ReviewForm
         goodsLabel={goodsLabel}
         rating={rating}
         comment={comment}
         isPending={submitMutation.isPending}
         onRatingChange={setRating}
         onCommentChange={setComment}
         onSubmit={handleSubmit}
      />
   );
};
