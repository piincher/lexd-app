import { StyleSheet } from 'react-native';

export const createStyles = (colors: any, isDark?: boolean) => StyleSheet.create({
  goodsCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: colors.background.card,
    borderRadius: 12,
    marginBottom: 8,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  goodsCardSelected: {
    borderColor: colors.primary[500],
    backgroundColor: colors.primary[50],
  },
  checkboxContainer: {
    marginRight: 12,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: colors.neutral[300],
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxSelected: {
    backgroundColor: colors.primary[500],
    borderColor: colors.primary[500],
  },
  imageContainer: {
    width: 56,
    height: 56,
    borderRadius: 8,
    overflow: 'hidden',
    marginRight: 12,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  placeholderImage: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  goodsInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  goodsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  goodsId: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.neutral[900],
  },
  description: {
    fontSize: 12,
    color: colors.neutral[600],
    marginBottom: 6,
  },
  goodsMeta: {
    flexDirection: 'row',
    gap: 12,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    fontSize: 11,
    color: colors.neutral[500],
  },
});
