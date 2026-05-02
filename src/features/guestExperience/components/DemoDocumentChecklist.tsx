import React, { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
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
      <Text style={styles.sectionTitle}>Documents visibles après connexion</Text>
      {documents.map((document) => (
        <View key={document.id} style={styles.row}>
          <View style={styles.iconBox}>
            <FontAwesome5 name={document.icon} size={14} color={colors.primary.main} />
          </View>
          <View style={styles.textBlock}>
            <Text style={styles.title}>{document.title}</Text>
            <Text style={styles.detail}>{document.detail}</Text>
            <Text style={styles.availability}>{document.availability}</Text>
          </View>
        </View>
      ))}
    </View>
  );
};

const createStyles = (colors: ReturnType<typeof useAppTheme>['colors'], isDark: boolean) =>
  StyleSheet.create({
    container: {
      marginHorizontal: 20,
      marginTop: 22,
      borderRadius: 16,
      padding: 16,
      backgroundColor: colors.background.card,
      borderWidth: 1,
      borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(15,23,42,0.06)',
    },
    sectionTitle: {
      color: colors.text.primary,
      fontFamily: Fonts.bold,
      fontSize: 18,
      marginBottom: 10,
    },
    row: {
      flexDirection: 'row',
      gap: 12,
      paddingVertical: 11,
      borderTopWidth: 1,
      borderTopColor: isDark ? 'rgba(255,255,255,0.08)' : '#EEF2F7',
    },
    iconBox: {
      width: 38,
      height: 38,
      borderRadius: 12,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: isDark ? 'rgba(74,222,128,0.12)' : '#F0FDF4',
    },
    textBlock: {
      flex: 1,
    },
    title: {
      color: colors.text.primary,
      fontFamily: Fonts.bold,
      fontSize: 14,
    },
    detail: {
      color: colors.text.secondary,
      fontFamily: Fonts.regular,
      fontSize: 12,
      lineHeight: 18,
      marginTop: 4,
    },
    availability: {
      color: colors.accent.gold,
      fontFamily: Fonts.bold,
      fontSize: 11,
      marginTop: 6,
    },
  });
