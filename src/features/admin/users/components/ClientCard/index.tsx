import React, { useCallback } from "react";
import { View, Text, TouchableOpacity, Pressable, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import Animated, { FadeInUp } from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";

import { userData } from "@src/constants/types";
import { RootStackScreenProps } from "@src/navigations/type";
import { getInitials, getAvatarColor } from "../../lib/clientUtils";
import { styles } from "./ClientCard.styles";

interface ClientCardProps {
  client: userData;
  onToggleBlock: (clientId: string) => void;
  index: number;
}

export const ClientCard: React.FC<ClientCardProps> = ({ 
  client, 
  onToggleBlock, 
  index 
}) => {
  const navigation = useNavigation<RootStackScreenProps<"ClientDetails">["navigation"]>();
  const avatarColors = getAvatarColor(`${client.firstName} ${client.lastName}`);
  const borderColor = client.blocked?.isBlocked ? "#EF4444" : "#10B981";
  
  const handleBlockToggle = useCallback(() => {
    Alert.alert(
      client.blocked?.isBlocked ? "Débloquer le client ?" : "Bloquer le client ?",
      client.blocked?.isBlocked
        ? `Êtes-vous sûr de vouloir débloquer ${client.firstName} ${client.lastName} ?`
        : `Êtes-vous sûr de vouloir bloquer ${client.firstName} ${client.lastName} ? Il ne pourra plus passer de commandes.`,
      [
        { text: "Annuler", style: "cancel" },
        {
          text: client.blocked?.isBlocked ? "Débloquer" : "Bloquer",
          style: client.blocked?.isBlocked ? "default" : "destructive",
          onPress: () => onToggleBlock(client._id),
        },
      ]
    );
  }, [client, onToggleBlock]);

  return (
    <Animated.View
      entering={FadeInUp.delay(index * 50).duration(400)}
      style={styles.wrapper}
    >
      <Pressable
        onPress={() => navigation.navigate("ClientDetails", { id: client._id })}
        style={({ pressed }) => [
          styles.card,
          pressed && styles.cardPressed,
          client.blocked?.isBlocked && styles.blockedCard,
        ]}
      >
        <View style={[styles.accentBorder, { backgroundColor: borderColor }]} />
        
        <LinearGradient
          colors={avatarColors}
          style={styles.avatar}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <Text style={styles.avatarText}>
            {getInitials(client.firstName, client.lastName)}
          </Text>
        </LinearGradient>

        <View style={styles.info}>
          <View style={styles.nameRow}>
            <Text style={styles.name} numberOfLines={1}>
              {client.firstName} {client.lastName}
            </Text>
            {client.blocked?.isBlocked && (
              <View style={styles.blockedBadge}>
                <Ionicons name="ban" size={10} color="#EF4444" />
                <Text style={styles.blockedText}>Bloqué</Text>
              </View>
            )}
          </View>
          
          <View style={styles.detailRow}>
            <Ionicons name="call-outline" size={14} color="#9CA3AF" />
            <Text style={styles.phone}>{client.phoneNumber || "N/A"}</Text>
          </View>
          
          {client.email && (
            <View style={styles.detailRow}>
              <Ionicons name="mail-outline" size={14} color="#9CA3AF" />
              <Text style={styles.email} numberOfLines={1}>{client.email}</Text>
            </View>
          )}
        </View>

        <TouchableOpacity
          style={[
            styles.actionButton,
            client.blocked?.isBlocked ? styles.unblockButton : styles.blockButton,
          ]}
          onPress={handleBlockToggle}
          activeOpacity={0.8}
        >
          <Ionicons
            name={client.blocked?.isBlocked ? "lock-open" : "lock-closed"}
            size={18}
            color={client.blocked?.isBlocked ? "#10B981" : "#EF4444"}
          />
        </TouchableOpacity>
      </Pressable>
    </Animated.View>
  );
};
