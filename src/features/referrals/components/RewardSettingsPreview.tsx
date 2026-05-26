import React, { useMemo, useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import type { RewardSettings } from '../types';
import { createStyles } from './RewardSettingsPreview.styles';

interface RewardSettingsPreviewProps {
  settings: RewardSettings;
}

const formatFCFA = (value: number) => `${Math.round(value).toLocaleString('fr-FR')} FCFA`;

export const RewardSettingsPreview: React.FC<RewardSettingsPreviewProps> = ({ settings }) => {
  const { colors } = useAppTheme();
  const styles = createStyles(colors);
  const [mode, setMode] = useState<'SEA' | 'AIR'>('SEA');
  const [quantity, setQuantity] = useState('2.5');

  const parsedQty = Number.parseFloat(quantity.replace(',', '.')) || 0;

  const preview = useMemo(() => {
    const isAir = mode === 'AIR';
    const unit = isAir ? settings.kgUnit : settings.cbmUnit;
    const pointsPerUnit = isAir ? settings.pointsPerKgUnit : settings.pointsPerCbmUnit;

    if (!unit || !pointsPerUnit || parsedQty <= 0) {
      return { units: 0, points: 0, value: 0 };
    }

    const units = Math.floor((parsedQty + Number.EPSILON) / unit);
    const points = units * pointsPerUnit;
    const value = points * settings.pointValueFCFA;

    return { units, points, value };
  }, [mode, parsedQty, settings]);

  return (
    <View style={styles.container}>
      <View style={styles.modeRow}>
        <TouchableOpacity
          style={[styles.modeButton, mode === 'SEA' && styles.modeButtonActive]}
          onPress={() => setMode('SEA')}
        >
          <MaterialCommunityIcons
            name="ferry"
            size={16}
            color={mode === 'SEA' ? colors.primary.main : colors.text.secondary}
          />
          <Text style={[styles.modeText, mode === 'SEA' && styles.modeTextActive]}>Mer</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.modeButton, mode === 'AIR' && styles.modeButtonActive]}
          onPress={() => setMode('AIR')}
        >
          <MaterialCommunityIcons
            name="airplane"
            size={16}
            color={mode === 'AIR' ? colors.primary.main : colors.text.secondary}
          />
          <Text style={[styles.modeText, mode === 'AIR' && styles.modeTextActive]}>Air</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.inputRow}>
        <Text style={styles.inputLabel}>
          {mode === 'SEA' ? 'Volume (CBM)' : 'Poids (KG)'}
        </Text>
        <TextInput
          style={styles.input}
          value={quantity}
          onChangeText={setQuantity}
          keyboardType="decimal-pad"
          placeholder="0.0"
          placeholderTextColor={colors.text.disabled}
          selectTextOnFocus
        />
      </View>

      <View style={styles.resultBox}>
        <View style={styles.resultRow}>
          <Text style={styles.resultLabel}>Unités</Text>
          <Text style={styles.resultValue}>{preview.units}</Text>
        </View>
        <View style={styles.resultRow}>
          <Text style={styles.resultLabel}>Points gagnés</Text>
          <Text style={[styles.resultValue, { color: colors.status.success }]}>
            +{preview.points}
          </Text>
        </View>
        <View style={styles.resultRow}>
          <Text style={styles.resultLabel}>Valeur</Text>
          <Text style={[styles.resultValue, { color: colors.primary.main }]}>
            {formatFCFA(preview.value)}
          </Text>
        </View>
      </View>

      <Text style={styles.formula}>
        {mode === 'SEA'
          ? `⌊${parsedQty} CBM ÷ ${settings.cbmUnit}⌋ × ${settings.pointsPerCbmUnit} pts = ${preview.points} pts`
          : `⌊${parsedQty} KG ÷ ${settings.kgUnit}⌋ × ${settings.pointsPerKgUnit} pts = ${preview.points} pts`}
      </Text>
    </View>
  );
};
