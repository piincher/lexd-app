import React from 'react';
import { ActivityIndicator, ScrollView, Text, View, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import type { RootStackScreenProps } from '@src/navigations/type';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { AuditChangeList, AuditDetailBlock } from '../components';
import { useAuditLogDetail } from '../hooks';
import { formatAuditDate } from '../utils/formatAudit';
import { createStyles } from './AuditLogDetailScreen.styles';

const AuditLogDetailScreen: React.FC<RootStackScreenProps<'AuditLogDetail'>> = ({
  navigation,
  route,
}) => {
  const { colors, isDark } = useAppTheme();
  const styles = React.useMemo(() => createStyles(colors, isDark), [colors, isDark]);
  const { data, isLoading, isError } = useAuditLogDetail(route.params.auditLogId);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Pressable style={styles.iconButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={colors.text.primary} />
        </Pressable>
        <Text style={styles.title}>Détail audit</Text>
      </View>
      {isLoading ? (
        <ActivityIndicator style={styles.centered} color={colors.primary.main} />
      ) : isError || !data ? (
        <View style={styles.centered}>
          <Text style={styles.stateText}>Journal introuvable.</Text>
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.content}>
          <AuditDetailBlock
            title="Résumé"
            rows={[
              { label: 'Action', value: data.action },
              { label: 'Statut', value: data.status },
              { label: 'Sévérité', value: data.severity },
              { label: 'Description', value: data.description },
              { label: 'Date', value: formatAuditDate(data.createdAt) },
            ]}
          />
          <AuditDetailBlock
            title="Acteur et ressource"
            rows={[
              { label: 'Acteur', value: data.actor?.name || data.adminName },
              { label: 'Rôle', value: data.actor?.role },
              { label: 'Ressource', value: data.resource?.display || data.targetDisplay },
              { label: 'Type', value: data.resource?.type || data.targetType },
            ]}
          />
          <AuditChangeList changes={data.changeSet} />
          <AuditDetailBlock
            title="Contexte technique"
            rows={[
              { label: 'Adresse IP', value: data.requestMetadata?.ip || data.ipAddress },
              { label: 'User agent', value: data.requestMetadata?.userAgent || data.userAgent },
              { label: 'Erreur', value: data.errorMessage },
            ]}
          />
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default AuditLogDetailScreen;
