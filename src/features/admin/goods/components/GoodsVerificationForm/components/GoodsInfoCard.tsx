import React, { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { Card, Text, Divider } from 'react-native-paper';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { DimensionsInput } from '../../DimensionsInput';
import { FormInput } from '../../FormInput';
import type { FormErrors } from './types';

interface GoodsInfoCardProps {
  description: string;
  length: string;
  width: string;
  height: string;
  cbm: string;
  useDimensions: boolean;
  calculatedCBM: number;
  errors: Pick<FormErrors, 'description' | 'length' | 'width' | 'height' | 'cbm'>;
  onChangeField: (field: string, value: string) => void;
  onToggleDimensions: (use: boolean) => void;
}

export const GoodsInfoCard: React.FC<GoodsInfoCardProps> = ({
  description,
  length,
  width,
  height,
  cbm,
  useDimensions,
  calculatedCBM,
  errors,
  onChangeField,
  onToggleDimensions,
}) => {
  const { colors } = useAppTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  return (
    <Card style={styles.card} elevation={2}>
      <Card.Content style={styles.content}>
        <Text style={styles.sectionLabel}>Informations</Text>

        <FormInput
          label="Description"
          value={description}
          onChangeText={(value) => onChangeField('description', value)}
          error={errors.description}
          multiline
          numberOfLines={2}
          placeholder="Description de la marchandise"
        />

        <Divider style={styles.divider} />

        <DimensionsInput
          useDimensions={useDimensions}
          onToggleMode={onToggleDimensions}
          length={length}
          width={width}
          height={height}
          cbm={cbm}
          onChangeLength={(v) => onChangeField('length', v)}
          onChangeWidth={(v) => onChangeField('width', v)}
          onChangeHeight={(v) => onChangeField('height', v)}
          onChangeCBM={(v) => onChangeField('cbm', v)}
          errors={{
            length: errors.length,
            width: errors.width,
            height: errors.height,
            cbm: errors.cbm,
          }}
          calculatedCBM={calculatedCBM}
        />
      </Card.Content>
    </Card>
  );
};

const createStyles = (colors: any) =>
  StyleSheet.create({
    card: {
      borderRadius: 12,
      backgroundColor: colors.background.card,
      marginBottom: 16,
    },
    content: {
      padding: 16,
    },
    sectionLabel: {
      fontSize: 14,
      fontWeight: '700',
      marginBottom: 16,
      color: colors.text.primary,
      textTransform: 'uppercase',
      letterSpacing: 0.5,
    },
    divider: {
      marginVertical: 16,
      backgroundColor: colors.border,
    },
  });
