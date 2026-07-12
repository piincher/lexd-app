/**
 * ClientGoodsSection - Collapsible client section for packing list
 */

import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { ClientGoodsGroup } from '../../types/packingList';
import { PackingListTable } from '../../components/PackingListTable';
import { createStyles } from './ClientGoodsSection.styles';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { ClientHeader } from './ClientHeader';
import { ClientSubtotal } from './ClientSubtotal';

interface ClientGoodsSectionProps {
  clientGroup: ClientGoodsGroup;
  index: number;
  defaultExpanded?: boolean;
  onToggleExpand?: (expanded: boolean) => void;
  showPhotos?: boolean;
}

export const ClientGoodsSection: React.FC<ClientGoodsSectionProps> = ({
  clientGroup,
  index: _index,
  defaultExpanded = true,
  onToggleExpand,
  showPhotos = false,
}) => {
  const { colors, isDark } = useAppTheme();
  const styles = createStyles(colors, isDark);
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  useEffect(() => {
    setIsExpanded(defaultExpanded);
  }, [defaultExpanded]);

  const handleToggle = () => {
    const newValue = !isExpanded;
    setIsExpanded(newValue);
    onToggleExpand?.(newValue);
  };

  return (
    <View style={styles.container}>
      <ClientHeader clientGroup={clientGroup} isExpanded={isExpanded} onToggle={handleToggle} />

      {isExpanded && (
        <View style={styles.content}>
          <PackingListTable goods={clientGroup.goods} showPhotos={showPhotos} startIndex={1} />
          <ClientSubtotal clientGroup={clientGroup} />
        </View>
      )}
    </View>
  );
};

export default ClientGoodsSection;
