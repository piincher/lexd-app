import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Portal, Dialog, Button } from 'react-native-paper';
import { Theme } from '@src/constants/Theme';
import { RouteTemplate } from '../../../types';

interface ImportTemplateDialogProps {
  visible: boolean;
  templates: RouteTemplate[];
  onDismiss: () => void;
  onImport: (template: RouteTemplate) => void;
}

export const ImportTemplateDialog: React.FC<ImportTemplateDialogProps> = ({
  visible,
  templates,
  onDismiss,
  onImport,
}) => {
  return (
    <Portal>
      <Dialog visible={visible} onDismiss={onDismiss}>
        <Dialog.Icon icon="download" color={Theme.primary[600]} />
        <Dialog.Title style={styles.dialogTitle}>Importer un Template</Dialog.Title>
        <Dialog.ScrollArea style={styles.scrollArea}>
          <ScrollView>
            {templates.map((template) => (
              <TouchableOpacity
                key={template.id}
                style={styles.templateItem}
                onPress={() => onImport(template)}
                activeOpacity={0.7}
              >
                <View style={styles.templateIcon}>
                  <Ionicons name="map" size={24} color={Theme.primary[500]} />
                </View>
                <View style={styles.templateInfo}>
                  <Text style={styles.templateName}>{template.name}</Text>
                  <Text style={styles.templateDescription}>{template.description}</Text>
                  <Text style={styles.templateStats}>
                    {template.waypoints.length} waypoints •{' '}
                    {template.seaSegments?.length || 0} maritime •{' '}
                    {template.roadSegments?.length || 0} routier
                  </Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color={Theme.neutral[400]} />
              </TouchableOpacity>
            ))}
          </ScrollView>
        </Dialog.ScrollArea>
        <Dialog.Actions>
          <Button onPress={onDismiss}>Annuler</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

const styles = StyleSheet.create({
  dialogTitle: {
    textAlign: 'center',
    fontWeight: '700',
  },
  scrollArea: {
    maxHeight: 400,
    paddingHorizontal: Theme.spacing.md,
  },
  templateItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Theme.neutral[50],
    padding: Theme.spacing.md,
    borderRadius: Theme.radius.lg,
    marginBottom: Theme.spacing.md,
  },
  templateIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Theme.primary[50],
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Theme.spacing.md,
  },
  templateInfo: {
    flex: 1,
  },
  templateName: {
    fontSize: 15,
    fontWeight: '700',
    color: Theme.neutral[800],
  },
  templateDescription: {
    fontSize: 12,
    color: Theme.neutral[500],
    marginTop: 2,
  },
  templateStats: {
    fontSize: 11,
    color: Theme.primary[500],
    marginTop: 4,
    fontWeight: '600',
  },
});
