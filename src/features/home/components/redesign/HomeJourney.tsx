import React from 'react';
import { Text, View } from 'react-native';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { createHomeRedesignStyles } from './HomeRedesign.styles';

const STEPS = [
  { title: 'Vous achetez en Chine', body: 'Commandez vous-même ou confiez-nous la recherche et le paiement du fournisseur.' },
  { title: 'Nous recevons et contrôlons', body: 'Vos colis arrivent à notre entrepôt, où ils sont identifiés avant expédition.' },
  { title: 'Vous suivez le trajet', body: 'Les étapes, documents et changements de statut restent visibles dans l’application.' },
  { title: 'Vous récupérez au Mali', body: 'Nous coordonnons l’arrivée, le dédouanement et la remise de votre marchandise.' },
] as const;

export const HomeJourney: React.FC = () => {
  const { colors, isDark } = useAppTheme();
  const styles = createHomeRedesignStyles(colors, isDark);

  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Du fournisseur à votre remise</Text>
        <Text style={styles.sectionBody}>Quatre étapes, un interlocuteur du départ à l’arrivée.</Text>
      </View>
      <View style={styles.journeyList}>
        {STEPS.map((step, index) => (
          <View key={step.title} style={styles.journeyRow}>
            <View style={styles.journeyRail}>
              <View style={styles.journeyNode}>
                <Text style={styles.journeyNodeText}>{index + 1}</Text>
              </View>
              {index < STEPS.length - 1 && <View style={styles.journeyRule} />}
            </View>
            <View style={styles.journeyCopy}>
              <Text style={styles.journeyTitle}>{step.title}</Text>
              <Text style={styles.journeyBody}>{step.body}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};
