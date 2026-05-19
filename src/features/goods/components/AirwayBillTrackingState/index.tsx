import React from 'react';
import { View } from 'react-native';
import { ActivityIndicator, Appbar, Button, Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { createStyles } from './AirwayBillTrackingState.styles';

interface Props {
  title: string;
  message: string;
  loading?: boolean;
  onBack: () => void;
  onRetry?: () => void;
}

export const AirwayBillTrackingState: React.FC<Props> = ({
  title,
  message,
  loading = false,
  onBack,
  onRetry,
}) => {
  const { colors, isDark } = useAppTheme();
  const styles = React.useMemo(() => createStyles(colors, isDark), [colors, isDark]);
  return (
    <SafeAreaView style={styles.container}>
      <Appbar.Header>
        <Appbar.BackAction onPress={onBack} />
        <Appbar.Content title="Suivi aérien" />
      </Appbar.Header>
      <View style={styles.centerState}>
        {loading ? <ActivityIndicator animating size="large" /> : <Text style={styles.errorTitle}>{title}</Text>}
        <Text style={styles.stateText}>{message}</Text>
        {!!onRetry && (
          <Button mode="contained" onPress={onRetry} style={styles.retryButton}>
            Réessayer
          </Button>
        )}
      </View>
    </SafeAreaView>
  );
};

export default AirwayBillTrackingState;
