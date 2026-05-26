import React, { useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { NotificationBell } from '@src/shared/ui/NotificationBell';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Theme, type ThemeContextType } from '@src/constants/Theme';

type LoadingListRouteParams = {
  containerId?: string;
  initialClientId?: string;
  clientId?: string;
};
type PackingNavigation = {
  navigate: (screen: 'PackingList', params: LoadingListRouteParams) => void;
};

interface HeaderProps {
  containerNumber: string;
  itemCount: number;
  articleCount: number;
  onBack: () => void;
  onNavigateToPackingList: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  containerNumber,
  itemCount,
  articleCount,
  onBack,
  onNavigateToPackingList,
}) => {
  const { colors } = useAppTheme();
  const navigation = useNavigation();
  const route = useRoute();
  const params = route.params as LoadingListRouteParams | undefined;
  const styles = createStyles(colors);
  const handlePackingPress = useCallback(() => {
    const clientId = params?.initialClientId || params?.clientId;
    if (params?.containerId) {
      (navigation as PackingNavigation).navigate('PackingList', {
        containerId: params.containerId,
        initialClientId: clientId,
        clientId,
      });
      return;
    }
    onNavigateToPackingList();
  }, [navigation, onNavigateToPackingList, params]);

  return (
    <LinearGradient
      colors={[colors.background.card, colors.feedback.warningBg]}
      style={styles.header}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <View style={styles.headerTop}>
        <TouchableOpacity style={styles.backIconButton} onPress={onBack}>
          <Ionicons name="arrow-back" size={22} color={colors.feedback.warningDark} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Plan de Chargement</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
          <TouchableOpacity style={styles.backIconButton} onPress={handlePackingPress}>
            <Ionicons name="document-text" size={20} color={colors.feedback.warningDark} />
          </TouchableOpacity>
          <NotificationBell
            onPress={() => navigation.navigate('Notifications' as never)}
            size={22}
            color={colors.feedback.warningDark}
          />
        </View>
      </View>
      <Text style={styles.headerSubtitle}>{containerNumber}</Text>
      <Text style={styles.headerMeta}>
        {itemCount} colis · {articleCount} articles · Ordre poids décroissant
      </Text>
    </LinearGradient>
  );
};

const createStyles = (colors: ThemeContextType['colors']) => StyleSheet.create({
  header: {
    paddingTop: Theme.spacing.lg,
    paddingBottom: Theme.spacing.lg,
    paddingHorizontal: Theme.spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.status.warning + '30',
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  backIconButton: {
    width: 44,
    height: 44,
    borderRadius: Theme.radius.full,
    backgroundColor: colors.background.card,
    borderWidth: 1,
    borderColor: colors.status.warning + '30',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.text.primary,
  },
  headerSubtitle: {
    fontSize: 26,
    fontWeight: '900',
    color: colors.feedback.warningDark,
    textAlign: 'center',
    marginTop: Theme.spacing.md,
  },
  headerMeta: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.text.secondary,
    textAlign: 'center',
    marginTop: Theme.spacing.xs,
  },
});
