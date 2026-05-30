import React from 'react';
import { View } from 'react-native';
import { FAB } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StyleSheet } from 'react-native';
import { useAppTheme } from '@src/providers/ThemeProvider';
import type { AuthenticatedStackParamList } from '@src/navigation/types';
import { LEGACY_MANUAL_ORDERS_ENABLED } from '../../legacyOrders';

type NavigationProp = NativeStackNavigationProp<AuthenticatedStackParamList>;

export const AddOrderButton: React.FC = () => {
  // Manual order creation is being retired — orders now come from goods.
  if (!LEGACY_MANUAL_ORDERS_ENABLED) return null;
  return <AddOrderButtonInner />;
};

const AddOrderButtonInner: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const { colors, isDark } = useAppTheme();
  const styles = StyleSheet.create({
    container: {
      position: 'absolute',
      right: 16,
      bottom: 20,
      alignItems: 'flex-end',
      gap: 12,
    },
    fab: {
      backgroundColor: colors.primary.main,
      borderRadius: 12,
    },
    fabManual: {
      backgroundColor: colors.status.success,
      borderRadius: 12,
    },
  });

  return (
    <View style={styles.container}>
      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => navigation.navigate('AddOrder', {
          userId: '',
          clientName: '',
          phoneNumber: '',
          pushTokens: []
        })}
        color={colors.text.inverse}
        label="New Order"
      />
    </View>
  );
};

export default AddOrderButton;
