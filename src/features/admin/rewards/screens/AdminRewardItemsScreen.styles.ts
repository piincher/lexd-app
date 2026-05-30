/* Hallmark · redesign · macrostructure: Marquee Hero + Catalogue · genre: premium-loyalty · theme: gold-on-green */
import { StyleSheet, Platform } from 'react-native';
import { Fonts } from '@src/constants/Fonts';
import { Theme } from '@src/constants/Theme';

export const createStyles = (colors: any, isDark?: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background.default,
    },

    // ---- Marquee hero ---------------------------------------------------
    hero: {
      paddingTop: Platform.OS === 'android' ? Theme.spacing.lg : Theme.spacing['2xl'],
      paddingBottom: Theme.spacing['2xl'],
      paddingHorizontal: Theme.spacing.xl,
      borderBottomLeftRadius: Theme.radius['2xl'],
      borderBottomRightRadius: Theme.radius['2xl'],
      ...Theme.shadows.md,
    },
    heroOverline: {
      fontSize: 11,
      letterSpacing: 1.5,
      fontFamily: Fonts.bold,
      color: colors.text.inverse,
      opacity: 0.85,
      marginBottom: Theme.spacing.xs,
    },
    heroTitle: {
      fontSize: 26,
      lineHeight: 32,
      fontFamily: Fonts.black,
      color: colors.text.inverse,
      marginBottom: Theme.spacing.lg,
    },
    statRow: {
      flexDirection: 'row',
      gap: Theme.spacing.sm,
    },
    statChip: {
      flex: 1,
      paddingVertical: Theme.spacing.md,
      paddingHorizontal: Theme.spacing.md,
      borderRadius: Theme.radius.lg,
      backgroundColor: 'rgba(255,255,255,0.16)',
    },
    statValue: {
      fontSize: 20,
      fontFamily: Fonts.black,
      color: colors.text.inverse,
    },
    statLabel: {
      fontSize: 11,
      letterSpacing: 0.3,
      fontFamily: Fonts.medium,
      color: colors.text.inverse,
      opacity: 0.9,
      marginTop: 2,
    },

    // ---- Search band ----------------------------------------------------
    searchBand: {
      paddingHorizontal: Theme.spacing.lg,
      paddingTop: Theme.spacing.lg,
      paddingBottom: Theme.spacing.xs,
      backgroundColor: colors.background.default,
    },
    searchCard: {
      backgroundColor: colors.background.card,
      borderRadius: Theme.radius.lg,
      paddingHorizontal: Theme.spacing.md,
      paddingTop: Theme.spacing.md,
      paddingBottom: Theme.spacing.xs,
      ...Theme.shadows.sm,
    },

    // ---- List + card ----------------------------------------------------
    listContent: {
      paddingHorizontal: Theme.spacing.lg,
      paddingTop: Theme.spacing.md,
      paddingBottom: 96,
      gap: Theme.spacing.md,
    },
    card: {
      backgroundColor: colors.background.card,
      borderRadius: Theme.radius.lg,
      padding: Theme.spacing.lg,
      flexDirection: 'row',
      gap: Theme.spacing.md,
      ...Theme.shadows.sm,
    },
    cardBody: {
      flex: 1,
      gap: 6,
    },
    cardHeadRow: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      gap: Theme.spacing.sm,
    },
    cardTitleCol: {
      flex: 1,
    },
    overline: {
      fontSize: 10,
      letterSpacing: 1,
      fontFamily: Fonts.bold,
      color: colors.text.secondary,
      textTransform: 'uppercase',
      marginBottom: 2,
    },
    name: {
      fontSize: 16,
      lineHeight: 21,
      fontFamily: Fonts.bold,
      color: colors.text.primary,
    },
    cardActions: {
      flexDirection: 'row',
      gap: Theme.spacing.xs,
    },
    cardActionBtn: {
      width: 36,
      height: 36,
      borderRadius: Theme.radius.md,
      backgroundColor: colors.primary[50] ?? colors.background.paper,
      justifyContent: 'center',
      alignItems: 'center',
    },
    trashBtn: {
      width: 36,
      height: 36,
      borderRadius: Theme.radius.md,
      backgroundColor: colors.feedback.errorBg,
      justifyContent: 'center',
      alignItems: 'center',
    },
    pointsRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 2,
    },
    chipRow: {
      flexDirection: 'row',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: Theme.spacing.sm,
      marginTop: 2,
    },

    // ---- FAB ------------------------------------------------------------
    fab: {
      position: 'absolute',
      right: Theme.spacing.xl,
      bottom: Theme.spacing['2xl'],
      width: 58,
      height: 58,
      borderRadius: 29,
      backgroundColor: colors.primary.main,
      justifyContent: 'center',
      alignItems: 'center',
      ...Theme.shadows.lg,
    },

    // ---- Empty / loading ------------------------------------------------
    stateWrap: {
      flexGrow: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 72,
      paddingHorizontal: Theme.spacing.xl,
      gap: Theme.spacing.md,
    },
    stateIconRing: {
      width: 88,
      height: 88,
      borderRadius: 44,
      backgroundColor: colors.background.card,
      justifyContent: 'center',
      alignItems: 'center',
      ...Theme.shadows.sm,
    },
    stateTitle: {
      fontSize: 16,
      fontFamily: Fonts.bold,
      color: colors.text.primary,
      textAlign: 'center',
    },
    stateSubtitle: {
      fontSize: 13,
      fontFamily: Fonts.regular,
      color: colors.text.secondary,
      textAlign: 'center',
    },
  });
