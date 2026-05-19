import React from 'react';
import { View } from 'react-native';
import { Text, TextInput, Switch, HelperText } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useGoodsFormStyles } from './GoodsForm.styles';
import { useAppTheme } from '@src/providers/ThemeProvider';

interface DimensionsSectionProps {
  length: string;
  width: string;
  height: string;
  cbm: string;
  useDimensions: boolean;
  calculatedCBM?: number | null;
  onChange: (field: string, value: string | boolean) => void;
}

export const DimensionsSection: React.FC<DimensionsSectionProps> = ({
  length,
  width,
  height,
  cbm,
  useDimensions,
  calculatedCBM,
  onChange,
}) => {
  const { colors } = useAppTheme();
  const styles = useGoodsFormStyles();

  return (
    <>
      <View style={styles.sectionHeader}>
        <MaterialCommunityIcons name="ruler" size={20} color={colors.primary.main} />
        <Text style={styles.sectionTitle}>Volume (CBM)</Text>
        <View style={styles.switchRow}>
          <Text style={styles.switchLabel}>Dimensions</Text>
          <Switch value={useDimensions} onValueChange={(val) => onChange('useDimensions', val)} color={colors.primary.main} />
        </View>
      </View>

      {useDimensions ? (
        <>
          <View style={styles.row}>
            <TextInput
              mode="outlined" label="Longueur" value={length}
              onChangeText={(v) => onChange('length', v.replace(/[^0-9.]/g, ''))}
              keyboardType="decimal-pad" style={[styles.input, styles.thirdInput]}
              outlineStyle={styles.inputOutline} outlineColor={colors.border} activeOutlineColor={colors.primary.main}
              right={<TextInput.Affix text="cm" />}
            />
            <TextInput
              mode="outlined" label="Largeur" value={width}
              onChangeText={(v) => onChange('width', v.replace(/[^0-9.]/g, ''))}
              keyboardType="decimal-pad" style={[styles.input, styles.thirdInput]}
              outlineStyle={styles.inputOutline} outlineColor={colors.border} activeOutlineColor={colors.primary.main}
              right={<TextInput.Affix text="cm" />}
            />
            <TextInput
              mode="outlined" label="Hauteur" value={height}
              onChangeText={(v) => onChange('height', v.replace(/[^0-9.]/g, ''))}
              keyboardType="decimal-pad" style={[styles.input, styles.thirdInput]}
              outlineStyle={styles.inputOutline} outlineColor={colors.border} activeOutlineColor={colors.primary.main}
              right={<TextInput.Affix text="cm" />}
            />
          </View>
          {calculatedCBM != null && calculatedCBM > 0 && (
            <View style={styles.cbmBadge}>
              <MaterialCommunityIcons name="cube-outline" size={16} color={colors.primary.main} />
              <Text style={styles.cbmText}>CBM calculé: {calculatedCBM.toFixed(4)} m³</Text>
            </View>
          )}
        </>
      ) : (
        <TextInput
          mode="outlined" label="CBM (m³)" value={cbm}
          onChangeText={(v) => onChange('cbm', v.replace(/[^0-9.]/g, ''))}
          keyboardType="decimal-pad" style={styles.input}
          outlineStyle={styles.inputOutline} outlineColor={colors.border} activeOutlineColor={colors.primary.main}
          right={<TextInput.Affix text="m³" />}
        />
      )}
    </>
  );
};
