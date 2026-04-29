import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Theme } from '@src/constants/Theme';
import { styles } from './AirwayBillTrackingHeader.styles';

interface Props {
  awbNumber: string;
  flightLabel: string;
}

export const AirwayBillTrackingHeader: React.FC<Props> = ({ awbNumber, flightLabel }) => (
  <View style={styles.header}>
    <MaterialCommunityIcons name="airplane" size={40} color={Theme.primary[500]} />
    <Text style={styles.awbNumber}>{awbNumber}</Text>
    <Text style={styles.flightInfo}>{flightLabel}</Text>
  </View>
);
