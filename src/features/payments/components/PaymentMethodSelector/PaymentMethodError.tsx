import React from 'react';
import { View, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface Props {
  containerStyle: any;
  textStyle: any;
  color: string;
}

export const PaymentMethodError: React.FC<Props> = ({ containerStyle, textStyle, color }) => (
  <View style={containerStyle}>
    <MaterialCommunityIcons name="alert-circle" size={32} color={color} />
    <Text style={textStyle}>Failed to load payment methods. Please try again.</Text>
  </View>
);
