import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NotificationBell } from '@src/shared/ui';
import { useNavigation } from '@react-navigation/native';
import { CapacityIndicator } from './CapacityIndicator';
import { HeaderInfoBlock } from './HeaderInfoBlock';
import { NonAssignableBanner } from './NonAssignableBanner';
import { Container, ContainerStatus } from '../../../types';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { Theme } from '@src/constants/Theme';
import { createStyles } from './Header.styles';

interface HeaderProps {
  container?: Container;
  currentContainerCBM: number;
  totalSelectedCBM: number;
  isAssignable: boolean;
  containerStatus: ContainerStatus;
  isAirContainer?: boolean;
  maxCapacity?: number;
  onBack: () => void;
}

const MAX_CONTAINER_CBM = 67;

export const Header: React.FC<HeaderProps> = ({
  container,
  currentContainerCBM,
  totalSelectedCBM,
  isAssignable,
  containerStatus,
  isAirContainer = false,
  maxCapacity = MAX_CONTAINER_CBM,
  onBack,
}) => {
  const navigation = useNavigation();
  const { colors } = useAppTheme();
  const styles = createStyles(colors);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <LinearGradient colors={Theme.gradients.primary} style={styles.header}>
        <View style={styles.headerTop}>
          <TouchableOpacity onPress={onBack} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color={colors.text.inverse} />
          </TouchableOpacity>
          <HeaderInfoBlock container={container} />
          <NotificationBell
            onPress={() => navigation.navigate('Notifications' as never)}
            size={22}
            color={colors.text.inverse}
          />
        </View>

        <CapacityIndicator
          currentCBM={currentContainerCBM}
          selectedCBM={totalSelectedCBM}
          maxCBM={maxCapacity}
          isAir={isAirContainer}
        />

        {!isAssignable && <NonAssignableBanner containerStatus={containerStatus} />}
      </LinearGradient>
    </SafeAreaView>
  );
};

export default Header;
