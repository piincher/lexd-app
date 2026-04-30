import { StyleSheet, Dimensions } from 'react-native';

const { height, width } = Dimensions.get('window');

export const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    paddingTop: 60,
    paddingRight: 8,
  },
  container: {
    width: width * 0.9,
    maxWidth: 400,
    maxHeight: height * 0.6,
    marginRight: 8,
  },
  surface: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 18,
  },
  headerActions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    padding: 4,
  },
  loadingContainer: {
    padding: 40,
    alignItems: 'center',
  },
  emptyContainer: {
    padding: 40,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 14,
    marginTop: 12,
  },
  list: {
    maxHeight: height * 0.4,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },
  lastItem: {
    borderBottomWidth: 0,
  },
  itemIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  itemContent: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 14,
  },
  unreadText: {
    fontWeight: '700',
  },
  itemMessage: {
    fontSize: 13,
    marginTop: 2,
    lineHeight: 18,
  },
  itemTime: {
    fontSize: 11,
    marginTop: 4,
  },
  unreadIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 8,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    gap: 4,
  },
  seeAllText: {
    fontSize: 14,
  },
});
