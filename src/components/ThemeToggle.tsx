/**
 * ThemeToggle Component
 * Allows users to toggle between light/dark/system themes
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Pressable,
  Animated,
} from 'react-native';
import { FontAwesome6, Ionicons } from '@expo/vector-icons';
import { useAppTheme } from '../providers/ThemeProvider';
import { ThemeMode } from '../constants/Theme';

interface ThemeToggleProps {
  /** Variant of the toggle button */
  variant?: 'icon' | 'button' | 'menu';
  /** Size of the icon */
  size?: number;
  /** Custom styles for the button */
  style?: any;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  variant = 'icon',
  size = 24,
  style,
}) => {
  const { theme, setTheme, isDark, colors } = useAppTheme();
  const [modalVisible, setModalVisible] = useState(false);
  // Use useState with lazy initializer for React Compiler compatibility
  const [scaleAnim] = useState(() => new Animated.Value(1));

  // Get current icon based on theme
  const getCurrentIcon = () => {
    switch (theme) {
      case 'light':
        return { name: 'sun', type: 'fa6' };
      case 'dark':
        return { name: 'moon', type: 'fa6' };
      case 'system':
        return { name: 'mobile-screen', type: 'fa6' };
      default:
        return { name: isDark ? 'moon' : 'sun', type: 'fa6' };
    }
  };

  const handlePress = () => {
    if (variant === 'menu') {
      setModalVisible(true);
    } else {
      // Animate
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 0.9,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 100,
          useNativeDriver: true,
        }),
      ]).start();

      // Simple toggle between light/dark
      const newTheme: ThemeMode = isDark ? 'light' : 'dark';
      setTheme(newTheme);
    }
  };

  const handleThemeSelect = (selectedTheme: ThemeMode) => {
    setTheme(selectedTheme);
    setModalVisible(false);
  };

  const currentIcon = getCurrentIcon();

  // Icon variant
  if (variant === 'icon') {
    return (
      <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
        <TouchableOpacity
          onPress={handlePress}
          style={[styles.iconButton, { backgroundColor: colors.background.card }, style]}
          activeOpacity={0.7}
        >
          <FontAwesome6
            name={currentIcon.name as any}
            size={size}
            color={colors.primary.main}
          />
        </TouchableOpacity>
      </Animated.View>
    );
  }

  // Button variant
  if (variant === 'button') {
    return (
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={[
          styles.button,
          {
            backgroundColor: colors.background.card,
            borderColor: colors.border,
          },
          style,
        ]}
        activeOpacity={0.7}
      >
        <FontAwesome6
          name={currentIcon.name as any}
          size={18}
          color={colors.primary.main}
        />
        <Text style={[styles.buttonText, { color: colors.text.primary }]}>
          {theme === 'system' ? 'Système' : isDark ? 'Sombre' : 'Clair'}
        </Text>
        <FontAwesome6
          name="chevron-right"
          size={14}
          color={colors.text.secondary}
        />
      </TouchableOpacity>
    );
  }

  // Menu variant
  return (
    <>
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={[styles.menuButton, style]}
        activeOpacity={0.7}
      >
        <View style={styles.menuIconContainer}>
          <FontAwesome6
            name={currentIcon.name as any}
            size={20}
            color={colors.primary.main}
          />
        </View>
        <Text style={[styles.menuText, { color: colors.text.primary }]}>
          Thème
        </Text>
        <Text style={[styles.menuValue, { color: colors.text.secondary }]}>
          {theme === 'system' ? 'Automatique' : isDark ? 'Sombre' : 'Clair'}
        </Text>
        <FontAwesome6
          name="chevron-right"
          size={16}
          color={colors.text.secondary}
        />
      </TouchableOpacity>

      {/* Theme Selection Modal */}
      <Modal
        animationType="slide"
        transparent
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setModalVisible(false)}
        >
          <View
            style={[
              styles.modalContent,
              { backgroundColor: colors.background.card },
            ]}
          >
            <View
              style={[
                styles.modalHandle,
                { backgroundColor: colors.border },
              ]}
            />
            <Text style={[styles.modalTitle, { color: colors.text.primary }]}>
              Choisir un thème
            </Text>

            <ThemeOption
              icon="sunny"
              label="Clair"
              selected={theme === 'light'}
              onPress={() => handleThemeSelect('light')}
              colors={colors}
            />
            <ThemeOption
              icon="moon"
              label="Sombre"
              selected={theme === 'dark'}
              onPress={() => handleThemeSelect('dark')}
              colors={colors}
            />
            <ThemeOption
              icon="phone-portrait"
              label="Automatique (Système)"
              selected={theme === 'system'}
              onPress={() => handleThemeSelect('system')}
              colors={colors}
            />

            <TouchableOpacity
              style={[
                styles.closeButton,
                { backgroundColor: colors.primary.main },
              ]}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Fermer</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Modal>
    </>
  );
};

// Theme Option Component
interface ThemeOptionProps {
  icon: string;
  label: string;
  selected: boolean;
  onPress: () => void;
  colors: any;
}

const ThemeOption: React.FC<ThemeOptionProps> = ({
  icon,
  label,
  selected,
  onPress,
  colors,
}) => (
  <TouchableOpacity
    style={[
      styles.option,
      {
        backgroundColor: selected
          ? colors.primary.main + '20'
          : colors.background.paper,
        borderColor: selected ? colors.primary.main : colors.border,
      },
    ]}
    onPress={onPress}
    activeOpacity={0.7}
  >
    <Ionicons
      name={icon as any}
      size={24}
      color={selected ? colors.primary.main : colors.text.secondary}
    />
    <Text
      style={[
        styles.optionText,
        {
          color: selected ? colors.primary.main : colors.text.primary,
        },
      ]}
    >
      {label}
    </Text>
    {selected && (
      <Ionicons
        name="checkmark-circle"
        size={24}
        color={colors.primary.main}
      />
    )}
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  iconButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
  },
  buttonText: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
  },
  menuButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  menuIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(34, 197, 94, 0.1)',
    marginRight: 12,
  },
  menuText: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
  },
  menuValue: {
    fontSize: 14,
    marginRight: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 20,
    paddingBottom: 34,
    paddingTop: 12,
  },
  modalHandle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 20,
    textAlign: 'center',
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
  },
  optionText: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
  },
  closeButton: {
    marginTop: 8,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ThemeToggle;
