import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { useTheme } from 'react-native-paper';

const Shimmer = ({ style }: { style: any }) => {
  const theme = useTheme();
  const shimmer = useRef(new Animated.Value(-1)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.timing(shimmer, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true,
      })
    );
    loop.start();
    return () => loop.stop();
  }, []);

  const translateX = shimmer.interpolate({
    inputRange: [-1, 1],
    outputRange: [-200, 400],
  });

  return (
    <View style={[style, { overflow: 'hidden', backgroundColor: theme.colors.surfaceVariant }]}>
      <Animated.View
        style={{
          width: '40%',
          height: '100%',
          backgroundColor: 'rgba(255,255,255,0.08)',
          transform: [{ translateX }],
        }}
      />
    </View>
  );
};

export const DashboardSkeleton: React.FC = () => {
  const theme = useTheme();

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={[styles.row, { paddingHorizontal: 16, marginBottom: 16, marginTop: 8 }]}>
        <Shimmer style={{ width: 40, height: 40, borderRadius: 20 }} />
        <View style={{ flex: 1, marginLeft: 12, gap: 8 }}>
          <Shimmer style={{ width: 100, height: 12, borderRadius: 6 }} />
          <Shimmer style={{ width: 160, height: 18, borderRadius: 6 }} />
        </View>
        <Shimmer style={{ width: 44, height: 44, borderRadius: 14 }} />
      </View>

      {/* Hero Card */}
      <View style={{ paddingHorizontal: 16, marginBottom: 8 }}>
        <Shimmer style={{ width: '100%', height: 140, borderRadius: 24 }} />
      </View>

      {/* Actions */}
      <View style={{ marginTop: 20, paddingHorizontal: 16 }}>
        <Shimmer style={{ width: 120, height: 14, borderRadius: 6, marginBottom: 12 }} />
        <View style={[styles.row, { gap: 12 }]}>
          {[1, 2].map((i) => (
            <Shimmer key={i} style={{ flex: 1, height: 140, borderRadius: 20 }} />
          ))}
        </View>
      </View>

      {/* Journey */}
      <View style={{ marginTop: 24, paddingHorizontal: 16 }}>
        <Shimmer style={{ width: 160, height: 14, borderRadius: 6, marginBottom: 16 }} />
        <View style={[styles.row, { gap: 8 }]}>
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <View key={i} style={{ alignItems: 'center', gap: 6 }}>
              <Shimmer style={{ width: 40, height: 40, borderRadius: 20 }} />
              <Shimmer style={{ width: 40, height: 10, borderRadius: 4 }} />
              <Shimmer style={{ width: 20, height: 12, borderRadius: 4 }} />
            </View>
          ))}
        </View>
      </View>

      {/* Activity */}
      <View style={{ marginTop: 24, paddingHorizontal: 16 }}>
        <Shimmer style={{ width: 120, height: 14, borderRadius: 6, marginBottom: 16 }} />
        {[1, 2, 3].map((i) => (
          <View key={i} style={[styles.row, { marginBottom: 16 }]}>
            <Shimmer style={{ width: 36, height: 36, borderRadius: 12 }} />
            <View style={{ flex: 1, marginLeft: 14, gap: 8 }}>
              <Shimmer style={{ width: '60%', height: 14, borderRadius: 4 }} />
              <Shimmer style={{ width: '80%', height: 12, borderRadius: 4 }} />
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 8 },
  row: { flexDirection: 'row', alignItems: 'center' },
});

export default DashboardSkeleton;
