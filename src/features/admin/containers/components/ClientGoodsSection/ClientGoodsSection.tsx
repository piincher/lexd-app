/**
 * ClientGoodsSection - Collapsible client section for packing list
 */

import React, { useState } from 'react';
import { View, LayoutAnimation } from 'react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';
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
  index,
  defaultExpanded = true,
  onToggleExpand,
  showPhotos = false,
}) => {
  const { colors, isDark } = useAppTheme();
  const styles = React.useMemo(() => createStyles(colors, isDark), [colors, isDark]);
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  const handleToggle = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    const newValue = !isExpanded;
    setIsExpanded(newValue);
    onToggleExpand?.(newValue);
  };

  return (
    <Animated.View entering={FadeInUp.delay(index * 100)} style={styles.container}>
      <ClientHeader clientGroup={clientGroup} isExpanded={isExpanded} onToggle={handleToggle} />

      {isExpanded && (
        <View style={styles.content}>
          <PackingListTable goods={clientGroup.goods} showPhotos={showPhotos} startIndex={1} />
          <ClientSubtotal clientGroup={clientGroup} />
        </View>
      )}
    </Animated.View>
  );
};

export default ClientGoodsSection;
