import React from 'react';
import { View } from 'react-native';
import { Card, Divider } from 'react-native-paper';
import { ShimmerBlock } from '@src/shared/ui';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { SkeletonInfoRow } from './SkeletonInfoRow';
import { styles } from './OrderDetailSkeleton.styles';

interface SkeletonInfoCardProps {
  titleWidth: number;
  rowCount: number;
}

export const SkeletonInfoCard: React.FC<SkeletonInfoCardProps> = ({ titleWidth, rowCount }) => {
  const { colors } = useAppTheme();
  return (
    <Card style={styles.sectionCard}>
      <View style={styles.sectionHeader}>
        <ShimmerBlock width={20} height={20} borderRadius={10} />
        <ShimmerBlock width={titleWidth} height={15} borderRadius={4} />
      </View>
      <Card.Content>
        {Array.from({ length: rowCount }).map((_, i) => (
          <React.Fragment key={i}>
            <SkeletonInfoRow />
            {i < rowCount - 1 && (
              <Divider style={[styles.divider, { backgroundColor: colors.border }]} />
            )}
          </React.Fragment>
        ))}
      </Card.Content>
    </Card>
  );
};
