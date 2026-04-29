import React from 'react';
import { Appbar } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { Fonts } from '@src/constants/Fonts';

interface CheckRouteHeaderProps {
  canGoBack: boolean;
  onBack: () => void;
}

export const CheckRouteHeader: React.FC<CheckRouteHeaderProps> = ({ canGoBack, onBack }) => {
  const { colors } = useAppTheme();

  return (
    <Appbar.Header style={[styles.header, { backgroundColor: colors.background.default }]} statusBarHeight={0}>
      {canGoBack ? (
        <Appbar.BackAction onPress={onBack} color={colors.text.primary} />
      ) : null}
      <Appbar.Content
        title="Suivi de colis"
        titleStyle={[styles.headerTitle, { color: colors.text.primary }]}
        accessibilityLabel="Suivi de colis"
      />
    </Appbar.Header>
  );
};

const styles = StyleSheet.create({
  header: {
    elevation: 0,
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: Fonts.bold,
  },
});
