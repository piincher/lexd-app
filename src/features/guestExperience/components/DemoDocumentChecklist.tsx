import React, { useMemo } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import Animated, { FadeInRight } from 'react-native-reanimated';
import { FontAwesome6, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { Fonts } from '@src/constants/Fonts';
import type { DemoDocument } from '../types';

interface Props {
  documents: DemoDocument[];
}

export const DemoDocumentChecklist: React.FC<Props> = ({ documents }) => {
  const { colors, isDark } = useAppTheme();
  const styles = useMemo(() => createStyles(colors, isDark), [colors, isDark]);

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>
        Documents{' '}
        <Text style={styles.count}>({documents.length})</Text>
      </Text>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {documents.map((doc, index) => (
          <Animated.View
            key={doc.id}
            entering={FadeInRight.delay(index * 100).springify()}
            style={styles.card}
          >
            <LinearGradient
              colors={isDark ? ['rgba(255,255,255,0.06)', 'rgba(255,255,255,0.02)'] : ['#FFFFFF', '#F8FAFC']}
              style={styles.gradient}
            >
              <View style={styles.iconWrap}>
                <FontAwesome6 name={doc.icon as any} size={28} color={colors.primary.main} />
                <View style={styles.pageBadge}>
                  <Text style={styles.pageBadgeText}>{doc.pages} pages</Text>
                </View>
              </View>

              <Text style={styles.title} numberOfLines={1}>
                {doc.title}
              </Text>
              <Text style={styles.detail} numberOfLines={2}>
                {doc.detail}
              </Text>

              <View style={styles.footer}>
                <Text style={styles.size}>{doc.size}</Text>
                <View style={styles.lockRow}>
                  <MaterialCommunityIcons name="lock" size={12} color={colors.status.warning} />
                  <Text style={styles.lockText}>Connexion requise</Text>
                </View>
              </View>
            </LinearGradient>
          </Animated.View>
        ))}
      </ScrollView>
    </View>
  );
};

const createStyles = (colors: ReturnType<typeof useAppTheme>['colors'], isDark: boolean) =>
  StyleSheet.create({
    container: {
      marginTop: 22,
    },
    sectionTitle: {
      color: colors.text.primary,
      fontFamily: Fonts.bold,
      fontSize: 18,
      marginHorizontal: 20,
      marginBottom: 12,
    },
    count: {
      color: colors.text.muted,
      fontFamily: Fonts.medium,
      fontSize: 14,
    },
    scrollContent: {
      paddingHorizontal: 20,
      gap: 12,
    },
    card: {
      width: 180,
      borderRadius: 16,
      overflow: 'hidden',
      borderWidth: 1,
      borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(15,23,42,0.06)',
    },
    gradient: {
      padding: 14,
      flex: 1,
    },
    iconWrap: {
      alignItems: 'center',
      marginBottom: 12,
    },
    pageBadge: {
      marginTop: 6,
      backgroundColor: isDark ? 'rgba(74,222,128,0.15)' : '#F0FDF4',
      paddingHorizontal: 8,
      paddingVertical: 2,
      borderRadius: 6,
    },
    pageBadgeText: {
      color: colors.primary.main,
      fontFamily: Fonts.bold,
      fontSize: 10,
    },
    title: {
      color: colors.text.primary,
      fontFamily: Fonts.bold,
      fontSize: 14,
      marginBottom: 4,
    },
    detail: {
      color: colors.text.secondary,
      fontFamily: Fonts.regular,
      fontSize: 12,
      lineHeight: 17,
      flex: 1,
    },
    footer: {
      marginTop: 10,
    },
    size: {
      color: colors.text.muted,
      fontFamily: Fonts.medium,
      fontSize: 11,
    },
    lockRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
      marginTop: 4,
    },
    lockText: {
      color: colors.status.warning,
      fontFamily: Fonts.bold,
      fontSize: 10,
    },
  });
