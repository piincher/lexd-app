import React from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { Theme } from '@src/constants/Theme';

interface WaypointNotesSectionProps {
  notes: string;
  onChangeNotes: (text: string) => void;
  delay?: number;
  onFocus?: () => void;
}

export const WaypointNotesSection: React.FC<WaypointNotesSectionProps> = ({
  notes,
  onChangeNotes,
  delay = 0,
  onFocus,
}) => {
  return (
    <Animated.View entering={FadeIn.delay(delay)} style={styles.section}>
      <View style={styles.sectionHeader}>
        <Ionicons name="document-text" size={18} color={Theme.neutral[500]} />
        <Text style={styles.sectionTitle}>Notes</Text>
      </View>
      <TextInput
        style={[styles.textInput, styles.notesInput]}
        value={notes}
        onChangeText={onChangeNotes}
        placeholder="Ajoutez des notes ou commentaires..."
        placeholderTextColor={Theme.neutral[400]}
        multiline
        numberOfLines={4}
        textAlignVertical="top"
        onFocus={onFocus}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  section: {
    marginBottom: Theme.spacing.xl,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Theme.spacing.sm,
    marginBottom: Theme.spacing.md,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Theme.neutral[700],
  },
  textInput: {
    backgroundColor: Theme.neutral[50],
    borderWidth: 1,
    borderColor: Theme.neutral[200],
    borderRadius: Theme.radius.lg,
    paddingHorizontal: Theme.spacing.md,
    paddingVertical: Theme.spacing.md,
    fontSize: 15,
    color: Theme.neutral[800],
  },
  notesInput: {
    height: 100,
    paddingTop: Theme.spacing.md,
  },
});
