import { StyleSheet } from 'react-native';


export const createStyles = (colors: any, isDark?: boolean) => StyleSheet.create({
  container: {
    marginBottom: 12,
    borderRadius: 16,
    elevation: 2,
    backgroundColor: colors.background.card,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.neutral[800],
    marginLeft: 10,
  },
  count: {
    fontSize: 14,
    color: colors.neutral[500],
    marginLeft: 6,
  },
  gallery: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  photoContainer: {
    width: '23%',
    aspectRatio: 1,
    borderRadius: 12,
    overflow: 'hidden',
  },
  photo: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.background.overlay,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlayText: {
    color: colors.text.inverse,
    fontSize: 20,
    fontWeight: '700',
  },
  empty: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  emptyText: {
    marginTop: 8,
    fontSize: 14,
    color: colors.neutral[500],
  },
  uploadButton: {
    marginTop: 12,
    borderColor: colors.primary[600],
    borderRadius: 10,
  },
});
