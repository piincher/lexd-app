import React from 'react';
import { View, Text } from 'react-native';
import { ListItem } from '@src/shared/ui/ListItem';
import { useRenderOrderStyles } from './RenderOrder.styles';

interface InfoItem {
  label: string;
  value: any;
  icon?: string;
  isCopyable?: boolean;
}

interface OrderInfoSectionProps {
  title: string;
  data: InfoItem[];
  onCopy?: () => void;
}

export const OrderInfoSection: React.FC<OrderInfoSectionProps> = ({ title, data, onCopy }) => {
  const styles = useRenderOrderStyles();

  return (
    <View style={styles.card}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {data.map((item, index) => (
        <ListItem
          key={`${title}-${index}`}
          label={item.label}
          value={item.value}
          icon={item.icon}
          isCopyable={item.isCopyable}
          onCopy={onCopy}
        />
      ))}
    </View>
  );
};
