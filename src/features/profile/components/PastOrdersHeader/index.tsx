import React from "react";
import { View, Pressable } from "react-native";
import { Text, TextInput } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { NotificationBell } from "@src/shared/ui/NotificationBell";
import { createStyles } from "./PastOrdersHeader.styles";

interface PastOrdersHeaderProps {
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
}

export const PastOrdersHeader: React.FC<PastOrdersHeaderProps> = ({
  searchQuery = "",
  onSearchChange,
}) => {
  const navigation = useNavigation();
  const { colors } = useAppTheme();
  const styles = createStyles(colors);

  return (
    <View style={styles.headerShell}>
      <View style={styles.headerTop}>
        <Pressable
          onPress={() => navigation.goBack()}
          style={styles.iconButton}
          accessibilityRole="button"
          accessibilityLabel="Retour"
        >
          <MaterialCommunityIcons name="arrow-left" size={23} color={colors.text.primary} />
        </Pressable>
        <View style={styles.titleBlock}>
          <Text style={styles.eyebrow}>Historique</Text>
          <Text style={styles.headerTitle}>Expéditions livrées</Text>
        </View>
        <View style={styles.iconButton}>
          <NotificationBell
            onPress={() => navigation.navigate("Notifications" as never)}
            size={23}
            color={colors.text.primary}
          />
        </View>
      </View>
      <TextInput
        value={searchQuery}
        onChangeText={onSearchChange}
        mode="outlined"
        dense
        placeholder="Rechercher code, client, destination..."
        left={<TextInput.Icon icon="magnify" />}
        right={
          searchQuery ? (
            <TextInput.Icon icon="close" onPress={() => onSearchChange?.("")} />
          ) : undefined
        }
        style={styles.searchInput}
        outlineStyle={styles.searchOutline}
        contentStyle={styles.searchContent}
      />
    </View>
  );
};
