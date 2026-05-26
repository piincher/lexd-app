import React from 'react';
import { View, StyleSheet, Share } from 'react-native';
import { Text, Surface, Button } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { Fonts } from '@src/constants/Fonts';
import { Theme } from '@src/constants/Theme';

interface Props {
  url: string;
  reference: string;
}

export const SharedShipmentCTA: React.FC<Props> = ({ url, reference }) => {
  const navigation = useNavigation();
  const { colors } = useAppTheme();

  const styles = StyleSheet.create({
    card: {
      padding: Theme.spacing.xl,
      borderRadius: Theme.radius.xl,
      marginTop: Theme.spacing.lg,
      alignItems: 'center',
    },
    icon: {
      marginBottom: Theme.spacing.sm,
    },
    title: {
      fontFamily: Fonts.bold,
      fontSize: 16,
      color: colors.text.primary,
      textAlign: 'center',
    },
    description: {
      fontFamily: Fonts.regular,
      fontSize: 13,
      color: colors.text.secondary,
      textAlign: 'center',
      marginTop: Theme.spacing.xs,
      marginBottom: Theme.spacing.md,
    },
    buttonRow: {
      flexDirection: 'row',
      gap: Theme.spacing.md,
      width: '100%',
    },
    button: {
      flex: 1,
    },
  });

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Suivez mon envoi ChinaLink Express: ${reference}\n${url}`,
        title: 'Suivi ChinaLink Express',
      });
    } catch {
      // Silently fail
    }
  };

  const handleTrackOwn = () => {
    navigation.navigate('HomeTab' as never);
  };

  return (
    <Surface style={styles.card}>
      <MaterialCommunityIcons
        name="truck-delivery"
        size={40}
        color={colors.primary.main}
        style={styles.icon}
      />
      <Text style={styles.title}>ChinaLink Express</Text>
      <Text style={styles.description}>
        Suivez vos propres envois et gérez vos commandes en créant un compte
      </Text>
      <View style={styles.buttonRow}>
        <Button mode="outlined" onPress={handleTrackOwn} style={styles.button}>
          Accueil
        </Button>
        <Button mode="contained" onPress={handleShare} style={styles.button} icon="share-variant">
          Partager
        </Button>
      </View>
    </Surface>
  );
};
