/**
 * Goods Form Component
 */

import React from 'react';
import { View } from 'react-native';
import { Text, TextInput, HelperText } from 'react-native-paper';
import { useGoodsFormStyles } from './GoodsForm.styles';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { FormSection } from './FormSection';
import { ShippingModeSelector } from './ShippingModeSelector';
import { DimensionsSection } from './DimensionsSection';

interface GoodsFormData {
  description: string;
  quantity: string;
  weight: string;
  length: string;
  width: string;
  height: string;
  cbm: string;
  unitPrice: string;
  location: string;
  shippingMode: 'AIR' | 'SEA';
  receivedByName: string;
  useDimensions: boolean;
}

interface GoodsFormProps {
  data: GoodsFormData;
  onChange: (field: keyof GoodsFormData, value: string | boolean) => void;
  calculatedCBM?: number | null;
  calculatedTotalCost?: number;
  onInputFocus?: () => void;
}

export const GoodsForm: React.FC<GoodsFormProps> = ({ data, onChange, calculatedCBM, calculatedTotalCost, onInputFocus }) => {
  const { colors } = useAppTheme();
  const styles = useGoodsFormStyles();
  const isSea = data.shippingMode === 'SEA';

  return (
    <View style={styles.container}>
      <FormSection icon="truck-delivery" title="Mode d'expédition">
        <ShippingModeSelector mode={data.shippingMode} onChange={(mode) => onChange('shippingMode', mode)} />
      </FormSection>

      <FormSection icon="text-box" title="Description">
        <TextInput
          mode="outlined" label="Description de la marchandise" value={data.description}
          onChangeText={(v) => onChange('description', v)} multiline numberOfLines={3}
          style={styles.textArea} outlineStyle={styles.inputOutline}
          outlineColor={colors.border} activeOutlineColor={colors.primary.main}
          onFocus={onInputFocus}
        />
      </FormSection>

      <FormSection icon="package-variant" title="Quantité et Poids">
        <View style={styles.row}>
          <TextInput
            mode="outlined" label="Quantité" value={data.quantity}
            onChangeText={(v) => onChange('quantity', v.replace(/[^0-9]/g, ''))}
            keyboardType="numeric" style={[styles.input, styles.halfInput]}
            outlineStyle={styles.inputOutline} outlineColor={colors.border} activeOutlineColor={colors.primary.main}
            right={<TextInput.Affix text="pcs" />}
            onFocus={onInputFocus}
          />
          <TextInput
            mode="outlined" label="Poids" value={data.weight}
            onChangeText={(v) => onChange('weight', v.replace(/[^0-9.]/g, ''))}
            keyboardType="decimal-pad" style={[styles.input, styles.halfInput]}
            outlineStyle={styles.inputOutline} outlineColor={colors.border} activeOutlineColor={colors.primary.main}
            right={<TextInput.Affix text="kg" />}
            onFocus={onInputFocus}
          />
        </View>
      </FormSection>

      {isSea && (
        <FormSection icon="ruler" title="Volume (CBM)">
          <DimensionsSection
            length={data.length} width={data.width} height={data.height}
            cbm={data.cbm} useDimensions={data.useDimensions}
            calculatedCBM={calculatedCBM}
            onChange={(field, value) => onChange(field as keyof GoodsFormData, value)}
            onInputFocus={onInputFocus}
          />
        </FormSection>
      )}

      <FormSection icon="cash" title="Prix unitaire">
        <TextInput
          mode="outlined" label="Prix unitaire" value={data.unitPrice}
          onChangeText={(v) => onChange('unitPrice', v.replace(/[^0-9.]/g, ''))}
          keyboardType="decimal-pad" style={styles.input}
          outlineStyle={styles.inputOutline} outlineColor={colors.border} activeOutlineColor={colors.primary.main}
          right={<TextInput.Affix text={isSea ? 'FCFA/m³' : 'FCFA/kg'} />}
          onFocus={onInputFocus}
        />
        {calculatedTotalCost != null && calculatedTotalCost > 0 && (
          <View style={styles.totalCostRow}>
            <Text style={styles.totalCostLabel}>Coût total estimé:</Text>
            <Text style={styles.totalCostValue}>{calculatedTotalCost.toLocaleString('fr-FR')} FCFA</Text>
          </View>
        )}
      </FormSection>

      <FormSection icon="map-marker" title="Emplacement">
        <TextInput
          mode="outlined" label="Emplacement entrepôt" value={data.location}
          onChangeText={(v) => onChange('location', v.toUpperCase())}
          autoCapitalize="characters" style={styles.input}
          outlineStyle={styles.inputOutline} outlineColor={colors.border} activeOutlineColor={colors.primary.main}
          placeholder="Ex: C3"
          onFocus={onInputFocus}
        />
        <HelperText type="info">Format: lettre + chiffre (ex: A1, C3, D5)</HelperText>
      </FormSection>

      <FormSection icon="account-check" title="Réceptionnaire">
        <TextInput
          mode="outlined" label="Nom du réceptionnaire" value={data.receivedByName}
          onChangeText={(v) => onChange('receivedByName', v)}
          style={styles.input} outlineStyle={styles.inputOutline}
          outlineColor={colors.border} activeOutlineColor={colors.primary.main}
          onFocus={onInputFocus}
        />
      </FormSection>
    </View>
  );
};

export default GoodsForm;
