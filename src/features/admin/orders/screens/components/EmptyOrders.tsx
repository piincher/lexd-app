import React from 'react';
import { View } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { createStyles } from './EmptyOrders.styles';
import { useAppTheme } from '@src/providers/ThemeProvider';

export const EmptyOrders: React.FC = () => {
  const navigation = useNavigation();
  const { colors, isDark } = useAppTheme();
  const styles = createStyles(colors, isDark);

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <MaterialCommunityIcons name="package-variant-closed" size={48} color={colors.text.secondary} />
      </View>
      <Text style={styles.title}>No Orders Found</Text>
      <Text style={styles.subtitle}>
        There are no orders matching your search criteria. Try adjusting your filters or create a new order.
      </Text>
      <Button
        mode="contained"
        onPress={() => navigation.navigate('AddOrder' as never)}
        style={styles.button}
        buttonColor={colors.primary.main}
        icon="plus"
      >
        Create New Order
      </Button>
    </View>
  );
};

export default EmptyOrders;
