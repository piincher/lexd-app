import React from 'react';
import { View, Text, Modal, Pressable, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { useAppTheme } from '@src/providers/ThemeProvider';

interface CountryOption {
  label: string;
  value: string;
}

interface Props {
  visible: boolean;
  onClose: () => void;
  onSelect: (code: string) => void;
  options: CountryOption[];
  selectedCode: string;
}

export const CountryPickerModal: React.FC<Props> = ({
  visible,
  onClose,
  onSelect,
  options,
  selectedCode,
}) => {
  const { colors } = useAppTheme();

  const renderItem = ({ item }: { item: CountryOption }) => {
    const isSelected = item.value === selectedCode;
    const flag = item.value.split('  ')[0];
    return (
      <Pressable
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingVertical: 14,
          paddingHorizontal: 20,
          borderBottomWidth: 1,
          borderBottomColor: colors.border,
          backgroundColor: isSelected ? colors.primary[50] || 'rgba(34,197,94,0.1)' : 'transparent',
        }}
        onPress={() => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          onSelect(item.value);
        }}
      >
        <Text style={{ fontSize: 20, marginRight: 12 }}>{flag}</Text>
        <Text style={{ fontSize: 16, color: colors.text.primary, flex: 1 }}>{item.label}</Text>
        <Text style={{ fontSize: 14, color: colors.text.secondary, fontWeight: '600' }}>
          {item.value.split('  ')[1]}
        </Text>
        {isSelected && (
          <Ionicons name="checkmark" size={20} color={colors.primary.main} style={{ marginLeft: 8 }} />
        )}
      </Pressable>
    );
  };

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <Pressable
        style={{
          flex: 1,
          backgroundColor: 'rgba(0,0,0,0.5)',
          justifyContent: 'flex-end',
        }}
        onPress={onClose}
      >
        <View
          style={{
            backgroundColor: colors.background.card,
            borderTopLeftRadius: 24,
            borderTopRightRadius: 24,
            paddingTop: 16,
            paddingBottom: 32,
            maxHeight: '70%',
          }}
          onStartShouldSetResponder={() => true}
        >
          <View
            style={{
              width: 40,
              height: 4,
              borderRadius: 2,
              backgroundColor: colors.border,
              alignSelf: 'center',
              marginBottom: 16,
            }}
          />
          <Text
            style={{
              fontSize: 18,
              fontWeight: '700',
              color: colors.text.primary,
              textAlign: 'center',
              marginBottom: 16,
            }}
          >
            Sélectionner un pays
          </Text>
          <FlatList
            data={options}
            keyExtractor={(item) => item.value}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </Pressable>
    </Modal>
  );
};
