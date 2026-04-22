import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { Portal, Modal, Card } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { Theme } from '@src/constants/Theme';

interface Option {
  label: string;
  value: string;
}

interface OptionPickerModalProps {
  visible: boolean;
  title: string;
  options: Option[];
  onSelect: (value: string) => void;
  onDismiss: () => void;
}

export const OptionPickerModal: React.FC<OptionPickerModalProps> = ({
  visible,
  title,
  options,
  onSelect,
  onDismiss,
}) => {
  return (
    <Portal>
      <Modal visible={visible} onDismiss={onDismiss} contentContainerStyle={styles.modal}>
        <Card style={styles.card}>
          <View style={styles.header}>
            <Text style={styles.title}>{title}</Text>
            <TouchableOpacity onPress={onDismiss} style={styles.closeButton}>
              <Ionicons name="close" size={24} color={Theme.neutral[600]} />
            </TouchableOpacity>
          </View>
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.body}>
            {options.map((option) => (
              <TouchableOpacity
                key={option.value}
                style={styles.optionButton}
                onPress={() => {
                  onSelect(option.value);
                  onDismiss();
                }}
              >
                <Text style={styles.optionText}>{option.label}</Text>
                <Ionicons name="chevron-forward" size={18} color={Theme.neutral[400]} />
              </TouchableOpacity>
            ))}
          </ScrollView>
        </Card>
      </Modal>
    </Portal>
  );
};

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    justifyContent: 'flex-end',
    margin: 0,
  },
  card: {
    backgroundColor: Theme.colors.background.card,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
    maxHeight: '70%',
    minHeight: '30%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: Theme.neutral[800],
  },
  closeButton: {
    padding: 4,
  },
  body: {
    paddingBottom: 16,
  },
  optionButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: Theme.neutral[100],
  },
  optionText: {
    fontSize: 15,
    fontWeight: '500',
    color: Theme.neutral[700],
  },
});
