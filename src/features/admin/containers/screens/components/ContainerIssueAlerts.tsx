import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import type { ContainerIssue } from '../hooks/containerAssistTypes';

interface ContainerIssueAlertsProps {
  issues: ContainerIssue[];
}

const getIcon = (severity: ContainerIssue['severity']) => {
  if (severity === 'error') return 'alert-circle-outline';
  if (severity === 'warning') return 'warning-outline';
  return 'information-circle-outline';
};

export const ContainerIssueAlerts: React.FC<ContainerIssueAlertsProps> = ({ issues }) => {
  const { colors } = useAppTheme();
  if (issues.length === 0) {
    return (
      <View style={[styles.clean, { backgroundColor: colors.feedback.successBg, borderColor: colors.status.success }]}>
        <Ionicons name="checkmark-circle-outline" size={20} color={colors.status.success} />
        <Text style={[styles.cleanText, { color: colors.feedback.successDark }]}>Aucune alerte opérationnelle</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {issues.map((issue) => {
        const color = issue.severity === 'error'
          ? colors.status.error
          : issue.severity === 'warning'
            ? colors.status.warning
            : colors.status.info;
        return (
          <View key={issue.id} style={[styles.alert, { backgroundColor: colors.background.card, borderColor: color }]}>
            <Ionicons name={getIcon(issue.severity)} size={20} color={color} />
            <View style={styles.body}>
              <Text style={[styles.title, { color: colors.text.primary }]}>{issue.title}</Text>
              <Text style={[styles.detail, { color: colors.text.secondary }]}>{issue.detail}</Text>
            </View>
            <Text style={[styles.count, { color }]}>{issue.count}</Text>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginHorizontal: 16, marginBottom: 14, gap: 8 },
  clean: { marginHorizontal: 16, marginBottom: 14, minHeight: 48, borderRadius: 8, borderWidth: 1, paddingHorizontal: 12, flexDirection: 'row', alignItems: 'center', gap: 8 },
  cleanText: { fontSize: 13, fontWeight: '700' },
  alert: { minHeight: 58, borderRadius: 8, borderWidth: 1, padding: 10, flexDirection: 'row', alignItems: 'center', gap: 10 },
  body: { flex: 1 },
  title: { fontSize: 13, fontWeight: '800' },
  detail: { marginTop: 2, fontSize: 12, fontWeight: '600' },
  count: { fontSize: 15, fontWeight: '900' },
});

export default ContainerIssueAlerts;
