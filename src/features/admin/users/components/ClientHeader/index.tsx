import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import type { NavigationProp } from "@react-navigation/native";
import { NotificationBell } from '@src/shared/ui/NotificationBell';

import { StatCard } from "../StatCard";
import { styles } from "./ClientHeader.styles";

interface ClientHeaderProps {
  totalClients: number;
  activeCount: number;
  blockedCount: number;
  navigation: NavigationProp<any>;
}

export const ClientHeader: React.FC<ClientHeaderProps> = ({
  totalClients,
  activeCount,
  blockedCount,
  navigation,
}) => (
  <LinearGradient
    colors={["#1a5f2a", "#2d8a3e", "#3cb853"]}
    start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 1 }}
    style={styles.container}
  >
    <View style={styles.content}>
      <View style={styles.top}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Gestion Clients</Text>
          <Text style={styles.subtitle}>{totalClients} clients au total</Text>
        </View>
        <NotificationBell
          onPress={() => navigation.navigate('Notifications')}
          size={22}
          color="#FFF"
        />
      </View>

      <View style={styles.stats}>
        <StatCard icon="account-group" label="Total" value={totalClients} color="#ffffff" delay={0} />
        <StatCard icon="account-check" label="Actifs" value={activeCount} color="#86efac" delay={100} />
        <StatCard icon="account-cancel" label="Bloqués" value={blockedCount} color="#fca5a5" delay={200} />
      </View>
    </View>
  </LinearGradient>
);
