import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { Theme } from '@src/constants/Theme';

interface WaypointDocumentUploadProps {
  onUpload: () => void;
  delay?: number;
}

export const WaypointDocumentUpload: React.FC<WaypointDocumentUploadProps> = ({
  onUpload,
  delay = 0,
}) => {
  return (
    <Animated.View entering={FadeIn.delay(delay)} style={styles.section}>
      <TouchableOpacity style={styles.uploadButton} onPress={onUpload}>
        <Ionicons name="cloud-upload" size={24} color={Theme.primary[600]} />
        <Text style={styles.uploadButtonText}>Télécharger un Document</Text>
        <Text style={styles.uploadButtonSubtext}>Manifest, BL, ou autres documents</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  section: {
    marginBottom: Theme.spacing.xl,
  },
  uploadButton: {
    backgroundColor: Theme.primary[50],
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: Theme.primary[200],
    borderRadius: Theme.radius.xl,
    padding: Theme.spacing.xl,
    alignItems: 'center',
    gap: Theme.spacing.sm,
  },
  uploadButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: Theme.primary[600],
  },
  uploadButtonSubtext: {
    fontSize: 12,
    color: Theme.neutral[500],
  },
});
