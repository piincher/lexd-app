import React from 'react';
import { View } from 'react-native';
import { Text, Divider } from 'react-native-paper';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { createStyles } from './OrderInfoSection.styles';
import { OrderInfoItem } from './OrderInfoItem';

interface OrderInfoBlockItem {
  icon: string;
  label: string;
  value: string;
  iconColor?: string;
}

interface OrderInfoBlockProps {
  title: string;
  items: OrderInfoBlockItem[];
  showDivider?: boolean;
}

export const OrderInfoBlock: React.FC<OrderInfoBlockProps> = ({ title, items, showDivider = true }) => {
  const { colors, isDark } = useAppTheme();
  const styles = createStyles(colors, isDark);

  return (
    <>
      {showDivider && <Divider style={styles.divider} />}
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.grid}>
        {items.map((item, index) => (
          <OrderInfoItem
            key={index}
            icon={item.icon}
            label={item.label}
            value={item.value}
            iconColor={item.iconColor}
          />
        ))}
      </View>
    </>
  );
};
