import { StyleSheet } from 'react-native';
import { lightTheme } from '@src/constants/Theme';
import { COLORS } from '@src/constants/Colors';

export const MAP_HEIGHT = 280;

export const styles = StyleSheet.create({
  container: {
    marginHorizontal: lightTheme.spacing.lg,
    marginVertical: lightTheme.spacing.md,
    overflow: 'hidden',
  },
  mapContainer: {
    backgroundColor: lightTheme.colors.background.paper,
    position: 'relative',
    overflow: 'hidden',
  },
  gridBackground: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#E8F4FD',
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
    backgroundColor: COLORS.gold,
    opacity: 0.6,
    transform: [{ rotate: '-10deg' }],
  },
  waypoint: {
    position: 'absolute',
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.gold,
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
    backgroundColor: COLORS.green,
    left: '20%',
    top: '40%',
  },
  destinationMarker: {
    backgroundColor: COLORS.gold,
    right: '20%',
    top: '35%',
  },
  markerPulse: {
    position: 'absolute',
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.green,
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
    backgroundColor: lightTheme.colors.background.card,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 2,
  },
  locationLabel: {
    fontSize: 13,
    color: lightTheme.colors.text.secondary,
    marginLeft: 6,
    marginRight: 4,
  },
  locationValue: {
    fontSize: 13,
    fontWeight: '600',
    color: lightTheme.colors.text.primary,
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
    color: lightTheme.colors.text.secondary,
  },
  errorTitle: {
    marginTop: lightTheme.spacing.md,
    fontSize: 16,
    fontWeight: '600',
    color: lightTheme.colors.status.error,
  },
  errorText: {
    marginTop: lightTheme.spacing.xs,
    fontSize: 13,
    color: lightTheme.colors.text.secondary,
    textAlign: 'center',
  },
  emptyTitle: {
    marginTop: lightTheme.spacing.md,
    fontSize: 16,
    fontWeight: '600',
    color: lightTheme.colors.text.primary,
  },
  emptyText: {
    marginTop: lightTheme.spacing.xs,
    fontSize: 13,
    color: lightTheme.colors.text.secondary,
    textAlign: 'center',
  },
});
