import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Text } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { Fonts } from '@src/constants/Fonts';
import { EditGoodsHeader } from '../EditGoodsHeader';

interface EditGoodsErrorProps {
  isAdmin: boolean;
  error?: string;
  onBack: () => void;
  onNotification: () => void;
}

export const EditGoodsError: React.FC<EditGoodsErrorProps> = ({
  isAdmin,
  error,
  onBack,
  onNotification,
}) => {
  const { colors } = useAppTheme();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background.paper }]}>
      <EditGoodsHeader
        title="Modifier"
        onBack={onBack}
        onNotification={onNotification}
        color={colors.text.secondary}
      />
      <View style={styles.centerContainer}>
        <MaterialCommunityIcons
          name={!isAdmin ? 'shield-lock' : 'lock'}
          size={64}
          color={colors.status.success}
        />
        <Text style={[styles.errorTitle, { color: colors.text.primary }]}>
          Modification impossible
        </Text>
        <Text style={[styles.errorText, { color: colors.text.secondary }]}>
          {error || 'Les marchandises ne peuvent être modifiées après leur assignation à un conteneur.'}
        </Text>
        <Button mode="contained" onPress={onBack} style={styles.backButton}>
          Retour
        </Button>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  errorTitle: {
    fontSize: 18,
    fontFamily: Fonts.bold,
    marginTop: 16,
  },
  errorText: {
    fontSize: 14,
    fontFamily: Fonts.regular,
    textAlign: 'center',
    marginTop: 8,
  },
  backButton: {
    marginTop: 24,
  },
});
