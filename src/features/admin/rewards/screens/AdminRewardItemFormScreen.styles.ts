/* Hallmark · redesign · macrostructure: Sectioned Sheet · genre: premium-loyalty · theme: gold-on-green */
import { StyleSheet, Platform } from 'react-native';
import { Fonts } from '@src/constants/Fonts';
import { Theme } from '@src/constants/Theme';

export const createStyles = (colors: any, isDark?: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background.default,
    },

    // ── Header ──────────────────────────────────────────
    header: {
      paddingHorizontal: Theme.spacing.lg,
      paddingTop: Platform.OS === 'android' ? Theme.spacing.md : Theme.spacing.xl,
      paddingBottom: Theme.spacing.lg,
      backgroundColor: colors.background.card,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
      flexDirection: 'row',
      alignItems: 'center',
    },
    backButton: {
      width: 40,
      height: 40,
      borderRadius: Theme.radius.md,
      backgroundColor: colors.neutral[100],
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: Theme.spacing.md,
    },
    headerTitle: {
      fontSize: 22,
      fontFamily: Fonts.bold,
      color: colors.text.primary,
    },

    // ── Scroll ──────────────────────────────────────────
    scroll: {
      padding: Theme.spacing.lg,
      gap: Theme.spacing.xl,
      paddingBottom: 120,
    },

    // ── Hero image picker ───────────────────────────────
    hero: {
      width: '100%',
      height: 160,
      borderRadius: Theme.radius.xl,
      overflow: 'hidden',
    },
    heroEmpty: {
      width: '100%',
      height: 160,
      borderRadius: Theme.radius.xl,
      backgroundColor: colors.primary[50],
      borderWidth: 2,
      borderStyle: 'dashed',
      borderColor: colors.accent.gold,
      justifyContent: 'center',
      alignItems: 'center',
      gap: Theme.spacing.sm,
    },
    heroEmptyText: {
      fontSize: 14,
      fontFamily: Fonts.medium,
      color: colors.text.secondary,
    },
    heroImage: {
      width: '100%',
      height: '100%',
    },
    editPill: {
      position: 'absolute',
      bottom: Theme.spacing.md,
      right: Theme.spacing.md,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 5,
      paddingHorizontal: Theme.spacing.md,
      paddingVertical: 7,
      borderRadius: Theme.radius.full,
      backgroundColor: colors.background.overlay,
    },
    editPillText: {
      fontSize: 12.5,
      fontFamily: Fonts.bold,
      color: colors.neutral.white,
    },

    // ── Live preview card ───────────────────────────────
    previewCard: {
      backgroundColor: colors.background.card,
      borderRadius: Theme.radius.lg,
      padding: Theme.spacing.lg,
      borderWidth: 1,
      borderColor: colors.border,
      flexDirection: 'row',
      alignItems: 'center',
      gap: Theme.spacing.md,
      ...Theme.shadows.sm,
    },
    previewBody: {
      flex: 1,
      gap: Theme.spacing.sm,
    },
    previewName: {
      fontSize: 16,
      fontFamily: Fonts.bold,
      color: colors.text.primary,
    },
    previewNamePlaceholder: {
      fontSize: 16,
      fontFamily: Fonts.medium,
      color: colors.text.disabled,
    },
    previewRow: {
      flexDirection: 'row',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: Theme.spacing.sm,
    },

    // ── Sections ────────────────────────────────────────
    section: {
      backgroundColor: colors.background.card,
      borderRadius: Theme.radius.lg,
      padding: Theme.spacing.lg,
      borderWidth: 1,
      borderColor: colors.border,
      gap: Theme.spacing.md,
    },
    overline: {
      fontSize: 11,
      fontFamily: Fonts.bold,
      letterSpacing: 1.2,
      color: colors.text.secondary,
      marginBottom: 2,
    },

    // ── Segmented control ───────────────────────────────
    optionGroup: {
      gap: Theme.spacing.sm,
    },
    optionLabel: {
      fontSize: 13,
      fontFamily: Fonts.medium,
      color: colors.text.secondary,
    },
    segment: {
      flexDirection: 'row',
      backgroundColor: colors.neutral[100],
      borderRadius: Theme.radius.md,
      padding: 4,
      gap: 4,
    },
    segmentOption: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 6,
      paddingVertical: 10,
      borderRadius: Theme.radius.sm,
      backgroundColor: 'transparent',
    },
    segmentOptionActive: {
      backgroundColor: colors.primary.main,
      ...Theme.shadows.sm,
    },
    segmentText: {
      fontSize: 13.5,
      fontFamily: Fonts.medium,
      color: colors.text.secondary,
      textAlign: 'center',
    },
    segmentTextActive: {
      fontFamily: Fonts.bold,
      color: colors.text.inverse,
    },

    // ── Sticky save bar ─────────────────────────────────
    saveBar: {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      paddingHorizontal: Theme.spacing.lg,
      paddingTop: Theme.spacing.md,
      paddingBottom: Platform.OS === 'ios' ? Theme.spacing['2xl'] : Theme.spacing.lg,
      backgroundColor: colors.background.card,
      borderTopWidth: 1,
      borderTopColor: colors.border,
    },
    saveButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: Theme.spacing.sm,
      paddingVertical: 16,
      borderRadius: Theme.radius.lg,
      ...Theme.shadows.lg,
    },
    saveButtonDisabled: {
      opacity: 0.6,
    },
    saveButtonText: {
      fontSize: 15.5,
      fontFamily: Fonts.bold,
      color: colors.text.inverse,
      letterSpacing: 0.3,
    },
  });
