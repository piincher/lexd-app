import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Input } from '@src/shared/ui/Input';
import { Button } from '@src/shared/ui/Button';
import { Checkbox } from '@src/shared/ui/Checkbox';
import { useAppTheme } from '@src/providers/ThemeProvider';
import type { ShippingMarkConfig } from '../api/shippingMarkAdminApi';

interface ShippingMarkConfigFormProps {
  config?: ShippingMarkConfig;
  onSave: (updates: Partial<ShippingMarkConfig>) => void;
  isSaving: boolean;
}

export const ShippingMarkConfigForm: React.FC<ShippingMarkConfigFormProps> = ({
  config,
  onSave,
  isSaving,
}) => {
  const { colors } = useAppTheme();
  const [values, setValues] = useState<Partial<ShippingMarkConfig>>({});

  useEffect(() => {
    if (config) setValues(config);
  }, [config]);

  const update = <K extends keyof ShippingMarkConfig>(key: K, value: ShippingMarkConfig[K]) => {
    setValues((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    onSave(values);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background.paper }]}>
      <Text style={[styles.title, { color: colors.text.primary }]}>Paramètres de la marque</Text>
      <Input
        label="Code entrepôt"
        value={values.shippingMarkWarehouseCode || ''}
        onChangeText={(v) => update('shippingMarkWarehouseCode', v)}
      />
      <Input
        label="Destination"
        value={values.shippingMarkDestination || ''}
        onChangeText={(v) => update('shippingMarkDestination', v)}
      />
      <Input
        label="Notice en chinois"
        value={values.shippingMarkChineseNotice || ''}
        onChangeText={(v) => update('shippingMarkChineseNotice', v)}
        multiline
        numberOfLines={2}
        containerStyle={styles.noticeInput}
      />
      <Input
        label="Préfixe client"
        value={values.shippingClientIdPrefix || ''}
        onChangeText={(v) => update('shippingClientIdPrefix', v.toUpperCase())}
        autoCapitalize="characters"
      />

      <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>Popup de rappel</Text>
      <Checkbox
        checked={!!values.shippingMarkPopupEnabled}
        onPress={() => update('shippingMarkPopupEnabled', !values.shippingMarkPopupEnabled)}
        label="Activer la popup"
      />
      <Checkbox
        checked={!!values.shippingMarkPopupShowOnLogin}
        onPress={() => update('shippingMarkPopupShowOnLogin', !values.shippingMarkPopupShowOnLogin)}
        label="Afficher à la connexion"
      />
      <Input
        label="Titre de la popup"
        value={values.shippingMarkPopupTitle || ''}
        onChangeText={(v) => update('shippingMarkPopupTitle', v)}
      />
      <Input
        label="Message de la popup"
        value={values.shippingMarkPopupMessage || ''}
        onChangeText={(v) => update('shippingMarkPopupMessage', v)}
        multiline
        numberOfLines={3}
        containerStyle={styles.noticeInput}
      />
      <Input
        label="Texte du bouton principal"
        value={values.shippingMarkPopupActionLabel || ''}
        onChangeText={(v) => update('shippingMarkPopupActionLabel', v)}
      />
      <Input
        label="Texte du bouton de fermeture"
        value={values.shippingMarkPopupDismissLabel || ''}
        onChangeText={(v) => update('shippingMarkPopupDismissLabel', v)}
      />

      <Button title="Enregistrer" onPress={handleSave} loading={isSaving} fullWidth />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    gap: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '600',
    marginTop: 8,
  },
  noticeInput: {
    minHeight: 64,
  },
});
