import React, { useMemo } from "react";
import { View, ActivityIndicator } from "react-native";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { createStyles } from "./LoadingState.styles";

interface LoadingStateProps {
   visible: boolean;
}

export const LoadingState: React.FC<LoadingStateProps> = ({ visible }) => {
   const { colors } = useAppTheme();
   const styles = useMemo(() => createStyles(colors), [colors]);

   if (!visible) return null;

   return (
      <View style={styles.overlay}>
         <ActivityIndicator size="large" color={colors.primary[500]} />
      </View>
   );
};
