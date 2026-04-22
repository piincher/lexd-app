/**
 * ClientLoadingListScreen
 * Shows client's loading sequence in container
 * Simple version - displays loading position and sequence
 */

import React, { useMemo } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  RefreshControl,
} from 'react-native';
import {
  Appbar,
  Text,
  Card,
  Divider,
  useTheme,
} from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import type { RootStackScreenProps } from '@src/navigations/type';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { NotificationBell } from '@src/features/notifications';

export const ClientLoadingListScreen: React.FC<RootStackScreenProps<'ClientLoadingList'>> = ({
  route,
  navigation,
}) => {
  const { containerId } = route.params;
  const theme = useTheme();
  const { colors, isDark } = useAppTheme();

  const styles = useMemo(() => StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background.paper,
    },
    content: {
      flex: 1,
      padding: 16,
    },
    card: {
      marginVertical: 8,
      borderRadius: 12,
    },
    iconContainer: {
      alignItems: 'center',
      marginVertical: 24,
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: 16,
      color: colors.text.primary,
    },
    divider: {
      marginVertical: 16,
    },
    description: {
      fontSize: 14,
      lineHeight: 22,
      color: colors.text.secondary,
      textAlign: 'center',
    },
  }), [colors, isDark]);

  return (
    <SafeAreaView style={styles.container}>
      <Appbar.Header style={{ backgroundColor: colors.primary.dark }}>
        <Appbar.BackAction color={colors.text.inverse} onPress={() => navigation.goBack()} />
        <Appbar.Content title="Plan de Chargement" titleStyle={{ color: colors.text.inverse }} />
        <NotificationBell
          onPress={() => navigation.navigate('Notifications' as never)}
          size={24}
          color={colors.text.inverse}
        />
      </Appbar.Header>

      <ScrollView
        style={styles.content}
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={() => {}} />
        }
      >
        <Card style={styles.card}>
          <Card.Content>
            <View style={styles.iconContainer}>
              <MaterialCommunityIcons
                name="truck-delivery"
                size={64}
                color={colors.primary.main}
              />
            </View>
            <Text style={styles.title}>Fonctionnalité à venir</Text>
            <Divider style={styles.divider} />
            <Text style={styles.description}>
              Le plan de chargement détaillé sera bientôt disponible.{'\n\n'}
              Cette fonctionnalité vous permettra de voir :{'\n'}
              • Votre position dans la séquence de chargement{'\n'}
              • La section du conteneur où vos marchandises seront placées{'\n'}
              • L'ordre de chargement de vos articles
            </Text>
          </Card.Content>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ClientLoadingListScreen;
