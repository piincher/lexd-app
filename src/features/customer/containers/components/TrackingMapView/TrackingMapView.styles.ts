import { StyleSheet } from 'react-native';
import { lightTheme } from '@src/constants/Theme';

export const MAP_HEIGHT = 280;

export const createStyles = (colors: any, isDark: boolean) => StyleSheet.create({
  container: {
    marginHorizontal: lightTheme.spacing.lg,
    marginVertical: lightTheme.spacing.md,
    overflow: 'hidden',
  },
  mapContainer: {
    backgroundColor: colors.background.paper,
    position: 'relative',
    overflow: 'hidden',
  },
  gridBackground: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.background.paper,
    opacity: 0.5,
  },
  routeContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  routeLine: {
    position: 'absolute',
    width: '60%',
    height: 3,
    backgroundColor: colors.accent.gold,
    opacity: 0.6,
    transform: [{ rotate: '-10deg' }],
  },
  waypoint: {
    position: 'absolute',
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.accent.gold,
  },
  marker: {
    position: 'absolute',
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    ...lightTheme.shadows.md,
  },
  currentMarker: {
    backgroundColor: colors.status.success,
    left: '20%',
    top: '40%',
  },
  destinationMarker: {
    backgroundColor: colors.accent.gold,
    right: '20%',
    top: '35%',
  },
  markerPulse: {
    position: 'absolute',
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.status.success,
    opacity: 0.2,
  },
  zoomControls: {
    position: 'absolute',
    right: lightTheme.spacing.md,
    bottom: lightTheme.spacing.md,
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderRadius: lightTheme.borderRadius.md,
    ...lightTheme.shadows.sm,
  },
  zoomButton: {
    margin: 0,
  },
  infoContainer: {
    padding: lightTheme.spacing.md,
    backgroundColor: colors.background.card,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 2,
  },
  locationLabel: {
    fontSize: 13,
    color: colors.text.secondary,
    marginLeft: 6,
    marginRight: 4,
  },
  locationValue: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.text.primary,
  },
  centerContainer: {
    height: MAP_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
    padding: lightTheme.spacing.lg,
  },
  loadingText: {
    marginTop: lightTheme.spacing.md,
    fontSize: 14,
    color: colors.text.secondary,
  },
  errorTitle: {
    marginTop: lightTheme.spacing.md,
    fontSize: 16,
    fontWeight: '600',
    color: colors.status.error,
  },
  errorText: {
    marginTop: lightTheme.spacing.xs,
    fontSize: 13,
    color: colors.text.secondary,
    textAlign: 'center',
  },
  emptyTitle: {
    marginTop: lightTheme.spacing.md,
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.primary,
  },
  emptyText: {
    marginTop: lightTheme.spacing.xs,
    fontSize: 13,
    color: colors.text.secondary,
    textAlign: 'center',
  },
});
