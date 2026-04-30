import React from 'react';
import { View } from 'react-native';
import { Text, TextInput, Switch, HelperText } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useGoodsFormStyles } from './GoodsForm.styles';

interface DimensionsSectionProps {
  length: string;
  width: string;
  height: string;
  cbm: string;
  useDimensions: boolean;
  calculatedCBM?: number | null;
  onChange: (field: string, value: string | boolean) => void;
}

const ACCENT = '#16A34A';

export const DimensionsSection: React.FC<DimensionsSectionProps> = ({
  length,
  width,
  height,
  cbm,
  useDimensions,
  calculatedCBM,
  onChange,
}) => {
  const styles = useGoodsFormStyles();

  return (
    <>
      <View style={styles.sectionHeader}>
        <MaterialCommunityIcons name="ruler" size={20} color={ACCENT} />
        <Text style={styles.sectionTitle}>Volume (CBM)</Text>
        <View style={styles.switchRow}>
          <Text style={styles.switchLabel}>Dimensions</Text>
          <Switch value={useDimensions} onValueChange={(val) => onChange('useDimensions', val)} color={ACCENT} />
        </View>
      </View>

      {useDimensions ? (
        <>
          <View style={styles.row}>
            <TextInput
              mode="outlined" label="Longueur" value={length}
              onChangeText={(v) => onChange('length', v.replace(/[^0-9.]/g, ''))}
              keyboardType="decimal-pad" style={[styles.input, styles.thirdInput]}
              outlineStyle={styles.inputOutline} outlineColor="#E0E0E0" activeOutlineColor={ACCENT}
              right={<TextInput.Affix text="cm" />}
            />
            <TextInput
              mode="outlined" label="Largeur" value={width}
              onChangeText={(v) => onChange('width', v.replace(/[^0-9.]/g, ''))}
              keyboardType="decimal-pad" style={[styles.input, styles.thirdInput]}
              outlineStyle={styles.inputOutline} outlineColor="#E0E0E0" activeOutlineColor={ACCENT}
              right={<TextInput.Affix text="cm" />}
            />
            <TextInput
              mode="outlined" label="Hauteur" value={height}
              onChangeText={(v) => onChange('height', v.replace(/[^0-9.]/g, ''))}
              keyboardType="decimal-pad" style={[styles.input, styles.thirdInput]}
              outlineStyle={styles.inputOutline} outlineColor="#E0E0E0" activeOutlineColor={ACCENT}
              right={<TextInput.Affix text="cm" />}
            />
          </View>
          {calculatedCBM != null && calculatedCBM > 0 && (
            <View style={styles.cbmBadge}>
              <MaterialCommunityIcons name="cube-outline" size={16} color={ACCENT} />
              <Text style={styles.cbmText}>CBM calculé: {calculatedCBM.toFixed(4)} m³</Text>
            </View>
          )}
        </>
      ) : (
        <TextInput
          mode="outlined" label="CBM (m³)" value={cbm}
          onChangeText={(v) => onChange('cbm', v.replace(/[^0-9.]/g, ''))}
          keyboardType="decimal-pad" style={styles.input}
          outlineStyle={styles.inputOutline} outlineColor="#E0E0E0" activeOutlineColor={ACCENT}
          right={<TextInput.Affix text="m³" />}
        />
      )}
    </>
  );
};
