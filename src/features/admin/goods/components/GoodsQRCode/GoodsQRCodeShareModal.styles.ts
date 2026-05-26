import { StyleSheet } from 'react-native';

type ColorScale = Record<string | number, string>;

interface ShareModalColors {
  background: {
    overlay: string;
    card: string;
    paper: string;
  };
  border: string;
  neutral: ColorScale & {
    white: string;
  };
  primary: ColorScale & {
    main: string;
  };
  text: {
    primary: string;
    secondary: string;
    inverse: string;
  };
  status: {
    success: string;
  };
}

export const createShareModalStyles = (colors: ShareModalColors, isDark?: boolean) => StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: colors.background.overlay,
  },
  sheet: {
    backgroundColor: colors.background.card,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 24,
    borderWidth: isDark ? 1 : 0,
    borderColor: colors.border,
  },
  handle: {
    alignSelf: 'center',
    width: 44,
    height: 4,
    borderRadius: 999,
    backgroundColor: colors.neutral[300],
    marginBottom: 14,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
    marginBottom: 18,
  },
  titleBlock: {
    flex: 1,
    minWidth: 0,
  },
  eyebrow: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.4,
    color: colors.primary.main,
    textTransform: 'uppercase',
  },
  title: {
    marginTop: 2,
    fontSize: 20,
    fontWeight: '800',
    color: colors.text.primary,
  },
  closeButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background.paper,
  },
  previewPanel: {
    alignItems: 'center',
    paddingVertical: 18,
    paddingHorizontal: 16,
    borderRadius: 18,
    backgroundColor: colors.background.paper,
    borderWidth: 1,
    borderColor: colors.border,
  },
  qrFrame: {
    padding: 14,
    borderRadius: 18,
    backgroundColor: colors.neutral.white,
    borderWidth: 1,
    borderColor: colors.primary[200],
  },
  qrImage: {
    width: 220,
    height: 220,
  },
  metaRow: {
    marginTop: 14,
    minHeight: 28,
    maxWidth: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  goodsId: {
    flexShrink: 1,
    fontSize: 14,
    fontWeight: '700',
    color: colors.text.primary,
  },
  actions: {
    gap: 12,
    marginTop: 18,
  },
  actionButton: {
    minHeight: 52,
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    paddingHorizontal: 16,
  },
  primaryAction: {
    backgroundColor: colors.primary.main,
  },
  secondaryAction: {
    backgroundColor: colors.primary[50],
    borderWidth: 1,
    borderColor: colors.primary[200],
  },
  primaryActionText: {
    fontSize: 15,
    fontWeight: '800',
    color: colors.text.inverse,
  },
  secondaryActionText: {
    fontSize: 15,
    fontWeight: '800',
    color: colors.primary.main,
  },
  successText: {
    color: colors.status.success,
  },
});
