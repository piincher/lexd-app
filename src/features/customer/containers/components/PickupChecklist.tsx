import React from 'react';
import { View, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { createPickupInfoCardStyles } from './PickupInfoCard.styles';

const CHECKLIST_ITEMS = [
  { icon: 'card-account-details-outline' as const, text: "Pièce d'identité du client ou du mandataire" },
  { icon: 'receipt' as const, text: 'Reçu de paiement ou confirmation de solde' },
  { icon: 'phone-message-outline' as const, text: "Appelez l'entrepôt avant déplacement" },
];

export const PickupChecklist: React.FC = () => {
  const { colors, isDark } = useAppTheme();
  const styles = createPickupInfoCardStyles(colors, isDark);

  return (
    <View style={styles.checklist}>
      {CHECKLIST_ITEMS.map((item) => (
        <View key={item.icon} style={styles.checklistItem}>
          <MaterialCommunityIcons name={item.icon} size={18} color={colors.accent.goldDark} />
          <Text style={styles.checklistText}>{item.text}</Text>
        </View>
      ))}
    </View>
  );
};
