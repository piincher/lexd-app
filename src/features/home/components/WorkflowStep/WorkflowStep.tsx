/**
 * WorkflowStep Component
 * Single step in the How It Works section
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { FontAwesome6 } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';

interface WorkflowStepProps {
  icon: string;
  title: string;
  description: string;
}

export const WorkflowStep: React.FC<WorkflowStepProps> = ({
  icon,
  title,
  description,
}) => {
  const { colors } = useAppTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background.card, borderColor: colors.border }]}>
      <View style={[styles.iconContainer, { backgroundColor: colors.primary.main }]}>
        <FontAwesome6 name={icon as any} size={24} color={colors.text.inverse} />
      </View>
      <View style={styles.textContainer}>
        <Text style={[styles.title, { color: colors.text.primary }]}>{title}</Text>
        <Text style={[styles.description, { color: colors.text.secondary }]}>{description}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
  },
  iconContainer: {
    borderRadius: 8,
    padding: 12,
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontFamily: 'Bold',
    fontSize: 16,
    marginBottom: 4,
  },
  description: {
    fontFamily: 'Medium',
    fontSize: 14,
    lineHeight: 20,
  },
});

export default WorkflowStep;
