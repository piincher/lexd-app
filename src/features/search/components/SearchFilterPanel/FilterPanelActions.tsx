import React from 'react';
import { View } from 'react-native';
import { Button } from '@src/shared/ui/Button';
import { useSearchFilterPanelStyles } from './SearchFilterPanel.styles';

interface FilterPanelActionsProps {
  onClear: () => void;
  onApply: () => void;
}

export const FilterPanelActions: React.FC<FilterPanelActionsProps> = ({
  onClear,
  onApply,
}) => {
  const styles = useSearchFilterPanelStyles();

  return (
    <View style={styles.actions}>
      <Button variant="ghost" onPress={onClear}>
        Effacer
      </Button>
      <Button variant="primary" onPress={onApply}>
        Appliquer
      </Button>
    </View>
  );
};
