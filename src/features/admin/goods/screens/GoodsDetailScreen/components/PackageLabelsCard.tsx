import React, { useState } from 'react';
import { View } from 'react-native';
import { Button, Card, Text } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import type { Goods } from '../../../types';
import { PackageLabelPrintModal } from '../../../components/PackageLabelPrintModal';
import { packageLabelStyles as styles } from './PackageLabelsCard.styles';

interface Props { goods: Goods }

export const PackageLabelsCard: React.FC<Props> = ({ goods }) => {
  const { colors } = useAppTheme();
  const [visible, setVisible] = useState(false);
  const total = goods.packageCount || goods.packages?.length || 1;
  const packed = goods.packedPackageCount || 0;

  return <>
    <Card style={[styles.card, { backgroundColor: colors.background.card }]}>
      <View style={styles.content}>
        <View style={styles.header}>
          <MaterialCommunityIcons name="qrcode-scan" size={28} color={colors.primary.main} />
          <View style={styles.titleWrap}>
            <Text style={[styles.title, { color: colors.text.primary }]}>Étiquettes QR des colis</Text>
            <Text style={[styles.subtitle, { color: colors.text.secondary }]}>Une identité immuable par carton, sac ou caisse</Text>
          </View>
        </View>
        <View style={styles.metrics}>
          <View style={[styles.metric, { backgroundColor: colors.background.paper }]}><Text style={[styles.value, { color: colors.text.primary }]}>{total}</Text><Text style={[styles.label, { color: colors.text.secondary }]}>Colis physiques</Text></View>
          <View style={[styles.metric, { backgroundColor: colors.background.paper }]}><Text style={[styles.value, { color: colors.text.primary }]}>{packed}</Text><Text style={[styles.label, { color: colors.text.secondary }]}>Déjà emballés</Text></View>
        </View>
        <Button mode="contained" icon="printer" onPress={() => setVisible(true)} style={styles.button}>Voir et imprimer</Button>
      </View>
    </Card>
    <PackageLabelPrintModal visible={visible} goods={goods} onDismiss={() => setVisible(false)} />
  </>;
};
