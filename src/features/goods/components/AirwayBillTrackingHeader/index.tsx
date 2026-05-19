import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { createStyles } from './AirwayBillTrackingHeader.styles';

interface Props {
  awbNumber: string;
  flightLabel: string;
}

export const AirwayBillTrackingHeader: React.FC<Props> = ({ awbNumber, flightLabel }) => {
  const { colors, isDark } = useAppTheme();
  const styles = React.useMemo(() => createStyles(colors, isDark), [colors, isDark]);
  return (
    <View style={styles.header}>
      <MaterialCommunityIcons name="airplane" size={40} color={colors.primary[500]} />
      <Text style={styles.awbNumber}>{awbNumber}</Text>
      <Text style={styles.flightInfo}>{flightLabel}</Text>
    </View>
  );
};
