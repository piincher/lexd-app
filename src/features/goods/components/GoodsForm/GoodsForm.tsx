/**
 * Goods Form Component
 * Complete form for editing goods information - mirrors all fields from registration
 */

import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, TextInput, Card, HelperText, Switch } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Fonts } from '@src/constants/Fonts';
import { COLORS } from '@src/constants/Colors';

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
}

const ACCENT = '#16A34A';

export const GoodsForm: React.FC<GoodsFormProps> = ({ data, onChange, calculatedCBM, calculatedTotalCost }) => {
  const isSea = data.shippingMode === 'SEA';

  return (
    <View style={styles.container}>
      {/* Shipping Mode */}
      <Card style={styles.card}>
        <Card.Content>
          <View style={styles.sectionHeader}>
            <MaterialCommunityIcons name="truck-delivery" size={20} color={ACCENT} />
            <Text style={styles.sectionTitle}>Mode d'expédition</Text>
          </View>
          <View style={styles.shippingRow}>
            <TouchableOpacity
              style={[styles.shippingOption, data.shippingMode === 'SEA' && styles.shippingOptionActive]}
              onPress={() => onChange('shippingMode', 'SEA')}
            >
              <MaterialCommunityIcons name="ferry" size={24} color={data.shippingMode === 'SEA' ? '#FFF' : COLORS.DimGray} />
              <Text style={[styles.shippingText, data.shippingMode === 'SEA' && styles.shippingTextActive]}>Maritime</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.shippingOption, data.shippingMode === 'AIR' && styles.shippingOptionActive]}
              onPress={() => onChange('shippingMode', 'AIR')}
            >
              <MaterialCommunityIcons name="airplane" size={24} color={data.shippingMode === 'AIR' ? '#FFF' : COLORS.DimGray} />
              <Text style={[styles.shippingText, data.shippingMode === 'AIR' && styles.shippingTextActive]}>Aérien</Text>
            </TouchableOpacity>
          </View>
        </Card.Content>
      </Card>

      {/* Description */}
      <Card style={styles.card}>
        <Card.Content>
          <View style={styles.sectionHeader}>
            <MaterialCommunityIcons name="text-box" size={20} color={ACCENT} />
            <Text style={styles.sectionTitle}>Description</Text>
          </View>
          <TextInput
            mode="outlined"
            label="Description de la marchandise"
            value={data.description}
            onChangeText={(value) => onChange('description', value)}
            multiline
            numberOfLines={3}
            style={styles.textArea}
            outlineStyle={styles.inputOutline}
            outlineColor="#E0E0E0"
            activeOutlineColor={ACCENT}
          />
        </Card.Content>
      </Card>

      {/* Quantity and Weight */}
      <Card style={styles.card}>
        <Card.Content>
          <View style={styles.sectionHeader}>
            <MaterialCommunityIcons name="package-variant" size={20} color={ACCENT} />
            <Text style={styles.sectionTitle}>Quantité et Poids</Text>
          </View>
          <View style={styles.row}>
            <TextInput
              mode="outlined"
              label="Quantité"
              value={data.quantity}
              onChangeText={(value) => onChange('quantity', value.replace(/[^0-9]/g, ''))}
              keyboardType="numeric"
              style={[styles.input, styles.halfInput]}
              outlineStyle={styles.inputOutline}
              outlineColor="#E0E0E0"
              activeOutlineColor={ACCENT}
              right={<TextInput.Affix text="pcs" />}
            />
            <TextInput
              mode="outlined"
              label="Poids"
              value={data.weight}
              onChangeText={(value) => onChange('weight', value.replace(/[^0-9.]/g, ''))}
              keyboardType="decimal-pad"
              style={[styles.input, styles.halfInput]}
              outlineStyle={styles.inputOutline}
              outlineColor="#E0E0E0"
              activeOutlineColor={ACCENT}
              right={<TextInput.Affix text="kg" />}
            />
          </View>
        </Card.Content>
      </Card>

      {/* Dimensions / CBM */}
      {isSea && (
        <Card style={styles.card}>
          <Card.Content>
            <View style={styles.sectionHeader}>
              <MaterialCommunityIcons name="ruler" size={20} color={ACCENT} />
              <Text style={styles.sectionTitle}>Volume (CBM)</Text>
              <View style={styles.switchRow}>
                <Text style={styles.switchLabel}>Dimensions</Text>
                <Switch
                  value={data.useDimensions}
                  onValueChange={(val) => onChange('useDimensions', val)}
                  color={ACCENT}
                />
              </View>
            </View>

            {data.useDimensions ? (
              <>
                <View style={styles.row}>
                  <TextInput
                    mode="outlined"
                    label="Longueur"
                    value={data.length}
                    onChangeText={(value) => onChange('length', value.replace(/[^0-9.]/g, ''))}
                    keyboardType="decimal-pad"
                    style={[styles.input, styles.thirdInput]}
                    outlineStyle={styles.inputOutline}
                    outlineColor="#E0E0E0"
                    activeOutlineColor={ACCENT}
                    right={<TextInput.Affix text="cm" />}
                  />
                  <TextInput
                    mode="outlined"
                    label="Largeur"
                    value={data.width}
                    onChangeText={(value) => onChange('width', value.replace(/[^0-9.]/g, ''))}
                    keyboardType="decimal-pad"
                    style={[styles.input, styles.thirdInput]}
                    outlineStyle={styles.inputOutline}
                    outlineColor="#E0E0E0"
                    activeOutlineColor={ACCENT}
                    right={<TextInput.Affix text="cm" />}
                  />
                  <TextInput
                    mode="outlined"
                    label="Hauteur"
                    value={data.height}
                    onChangeText={(value) => onChange('height', value.replace(/[^0-9.]/g, ''))}
                    keyboardType="decimal-pad"
                    style={[styles.input, styles.thirdInput]}
                    outlineStyle={styles.inputOutline}
                    outlineColor="#E0E0E0"
                    activeOutlineColor={ACCENT}
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
                mode="outlined"
                label="CBM (m³)"
                value={data.cbm}
                onChangeText={(value) => onChange('cbm', value.replace(/[^0-9.]/g, ''))}
                keyboardType="decimal-pad"
                style={styles.input}
                outlineStyle={styles.inputOutline}
                outlineColor="#E0E0E0"
                activeOutlineColor={ACCENT}
                right={<TextInput.Affix text="m³" />}
              />
            )}
          </Card.Content>
        </Card>
      )}

      {/* Unit Price */}
      <Card style={styles.card}>
        <Card.Content>
          <View style={styles.sectionHeader}>
            <MaterialCommunityIcons name="cash" size={20} color={ACCENT} />
            <Text style={styles.sectionTitle}>Prix unitaire</Text>
          </View>
          <TextInput
            mode="outlined"
            label="Prix unitaire"
            value={data.unitPrice}
            onChangeText={(value) => onChange('unitPrice', value.replace(/[^0-9.]/g, ''))}
            keyboardType="decimal-pad"
            style={styles.input}
            outlineStyle={styles.inputOutline}
            outlineColor="#E0E0E0"
            activeOutlineColor={ACCENT}
            right={<TextInput.Affix text={isSea ? 'FCFA/m³' : 'FCFA/kg'} />}
          />
          {calculatedTotalCost != null && calculatedTotalCost > 0 && (
            <View style={styles.totalCostRow}>
              <Text style={styles.totalCostLabel}>Coût total estimé:</Text>
              <Text style={styles.totalCostValue}>
                {calculatedTotalCost.toLocaleString('fr-FR')} FCFA
              </Text>
            </View>
          )}
        </Card.Content>
      </Card>

      {/* Location */}
      <Card style={styles.card}>
        <Card.Content>
          <View style={styles.sectionHeader}>
            <MaterialCommunityIcons name="map-marker" size={20} color={ACCENT} />
            <Text style={styles.sectionTitle}>Emplacement</Text>
          </View>
          <TextInput
            mode="outlined"
            label="Emplacement entrepôt"
            value={data.location}
            onChangeText={(value) => onChange('location', value.toUpperCase())}
            autoCapitalize="characters"
            style={styles.input}
            outlineStyle={styles.inputOutline}
            outlineColor="#E0E0E0"
            activeOutlineColor={ACCENT}
            placeholder="Ex: C3"
          />
          <HelperText type="info">Format: lettre + chiffre (ex: A1, C3, D5)</HelperText>
        </Card.Content>
      </Card>

      {/* Received By */}
      <Card style={styles.card}>
        <Card.Content>
          <View style={styles.sectionHeader}>
            <MaterialCommunityIcons name="account-check" size={20} color={ACCENT} />
            <Text style={styles.sectionTitle}>Réceptionnaire</Text>
          </View>
          <TextInput
            mode="outlined"
            label="Nom du réceptionnaire"
            value={data.receivedByName}
            onChangeText={(value) => onChange('receivedByName', value)}
            style={styles.input}
            outlineStyle={styles.inputOutline}
            outlineColor="#E0E0E0"
            activeOutlineColor={ACCENT}
          />
        </Card.Content>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 12,
  },
  card: {
    borderRadius: 12,
    elevation: 1,
    backgroundColor: '#FFF',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 8,
  },
  sectionTitle: {
    fontFamily: Fonts.bold,
    fontSize: 15,
    color: COLORS.DarkGrey,
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  input: {
    backgroundColor: 'transparent',
  },
  halfInput: {
    flex: 1,
  },
  thirdInput: {
    flex: 1,
  },
  textArea: {
    backgroundColor: 'transparent',
    minHeight: 80,
  },
  inputOutline: {
    borderRadius: 8,
  },
  shippingRow: {
    flexDirection: 'row',
    gap: 12,
  },
  shippingOption: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 14,
    borderRadius: 10,
    backgroundColor: '#F5F5F5',
    borderWidth: 1.5,
    borderColor: '#E0E0E0',
  },
  shippingOptionActive: {
    backgroundColor: ACCENT,
    borderColor: ACCENT,
  },
  shippingText: {
    fontFamily: Fonts.bold,
    fontSize: 14,
    color: COLORS.DimGray,
  },
  shippingTextActive: {
    color: '#FFF',
  },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  switchLabel: {
    fontFamily: Fonts.meduim,
    fontSize: 12,
    color: COLORS.DimGray,
  },
  cbmBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#F0FDF4',
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  cbmText: {
    fontFamily: Fonts.bold,
    fontSize: 13,
    color: ACCENT,
  },
  totalCostRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#F0FDF4',
    borderRadius: 8,
  },
  totalCostLabel: {
    fontFamily: Fonts.meduim,
    fontSize: 13,
    color: COLORS.DimGray,
  },
  totalCostValue: {
    fontFamily: Fonts.bold,
    fontSize: 14,
    color: ACCENT,
  },
});
