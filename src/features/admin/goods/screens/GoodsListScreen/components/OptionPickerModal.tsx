import React from 'react';
import { Modal, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Card } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { createStyles } from './OptionPickerModal.styles';
import { useAppTheme } from '@src/providers/ThemeProvider';

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
  const { colors, isDark } = useAppTheme();
  const styles = createStyles(colors, isDark);
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onDismiss}
    >
      <View style={styles.overlay}>
        <Card style={styles.card}>
          <View style={styles.header}>
            <Text style={styles.title}>{title}</Text>
            <TouchableOpacity onPress={onDismiss} style={styles.closeButton}>
              <Ionicons name="close" size={24} color={colors.neutral[600]} />
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
                <Ionicons name="chevron-forward" size={18} color={colors.neutral[400]} />
              </TouchableOpacity>
            ))}
          </ScrollView>
        </Card>
      </View>
    </Modal>
  );
};
