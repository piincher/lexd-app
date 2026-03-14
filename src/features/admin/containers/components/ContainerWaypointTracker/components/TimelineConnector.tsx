import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Theme } from '@src/constants/Theme';

interface TimelineConnectorProps {
  index: number;
  isCompleted: boolean;
  isCurrent: boolean;
}

export const TimelineConnector: React.FC<TimelineConnectorProps> = ({
  index,
  isCompleted,
  isCurrent,
}) => {
  if (index === 0) return null;
  
  return (
    <View
      style={[
        styles.connector,
        isCompleted && styles.connectorCompleted,
        isCurrent && styles.connectorCurrent,
      ]}
    />
  );
};

const styles = StyleSheet.create({
  connector: {
    position: 'absolute',
    left: 35,
    top: -20,
    width: 2,
    height: 30,
    backgroundColor: Theme.neutral[300],
    zIndex: 0,
  },
  connectorCompleted: {
    backgroundColor: Theme.status.success,
  },
  connectorCurrent: {
    backgroundColor: Theme.primary.main,
  },
});
