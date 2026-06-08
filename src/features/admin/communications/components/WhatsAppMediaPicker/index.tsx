import React from "react";
import { View, Image, ScrollView, TouchableOpacity, ActivityIndicator } from "react-native";
import { Text } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { useAppTheme } from "@src/providers/ThemeProvider";
import type { WhatsAppMediaItem } from "../../hooks/useWhatsAppMedia";
import { MAX_WHATSAPP_MEDIA } from "../../hooks/useWhatsAppMedia";
import { createStyles } from "./WhatsAppMediaPicker.styles";

interface WhatsAppMediaPickerProps {
  items: WhatsAppMediaItem[];
  canAddMore: boolean;
  disabled?: boolean;
  onPickImages: () => void;
  onPickVideos: () => void;
  onRemove: (id: string) => void;
  onRetry: (id: string) => void;
}

const formatDuration = (ms?: number | null): string => {
  if (!ms || ms <= 0) return "";
  const totalSeconds = Math.round(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};

const formatSize = (bytes?: number): string => {
  if (!bytes) return "";
  const mb = bytes / (1024 * 1024);
  if (mb >= 1) return `${mb.toFixed(1)} Mo`;
  return `${Math.max(1, Math.round(bytes / 1024))} Ko`;
};

const MediaThumb: React.FC<{
  item: WhatsAppMediaItem;
  styles: ReturnType<typeof createStyles>;
  iconColor: string;
  onRemove: (id: string) => void;
  onRetry: (id: string) => void;
}> = ({ item, styles, iconColor, onRemove, onRetry }) => {
  const { local, status, progress } = item;

  return (
    <View style={styles.thumbWrap}>
      {local.type === "image" ? (
        <Image source={{ uri: local.uri }} style={styles.thumbImage} resizeMode="cover" />
      ) : (
        <View style={styles.videoThumb}>
          <Ionicons name="videocam" size={26} color="#FFFFFF" />
          {!!formatDuration(local.duration) && (
            <Text style={styles.videoDuration}>{formatDuration(local.duration)}</Text>
          )}
        </View>
      )}

      {status === "uploading" && (
        <View style={styles.overlay}>
          <ActivityIndicator size="small" color="#FFFFFF" />
          <Text style={styles.overlayText}>{progress}%</Text>
        </View>
      )}

      {status === "error" && (
        <TouchableOpacity style={styles.overlay} onPress={() => onRetry(item.id)} activeOpacity={0.8}>
          <Ionicons name="refresh" size={20} color="#FFFFFF" />
          <Text style={styles.overlayText}>Réessayer</Text>
        </TouchableOpacity>
      )}

      {status !== "uploading" && !!formatSize(local.size) && (
        <View style={styles.sizeBadge}>
          <Text style={styles.sizeText}>{formatSize(local.size)}</Text>
        </View>
      )}

      <TouchableOpacity style={styles.removeButton} onPress={() => onRemove(item.id)} activeOpacity={0.8}>
        <Ionicons name="close" size={14} color="#FFFFFF" />
      </TouchableOpacity>
    </View>
  );
};

export const WhatsAppMediaPicker: React.FC<WhatsAppMediaPickerProps> = ({
  items,
  canAddMore,
  disabled,
  onPickImages,
  onPickVideos,
  onRemove,
  onRetry,
}) => {
  const { colors } = useAppTheme();
  const styles = createStyles(colors);
  const addDisabled = disabled || !canAddMore;

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.label}>Média (optionnel)</Text>
        <Text style={styles.counter}>
          {items.length}/{MAX_WHATSAPP_MEDIA}
        </Text>
      </View>

      <View style={styles.actionsRow}>
        <TouchableOpacity
          style={[styles.actionButton, addDisabled && styles.actionButtonDisabled]}
          onPress={onPickImages}
          disabled={addDisabled}
          activeOpacity={0.8}
        >
          <Ionicons name="image" size={18} color={colors.primary[700]} />
          <Text style={styles.actionText}>Image</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionButton, addDisabled && styles.actionButtonDisabled]}
          onPress={onPickVideos}
          disabled={addDisabled}
          activeOpacity={0.8}
        >
          <Ionicons name="videocam" size={18} color={colors.primary[700]} />
          <Text style={styles.actionText}>Vidéo</Text>
        </TouchableOpacity>
      </View>

      {items.length > 0 && (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.previewList}
          keyboardShouldPersistTaps="handled"
        >
          {items.map((item) => (
            <MediaThumb
              key={item.id}
              item={item}
              styles={styles}
              iconColor={colors.primary[700]}
              onRemove={onRemove}
              onRetry={onRetry}
            />
          ))}
        </ScrollView>
      )}
    </View>
  );
};

export default WhatsAppMediaPicker;
