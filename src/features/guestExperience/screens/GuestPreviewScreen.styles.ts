import { StyleSheet } from 'react-native';

export const useGuestPreviewScreenStyles = () => {
  return StyleSheet.create({
    screen: { flex: 1 },
    scrollView: { flex: 1 },
    content: { paddingBottom: 100, flexGrow: 1 },
  });
};
