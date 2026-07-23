import React from 'react';
import { Modal, Pressable, View } from 'react-native';
import { Text } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import type { Goods } from '../../types';
import { PackageLabelPrintPanel } from './PackageLabelPrintPanel';
import { styles } from './styles';

interface Props { visible: boolean; goods: Goods | null; onDismiss: () => void }

export const PackageLabelPrintModal: React.FC<Props> = ({ visible, goods, onDismiss }) => {
  const { colors } = useAppTheme();
  if (!goods) return null;

  return <Modal visible={visible} transparent animationType="slide" onRequestClose={onDismiss}>
    <Pressable style={styles.overlay} onPress={onDismiss}>
      <Pressable style={[styles.sheet, { backgroundColor: colors.background.card }]} onPress={(event) => event.stopPropagation()}>
        <View style={[styles.handle, { backgroundColor: colors.border }]} />
        <View style={styles.header}>
          <View><Text style={[styles.kicker, { color: colors.primary.main }]}>Étiquettes colis</Text><Text style={[styles.title, { color: colors.text.primary }]}>{goods.goodsId}</Text></View>
          <Pressable accessibilityRole="button" accessibilityLabel="Fermer" onPress={onDismiss} style={styles.close}><MaterialCommunityIcons name="close" size={24} color={colors.text.secondary} /></Pressable>
        </View>
        <PackageLabelPrintPanel goodsId={goods._id} visible={visible} onPrinted={onDismiss} />
      </Pressable>
    </Pressable>
  </Modal>;
};
