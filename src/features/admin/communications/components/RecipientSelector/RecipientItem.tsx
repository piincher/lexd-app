import React from 'react';
import { View, Pressable } from 'react-native';
import { Text } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useRecipientSelectorStyles } from './RecipientSelector.styles';
import type { Recipient } from '../RecipientSelector';

interface RecipientItemProps {
  item: Recipient;
  index: number;
  isSelected: boolean;
  onToggle: (id: string) => void;
}

export const RecipientItem: React.FC<RecipientItemProps> = ({ item, index, isSelected, onToggle }) => {
  const styles = useRecipientSelectorStyles();

  return (
    <Animated.View entering={FadeInDown.delay(Math.min(index * 20, 150)).springify().damping(18)}>
      <Pressable
        onPress={() => onToggle(item.id)}
        style={[styles.recipientRow, isSelected && styles.recipientRowSelected]}
      >
        <View style={[styles.avatar, isSelected && styles.avatarSelected]}>
          <Text style={[styles.avatarText, isSelected && styles.avatarTextSelected]}>
            {item.name.charAt(0).toUpperCase()}
          </Text>
        </View>
        <View style={styles.recipientInfo}>
          <Text style={styles.recipientName} numberOfLines={1}>
            {item.name}
          </Text>
          <Text style={styles.recipientPhone}>{item.phone}</Text>
        </View>
        <View style={[styles.checkbox, isSelected && styles.checkboxSelected]}>
          {isSelected && <Ionicons name="checkmark" size={14} color="#FFF" />}
        </View>
      </Pressable>
    </Animated.View>
  );
};
