import React, { useMemo } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { createStyles } from './ReferralCodeCard.styles';

interface ReferralCodeCardProps {
  referralCode: string;
  bonusPoints: number;
  onCopy: () => void;
  onShare: () => void;
}

export const ReferralCodeCard: React.FC<ReferralCodeCardProps> = ({
  referralCode,
  bonusPoints,
  onCopy,
  onShare,
}) => {
  const { colors } = useAppTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <MaterialCommunityIcons name="gift-outline" size={24} color={colors.primary.main} />
        <View>
          <Text style={[styles.title, { color: colors.text.primary }]}>Parrainage</Text>
          <Text style={[styles.subtitle, { color: colors.text.secondary }]}>
            Gagnez {bonusPoints} points quand un filleul fait son premier envoi.
          </Text>
        </View>
      </View>

      <View style={[styles.codeBox, { borderColor: colors.primary.main }]}>
        <Text style={[styles.code, { color: colors.primary.main }]}>{referralCode || '------'}</Text>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: colors.primary.main }]}
          onPress={onCopy}
          disabled={!referralCode}
        >
          <MaterialCommunityIcons name="content-copy" size={18} color={colors.text.inverse} />
          <Text style={[styles.actionText, { color: colors.text.inverse }]}>Copier</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: colors.background.paper }]}
          onPress={onShare}
          disabled={!referralCode}
        >
          <MaterialCommunityIcons name="share-variant" size={18} color={colors.primary.main} />
          <Text style={[styles.actionText, { color: colors.primary.main }]}>Partager</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
