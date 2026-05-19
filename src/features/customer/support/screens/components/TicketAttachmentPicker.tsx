/**
 * TicketAttachmentPicker Component
 * Photo picker with image thumbnail previews and remove buttons
 */

import React, { useMemo } from 'react';
import { View, StyleSheet, Image, ActivityIndicator } from 'react-native';
import { Text, IconButton } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Theme } from '@src/constants/Theme';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { Fonts } from '@src/constants/Fonts';

const MAX_ATTACHMENTS = 5;

interface TicketAttachmentPickerProps {
  attachments: string[];
  onChange: (attachments: string[]) => void;
  onPick: () => void;
  isUploading?: boolean;
  disabled?: boolean;
}

export const TicketAttachmentPicker: React.FC<TicketAttachmentPickerProps> = ({
  attachments,
  onChange,
  onPick,
  isUploading,
  disabled,
}) => {
  const { colors } = useAppTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  const handleRemove = (index: number) => {
    onChange(attachments.filter((_, i) => i !== index));
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={[styles.label, { color: colors.text.secondary }]}>Pièces jointes</Text>
        <Text style={[styles.count, { color: colors.text.muted }]}>
          {attachments.length}/{MAX_ATTACHMENTS}
        </Text>
      </View>

      <View style={styles.grid}>
        {attachments.map((uri, index) => (
          <View key={`${uri}-${index}`} style={[styles.thumb, { backgroundColor: colors.neutral[100] }]}>
            <Image source={{ uri }} style={styles.image} resizeMode="cover" />
            <IconButton
              icon="close-circle"
              size={20}
              iconColor={colors.status.error}
              style={styles.remove}
              onPress={() => handleRemove(index)}
              disabled={disabled}
            />
          </View>
        ))}

        {attachments.length < MAX_ATTACHMENTS && (
          <IconButton
            icon="camera-plus"
            size={28}
            iconColor={colors.primary.main}
            style={[styles.addBtn, { borderColor: colors.neutral[300] }]}
            onPress={onPick}
            disabled={disabled || isUploading}
          />
        )}
      </View>

      {isUploading && (
        <View style={styles.uploading}>
          <ActivityIndicator size="small" color={colors.primary.main} />
          <Text style={[styles.uploadingText, { color: colors.text.secondary }]}>Téléchargement...</Text>
        </View>
      )}
    </View>
  );
};

const createStyles = (colors: any) => StyleSheet.create({
  container: { marginTop: 12 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  label: { fontFamily: Fonts.meduim, fontSize: 14 },
  count: { fontFamily: Fonts.regular, fontSize: 12 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  thumb: {
    width: 80,
    height: 80,
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
  },
  image: { width: '100%', height: '100%' },
  remove: { position: 'absolute', top: -8, right: -8, margin: 0, backgroundColor: colors.background.card, borderRadius: 10 },
  addBtn: {
    width: 80,
    height: 80,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderRadius: 12,
    margin: 0,
  },
  uploading: { flexDirection: 'row', alignItems: 'center', marginTop: 10, gap: 8 },
  uploadingText: { fontFamily: Fonts.regular, fontSize: 12 },
});

export default TicketAttachmentPicker;
