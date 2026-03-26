import React from "react";
import { View, TextInput, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Animated, { FadeInUp } from "react-native-reanimated";

import { styles } from "./SearchBar.styles";

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({ 
  value, 
  onChangeText,
  placeholder = "Rechercher..."
}) => (
  <Animated.View entering={FadeInUp.delay(300).duration(500)} style={styles.wrapper}>
    <View style={styles.container}>
      <Ionicons name="search" size={20} color="#6B7280" style={styles.icon} />
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#9CA3AF"
        value={value}
        onChangeText={onChangeText}
        autoCapitalize="none"
        autoCorrect={false}
      />
      {value ? (
        <TouchableOpacity onPress={() => onChangeText("")} style={styles.clearButton}>
          <View style={styles.clearBadge}>
            <Ionicons name="close" size={14} color="white" />
          </View>
        </TouchableOpacity>
      ) : null}
    </View>
  </Animated.View>
);
