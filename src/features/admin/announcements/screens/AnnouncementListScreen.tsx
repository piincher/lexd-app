import React from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlashList } from "@shopify/flash-list";
import { Ionicons } from "@expo/vector-icons";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { useAnnouncementListScreen } from "./hooks";
import { createStyles } from "./AnnouncementListScreen.styles";

const AnnouncementListScreen: React.FC = () => {
  const { colors } = useAppTheme();
  const styles = createStyles(colors);
  const { status, isLoading, announcements, filters, handlers } = useAnnouncementListScreen();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handlers.handleBack} style={styles.iconButton}>
          <Ionicons name="arrow-back" size={24} color={colors.text.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Annonces</Text>
        <TouchableOpacity
          onPress={handlers.handleCreate}
          style={styles.addButton}
        >
          <Ionicons name="add" size={22} color={colors.text.inverse} />
        </TouchableOpacity>
      </View>
      <View style={styles.filters}>
        {filters.map((filter) => (
          <TouchableOpacity
            key={filter.label}
            onPress={() => handlers.handleFilterChange(filter.value)}
            style={[styles.filterChip, status === filter.value && styles.filterChipActive]}
          >
            <Text style={[styles.filterText, status === filter.value && styles.filterTextActive]}>
              {filter.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {isLoading ? (
        <ActivityIndicator style={styles.loader} color={colors.primary.main} />
      ) : (
        <FlashList
          data={announcements}
          keyExtractor={(item) => item._id}
          contentContainerStyle={styles.listContent}
          onRefresh={handlers.refetch}
          refreshing={isLoading}
          ListEmptyComponent={<Text style={styles.empty}>Aucune annonce pour le moment.</Text>}
          renderItem={handlers.renderItem}
        />
      )}
    </SafeAreaView>
  );
};

export default AnnouncementListScreen;
