import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { NotificationBell } from '@src/shared/ui/NotificationBell';
import { createStyles } from "./MyReviewsHeader.styles";

interface MyReviewsHeaderProps {
  totalReviews: number;
  onBackPress: () => void;
  onNotificationPress: () => void;
}

export const MyReviewsHeader: React.FC<MyReviewsHeaderProps> = ({
  totalReviews,
  onBackPress,
  onNotificationPress,
}) => {
  const { colors } = useAppTheme();
  const styles = React.useMemo(() => createStyles(colors), [colors]);

  return (
    <View
      style={[
        styles.header,
        {
          backgroundColor: colors.background.card,
          borderBottomColor: colors.border,
        },
      ]}
    >
      <View style={styles.headerTop}>
        <TouchableOpacity
          style={[
            styles.backButton,
            { backgroundColor: colors.background.default },
          ]}
          onPress={onBackPress}
          activeOpacity={0.7}
        >
          <Ionicons
            name="arrow-back"
            size={24}
            color={colors.text.primary}
          />
        </TouchableOpacity>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>Mes Avis</Text>
          <Text style={styles.headerSubtitle}>
            {totalReviews} avis au total
          </Text>
        </View>
        <NotificationBell
          onPress={onNotificationPress}
          size={24}
          color={colors.text.primary}
        />
      </View>
    </View>
  );
};
