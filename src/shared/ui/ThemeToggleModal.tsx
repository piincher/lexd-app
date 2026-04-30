import React from 'react';
import { Modal, Pressable, View, Text, TouchableOpacity } from 'react-native';
import { ThemeMode } from '@src/constants/Theme';
import { ThemeOption } from './ThemeOption';
import { styles } from './ThemeToggle.styles';

interface ThemeToggleModalProps {
  visible: boolean;
  onClose: () => void;
  currentTheme: ThemeMode;
  onSelect: (theme: ThemeMode) => void;
  colors: any;
}

export const ThemeToggleModal: React.FC<ThemeToggleModalProps> = ({
  visible,
  onClose,
  currentTheme,
  onSelect,
  colors,
}) => (
  <Modal
    animationType="slide"
    transparent
    visible={visible}
    onRequestClose={onClose}
  >
    <Pressable style={styles.modalOverlay} onPress={onClose}>
      <View style={[styles.modalContent, { backgroundColor: colors.background.card }]}>
        <View style={[styles.modalHandle, { backgroundColor: colors.border }]} />
        <Text style={[styles.modalTitle, { color: colors.text.primary }]}>
          Choisir un thème
        </Text>

        <ThemeOption
          icon="sunny"
          label="Clair"
          selected={currentTheme === 'light'}
          onPress={() => onSelect('light')}
          colors={colors}
        />
        <ThemeOption
          icon="moon"
          label="Sombre"
          selected={currentTheme === 'dark'}
          onPress={() => onSelect('dark')}
          colors={colors}
        />
        <ThemeOption
          icon="phone-portrait"
          label="Automatique (Système)"
          selected={currentTheme === 'system'}
          onPress={() => onSelect('system')}
          colors={colors}
        />

        <TouchableOpacity
          style={[styles.closeButton, { backgroundColor: colors.primary.main }]}
          onPress={onClose}
        >
          <Text style={styles.closeButtonText}>Fermer</Text>
        </TouchableOpacity>
      </View>
    </Pressable>
  </Modal>
);
