import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { createStyles } from './SupplierShareGuide.styles';

interface SupplierShareGuideProps {
  onCreateClient: () => void;
}

const Step = ({ number, title, detail }: { number: string; title: string; detail: string }) => {
  const { colors, isDark } = useAppTheme();
  const styles = createStyles(colors, isDark);
  return (
    <View style={styles.step}>
      <View style={styles.stepNumber}><Text style={styles.stepNumberText}>{number}</Text></View>
      <View style={styles.stepText}>
        <Text style={styles.stepTitle}>{title}</Text>
        <Text style={styles.stepDetail}>{detail}</Text>
      </View>
    </View>
  );
};

export const SupplierShareGuide: React.FC<SupplierShareGuideProps> = ({ onCreateClient }) => {
  const { colors, isDark } = useAppTheme();
  const styles = createStyles(colors, isDark);

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.iconBox}>
          <Ionicons name="paper-plane-outline" size={21} color={colors.primary.main} />
        </View>
        <View style={styles.heading}>
          <Text style={styles.eyebrow}>PARTAGE FOURNISSEUR</Text>
          <Text style={styles.title}>Une marque prête en quelques secondes</Text>
        </View>
      </View>

      <Step number="1" title="Retrouvez le client" detail="Recherchez par nom, téléphone ou ID unique." />
      <Step number="2" title="Partagez au fournisseur" detail="La marque est générée automatiquement si nécessaire." />

      <Pressable
        onPress={onCreateClient}
        style={({ pressed }) => [styles.createButton, pressed && styles.pressed]}
        accessibilityRole="button"
        accessibilityLabel="Créer un nouveau client pour partager sa marque"
        android_ripple={{ color: colors.action.selected }}
      >
        <Ionicons name="person-add-outline" size={20} color={colors.primary.main} />
        <Text style={styles.createButtonText}>Créer un nouveau client</Text>
        <Ionicons name="chevron-forward" size={19} color={colors.primary.main} />
      </Pressable>
    </View>
  );
};
