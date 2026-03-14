import React from 'react';
import { View, Image, Text, Pressable, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '@src/constants/Colors';
import { Fonts } from '@src/constants/Fonts';

interface OrderImageCardProps {
  imageUrl?: string;
  categoryName?: string;
  packageType?: string;
  trackingCode?: string;
  onChat: () => void;
}

export const OrderImageCard: React.FC<OrderImageCardProps> = ({
  imageUrl,
  categoryName,
  packageType,
  trackingCode,
  onChat,
}) => {
  return (
    <View style={styles.container}>
      <LinearGradient colors={[COLORS.blue, COLORS.yellow]} style={styles.imageBorder}>
        <Image source={{ uri: imageUrl }} style={styles.image} />
      </LinearGradient>
      <View style={styles.textContainer}>
        <Text style={styles.category}>{categoryName || packageType}</Text>
        <Text style={styles.trackingNumber}>Numero de Suivi: {trackingCode}</Text>
      </View>
      <Pressable onPress={onChat} style={styles.chatButton}>
        <MaterialCommunityIcons name="chat" size={28} color={COLORS.white} />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    borderRadius: 20,
    padding: 15,
    marginHorizontal: 20,
    marginBottom: 20,
    shadowColor: COLORS.DarkGrey,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  imageBorder: {
    borderRadius: 12,
    padding: 3,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
    backgroundColor: COLORS.lightGrey,
  },
  textContainer: {
    flex: 1,
    marginLeft: 15,
    justifyContent: 'center',
  },
  category: {
    fontFamily: Fonts.bold,
    fontSize: 18,
    color: COLORS.DarkGrey,
    marginBottom: 4,
  },
  trackingNumber: {
    fontFamily: Fonts.meduim,
    fontSize: 14,
    color: COLORS.DarkGrey,
  },
  chatButton: {
    backgroundColor: COLORS.blue,
    padding: 10,
    borderRadius: 15,
    alignSelf: 'center',
  },
});
