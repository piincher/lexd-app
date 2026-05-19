import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { Theme } from "@src/constants/Theme";
import { createStyles } from "./MyReviewsPagination.styles";

interface MyReviewsPaginationProps {
  page: number;
  totalPages: number;
  onNext: () => void;
  onPrev: () => void;
}

export const MyReviewsPagination: React.FC<MyReviewsPaginationProps> = ({
  page,
  totalPages,
  onNext,
  onPrev,
}) => {
  const { colors } = useAppTheme();
  const styles = React.useMemo(() => createStyles(colors), [colors]);

  return (
    <View style={styles.paginationContainer}>
      <TouchableOpacity
        style={[
          styles.paginationButton,
          { borderColor: colors.border },
          page <= 1 && styles.paginationButtonDisabled,
        ]}
        onPress={onPrev}
        disabled={page <= 1}
        activeOpacity={0.7}
      >
        <Ionicons
          name="chevron-back"
          size={20}
          color={
            page <= 1 ? colors.text.disabled : colors.text.primary
          }
        />
      </TouchableOpacity>
      <Text style={styles.paginationText}>
        Page {page} / {totalPages}
      </Text>
      <TouchableOpacity
        style={[
          styles.paginationButton,
          { borderColor: colors.border },
          page >= totalPages && styles.paginationButtonDisabled,
        ]}
        onPress={onNext}
        disabled={page >= totalPages}
        activeOpacity={0.7}
      >
        <Ionicons
          name="chevron-forward"
          size={20}
          color={
            page >= totalPages
              ? colors.text.disabled
              : colors.text.primary
          }
        />
      </TouchableOpacity>
    </View>
  );
};
