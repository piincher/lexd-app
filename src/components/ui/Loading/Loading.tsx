/**
 * Loading - Reusable loading components
 */

import React from 'react';
import { 
  View, 
  ActivityIndicator, 
  Text, 
  StyleSheet,
  ViewStyle,
} from 'react-native';
import { COLORS } from '@src/constants/Colors';

export interface LoadingProps {
  message?: string;
  size?: 'small' | 'large';
  fullScreen?: boolean;
  style?: ViewStyle;
}

export const Loading: React.FC<LoadingProps> = ({
  message,
  size = 'large',
  fullScreen = false,
  style,
}) => {
  return (
    <View style={[
      styles.container,
      fullScreen && styles.fullScreen,
      style,
    ]}>
      <ActivityIndicator 
        size={size} 
        color={COLORS.Crimson}
      />
      {message && (
        <Text style={styles.message}>{message}</Text>
      )}
    </View>
  );
};

export interface SkeletonProps {
  width?: number | string;
  height?: number;
  borderRadius?: number;
  style?: ViewStyle;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  width = '100%',
  height = 20,
  borderRadius = 4,
  style,
}) => {
  const dynamicStyle: ViewStyle = {
    width: width as ViewStyle['width'],
    height,
    borderRadius,
  };

  return (
    <View 
      style={[
        styles.skeleton,
        dynamicStyle,
        style,
      ]} 
    />
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  fullScreen: {
    flex: 1,
    backgroundColor: '#fff',
  },
  message: {
    marginTop: 12,
    fontSize: 14,
    color: '#666',
  },
  skeleton: {
    backgroundColor: '#e0e0e0',
  },
});

export default Loading;
